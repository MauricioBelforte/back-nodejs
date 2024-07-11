const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');


router.get('/', userController.ObtenerTodosLosUsuarios);
router.get('/:id', userController.ObtenerUsuarioPorId);

//SOLO SE PUEDEN CREAR USUARIOS CON MULTER //ES MAS COMPLICADO editar las imagenes
router.post('/',userController.upload.single('archivo'),userController.crearUsuario);// archivo es el name del input file en el formulario de crear usuario 


router.put('/:id', userController.ActualizarUsuario);
router.delete('/:id',userController.BorrarUsuario);


module.exports = router;