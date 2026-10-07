using NovaPortalSistema.Domain.Entities;

namespace NovaPortalSistema.Application.Interfaces;

public interface IColaboradorRepository
{
    Task<Colaborador?> ValidarCredencialesAsync(string correo, string clave);
}
