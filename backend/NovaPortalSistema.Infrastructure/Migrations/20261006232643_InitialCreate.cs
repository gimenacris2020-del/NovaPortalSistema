using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NovaPortalSistema.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colaboradores",
                columns: table => new
                {
                    Cod_Colaborador = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Cor_Colaborador = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Con_Colaborador = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Fec_Colaborador = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colaboradores", x => x.Cod_Colaborador);
                });

            migrationBuilder.InsertData(
                table: "Colaboradores",
                columns: new[] { "Cod_Colaborador", "Con_Colaborador", "Cor_Colaborador", "Fec_Colaborador" },
                values: new object[] { 1, "Nova2026*", "admin@novatech.pe", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_Cor_Colaborador",
                table: "Colaboradores",
                column: "Cor_Colaborador",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colaboradores");
        }
    }
}
