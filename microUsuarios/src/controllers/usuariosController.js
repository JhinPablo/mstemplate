const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');
router.get('/usuarios', async (req, res) => {
    var result;
    result = await usuariosModel.traerUsuarios();
    res.json(result);
});
router.get('/usuarios/:usuario', async (req, res) => {
    const nombre = req.params.nombre;
    var result;
    result = await usuariosModel.traerUsuario(nombre);
    res.json(result[0]);
});
router.get('/usuarios/:usuario/:password', async (req, res) => {
    const nombre = req.params.nombre;
    const password = req.params.password;
    var result;
    result = await usuariosModel.validarUsuario(nombre, password);
    res.json(result);
});
router.post('/usuarios', async (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    var result = await usuariosModel.crearUsuario(nombre, email,
        password);
    res.send("usuario creado");
});
module.exports = router;
