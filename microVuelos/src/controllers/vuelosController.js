const { Router } = require('express');
const router = Router();
const vuelosModel = require('../models/vuelosModel');

router.get('/vuelos', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await vuelosModel.traerVuelos() ;
    //console.log(result);
    res.json(result);
});

router.get('/vuelos/:id', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await vuelosModel.traerVuelos(id) ;
    //console.log(result);
    res.json(result[id]);
});
router.put('/vuelos/:id', async (req, res) => {
    const id = req.params.id;
    const capacidadv = req.body.capacidadv;

    if (capacidadv<0) {
        res.send("la capacidadv no puede ser menor de cero");
        return;
    }

    var result = await vuelosModel.actualizarVuelos(id, capacidadv);
    res.send("capacidadv de vuelo actualizado");
});

router.post('/vuelos', async (req, res) => {
    const ciudad_origen = req.body.ciudad_origen;
    const ciudad_destino = req.body.ciudad_destino;
    const capacidadv = req.body.capacidadv;
    const costo = req.body.costo;

    var result = await vuelosModel.crearVuelos(ciudad_origen, ciudad_destino, capacidadv, costo);
    res.send("Vuelo creado");
});

module.exports = router;
