import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface IProps {
	onLoadingComplete: (complete: boolean) => void
}

const LoadingScreen = ({ onLoadingComplete }: IProps) => {
	const [progress, setProgress] = useState(0)
	const [currentText, setCurrentText] = useState(
		"CYBERKENT MA'LUMOTLARI YUKLANMOQDA..."
	)

	const loadingTexts = [
		"CYBERKENT MA'LUMOTLARI YUKLANMOQDA...",
		'NATIJALAR TAQSIMOTI MONITORLARGA CHIQARILMOQDA...',
		'TIZIM BILAN ALOQA YAXSHILANMOQDA...',
		'YUKLANMOQDA...',
		'CYBERKENT 3.0 - WELCOME TO THE FUTURE',
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => {
				const newProgress = prev + Math.random() * 15
				if (newProgress >= 100) {
					clearInterval(interval)
					setTimeout(() => onLoadingComplete(false), 1000)
					return 100
				}
				return newProgress
			})
		}, 300)

		const textInterval = setInterval(() => {
			setCurrentText(prev => {
				const currentIndex = loadingTexts.indexOf(prev)
				return loadingTexts[(currentIndex + 1) % loadingTexts.length]
			})
		}, 800)

		return () => {
			clearInterval(interval)
			clearInterval(textInterval)
		}
	}, [onLoadingComplete])

	return (
		<motion.div
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className='fixed inset-0 z-[1000000000000000000000000000000000000000000000000000000000000] bg-black flex items-center justify-center'
		>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' />

				<motion.div
					className='absolute inset-0'
					animate={{
						backgroundPosition: ['0% 0%', '100% 100%'],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'linear',
					}}
					style={{
						backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
						backgroundSize: '50px 50px',
					}}
				/>
			</div>

			<div className='relative z-10 text-center max-w-md w-full'>
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 15,
						duration: 1.5,
					}}
					className='mb-8'
				>
					<div className='relative'>
						<h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 tracking-wide'>
							CYBERKENT 3.0
						</h1>
						<motion.div
							className='absolute inset-0 text-5xl font-bold text-cyan-400 opacity-50'
							animate={{
								textShadow: [
									'0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
									'0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
									'0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							CYBERKENT 3.0
						</motion.div>
					</div>
				</motion.div>

				<div className='mb-6'>
					<div className='w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30'>
						<motion.div
							className='h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full'
							initial={{ width: '0%' }}
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.3 }}
						/>
					</div>
					<div className='flex justify-between text-sm text-cyan-300 mt-2'>
						<span>LOADING</span>
						<span className='font-mono'>{Math.round(progress)}%</span>
					</div>
				</div>

				<motion.p
					key={currentText}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className='text-cyan-300 font-mono text-sm tracking-wide'
				>
					{currentText}
				</motion.p>

				<div className='absolute -inset-4 border border-cyan-400/20 rounded-lg'>
					<motion.div
						className='absolute inset-0 border border-cyan-400/40 rounded-lg'
						animate={{
							scale: [1, 1.02, 1],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>

				<div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400' />
				<div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pink-400' />
				<div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400' />
				<div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400' />
			</div>

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
		</motion.div>
	)
}

export default LoadingScreen
