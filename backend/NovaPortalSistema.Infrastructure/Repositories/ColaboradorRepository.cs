using Microsoft.EntityFrameworkCore;
using NovaPortalSistema.Application.Interfaces;
using NovaPortalSistema.Domain.Entities;
using NovaPortalSistema.Infrastructure.Data;

namespace NovaPortalSistema.Infrastructure.Repositories;

public class ColaboradorRepository : IColaboradorRepository
{
    private readonly NovaPortalDbContext _context;

    public ColaboradorRepository(NovaPortalDbContext context)
    {
        _context = context;
    }

    public async Task<Colaborador?> ValidarCredencialesAsync(string correo, string clave)
    {
        return await _context.Colaboradores
            .FirstOrDefaultAsync(c => c.Cor_Colaborador == correo && c.Con_Colaborador == clave);
    }
}
