const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {
    validarCampos, validarJWT
} = require('../middlewares');

/* const {
    validarCampos,
} = require('../middlewares')
 */

//const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( existeUsuarioPorId ),
    validarCampos
],  usuariosPut );

router.post('/', [
    check('password', 'The password is required and more than 6 letters').isLength({ min: 6 }),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    validarCampos
],  usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete);



module.exports = router;