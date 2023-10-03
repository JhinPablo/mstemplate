const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parcial'
});

async function traerVuelos() {
    const result = await connection.query('SELECT * FROM vuelos');
    return result[0];
}
async function traerVuelo(id) {
    const result = await connection.query('SELECT * FROM vuelos WHERE id = ? ', id);
    return result[0];
}

async function actualizarVuelos(id, capacidadv) {
    if (capacidadv !== null) {
        const result = await connection.query('UPDATE vuelos SET capacidadv = ? WHERE id = ?', [capacidadv, id]);
        return result;
    } else {
        throw new Error("capacidadv no puede ser null");
    }
}

async function crearVuelos(ciudad_origen, ciudad_destino, capacidadv, costo) {
    const result = await connection.query('INSERT INTO vuelos VALUES(null,?,?,?,?)', [ciudad_origen, ciudad_destino, capacidadv, costo]);
    return result;
}

module.exports = {
    traerVuelos, traerVuelo, actualizarVuelos, crearVuelos
};
