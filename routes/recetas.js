const { Router } = require('express');
const { check } = require('express-validator');

const { recetasGet, recetasPut, recetasPost, recetasDelete } = require('../controllers/recetas');
const {  validarJWT, validarCampos } = require('../middlewares');
const { existeRecetaPorId } = require('../helpers/db-validators');

const router = Router();

  router.get('/get', [
    validarJWT
  ],recetasGet);

  router.put('/edit/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRecetaPorId),
    validarCampos
  ],recetasPut);

  router.post('/add', [ 
    check('name', 'The recipe name is required').not().isEmpty(),
    //check('description', 'The recipe description is required').not().isEmpty(),
    validarJWT,
    validarCampos
  ], recetasPost);

  router.delete('/delete/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeRecetaPorId),
    validarJWT,
    validarCampos
  ],recetasDelete);



module.exports = router;