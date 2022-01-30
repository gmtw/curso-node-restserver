
const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require:[true, 'El nombre es obligatorio'],
        
    },

    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type:String,
        required:[true, 'El password es obligatorio'],
        unique: true
    },
    rol:{
        type:String,
        required:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    },
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);
