const express = require('express');
const hotelesController = require('./controllers/hotelesController');
const morgan = require('morgan'); 
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(hotelesController);

app.listen(3005, () => {
console.log('Microservicio Hoteles ejecutandose en el puerto 3005');
});
