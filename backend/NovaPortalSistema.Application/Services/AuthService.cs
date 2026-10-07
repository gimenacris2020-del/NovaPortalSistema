using System.Text.RegularExpressions;
using NovaPortalSistema.Application.DTOs;
using NovaPortalSistema.Application.Interfaces;

namespace NovaPortalSistema.Application.Services;

public class AuthService
{
    public const string MensajeExito = "Autenticación exitosa";

    private static readonly Regex FormatoCorreo = new(
        @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        RegexOptions.Compiled);

    private readonly IColaboradorRepository _colaboradorRepository;

    public AuthService(IColaboradorRepository colaboradorRepository)
    {
        _colaboradorRepository = colaboradorRepository;
    }

    public async Task<string> AutenticarAsync(LoginDto? login)
    {
        if (login is null)
        {
            return "Solicitud no válida.";
        }

        var correo = (login.Cor_Colaborador ?? string.Empty).Trim();
        var clave = login.Con_Colaborador ?? string.Empty;

        if (string.IsNullOrWhiteSpace(correo) || string.IsNullOrWhiteSpace(clave))
        {
            return "Debe ingresar el correo y la contraseña.";
        }

        if (!FormatoCorreo.IsMatch(correo))
        {
            return "El correo electrónico debe tener el formato institucional: usuario@novatech.pe.";
        }

        var colaborador = await _colaboradorRepository.ValidarCredencialesAsync(correo, clave);

        if (colaborador is null)
        {
            return "Credenciales no válidas";
        }

        return MensajeExito;
    }
}
