

const { Schema, model } = require('mongoose');

const RecetaSchema = Schema({
    name: {
        type: String,
        required:[true, 'The recipe name is required'],
        unique:true
    },
    description: {
        type: String,    
    },
    ingredients: {
        type: Array
    },
    imagePath:{
        type:String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }

});


module.exports = model('Receta', RecetaSchema );