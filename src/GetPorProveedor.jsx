import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const GetReportePorProveedor = () => {
    // Estado para almacenar el ID del proveedor, los datos y el estado de carga
    const [proveedorId, setProveedorId] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para realizar la solicitud HTTP y cargar los datos del proveedor
    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7282/api/producto/report/products-by-supplier/${proveedorId}`);
            if (!response.ok) {
                // Lanza un error si la solicitud no es exitosa
                throw new Error('Error en la solicitud: ' + response.status);
            }

            // Parsea los datos JSON de la respuesta y los almacena en el estado
            const data = await response.json();
            setData(data);

        } catch (error) {
            // Maneja errores en la solicitud
            console.error('Error fetching data:', error);
        } finally {
            // Actualiza el estado de carga independientemente del resultado de la solicitud
            setLoading(false);
        }
    };

    // Efecto secundario para cargar los datos cuando cambia el ID del proveedor
    useEffect(() => {
        fetchData();
    }, [proveedorId]);

    // Maneja cambios en el input del ID del proveedor
    const handleInputChange = (e) => {
        setProveedorId(e.target.value);
    };

    // Maneja el envío del formulario para recargar los datos del proveedor
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    // Función para exportar los datos a un archivo PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Agrega el contenido al PDF
        doc.text('Detalle por Proveedor', 10, 10);

        // Verifica si data es un objeto y asigna su valor al array de productos
        const productos = Array.isArray(data) ? data : [data];

        productos.forEach((producto, index) => {
            const incrementoProveedor = 70; // Ajusta el valor según tu preferencia
            const espacioEntreRegistros = 20; // Ajusta según tu preferencia

            let yPosition = 20;

            data.forEach((producto, index) => {
                // Verifica si hay suficiente espacio en la página actual
                if (yPosition + 60 + espacioEntreRegistros > doc.internal.pageSize.height) {
                    doc.addPage(); // Cambia a una nueva página si no hay suficiente espacio
                    yPosition = 20; // Reinicia la posición en la nueva página
                }

                // Agrega información del producto al PDF
                doc.text(`Proveedor: ${producto.proveedor.descripcion}`, 10, yPosition);
                doc.text(`Código: ${producto.codigo}`, 10, yPosition + 10);
                doc.text(`Descripción De Producto: ${producto.descripcionProducto}`, 10, yPosition + 20);
                doc.text(`Precio: ${producto.precio}`, 10, yPosition + 30);
                doc.text(`Stock: ${producto.stock}`, 10, yPosition + 40);
                doc.text(`IVA: ${producto.iva}`, 10, yPosition + 50);
                doc.text(`Peso: ${producto.peso}`, 10, yPosition + 60);

                // Incremento adicional para separar registros de proveedores
                yPosition += incrementoProveedor + espacioEntreRegistros;
            });
        });

        // Guarda el PDF
        doc.save('reporte_por_prov.pdf');
    };

    return (
        <div>
            {/* Encabezado del componente */}
            <h1 className="text-2xl font-bold mb-4">Detalle por Proveedor</h1>

            {/* Formulario para ingresar el ID del proveedor */}
            <form onSubmit={handleSubmit}>
                <label className='bg-blue-600 p-6 rounded-lg'>
                    ID del Proveedor:
                    <input className='border p-2 ml-5 bg-slate-400 rounded-lg mb-5' type="text" value={proveedorId} onChange={handleInputChange} />
                </label>
                <button onClick={exportToPDF} className="bg-blue-500 text-white py-5 px-5 rounded mb-5 ml-4">
                    Exportar a PDF
                </button>
            </form>

            {/* Renderiza un mensaje de carga o la tabla con los datos del proveedor */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table bg-slate-500">
                    <thead>
                        {/* Encabezados de la tabla */}
                        <tr className='bg-slate-500'>
                            <th className='pl-5' scope="col">#</th>
                            <th className='pl-5' scope="col">Proveedor</th>
                            <th className='pl-5' scope="col">Código</th>
                            <th className='pl-5' scope="col">Descripción</th>
                            <th className='pl-5' scope="col">Precio</th>
                            <th className='pl-5' scope="col">Stock</th>
                            <th className='pl-5' scope="col">IVA</th>
                            <th className='pl-5' scope="col">Peso</th>
                        </tr>
                    </thead>
                    <tbody className='mb-20'>
                        {/* Mapea los datos para renderizar las filas de la tabla */}
                        {data.map((producto, index) => (
                            <tr key={index} className='bg-slate-400'>
                                {/* Datos del producto */}
                                <th scope="row">{producto.idProducto}</th>
                                <td>{producto.proveedor.descripcion}</td>
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

export default GetReportePorProveedor;
