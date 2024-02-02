﻿using System;
using System.Collections.Generic;

namespace Backend_INFOM.Models
{
    public partial class Zona
    {
        public Zona()
        {
            Productos = new HashSet<Producto>();
        }

        public int IdZona { get; set; }
        public string Descripcion { get; set; } = null!;

        public virtual ICollection<Producto> Productos { get; set; }
    }
}
