using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend_INFOM.Models
{
    public partial class INFOMContext : DbContext
    {
        public INFOMContext()
        {
        }

        public INFOMContext(DbContextOptions<INFOMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Marca> Marcas { get; set; } = null!;
        public virtual DbSet<Presentacion> Presentacions { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Proveedor> Proveedors { get; set; } = null!;
        public virtual DbSet<Zona> Zonas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("server=LAPTOP-ECOQDBI2; database=INFOM; integrated security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Marca>(entity =>
            {
                entity.HasKey(e => e.IdMarca);

                entity.ToTable("marca");

                entity.Property(e => e.IdMarca).HasColumnName("id_marca");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Presentacion>(entity =>
            {
                entity.HasKey(e => e.IdPresentacion);

                entity.ToTable("presentacion");

                entity.Property(e => e.IdPresentacion).HasColumnName("id_presentacion");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto);

                entity.ToTable("producto");

                entity.Property(e => e.IdProducto).HasColumnName("id_producto");

                entity.Property(e => e.Codigo).HasColumnName("codigo");

                entity.Property(e => e.DescripcionProducto)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("descripcion_producto");

                entity.Property(e => e.IdMarca).HasColumnName("id_marca");

                entity.Property(e => e.IdPresentacion).HasColumnName("id_presentacion");

                entity.Property(e => e.IdProveedor).HasColumnName("id_proveedor");

                entity.Property(e => e.IdZona).HasColumnName("id_zona");

                entity.Property(e => e.Iva).HasColumnName("iva");

                entity.Property(e => e.Peso).HasColumnName("peso");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasOne(d => d.IdMarcaNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdMarca)
                    .OnDelete(DeleteBehavior.Restrict)
                    .IsRequired(false)
                    .HasConstraintName("FK_producto_marca");

                entity.HasOne(d => d.IdPresentacionNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdPresentacion)
                    .OnDelete(DeleteBehavior.Restrict)

                    .HasConstraintName("FK_producto_presentacion")
                    .IsRequired(false);

                entity.HasOne(d => d.IdProveedorNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdProveedor)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_producto_proveedor")
                    .IsRequired(false);

                entity.HasOne(d => d.IdZonaNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdZona)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_producto_zona")
                    .IsRequired(false);
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasKey(e => e.IdProveedor);

                entity.ToTable("proveedor");

                entity.Property(e => e.IdProveedor).HasColumnName("id_proveedor");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Zona>(entity =>
            {
                entity.HasKey(e => e.IdZona);

                entity.ToTable("zona");

                entity.Property(e => e.IdZona).HasColumnName("id_zona");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
