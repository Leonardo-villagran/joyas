const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const cors = require('cors');

const app = express();
//generar constante que determina el puerto a usar
const PORT = process.env.PORT || 3001;

app.use(cors());

// Configura body-parser para parsear las solicitudes JSON
app.use(bodyParser.json());

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


const reportMiddleware = (req, res, next) => {
    console.log(`---------------------`);
    console.log(`SOLICITUD DESDE LA WEB`);
    console.log('Url original:',JSON.stringify(req.originalUrl));
    console.log(`Solicitud recibida: ${req.method} ${req.path}`);
    console.log('req.query: ', JSON.stringify(req.query));
    console.log(`---------------------`);
    next();
};

// Ruta para obtener todos los posts
app.get('/joyas',  reportMiddleware, async (req, res) => {
    try {
        const limit = req.query.limits || 10; // Valor por defecto 10
        const page = req.query.page || 1; // Valor por defecto 1
        let order_by = req.query.order_by || 'id'; // Valor por defecto 'id'
        const allowed_columns = ['id', 'stock', 'categoria', 'metal', 'nombre']; // Las columnas permitidas
        const order_by_parts = order_by.split('_'); // Separamos la columna del orden
        let order_column = order_by_parts[0];
        //console.log(` ${order_column}`);
        let order_direction = order_by_parts[1];
        
        if (typeof order_direction === "undefined") {
            order_direction = 'DESC';
        } 
        
        if (!allowed_columns.includes(order_column)) { // Si la columna no es permitida, usamos la columna por defecto
            //console.log(`order_direction está indefinida`);
            let order=1;
            console.log(`Tipo orden: ${order_direction}`);
        } else {
            order_by = `${order_column} ${order_direction}`;
            console.log(`Tipo orden: ${order_direction}`);
        }
        const offset = (page - 1) * limit;
        
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM inventario ORDER BY ${order_by} LIMIT ${limit} OFFSET ${offset}`);
        const joyas = result.rows;
        res.json(joyas);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error al obtener las joyas ${process.env.DB_USER} ${process.env.DB_HOST} ${process.env.DB_NAME} ${process.env.DB_PORT}` });
    }
});


app.get('/joyas/filtros',  reportMiddleware, async (req, res) => {
    try {
        const client = await pool.connect();
        let query = 'SELECT * FROM inventario';
        const { precio_max, precio_min, categoria, metal } = req.query;

        if (precio_max) {
            if (query.includes('WHERE')) {
                query += ` AND precio <= ${precio_max}`;
            } else {
                query += ` WHERE precio <= ${precio_max}`;
            }
        }

        if (precio_min) {
            if (query.includes('WHERE')) {
                query += ` AND precio >= ${precio_min}`;
            } else {
                query += ` WHERE precio >= ${precio_min}`;
            }
        }

        if (categoria) {
            if (query.includes('WHERE')) {
                query += ` AND categoria = '${categoria}'`;
            } else {
                query += ` WHERE categoria = '${categoria}'`;
            }
        }

        if (metal) {
            if (query.includes('WHERE')) {
                query += ` AND metal = '${metal}'`;
            } else {
                query += ` WHERE metal = '${metal}'`;
            }
        }

        const result = await client.query(query);
        const joyas = result.rows;
        res.json(joyas);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener las joyas' });
    }
});

app.put('/joyas/:id', async (req, res) => {
    const id = req.params.id;
    const { likes } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE inventario SET likes = $1 WHERE id = $2 RETURNING *', [likes, id]);
        const updatedPost = result.rows[0];
        res.json(updatedPost);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Ruta para insertar un nuevo post
app.post('/joyas', async (req, res) => {
    const { nombre, categoria, metal, precio, stock, img } = req.body;
    const likes = 0;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO inventario (nombre, categoria, metal, precio, stock, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [nombre, categoria, metal, precio, stock, img]
        );
        const postId = result.rows[0].id;
        console.log(result.rows[0]);
        res.json({ id: postId, nombre, categoria, metal, precio, stock, img });
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al insertar el post' });
    }
});

app.delete('/joyas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await pool.connect();
        await client.query('DELETE FROM inventario WHERE id = $1', [id]);
        client.release();
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express escuchando en el puerto ${PORT}`);
});