const express = require('express');
const router = express.Router();
const axios = require('axios');
const planesModel = require('../models/planesModel');

// Ruta para obtener todos los planes de viaje
router.get('/planes', async (req, res) => {
    try {
        // Llama a la función para obtener todos los planes de viaje en tu modelo
        const planes = await planesModel.obtenerTodosLosPlanes();
        res.status(200).json(planes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Ruta para obtener un plan de viaje por su ID
router.get('/planes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await planesModel.traerPlan(id);
        if (result) {
            res.json(result[0]);
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para crear un nuevo plan de viaje
router.post('/planes', async (req, res) => {
    const { ciudad, usuario_id, vuelo_id, hotel_id } = req.body;

    // Validar que los datos necesarios estén presentes en el cuerpo de la solicitud
    if (!ciudad || !usuario_id || !vuelo_id || !hotel_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Realizar la creación del plan de viaje
    try {
        // Obtener información sobre el vuelo desde el microservicio de vuelos
        const vueloResponse = await axios.get(`http://localhost:3006/vuelos/${vuelo_id}`);
        const vueloData = vueloResponse.data;
        console.log(vueloData)

        // Obtener información sobre el hotel desde el microservicio de hoteles
        const hotelResponse = await axios.get(`http://localhost:3005/hoteles/${hotel_id}`);
        const hotelData = hotelResponse.data;
        console.log(hotelData)

        // Verificar disponibilidad de vuelo y hotel
        if (vueloData.capacidadv >= 1 && hotelData.capacidadh >= 1) {
            // Calcular el costo total del plan de viaje teniendo en cuenta el vuelo y el hotel
            const planCostoTotal = vueloData.costo + hotelData.costo;

            // Crear el plan de viaje
            const plan = {
                ciudad,
                costo: planCostoTotal,
                usuario_id,
                vuelo_id,
                hotel_id
            };
            console.log(plan)
            // Actualizar disponibilidad de vuelo restando un asiento
            await axios.put(`http://localhost:3006/vuelos/${vuelo_id}`, {});

            // Actualizar disponibilidad de hotel restando una habitación
            await axios.put(`http://localhost:3005/hoteles/${hotel_id}`, {});

            const planRes = await planesModel.crearPlan(plan);

            res.status(201).json({ message: 'Plan created successfully', plan_id: planRes.insertId });
        } else {
            res.status(400).json({ error: 'Not enough availability in flight or hotel' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para actualizar un plan con el id
router.put('/planes/:id', async (req, res) => {
    const planId = req.params.id;
    const nuevosDatos = req.body;

    try {
        // Llama a la función para actualizar el plan de viaje en tu modelo
        const resultado = await planesModel.actualizarPlan(planId, nuevosDatos);

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Plan not found' });
        } else {
            res.status(200).json({ message: 'Plan updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta para eliminar un plan
router.delete('/planes/:id', async (req, res) => {
    const planId = req.params.id;

    try {
        // Llama a la función para eliminar el plan de viaje en tu modelo
        const resultado = await planesModel.eliminarPlan(planId);

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Plan not found' });
        } else {
            res.status(204).end(); // La eliminación fue exitosa
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

