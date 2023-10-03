const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parcial'
});

async function traerHoteles() {
    const result = await connection.query('SELECT * FROM Hoteles');
    return result[0];
}
async function traerHotel(id) {
    const result = await connection.query('SELECT * FROM Hoteles WHERE id = ? ', id);
    return result[0];
}

async function actualizarHoteles(id, capacidadh) {
    const result = await connection.query('UPDATE Hoteles SET capacidadh = ? WHERE id = ? ', [capacidadh, id]);
    return result;
}

async function crearHoteles(nombre, ciudad, capacidadh, costo) {
    const result = await connection.query('INSERT INTO Hoteles VALUES(null,?,?,?,?)', [nombre, ciudad, capacidadh, costo]);
    return result;
}

module.exports = {
    traerHoteles, traerHotel, actualizarHoteles, crearHoteles
};
