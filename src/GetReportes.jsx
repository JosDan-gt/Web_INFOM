import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

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
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle General</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table rounded-">
          <thead>
            <tr className='bg-slate-500'>
              <th  scope="col">#</th>
              <th scope="col">Marca</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Presentacion</th>
              <th scope="col">Zona</th>
              <th scope="col">Código</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">IVA</th>
              <th scope="col">Peso</th>
            </tr>
          </thead>
          <tbody className='mb-20'>
            {data.map((producto, index) => (
              <tr key={index} className='bg-slate-400'>
                <th  scope="row">{producto.idProducto}</th>
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
      )}
    </div>
  );
};

export default GetReportes;
