
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_INFOM.Models
{
    public partial class Producto
    {
        public int? IdProducto { get; set; }
        public int? IdZona { get; set; }
        public int? IdPresentacion { get; set; }
        public int? IdProveedor { get; set; }
        public int? IdMarca { get; set; }
        public int? Codigo { get; set; }
        public string? DescripcionProducto { get; set; } = null!;
        public double? Precio { get; set; }
        public int? Stock { get; set; }
        public int? Iva { get; set; }
        public double? Peso { get; set; }

        
        public virtual Marca? IdMarcaNavigation { get; set; }
        
        public virtual Presentacion? IdPresentacionNavigation { get; set; }
        
        public virtual Proveedor? IdProveedorNavigation { get; set; }
        
        public virtual Zona? IdZonaNavigation { get; set; }

    }
}
