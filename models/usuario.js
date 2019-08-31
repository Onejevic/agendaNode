const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'El email es necesario']
    }
});

let eventoSchema = new Schema({
    email: String,
    title: String,
    start: String,
    start_hour: String,
    end: String,
    end_hour: String
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });


let Usuario = mongoose.model('Usuario', usuarioSchema);
let Evento = mongoose.model('Evento', eventoSchema);
module.exports = {
    Usuario,
    Evento
}