import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div className='w-screen h-screen bg-linear-to-r from-[#1d43d8] via-[#DC2E56] to-[#3451C3]'>
			<App />
		</div>
	</StrictMode>
)
