import { useState } from 'react'

interface HexagonArea {
	id: number
	label: string
	x: number
	y: number
	size: number
	rotation?: number
}

const hexagonAreas: HexagonArea[] = [
	{ id: 1, label: 'CYBERENERGIYA', x: 480, y: 150, size: 200, rotation: -30 },
	{ id: 2, label: 'CYBERKENT BANKI', x: 650, y: 230, size: 220, rotation: 30 },
	{
		id: 3,
		label: 'CYBERKENT REKLAMA PANELLARI',
		x: 450,
		y: 320,
		size: 230,
		rotation: 40,
	},
	{ id: 4, label: 'CYBERPIZZA', x: 250, y: 420, size: 220, rotation: 35 },
	{
		id: 5,
		label: "CYBERKENT AVTOMIBIL YO'LLARI",
		x: 420,
		y: 520,
		size: 250,
		rotation: 30,
	},
	{
		id: 6,
		label: "CYBERKENT ISTIROHAT BOG'I",
		x: 830,
		y: 330,
		size: 220,
		rotation: 30,
	},
	{ id: 7, label: 'CYBERKENT GES', x: 1010, y: 230, size: 230, rotation: 30 },
	{
		id: 8,
		label: 'CYBERKENT SHAMOL ENERGIYASI',
		x: 1210,
		y: 320,
		size: 230,
		rotation: 25,
	},
	{
		id: 9,
		label: 'CYBERKENT AVTOTURARGOH',
		x: 1020,
		y: 420,
		size: 240,
		rotation: 27.5,
	},
	{
		id: 10,
		label: 'CYBERKENT XALQARO AEROPORTI',
		x: 820,
		y: 520,
		size: 260,
		rotation: 30,
	},
	{
		id: 11,
		label: "CYBERKENT TEMIR YO'LLARI",
		x: 1225,
		y: 530,
		size: 260,
		rotation: 22,
	},
	{
		id: 12,
		label: 'CYBERKENT AVTOMOBIL ZAVODI',
		x: 1030,
		y: 630,
		size: 270,
		rotation: 25,
	},
]

function App() {
	const [hoveredHex, setHoveredHex] = useState<number | null>(null)
	const [activeHex, setActiveHex] = useState<number | null>(13)

	const handleHexagonClick = (hexagon: HexagonArea) => {
		setActiveHex(13)
		alert(`Hexagon ${hexagon.id}`)
	}

	return (
		<div className='relative w-screen h-screen overflow-hidden'>
			<img
				src='/image.png'
				alt='CYBERKENT 3.0 XARITASI'
				className='absolute inset-0 w-full h-full object-cover'
			/>

			{hexagonAreas.map(hex => (
				<button
					key={hex.id}
					onClick={() => handleHexagonClick(hex)}
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
								? 'rgba(255, 255, 255, 0.005)'
								: hoveredHex === hex.id
								? 'rgba(255, 255, 255, 0.005)'
								: 'rgba(0, 255, 255, 0.005)',
						backgroundColor:
							activeHex === hex.id
								? 'rgba(0, 255, 0, 0.005)'
								: hoveredHex === hex.id
								? 'rgba(0, 255, 255, 0.005)'
								: 'transparent',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 0,
						transform: `rotate(${hex.rotation || 0}deg)`,
					}}
					title={hex.label}
				>
					{(hoveredHex === hex.id || activeHex === hex.id) && (
						<span className='text-white font-bold text-xl drop-shadow-lg w-[90%]'>
							{hex.label}
						</span>
					)}
				</button>
			))}
		</div>
	)
}

export default App
