import { useState, useEffect } from 'react'

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
		label: 'CYBERENERGIYA',
		x: 490,
		y: 140,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/tog/shes',
	},
	{
		id: 2,
		label: 'CYBERKENT BANKI',
		x: 660,
		y: 240,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/tog/elektr',
	},
	{
		id: 3,
		label: 'CYBERKENT REKLAMA PANELLARI',
		x: 488,
		y: 337,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/tog/antena',
	},
	{
		id: 4,
		label: 'CYBERPIZZA',
		x: 318,
		y: 438,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/tog/chiroq',
	},
	{
		id: 5,
		label: "CYBERKENT AVTOMIBIL YO'LLARI",
		x: 490,
		y: 534,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/airaport/elektr',
	},
	{
		id: 6,
		label: "CYBERKENT ISTIROHAT BOG'I",
		x: 830,
		y: 340,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/airaport/jadval',
	},
	{
		id: 7,
		label: 'CYBERKENT GES',
		x: 1000,
		y: 240,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/airaport/chiroq',
	},
	{
		id: 8,
		label: 'CYBERKENT SHAMOL ENERGIYASI',
		x: 1170,
		y: 340,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/temiryol/jadval',
	},
	{
		id: 9,
		label: 'CYBERKENT AVTOTURARGOH',
		x: 1000,
		y: 436,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/temiryol/poyezd',
	},
	{
		id: 10,
		label: 'CYBERKENT XALQARO AEROPORTI',
		x: 832,
		y: 535,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/temiryol/elektr',
	},
	{
		id: 11,
		label: "CYBERKENT TEMIR YO'LLARI",
		x: 1170,
		y: 535,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/temiryol/chiroq',
	},
	{
		id: 12,
		label: 'CYBERKENT AVTOMOBIL ZAVODI',
		x: 1001,
		y: 632,
		size: 220,
		rotation: 30,
		status: 0,
		api: 'http://192.168.200.241:5000/control/temiryol/chiroq',
	},
]

function App() {
	const [hexagonAreas, setHexagonAreas] = useState<HexagonArea[]>([])
	const [hoveredHex, setHoveredHex] = useState<number | null>(null)
	const [activeHex, setActiveHex] = useState<number | null>(13)

	useEffect(() => {
		const savedAreas = localStorage.getItem('hexagonAreas')
		if (savedAreas) {
			try {
				const parsedAreas = JSON.parse(savedAreas)
				setHexagonAreas(parsedAreas)
			} catch (error) {
				console.error('Error parsing hexagonAreas from localStorage:', error)
				setHexagonAreas(initialHexagonAreas)
			}
		} else {
			setHexagonAreas(initialHexagonAreas)
		}
	}, [])

	useEffect(() => {
		if (hexagonAreas.length > 0) {
			localStorage.setItem('hexagonAreas', JSON.stringify(hexagonAreas))
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
		<div className='relative w-screen h-screen flex items-center justify-center overflow-hidden bg-linear-to-r from-[#1d43d8] via-[#DC2E56] to-[#3451C3]'>
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
					<span className='text-white font-bold text-xl drop-shadow-lg w-[90%]'>
						{hex.label}
					</span>
				</button>
			))}
		</div>
	)
}

export default App
