 const { response } = require("express");
 const bcryptjs = require('bcryptjs');
 const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar  si el email existe
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - email'
            })
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'INVALID_PASSWORD'
            })
        }


        //Generar el JTW
        const token = await generarJWT(usuario.id);

       

        res.json({
            msg:'Login ok',
            usuario,
            token
          
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

    

}


module.exports = {
    login
} 