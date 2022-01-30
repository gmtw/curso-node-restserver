const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost,
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete  } = require('../controllers/usuarios');
const { esRoleValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


router.get('/', usuariosGet);

router.post('/',[
        check('nombre','El nombre no es válido').not().isEmpty(),
        check('correo','El correo no es válido').isEmail(),
        check('correo').custom(existeCorreo),
        check('password','El password debe ser de mas de 6 letras').isLength({min:6}),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPost);

router.put('/:id',[
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);
router.delete('/:id',
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
, usuariosDelete);





module.exports = router;
