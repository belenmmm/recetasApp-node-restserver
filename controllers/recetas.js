
const { response, request } = require('express');
const  Receta  = require('../models/receta');


const recetasGet = async (req = request, res = response) => {

  const query = { estado: true };
 
  
  const [ recetas ]= await Promise.all([
      
      Receta.find(query)
          
  ]);
 
  res.json({
      msg: 'get API - recetasGet',
      recetas 
  }) 
  }

  const recetasPost = async (req, res = response) => {

    //Verificar si está el nombre y la descripción esta en el middleware

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
      usuario: req.usuario._id
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

    const { id } = req.params;
    const data = req.body

    data.usuario = req.usuario._id;

    //validar contra base de datos

    const receta = await Receta.findByIdAndUpdate(id, data, { new:true});


    res.json({
        msg: 'put API - recetasPut',
        receta
    });
  }


  const recetasDelete = async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    //const receta = await Receta.findByIdAndDelete( id );

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