using Microsoft.AspNetCore.Mvc;
using NovaPortalSistema.Application.DTOs;
using NovaPortalSistema.Application.Services;

namespace NovaPortalSistema.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto login)
    {
        var mensaje = await _authService.AutenticarAsync(login);

        if (mensaje == AuthService.MensajeExito)
        {
            return Ok(new { mensaje, exitoso = true });
        }

        return Unauthorized(new { mensaje, exitoso = false });
    }
}
