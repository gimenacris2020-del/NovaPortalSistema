import { useRef, useState } from 'react'
import './ValidacionCredenciales.css'

const URL_API = 'http://localhost:5000/api/auth/login'
const REGEX_CORREO = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const DOMINIO_INSTITUCIONAL = '@novatech.pe'

const obtenerErrorCorreo = (valor) => {
  const correoLimpio = valor.trim()

  if (correoLimpio === '') {
    return 'El correo electrónico institucional es obligatorio.'
  }

  if (!REGEX_CORREO.test(correoLimpio)) {
    return 'El correo electrónico debe tener el formato institucional: usuario@novatech.pe.'
  }

  if (!correoLimpio.toLowerCase().endsWith(DOMINIO_INSTITUCIONAL)) {
    return 'El correo debe pertenecer al dominio institucional @novatech.pe.'
  }

  return ''
}

function ValidacionCredencialesPage({ onLoginExitoso }) {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [errores, setErrores] = useState({ correo: '', clave: '', general: '' })
  const [cargando, setCargando] = useState(false)
  const [mostrarClave, setMostrarClave] = useState(false)
  const [bloqMayus, setBloqMayus] = useState(false)

  const refCorreo = useRef(null)
  const refClave = useRef(null)

  const validarFormulario = () => {
    const nuevosErrores = {
      correo: obtenerErrorCorreo(correo),
      clave: clave.trim() === '' ? 'La contraseña es obligatoria.' : '',
      general: '',
    }

    setErrores(nuevosErrores)
    return nuevosErrores.correo === '' && nuevosErrores.clave === ''
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()

    if (cargando) {
      return
    }

    if (!validarFormulario()) {
      if (obtenerErrorCorreo(correo)) {
        refCorreo.current?.focus()
      } else {
        refClave.current?.focus()
      }
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Cor_Colaborador: correo.trim(),
          Con_Colaborador: clave.trim(),
        }),
      })

      const datos = await respuesta.json().catch(() => ({}))

      if (respuesta.ok && datos.exitoso) {
        onLoginExitoso(correo.trim(), datos.mensaje || 'Autenticación exitosa.')
        return
      }

      setErrores((previos) => ({
        ...previos,
        general: datos.mensaje || 'No fue posible iniciar sesión. Verifique sus datos.',
      }))
    } catch {
      setErrores((previos) => ({
        ...previos,
        general: 'No fue posible conectar con el servidor. Intente nuevamente.',
      }))
    } finally {
      setCargando(false)
    }
  }

  const manejarCambioCorreo = (evento) => {
    setCorreo(evento.target.value)
    if (errores.correo) {
      setErrores((previos) => ({ ...previos, correo: '' }))
    }
  }

  const manejarCambioClave = (evento) => {
    setClave(evento.target.value)
    if (errores.clave) {
      setErrores((previos) => ({ ...previos, clave: '' }))
    }
  }

  const manejarBlurCorreo = () => {
    setErrores((previos) => ({ ...previos, correo: obtenerErrorCorreo(correo) }))
  }

  const manejarBlurClave = () => {
    setErrores((previos) => ({
      ...previos,
      clave: clave.trim() === '' ? 'La contraseña es obligatoria.' : '',
    }))
  }

  const detectarBloqMayus = (evento) => {
    if (typeof evento.getModifierState === 'function') {
      setBloqMayus(evento.getModifierState('CapsLock'))
    }
  }

  return (
    <div className="vp-contenedor">
      <div className="vp-tarjeta">
        <div className="vp-encabezado">
          <div className="vp-marca">
            <div className="vp-icono-candado" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="vp-marca-texto">NovaTech</span>
          </div>
          <h1 className="vp-titulo">Bienvenido a NovaPortal</h1>
          <p className="vp-subtitulo">
            Ingresa tu correo y contraseña institucional de NovaTech para acceder.
          </p>
        </div>

        <form className="vp-formulario" onSubmit={manejarEnvio} noValidate>
          <div className="vp-campo">
            <label className="vp-etiqueta" htmlFor="correo">
              Correo electrónico institucional
              <span className="vp-obligatorio" aria-hidden="true">*</span>
            </label>
            <div className="vp-grupo-campo">
              <span className="vp-icono-campo" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <input
                id="correo"
                ref={refCorreo}
                name="correo"
                type="email"
                className={`vp-input vp-input-con-icono ${errores.correo ? 'vp-input-error' : ''}`}
                value={correo}
                onChange={manejarCambioCorreo}
                onBlur={manejarBlurCorreo}
                placeholder="usuario@novatech.pe"
                autoComplete="username"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus
                required
                disabled={cargando}
                aria-required="true"
                aria-invalid={errores.correo ? 'true' : 'false'}
                aria-describedby={errores.correo ? 'error-correo' : 'ayuda-correo'}
              />
            </div>
            {errores.correo ? (
              <p className="vp-error" id="error-correo" role="alert">
                {errores.correo}
              </p>
            ) : (
              <p className="vp-ayuda" id="ayuda-correo">
                Formato institucional: usuario@novatech.pe
              </p>
            )}
          </div>

          <div className="vp-campo">
            <label className="vp-etiqueta" htmlFor="clave">
              Contraseña
              <span className="vp-obligatorio" aria-hidden="true">*</span>
            </label>
            <div className="vp-grupo-campo">
              <span className="vp-icono-campo" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="clave"
                ref={refClave}
                name="clave"
                type={mostrarClave ? 'text' : 'password'}
                className={`vp-input vp-input-con-icono vp-input-con-boton ${errores.clave ? 'vp-input-error' : ''}`}
                value={clave}
                onChange={manejarCambioClave}
                onBlur={manejarBlurClave}
                onKeyUp={detectarBloqMayus}
                onKeyDown={detectarBloqMayus}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
                required
                disabled={cargando}
                aria-required="true"
                aria-invalid={errores.clave ? 'true' : 'false'}
                aria-describedby={errores.clave ? 'error-clave' : undefined}
              />
              <button
                type="button"
                className="vp-boton-ojo"
                onClick={() => setMostrarClave((valor) => !valor)}
                disabled={cargando}
                aria-pressed={mostrarClave}
                aria-label={mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                title={mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarClave ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {bloqMayus && (
              <p className="vp-aviso" role="status" aria-live="polite">
                Bloq Mayús está activado.
              </p>
            )}
            {errores.clave && (
              <p className="vp-error" id="error-clave" role="alert">
                {errores.clave}
              </p>
            )}
          </div>

          {errores.general && (
            <div className="vp-alerta" role="alert">
              {errores.general}
            </div>
          )}

          {cargando && (
            <div className="vp-alerta-proceso" role="status" aria-live="polite">
              Validando credenciales, por favor espere...
            </div>
          )}

          <div className="vp-acciones">
            <button type="submit" className="vp-boton" disabled={cargando}>
              {cargando ? (
                <span className="vp-boton-cargando">
                  <span className="vp-spinner" aria-hidden="true" />
                  Validando...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ValidacionCredencialesPage
