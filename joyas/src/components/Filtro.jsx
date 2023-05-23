import React, { useState, useContext } from 'react';
import Context from '../Context/Context';

function FiltroForm() {
    const [precio_min, setPrecio_min] = useState('');
    const [precio_max, setPrecio_max] = useState('');
    const [categoria, setCategoria] = useState('');
    const [metal, setMetal] = useState('');

    //Desestructuración global de datos.
    const {urlSelect,setUrlSelect} = useContext(Context);

    // Cargar los valores iniciales de los hooks desde la URL al cargar el componente
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setPrecio_min(urlParams.get('precio_min') || '');
        setPrecio_max(urlParams.get('precio_max') || '');
        setCategoria(urlParams.get('categoria') || '');
        setMetal(urlParams.get('metal') || '');
    }, []);

    const handlePrecio_minChange = (event) => {
        setPrecio_min(event.target.value);
    };
    const handlePrecio_maxChange = (event) => {
        setPrecio_max(event.target.value);
    };
    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };
    const handleMetalChange = (event) => {
        setMetal(event.target.value);
    }

    // Este efecto se ejecuta cada vez que los valores de los hooks cambian
    React.useEffect(() => {
        const urlbase = process.env.REACT_APP_API_FILTROS || "http://127.0.0.1:3001/joyas/filtros";
        const url = `${urlbase}?precio_min=${precio_min}&precio_max=${precio_max}&categoria=${categoria}&metal=${metal}`;
        console.log("soy la url en el seleccionador:", url);
        setUrlSelect(url);
        // Aquí puedes hacer algo con la URL, como actualizar la barra de direcciones del navegador utilizando "window.history.pushState()"
    }, [precio_min,precio_max,categoria,metal,urlSelect,setUrlSelect]);

    return (
        <div className='py-2 d-flex justify-content-center' >
        <form className="d-flex">
            <div className="form-group me-3">
                <label htmlFor="precio_min" className="me-2">Precio mínimo:</label>
                <input type="number" id="precio_min" name="precio_min" min="1" max="100" value={precio_min} onChange={handlePrecio_minChange} />
            </div>
            <div className="form-group me-3">
                <label htmlFor="precio_max" className="me-2">Precio Máximo:</label>
                <input type="number" id="precio_max" name="precio_max" min="1" max="100" value={precio_max} onChange={handlePrecio_maxChange} />
            </div>
            <div className="form-group me-3">
                <label htmlFor="categoria" className="me-2">Categoria:</label>
                <input type="text" id="categoria" name="categoria" min="1" max="100" value={categoria} onChange={handleCategoriaChange} />
            </div>
            <div className="form-group me-3">
                <label htmlFor="metal" className="me-2">Metal:</label>
                <input type="text" id="metal" name="metal" min="1" max="100" value={metal} onChange={handleMetalChange} />
            </div>
        </form>
        </div>
    );

}
export default FiltroForm;