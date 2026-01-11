import '../../styles/app.css'

const Header = () => {
	return (
		<header className='header'>
			<div className='container'>
				<div className='header-box'>
					<div
						className='scroll'
						style={{
							marginTop: '-30px',
							marginBottom: '20px',
							marginRight: '0px',
							marginLeft: '-40px',
							padding: '10px',
						}}
					>
						<div className='content1' style={{ textAlign: 'center' }}>
							<div
								style={{
									height: '100%',
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{/* Logo */}
								<img
									src='/assets/logo.png'
									width={80}
									height={100}
									alt='Logo'
									style={{
										display: 'inline-block',
										marginRight: '30px',
									}}
								/>

								{/* Texts */}
								<div style={{ marginLeft: '91px' }}>
									<h2
										className='text'
										data-text='Cyberkent 3.0'
										style={{
											display: 'inline-block',
											marginLeft: '0px',
											paddingLeft: '35px',
											fontFamily: 'Jura, sans-serif',
										}}
									>
										Cyberkent 3.0
									</h2>

									<h2
										className='text2'
										data-text=''
										style={{
											display: 'block',
											marginLeft: '130px',
											paddingTop: '10px',
											fontFamily: 'Jura, sans-serif',
											fontSize: '30px',
										}}
									>
										Xaritasi
									</h2>
								</div>

								{/* Cyber image */}
								<img
									src='/assets/cyber.png'
									width={130}
									height={100}
									alt='Cyber'
									className='cyber-logo12'
									style={{
										display: 'inline-block',
										marginLeft: '160px',
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
