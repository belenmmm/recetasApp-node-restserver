const { response, request }=require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next) => {

    const { auth } = req.query;

    if(!auth) {
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( auth, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponder al uid
        const usuario = await Usuario.findById( uid );
       
        

        if(!usuario){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe en DB'
            })
        }

        req.uid = usuario._id

        //Verificar si el _id tiene estado en true
        if(!usuario.estado) {
            return res.status(401).json({
                msg:'Token no válido - usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
        
    }

}

module.exports = {
    validarJWT
}