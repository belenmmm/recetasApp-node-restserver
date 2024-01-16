
const Receta = require('../models/receta');

const existeRecetaPorId = async( id ) => {

    const existeReceta = await Receta.findById(id);
    if(!existeReceta){
        throw new Error(`Error in the request - El id ${ id } no existe`);
    }
}

module.exports = {
    existeRecetaPorId
}