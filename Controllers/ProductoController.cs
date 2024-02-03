using Backend_INFOM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace Backend_INFOM.Controllers
{
    [ApiController]
    [Route("api/producto")]
    public class ProductoController : ControllerBase
    {
        private readonly INFOMContext _context;

        public ProductoController(INFOMContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProd()
        {
            return await _context.Productos.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> PostProd(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProd), new { id = producto.IdProducto }, producto);
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.IdProducto == id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutProd(int id, Producto producto)
        {
            if (id != producto.IdProducto) 
            {

                return BadRequest();
            }
            
            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound();

                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProd(int id)
        {
            // Verificar si el producto existe en la base de datos
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound(); // Devolver NotFound si el producto no existe
            }

            // Eliminar el producto de la base de datos
            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            // Devolver el producto eliminado como parte de la respuesta
            return Ok(producto);
        }


        [HttpGet("report/products-by-supplier/{supplierId}")]
        public IActionResult GetProductsBySupplier(int supplierId)
        {
            var productos = _context.Productos
                .Include(p => p.IdProveedorNavigation) // Incluye la relación con la tabla de proveedores.
                .Where(p => p.IdProveedor == supplierId)
                .Select(p => new
                {
                    p.IdProducto,
                    p.Codigo,
                    p.DescripcionProducto,
                    p.Precio,
                    p.Stock,
                    p.Iva,
                    p.Peso,
                    Proveedor = new
                    {
                        p.IdProveedorNavigation.Descripcion
                        // Agrega otras propiedades del proveedor que necesites
                    }
                })
                .ToList();

            return Ok(productos);
        }



        [HttpGet("ReporteGeneralProductos")]
        public IActionResult ReporteGeneralProductos()
        {
            var reporteProductos = _context.Productos
                .Select(p => new
                {
                    p.IdProducto,
                    p.Codigo,
                    p.DescripcionProducto,
                    p.Precio,
                    p.Stock,
                    p.Iva,
                    p.Peso,
                    Marca = p.IdMarcaNavigation != null ? p.IdMarcaNavigation.Descripcion : null,
                    Presentacion = p.IdPresentacionNavigation != null ? p.IdPresentacionNavigation.Descripcion : null,
                    Proveedor = p.IdProveedorNavigation != null ? p.IdProveedorNavigation.Descripcion : null,
                    Zona = p.IdZonaNavigation != null ? p.IdZonaNavigation.Descripcion : null

                })
                .ToList();

            return Ok(reporteProductos);
        }







    }
}
