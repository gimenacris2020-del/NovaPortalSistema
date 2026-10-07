import { useState } from 'react'
import ValidacionCredencialesPage from './pages/ValidacionCredencialesPage.jsx'
import PortalPage from './pages/PortalPage.jsx'

function App() {
  const [sesion, setSesion] = useState(null)

  const manejarLoginExitoso = (correo, mensaje) => {
    setSesion({ correo, mensaje })
  }

  const manejarCerrarSesion = () => {
    setSesion(null)
  }

  if (sesion) {
    return (
      <PortalPage
        correo={sesion.correo}
        mensaje={sesion.mensaje}
        onCerrarSesion={manejarCerrarSesion}
      />
    )
  }

  return <ValidacionCredencialesPage onLoginExitoso={manejarLoginExitoso} />
}

export default App
