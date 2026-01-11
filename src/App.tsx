import { useState, useEffect } from 'react'
import LoadingScreen from './components/loading-screen'
import { motion } from 'framer-motion'

interface HexagonArea {
	id: number
	label: string
	x: number
	y: number
	size: number
	rotation?: number
	status: number
	api: string
}

const initialHexagonAreas: HexagonArea[] = [
	{
		id: 1,
		label: 'CYBERKENT REKLAMA PANELLARI',
		x: 490,
		y: 140,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/airaport/jadval',
	},
	{
		id: 2,
		label: 'CYBERKENT BANKI',
		x: 660,
		y: 240,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/temiryol/elektr',
	},
	{
		id: 3,
		label: 'CYBERENERGIYA',
		x: 488,
		y: 337,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/temiryol/poyezd',
	},
	{
		id: 4,
		label: "CYBERKENT AVTOMIBIL YO'LLARI",
		x: 318,
		y: 438,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/temiryol/jadval',
	},
	{
		id: 5,
		label: 'CYBERPIZZA',
		x: 490,
		y: 534,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/temiryol/chiroq',
	},
	{
		id: 6,
		label: "CYBERKENT ISTIROHAT BOG'I",
		x: 830,
		y: 340,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/tog/elektr',
	},
	{
		id: 7,
		label: 'CYBERKENT GES',
		x: 1000,
		y: 240,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/airaport/elektr',
	},
	{
		id: 8,
		label: 'CYBERKENT SHAMOL ENERGIYASI',
		x: 1170,
		y: 340,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/tog/shes',
	},
	{
		id: 9,
		label: 'CYBERKENT AVTOTURARGOH',
		x: 1000,
		y: 436,
		size: 220,
		rotation: 30,
		status: 0,

		api: 'http://172.16.200.20:5000/control/airaport/chiroq',
	},
	{
		id: 10,
		label: 'CYBERKENT XALQARO AEROPORTI',
		x: 832,
		y: 535,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/tog/chiroq',
	},
	{
		id: 11,
		label: "CYBERKENT TEMIR YO'LLARI",
		x: 1170,
		y: 535,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/tog/antena',
	},
	{
		id: 12,
		label: 'CYBERKENT AVTOMOBIL ZAVODI',
		x: 1001,
		y: 632,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://172.16.200.20:5000/control/temiryol/chiroq',
	},
]

function App() {
	const [hexagonAreas, setHexagonAreas] = useState<HexagonArea[]>([])
	const [hoveredHex, setHoveredHex] = useState<number | null>(null)
	const [activeHex, setActiveHex] = useState<number | null>(13)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const savedStatuses = localStorage.getItem('hexagonStatuses')
		let areasToSet = initialHexagonAreas
		if (savedStatuses) {
			try {
				const statuses = JSON.parse(savedStatuses)
				areasToSet = initialHexagonAreas.map(hex => {
					const savedStatus = statuses.find(
						(s: { id: number; status: number }) => s.id === hex.id
					)
					return savedStatus ? { ...hex, status: savedStatus.status } : hex
				})
			} catch (error) {
				console.error(
					'Error parsing hexagon statuses from localStorage:',
					error
				)
			}
		}
		setHexagonAreas(areasToSet)
	}, [])

	useEffect(() => {
		if (hexagonAreas.length > 0) {
			const statuses = hexagonAreas.map(h => ({ id: h.id, status: h.status }))
			localStorage.setItem('hexagonStatuses', JSON.stringify(statuses))
		}
	}, [hexagonAreas])

	const handleHexagonClick = (hexagon: HexagonArea) => {
		setActiveHex(hexagon.id)
	}

	const handleClick = async (hexagon: HexagonArea) => {
		const newStatus = hexagon.status === 0 ? 1 : 0
		const url = `${hexagon.api}=${newStatus}`

		try {
			const response = await fetch(url)
			if (response.ok) {
				setHexagonAreas(prev =>
					prev.map(h => (h.id === hexagon.id ? { ...h, status: newStatus } : h))
				)
				console.log(`Hexagon ${hexagon.id} status updated to ${newStatus}`)
			} else {
				console.error(
					`Error updating hexagon ${hexagon.id}: ${response.status}`
				)
			}
		} catch (err) {
			console.error(`Error sending request for hexagon ${hexagon.id}:`, err)
		}
	}

	return (
		<div className='w-full h-screen overflow-hidden'>
			<div className='w-full h-full fixed top-0 left-0 '>
				{isLoading && (
					<LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
				)}
			</div>
			{!isLoading && (
				<div className='relative w-screen h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#07072f] to-[#030318]'>
					<div className='absolute inset-0 bg-linear-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' />
					<motion.div
						className='absolute inset-0'
						animate={{
							backgroundPosition: ['0% 0%', '100% 100%'],
						}}
						transition={{
							duration: 500,
							repeat: Infinity,
							ease: 'linear',
						}}
						style={{
							backgroundImage: `
             linear-gradient(rgba(14, 10, 138, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
							backgroundSize: '50px 50px',
						}}
					/>
					{[...Array(20)].map((_, index) => (
						<motion.div
							key={index}
							className='absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							animate={{
								y: [0, -20, 0],
								opacity: [0.3, 1, 0.3],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								delay: index * 0.1,
							}}
						/>
					))}
					{hexagonAreas.map(hex => (
						<button
							key={hex.id}
							onClick={() => {
								handleHexagonClick(hex)
								handleClick(hex)
							}}
							onMouseEnter={() => setHoveredHex(hex.id)}
							onMouseLeave={() => setHoveredHex(null)}
							className='absolute cursor-pointer transition-all duration-200 border-2 hover:bg-cyan-500/30'
							style={{
								left: `${hex.x}px`,
								top: `${hex.y}px`,
								width: `${hex.size}px`,
								height: `${hex.size}px`,
								clipPath:
									'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
								borderColor:
									activeHex === hex.id
										? 'rgba(255, 255, 255, 0.5)'
										: hoveredHex === hex.id
										? 'rgba(255, 255, 255, 0.5)'
										: 'rgba(0, 255, 255, 0.5)',
								backgroundColor:
									hex.status === 1
										? 'rgba(255, 0, 0, 0.5)'
										: hoveredHex === hex.id
										? 'rgba(0, 255, 255, 0.5)'
										: 'rgba(0, 255, 255, 0.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: 0,
								transform: `rotate(${hex.rotation || 0}deg)`,
							}}
							title={hex.label}
						>
							<span className='text-white font-bold text-xl drop-shadow-lg w-[90%] -rotate-[30deg]'>
								{hex.label}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default App
