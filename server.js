require('./config/config');
const express = require('express');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(require('./routes/usuario'));



mongoose.connect('mongodb://localhost:27017/agenda', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('bd corriendo en puerto 27017');
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando en puerto ", process.env.PORT);
});