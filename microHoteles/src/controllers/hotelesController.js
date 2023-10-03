const { Router } = require('express');
const router = Router();
const hotelesModel = require('../models/hotelesModel');

router.get('/hoteles', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await hotelesModel.traerHoteles() ;
    //console.log(result);
    res.json(result);
});

router.get('/hoteles/:id', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await hotelesModel.traerHoteles(id) ;
    //console.log(result);
    res.json(result[id]);
});
router.put('/hoteles/:id', async (req, res) => {
    const id = req.params.id;
    const capacidadh = req.body.capacidadh;

    if (capacidadh<0) {
        res.send("la capacidadh no puede ser menor de cero");
        return;
    }

    var result = await hotelesModel.actualizarHoteles(id, capacidadh);
    res.send("capacidadh de hotel actualizado");
});

router.post('/hoteles', async (req, res) => {
    const nombre = req.body.nombre;
    const ciudad = req.body.ciudad;
    const capacidadh = req.body.capacidadh;
    const costo = req.body.costo;

    var result = await hotelesModel.crearHoteles(nombre, ciudad, capacidadh, costo);
    res.send("Hotel creado");
});

module.exports = router;
