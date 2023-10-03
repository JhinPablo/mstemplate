const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parcial'
});
async function traerUsuarios() {
    const result = await connection.query('SELECT * FROM Usuarios');
    return result[0];
}
async function traerUsuario(nombre) {
    const result = await connection.query('SELECT * FROM Usuarios WHERE nombre = ? ', nombre);
return result[0];
}

async function validarUsuario(nombre, password) {
    const result = await connection.query('SELECT * FROM Usuarios WHERE nombre = ? AND password = ?', [nombre, password]);
    return result[0];
    }
    async function crearUsuario(nombre, email, password) {
    const result = await connection.query('INSERT INTO Usuarios VALUES(null,?, ?,?)', [nombre, email, password]);
    return result;
    }
    module.exports = {
    traerUsuarios, traerUsuario, validarUsuario, crearUsuario
    };
