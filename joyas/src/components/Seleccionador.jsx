import React, { useState } from 'react';

function JoyasForm() {
    const [orderBy, setOrderBy] = useState('stock_desc');
    const [limits, setLimits] = useState(4);
    const [page, setPage] = useState(1);

    // Cargar los valores iniciales de los hooks desde la URL al cargar el componente
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setOrderBy(urlParams.get('order_by') || 'stock_desc');
        setLimits(parseInt(urlParams.get('limits')) || 4);
        setPage(parseInt(urlParams.get('page')) || 1);
    }, []);

    const handleOrderByChange = (event) => {
        setOrderBy(event.target.value);
    };

    const handleLimitsChange = (event) => {
        setLimits(parseInt(event.target.value));
    };

    const handlePageChange = (event) => {
        setPage(parseInt(event.target.value));
    };

    // Este efecto se ejecuta cada vez que los valores de los hooks cambian
    React.useEffect(() => {
        const url = `http://127.0.0.1:3001/joyas?order_by=${orderBy}&limits=${limits}&page=${page}`;
        console.log(url);
        // Aquí puedes hacer algo con la URL, como actualizar la barra de direcciones del navegador utilizando "window.history.pushState()"
    }, [orderBy, limits, page]);

    return (
        <form>
            <div>
                <label htmlFor="orderBy">Ordenar por:</label>
                <select id="orderBy" name="orderBy" value={orderBy} onChange={handleOrderByChange}>
                    <option value="stock_desc">Stock descendente</option>
                    <option value="nombre_asc">Nombre ascendente</option>
                    <option value="precio_asc">Precio ascendente</option>
                    <option value="precio_desc">Precio descendente</option>
                </select>
            </div>
            <div>
                <label htmlFor="limits">Límites:</label>
                <input type="number" id="limits" name="limits" min="1" max="100" value={limits} onChange={handleLimitsChange} />
            </div>
            <div>
                <label htmlFor="page">Página:</label>
                <input type="number" id="page" name="page" min="1" max="100" value={page} onChange={handlePageChange} />
            </div>
        </form>
    );
}

export default JoyasForm;