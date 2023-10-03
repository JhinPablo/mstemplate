const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parcial'
});

async function obtenerTodosLosPlanes() {
    // Construye la consulta SQL para obtener todos los planes de viaje
    const query = 'SELECT * FROM planes';

    try {
        const result = await connection.query(query);
        return result[0]; // Devuelve un array de resultados
    } catch (error) {
        throw error;
    }
}


async function crearPlan(plan) {
    const ciudad = plan.ciudad;
    const costo = plan.costo;
    const usuario_id = plan.usuario_id;
    const vuelo_id = plan.vuelo_id;
    const hotel_id = plan.hotel_id;

    const result = await connection.query('INSERT INTO planes VALUES (null,?, ?, ?, ?, ?)', [ciudad, costo, usuario_id, vuelo_id, hotel_id]);
    return result;
}

async function traerPlan(id) {
    const result = await connection.query('SELECT * FROM planes WHERE id = ? ', id);
    return result[id];
}

async function actualizarPlan(planId, nuevosDatos) {
    // Construye la consulta SQL de actualización
    const query = 'UPDATE planes SET ciudad = ?, costo = ?, usuario_id = ?, vuelo_id = ?, hotel_id = ? WHERE id = ?';

    // Extrae los nuevos valores de los datos
    const { ciudad, costo, usuario_id, vuelo_id, hotel_id } = nuevosDatos;

    try {
        const result = await connection.query(query, [ciudad, costo, usuario_id, vuelo_id, hotel_id, planId]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function eliminarPlan(planId) {
    // Construye la consulta SQL de eliminación
    const query = 'DELETE FROM planes WHERE id = ?';

    try {
        const result = await connection.query(query, [planId]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearPlan,
    traerPlan,
    actualizarPlan,
    obtenerTodosLosPlanes,
    eliminarPlan
};
