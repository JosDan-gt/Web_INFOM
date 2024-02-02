using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_INFOM.Migrations
{
    public partial class NuevaMigracion3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MarcaIdMarca",
                table: "producto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PresentacionIdPresentacion",
                table: "producto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProveedorIdProveedor",
                table: "producto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZonaIdZona",
                table: "producto",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_producto_MarcaIdMarca",
                table: "producto",
                column: "MarcaIdMarca");

            migrationBuilder.CreateIndex(
                name: "IX_producto_PresentacionIdPresentacion",
                table: "producto",
                column: "PresentacionIdPresentacion");

            migrationBuilder.CreateIndex(
                name: "IX_producto_ProveedorIdProveedor",
                table: "producto",
                column: "ProveedorIdProveedor");

            migrationBuilder.CreateIndex(
                name: "IX_producto_ZonaIdZona",
                table: "producto",
                column: "ZonaIdZona");

            migrationBuilder.AddForeignKey(
                name: "FK_producto_marca_MarcaIdMarca",
                table: "producto",
                column: "MarcaIdMarca",
                principalTable: "marca",
                principalColumn: "id_marca");

            migrationBuilder.AddForeignKey(
                name: "FK_producto_presentacion_PresentacionIdPresentacion",
                table: "producto",
                column: "PresentacionIdPresentacion",
                principalTable: "presentacion",
                principalColumn: "id_presentacion");

            migrationBuilder.AddForeignKey(
                name: "FK_producto_proveedor_ProveedorIdProveedor",
                table: "producto",
                column: "ProveedorIdProveedor",
                principalTable: "proveedor",
                principalColumn: "id_proveedor");

            migrationBuilder.AddForeignKey(
                name: "FK_producto_zona_ZonaIdZona",
                table: "producto",
                column: "ZonaIdZona",
                principalTable: "zona",
                principalColumn: "id_zona");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_producto_marca_MarcaIdMarca",
                table: "producto");

            migrationBuilder.DropForeignKey(
                name: "FK_producto_presentacion_PresentacionIdPresentacion",
                table: "producto");

            migrationBuilder.DropForeignKey(
                name: "FK_producto_proveedor_ProveedorIdProveedor",
                table: "producto");

            migrationBuilder.DropForeignKey(
                name: "FK_producto_zona_ZonaIdZona",
                table: "producto");

            migrationBuilder.DropIndex(
                name: "IX_producto_MarcaIdMarca",
                table: "producto");

            migrationBuilder.DropIndex(
                name: "IX_producto_PresentacionIdPresentacion",
                table: "producto");

            migrationBuilder.DropIndex(
                name: "IX_producto_ProveedorIdProveedor",
                table: "producto");

            migrationBuilder.DropIndex(
                name: "IX_producto_ZonaIdZona",
                table: "producto");

            migrationBuilder.DropColumn(
                name: "MarcaIdMarca",
                table: "producto");

            migrationBuilder.DropColumn(
                name: "PresentacionIdPresentacion",
                table: "producto");

            migrationBuilder.DropColumn(
                name: "ProveedorIdProveedor",
                table: "producto");

            migrationBuilder.DropColumn(
                name: "ZonaIdZona",
                table: "producto");
        }
    }
}
