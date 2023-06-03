import React, { useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import Context from '../Context/Context';

function Formulario() {

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [metal, setMetal] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [img, setImg] = useState('');

    const { setDatos } = useContext(Context);

    //const {urlSelect} = useContext(Context);
    //const url = process.env.REACT_APP_API_URL;


    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleMetalChange = (event) => {
        setMetal(event.target.value);
    };
    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };
    const handleStockChange = (event) => {
        setStock(event.target.value);
    };
    const handleImgChange = (event) => {
        setImg(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const urlbase = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001/joyas";
            const response = await fetch(`${urlbase}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, categoria, metal, precio, stock, img }),
            });

            const data = await response.json();
            console.log("Soy data en formulario: ", data);

            setNombre('');
            setCategoria('');
            setMetal('');
            setPrecio('');
            setStock('');
            setImg('');

            console.log(nombre, " ", categoria, " ", img, " ", precio);

            const nuevoDatoId = data.id;
            console.log("ID del nuevo dato:", nuevoDatoId);

            const newData = { id: nuevoDatoId, nombre, categoria, metal, precio, stock, img };
            setDatos(prevDatos => {
                const updatedData = [...prevDatos, newData];
                updatedData.sort((a, b) => b.id - a.id); // Ordenar datos por ID en forma descendente
                return updatedData;
            });

            //window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card border="primary" style={{ color: '#FFF', background: '#214589' }}>
            <Card.Header>Agregar Inventario</Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoria"
                            value={categoria}
                            onChange={handleCategoriaChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="metal">Metal</label>
                        <input
                            type="text"
                            className="form-control"
                            id="metal"
                            value={metal}
                            onChange={handleMetalChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="precio"
                            value={precio}
                            onChange={handlePrecioChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            value={stock}
                            onChange={handleStockChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Url Imagen</label>
                        <textarea
                            className="form-control"
                            id="img"
                            value={img}
                            onChange={handleImgChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Crear Post
                    </button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Formulario;