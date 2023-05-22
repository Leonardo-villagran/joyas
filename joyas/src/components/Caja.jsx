import { Card, Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useContext } from 'react';
import Context from '../Context/Context';
import { AiFillHeart } from "react-icons/ai";
import SeleccionadorView from "../views/SeleccionadorView";
import FiltroView from "../views/FiltroView";


//Vista de datos del home
const Caja = () => {

    //Desestructuración global de datos.
    const {urlSelect, datos, setDatos} = useContext(Context);
    //const url = process.env.REACT_APP_API_URL;

    console.log("soy la url en caja",urlSelect);
    

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${urlSelect}`);
                const data = await response.json();
                //const sortedPosts = data.sort((a, b) => a.id - b.id);
                setDatos(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, [urlSelect,setDatos]);
    console.log("Soy datos despues del useeffect", datos);

    const handleLike = async (id, like) => {
        const response = await fetch(`${urlSelect}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: like + 1 }),
        });
        if (response.ok) {
            // actualizar los datos en la interfaz
            const updatedPosts = datos.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        likes: like + 1,
                    };
                }
                return post;
            });
            setDatos(updatedPosts);
        } else {
            console.log('Error al actualizar el like');
        }
    };

    async function handleDelete(id) {
        const response = await fetch(`${urlSelect}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {

            const posts = datos.filter((post) => post.id !== Number(id))
            const sortedPosts = posts.sort((a, b) => a.id - b.id);
            setDatos(sortedPosts);
            console.log('Borrado exitoso del id:', id);
            console.log(sortedPosts);
        }
    }
    //console.log("Soy datos: ",datos);
    if (!datos) {
        return <div>Cargando datos...</div>;
    }

    return (
        <Container>
            {<SeleccionadorView />}
            {<FiltroView />}
            <Row xs={1} sm={2} md={3} lg={4}>
            {/*<Col key='-1' className="d-flex align-items-stretch mb-3">
                    <FormView />
    </Col> */}
                {datos.map((post) => (

                    <Col key={post.id} className="d-flex align-items-stretch mb-3" >
                        <Card border="primary" style={{ width: '300px' }}>
                            <Card.Img variant="top" src={post.img} style={{ height: '250px'}} />
                            <Card.Body>
                                <Card.Title>{post.nombre}</Card.Title>

                                <ul>
                                    <li>Categoría: {post.categoria[0].toUpperCase()+post.categoria.substring(1)}</li>
                                    <li>Metal: {post.metal[0].toUpperCase()+post.metal.substring(1)}</li>
                                    <li>Stock: {post.stock}</li>
                                </ul>

                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xs={12}>
                                        <p className="text-center">Precio: {post.precio}</p>
                                    </Col>
                                    <Col xs={10}>

                                        <button className="btn text-danger no-focus pb-3" onClick={() => handleLike(post.id, post.likes)}>
                                            <AiFillHeart />
                                        </button>{post.likes}
                                    </Col>
                                    <Col xs={2}><button className="btn text-danger no-focus" onClick={() => handleDelete(post.id)}>X</button></Col>
                                </Row>
                            </Card.Footer>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default Caja;