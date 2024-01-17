const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');



const usuariosGet =  async (req = request, res = response) => {

     const query = { estado: true };
  
    const [ usuarios ]= await Promise.all([
        
        Usuario.find(query)
            
    ]);

    res.json({
        msg: 'get API - usuariosGet',
        usuarios 
    }) 
   
}

const usuariosPost = async (req, res = response) => {

    const { email, password } = req.body;
    const usuario =  new Usuario({ email, password});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    const usuarioDB = await Usuario.findOne({ email });

    if( usuarioDB) {
        return res.status(400).json({
          msg: `El email ${ usuarioDB.email }, ya está registrado`
        });
      }



 
    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, email } = req.body;

    // TODO validar contra base de datos
    if ( password) {
         //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, password, email );

    res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {

    const{ id }= req.params;

    //const _id = req._id;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
   

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}