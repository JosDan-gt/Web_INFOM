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

        // Obtener todos los productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProd()
        {
            // Recuperar todos los productos de la base de datos
            return await _context.Productos.ToListAsync();
        }

        // Crear un nuevo producto
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProd(Producto producto)
        {
            // Agregar un nuevo producto a la base de datos
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            // Devolver una respuesta 201 Created con el nuevo producto
            return CreatedAtAction(nameof(GetProd), new { id = producto.IdProducto }, producto);
        }

        // Método auxiliar para verificar si un producto con un ID dado existe
        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.IdProducto == id);
        }

        // Actualizar un producto existente por ID
        [HttpPut("{id}")]
        public async Task<ActionResult> PutProd(int id, Producto producto)
        {
            // Verificar si el ID proporcionado coincide con el ID del producto
            if (id != producto.IdProducto)
            {
                return BadRequest(); // Devolver BadRequest si hay una discrepancia
            }

            // Marcar la entidad del producto como modificada
            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync(); // Guardar los cambios en la base de datos
            }
            catch (DbUpdateConcurrencyException)
            {
                // Manejar la excepción de concurrencia (si el producto no se encuentra)
                if (!ProductoExists(id))
                {
                    return NotFound(); // Devolver NotFound si el producto no existe
                }
                else
                {
                    throw;
                }
            }
            return NoContent(); // Devolver NoContent para una actualización exitosa
        }

        // Eliminar un producto por ID
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

            // Devolver Ok con el producto eliminado como parte de la respuesta
            return Ok(producto);
        }

        // Obtener productos filtrados por proveedor, incluyendo información relacionada del proveedor
        [HttpGet("report/products-by-supplier/{supplierId}")]
        public IActionResult GetProductsBySupplier(int supplierId)
        {
            var productos = _context.Productos
                .Include(p => p.IdProveedorNavigation) // Incluir la relación con la tabla de proveedores.
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
                        // Agregar otras propiedades del proveedor según sea necesario
                    }
                })
                .ToList();

            return Ok(productos);
        }

        // Obtener un informe general de todos los productos, incluyendo información relacionada (marca, presentación, etc.)
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
