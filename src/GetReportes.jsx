import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import jsPDF from 'jspdf';

const GetReportes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7282/api/producto/ReporteGeneralProductos');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.status);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const exportToPDF = () => {
    const doc = new jsPDF();

    // Agrega el contenido al PDF
    doc.text('Detalle por Proveedor', 10, 10);

    // Verifica si data es un objeto y asigna su valor al array de productos
    const productos = Array.isArray(data) ? data : [data];

    productos.forEach((producto, index) => {
      const incrementoProveedor = 70; // Ajusta el valor según tu preferencia
      const espacioEntreRegistros = 40; // Ajusta según tu preferencia

      let yPosition = 20;

      data.forEach((producto, index) => {
        // Verifica si hay suficiente espacio en la página actual
        if (yPosition + 60 + espacioEntreRegistros > doc.internal.pageSize.height) {
          doc.addPage(); // Cambia a una nueva página si no hay suficiente espacio
          yPosition = 20; // Reinicia la posición en la nueva página
        }


        doc.text(`Marca: ${producto.marca}`, 10, yPosition + 10);
        doc.text(`Proveedor: ${producto.proveedor}`, 10, yPosition + 20);
        doc.text(`Presentacion: ${producto.presentacion}`, 10, yPosition + 30);
        doc.text(`zona: ${producto.zona}`, 10, yPosition + 40);
        doc.text(`Código: ${producto.codigo}`, 10, yPosition + 50);
        doc.text(`Descripción De Producto: ${producto.descripcionProducto}`, 10, yPosition + 60);
        doc.text(`Precio: ${producto.precio}`, 10, yPosition + 70);
        doc.text(`Stock: ${producto.stock}`, 10, yPosition + 80);
        doc.text(`IVA: ${producto.iva}`, 10, yPosition + 90);
        doc.text(`Peso: ${producto.peso}`, 10, yPosition + 100);

        // Incremento adicional para separar registros de proveedores
        yPosition += incrementoProveedor + espacioEntreRegistros;
      });



    });

    // Guarda el PDF
    doc.save('reporte_por_prov.pdf');
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle General</h1>
      <button onClick={exportToPDF} className="bg-blue-500 text-white py-2 px-4 rounded mb-3">
        Exportar a PDF
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='table-responsive'>
          <table className="table">
            <thead>
              <tr className='bg-slate-500'>
                <th className='pl-6' scope="col">#</th>
                <th className='pl-6' scope="col">Marca</th>
                <th className='pl-6' scope="col">Proveedor</th>
                <th className='pl-6' scope="col">Presentacion</th>
                <th className='pl-6' scope="col">Zona</th>
                <th className='pl-6' scope="col">Código</th>
                <th className='pl-6' scope="col">Descripción</th>
                <th className='pl-6' scope="col">Precio</th>
                <th className='pl-6' scope="col">Stock</th>
                <th className='pl-6' scope="col">IVA</th>
                <th className='pl-6' scope="col">Peso</th>
              </tr>
            </thead>
            <tbody className='mb-20'>
              {data.map((producto, index) => (
                <tr key={index} className='bg-slate-400'>
                  <th scope="row">{producto.idProducto}</th>
                  <td>{producto.marca}</td>
                  <td>{producto.proveedor}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.zona}</td>
                  <td>{producto.codigo}</td>
                  <td>{producto.descripcionProducto}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.iva}</td>
                  <td>{producto.peso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetReportes;
