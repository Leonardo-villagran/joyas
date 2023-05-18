import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function Formulario() {
    const [titulo, setTitulo] = useState('');
    const [img, setImg] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [likes, setLikes] = useState(0);

    
    //const url = process.env.REACT_APP_API_URL;
    
    const url = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleImgChange = (event) => {
        setImg(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}/joyas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, img, descripcion}),
            });

            const data = await response.json();
            console.log("Soy data en formulario: ",data);

            setTitulo('');
            setImg('');
            setDescripcion('');
            setLikes(0);

            console.log (titulo," ",descripcion," ", img," ", likes);
            window.location.reload();
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card border="primary" style={{ color: '#FFF', background: '#214589' }}>
            <Card.Header>Agregar Post</Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            value={titulo}
                            onChange={handleTituloChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="img"
                            value={img}
                            onChange={handleImgChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            className="form-control"
                            id="descripcion"
                            value={descripcion}
                            onChange={handleDescripcionChange}
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