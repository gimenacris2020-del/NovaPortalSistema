import './PortalPage.css'

const MODULOS = [
  {
    titulo: 'Documentos',
    descripcion: 'Consulta y descarga de documentos corporativos.',
  },
  {
    titulo: 'Solicitudes',
    descripcion: 'Registro y seguimiento de solicitudes internas.',
  },
  {
    titulo: 'Reportes',
    descripcion: 'Visualización de reportes de operaciones.',
  },
  {
    titulo: 'Servicios',
    descripcion: 'Acceso a los servicios corporativos de NovaTech.',
  },
]

function PortalPage({ correo, mensaje, onCerrarSesion }) {
  return (
    <div className="portal-contenedor">
      <div className="portal-barra">
        <div className="portal-marca">
          <div className="portal-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <div className="portal-marca-titulo">NovaPortal</div>
            <div className="portal-marca-sub">NovaTech Servicios Digitales</div>
          </div>
        </div>

        <div className="portal-usuario">
          <span className="portal-correo">{correo}</span>
          <button type="button" className="portal-boton-salir" onClick={onCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="portal-contenido">
        <div className="portal-bienvenida" role="status">
          <h1 className="portal-titulo">{mensaje}</h1>
          <p className="portal-texto">Bienvenido a NovaPortal, {correo}.</p>
        </div>

        <div className="portal-modulos">
          {MODULOS.map((modulo) => (
            <div className="portal-modulo" key={modulo.titulo}>
              <h2 className="portal-modulo-titulo">{modulo.titulo}</h2>
              <p className="portal-modulo-texto">{modulo.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortalPage
