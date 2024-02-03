import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const GetReportePorProveedor = () => {
    const [proveedorId, setProveedorId] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7282/api/producto/report/products-by-supplier/${proveedorId}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }

            const data = await response.json();
            setData(data);
            console.log('Cantidad de registros:', data.length);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [proveedorId]);

    const handleInputChange = (e) => {
        setProveedorId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

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
            <h1 className="text-2xl font-bold mb-4">Detalle por Proveedor</h1>
            <button onClick={exportToPDF} className="bg-blue-500 text-white py-2 px-4 rounded">
                Exportar a PDF
            </button>
            <form onSubmit={handleSubmit}>
                <label>
                    ID del Proveedor:
                    <input type="text" value={proveedorId} onChange={handleInputChange} />
                </label>

            </form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table bg-slate-500">
                    <thead>
                        <tr className='bg-slate-500'>
                            <th scope="col">#</th>
                            <th scope="col">Proveedor</th>
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
