const express = require('express');
const router = express.Router();

const productoController = require('../controller/productoController');


router.get('/', productoController.ObtenerTodosLosProductos);
router.get('/:id', productoController.ObtenerProductoPorId);

//SOLO SE PUEDEN CREAR PRODUCTOS CON MULTER //ES MAS COMPLICADO editar las imagenes
router.post('/',productoController.upload.single('archivoProducto'),productoController.crearProducto);// archivoProducto es el name del input file en el formulario de crear producto 


router.put('/:id', productoController.ActualizarProducto);
router.delete('/:id',productoController.BorrarProducto);


module.exports = router;