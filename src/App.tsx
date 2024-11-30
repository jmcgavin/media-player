import './App.css'

const App = () => {
  const handleElectronViteClick = () => {
    window.open('https://electron-vite.github.io', '_blank')
  }

  const handleReactClick = () => {
    window.open('https://react.dev', '_blank')
  }

  return (
    <>
      <h1>
        Electron Vite
        <br />+<br />
        React
      </h1>
      <section className='container'>
        <img src='/electron-vite.animate.svg' alt='Vite logo' onClick={handleElectronViteClick} />
        +
        <img src='/react.svg' className='react' alt='React logo' onClick={handleReactClick} />
      </section>
    </>
  )
}

export default App
