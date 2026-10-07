using Microsoft.EntityFrameworkCore;
using NovaPortalSistema.Domain.Entities;

namespace NovaPortalSistema.Infrastructure.Data;

public class NovaPortalDbContext : DbContext
{
    public NovaPortalDbContext(DbContextOptions<NovaPortalDbContext> options)
        : base(options)
    {
    }

    public DbSet<Colaborador> Colaboradores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var colaborador = modelBuilder.Entity<Colaborador>();

        colaborador.HasKey(c => c.Cod_Colaborador);
        colaborador.Property(c => c.Cod_Colaborador).ValueGeneratedOnAdd();
        colaborador.Property(c => c.Cor_Colaborador).IsRequired().HasMaxLength(150);
        colaborador.Property(c => c.Con_Colaborador).IsRequired().HasMaxLength(255);
        colaborador.Property(c => c.Fec_Colaborador).IsRequired();
        colaborador.HasIndex(c => c.Cor_Colaborador).IsUnique();

        colaborador.HasData(new Colaborador
        {
            Cod_Colaborador = 1,
            Cor_Colaborador = "admin@novatech.pe",
            Con_Colaborador = "Nova2026*",
            Fec_Colaborador = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        });
    }
}
