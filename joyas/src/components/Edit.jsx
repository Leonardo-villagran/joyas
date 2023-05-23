import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {

    const navigate = useNavigate();

    const { id } = useParams();
    const urlbase = `http://127.0.0.1:3001/joyas/edit/${id}`;

    const [dato, setDato] = useState({
        id: id,
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        img: '',
        metal: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(urlbase);
                const data = await response.json();
                setDato(data);
            } catch (error) {
                console.error('Error fetching joya data:', error);
            }
        };

        fetchData();
    }, [setDato, urlbase]);

    console.log(dato);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDato((prevDato) => ({
            ...prevDato,
            [id]: value,
        }));
    };

    //const {urlSelect} = useContext(Context);
    //const url = process.env.REACT_APP_API_URL;

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${urlbase}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dato),
            });

            if (response.ok) {
                console.log('Joya actualizada exitosamente');
                //console.log("Este es el objeto luego de enviar",dato);

                // Redireccionar a la página principal
                navigate('/'); // Reemplaza '/' con la ruta de tu página principal

            } else {
                console.error('Error al actualizar la joya');
            }
        } catch (error) {
            console.error('Error al enviar la actualización:', error);
        }
    }

    return (
        <Card border="primary" style={{ color: '#FFF', background: '#214589' }}>
            <Card.Header>Editar Joya</Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={dato.nombre}
                            onChange={handleChange}
                            required

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoria"
                            value={dato.categoria}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="metal">Metal</label>
                        <input
                            type="text"
                            className="form-control"
                            id="metal"
                            value={dato.metal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="precio"
                            value={dato.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            value={dato.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Url Imagen</label>
                        <textarea
                            className="form-control"
                            id="img"
                            value={dato.img}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex justify-content-center m-3'>
                        <img src={dato.img} alt="Descripción de la imagen" style={{ width: '10%', height: 'auto' }} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Editar
                    </button>
                </form>

            </Card.Body>
        </Card>
    );
}

export default Edit;