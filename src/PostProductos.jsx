import React, { useState } from 'react';

const PostProd = ({ onInsert }) => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [iva, setIva] = useState(0);
    const [peso, setPeso] = useState(0);
    const [idMarca, setIdMarca] = useState(1);
    const [idPresentacion, setIdPresentacion] = useState(1);
    const [idProveedor, setIdProveedor] = useState(1);
    const [idZona, setIdZona] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoProducto = {
            codigo,
            descripcionProducto: descripcion,
            precio,
            stock,
            iva,
            peso,
            idMarca,
            idPresentacion,
            idProveedor,
            idZona,
        };

        // Realizar solicitud POST al backend
        try {
            const response = await fetch('https://localhost:7282/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (response.ok) {
                // Si la solicitud es exitosa, llama a la función onInsert para actualizar la lista de productos
                onInsert();
            } else {
                console.error('Error al realizar la solicitud POST al backend');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Código:
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            </label>
            <label>Descripción:
                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <label>Precio:
                <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </label>
            <label>Stock:
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </label>
            <label>IVA:
                <input type="number" value={iva} onChange={(e) => setIva(e.target.value)} />
            </label>
            <label>Peso:
                <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </label>
            <label>ID Marca:
                <input type="number" value={idMarca} onChange={(e) => setIdMarca(e.target.value)} />
            </label>
            <label>ID Presentación:
                <input type="number" value={idPresentacion} onChange={(e) => setIdPresentacion(e.target.value)} />
            </label>
            <label>ID Proveedor:
                <input type="number" value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} />
            </label>
            <label>ID Zona:
                <input type="number" value={idZona} onChange={(e) => setIdZona(e.target.value)} />
            </label>
            <button type="submit">Insertar Producto</button>
        </form>
    );
};

export default PostProd;
