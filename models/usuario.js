

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    email: {
        type: String,
        required:[true, 'The email is required'],
        unique:true
    },

    password: {
        type: String,
        required:[true, 'The password is required']
    },
    estado:  {
        type:Boolean,
        default:true
    }

});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
 } 


module.exports = model('Usuario', UsuarioSchema );