import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const GetProd = () => {
  // Estado para almacenar los datos y el estado de carga
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto secundario para cargar los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza una solicitud HTTP para obtener datos del endpoint 'https://localhost:7282/api/producto'
        const response = await fetch('https://localhost:7282/api/producto');
        if (!response.ok) {
          // Lanza un error si la solicitud no es exitosa
          throw new Error('Error en la solicitud: ' + response.status);
        }

        // Parsea los datos JSON de la respuesta y los almacena en el estado
        const data = await response.json();
        setData(data);
        console.log(data); // Muestra los datos en la consola (puede ser útil para propósitos de depuración)
      } catch (error) {
        // Maneja errores en la solicitud
        console.error('Error fetching data:', error);
      } finally {
        // Actualiza el estado de carga independientemente del resultado de la solicitud
        setLoading(false);
      }
    };

    // Invoca la función para cargar los datos
    fetchData();
  }, []);

  return (
    <div>
      {/* Encabezado del componente */}
      <h1 className="text-2xl font-bold mb-4">Detalles del Producto</h1>

      {/* Renderiza un mensaje de carga o la tabla con los datos */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table rounded-">
          <thead>
            {/* Encabezados de la tabla */}
            <tr className='bg-slate-500'>
              <th scope="col">#</th>
              <th scope="col">Código</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">IVA</th>
              <th scope="col">Peso</th>
            </tr>
          </thead>
          <tbody className='mb-20'>
            {/* Mapea los datos para renderizar las filas de la tabla */}
            {data.map((producto, index) => (
              <tr key={index} className='bg-slate-400'>
                {/* Datos del producto */}
                <th scope="row">{producto.idProducto}</th>
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

export default GetProd;
