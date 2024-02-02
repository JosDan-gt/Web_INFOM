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




    }
}
