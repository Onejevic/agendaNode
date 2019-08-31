const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { Usuario, Evento } = require('../models/usuario');
//-----------------------------------------------------------------------------------------
//validación usuario en el login
app.post('/login', function(req, res) {
    let body = req.body;
    Usuario.find({
            email: body.user
        })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(200).json({
                    ok: false,
                    err
                });
            }
            if (usuarios.length == 0 || !bcrypt.compareSync(body.pass, usuarios[0].password)) {
                return res.status(200).json({
                    ok: false,
                    err: 'Error en el usuario o contraseñas'
                });
            }
            // let response = usuarios;
            let response = 'Validado'
            process.env.EMAIL = body.user;
            res.json(response);
        });
});
//-----------------------------------------------------------------------------------------
//creación de un nuevo usuario
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
//----------------------------------------------------------------------------------------
//visualizar los eventos
app.get("/events/all", function(req, res) {
        Evento.find({
                email: process.env.EMAIL
            })
            .exec(function(err, eventos) {

                if (err) {
                    return res.status(200).json({
                        ok: false,
                        err
                    });
                }

                res.json(eventos);
            });
        // res.json(process.env.EMAIL);
    })
    //----------------------------------------------------------------------------------------
    //crear un evento
app.post('/events/new', function(req, res) {
    let body = req.body;
    let evento = new Evento({
        email: process.env.EMAIL,
        title: body.title,
        start: body.start,
        // start_hour: body.start_hour,
        end: body.end
            // end_hour: body.end_hour
    });

    evento.save((err, eventoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json(eventoDB);
    });
});
//-------------------------------------------------------------------------------------------
//borrar un evento
app.post("/events/delete/:id", function(req, res) {
        var id = req.params.id || '';
        Evento.remove({ _id: id }, function(err, eventoDB) {
            if (err) {
                res.json('Error al intentar eliminar el personaje.', err);
            } else {
                res.json(eventoDB);
            }
        })
    })
    //--------------------------------------------------------------------------------------------
    //actualizar un evento
app.post("/events/update/:id", function(req, res) {
    var id = req.params.id || '';
    var body = req.body;
    Evento.findByIdAndUpdate(id, body, { new: true }, (err, eventoDB) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            evento: eventoDB
        })
    })
});

module.exports = app;