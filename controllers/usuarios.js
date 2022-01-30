const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {

    // const {q,nombre='No name', apikey} = req.query
    query = {estado: true};

    const {limite = 5, desde=0}= req.query;


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({

        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    // validarCampos(req,res);

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });
    //verificar si el correo existe
    
    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();

    res.json({
        
        usuario
        
    });
}



const usuariosPut = async (req, res = response) => {

    const { id } = req.params

    const { _id,password, google, correo,...resto} = req.body

    //TODO validar contra base de datos

    if (password) {
        //Encripar contraseña

        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}




const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API-controlador'
    });
}
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;
    //Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};
