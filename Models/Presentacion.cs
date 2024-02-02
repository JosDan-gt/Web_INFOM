using System;
using System.Collections.Generic;

namespace Backend_INFOM.Models
{
    public partial class Presentacion
    {
        public Presentacion()
        {
            Productos = new HashSet<Producto>();
        }

        public int IdPresentacion { get; set; }
        public string Descripcion { get; set; } = null!;

        public virtual ICollection<Producto> Productos { get; set; }
    }
}
