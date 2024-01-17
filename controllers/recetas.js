
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const  Receta  = require('../models/receta');


const recetasGet = async (req = request, res = response) => {

  const { auth } = req.query;
  const { uid } = jwt.verify( auth, process.env.SECRETORPRIVATEKEY);
  const recetas = await Receta.find({ usuario: uid, estado: true });

  if (recetas.length === 0) {
    return res.json({
      msg: 'Aún no se han agregado recetas',
    });
  }
 
  res.json({
      msg: 'get API - recetasGet',
      recetas
  }) 
  }

  const recetasPost = async (req, res = response) => {

    //Verificar si está el nombre y la descripción esta en el middleware
    const { auth } = req.query;
    const { uid } = jwt.verify( auth, process.env.SECRETORPRIVATEKEY);

    const {name, description, ingredientes, imagePath} = req.body;
    const recetaDB = await Receta.findOne({ name, description, ingredientes, imagePath });

    if( recetaDB) {
      return res.status(400).json({
        msg: `La receta ${ recetaDB.name }, ya existe`
      });
    }

    //Generar la data a guardar
    const data = {
      name,
      description, 
      ingredientes, 
      imagePath,
      usuario: uid
      //usuario: req.usuario._id
    }

    const receta = new Receta(data);

    //Guardar DB
    await receta.save();

    res.status(201).json({
        msg: 'Store recipe ok',
        receta
    });


  }

  const recetasPut = async (req, res = response) => {
    const { auth } = req.query;
    const { uid } = jwt.verify( auth, process.env.SECRETORPRIVATEKEY);

    const { id } = req.params;
    const data = req.body

    //validar contra base de datos

    const receta = await Receta.findByIdAndUpdate(id, data,{usuario: uid}, { new:true});

    res.json({
        msg: 'put API - recetasPut',
        receta
    });
  }


  const recetasDelete = async (req, res = response) => {

    const { id } = req.params;

    const { auth } = req.query;
    const { uid } = jwt.verify( auth, process.env.SECRETORPRIVATEKEY);

    const receta = await Receta.findByIdAndUpdate( id, { estado:false});

    res.json({
        msg: 'delete API - recetasDelete',
        receta
    });
  }


  module.exports = {
    recetasGet,
    recetasPost,
    recetasPut,
    recetasDelete
  }