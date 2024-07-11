const db = require('../db/db');

//ACTUALIZACIÓN CON MULTER Y CARPETA PUBLIC (en la base de datos se guarda el path)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage(
    {
        destination: function (req,file,cb){
            cb(null,'uploads/productos/');//Indica la carpeta donde se guardaran los archivos
        },
        filename: function(req,file,cb)
        {
            cb(null,Date.now() + '-' + file.originalname);//nombre del archivo en el disco
        },
        fileFilter: (req,file,cb) =>
        {
            const fileTypes = /jpeg|jpg|png|txt/;


            const mimeType = fileTypes.test(file.mimetype.toLowerCase());


            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());


       
            if(mimeType && extname)
            {    
                return cb(null,true);
            }
        
        return cb(new Error('Error: Tipo de archivo NO PERMITIDO'), false);
       
        },
        limits:
        {
            fileSize: 100000000
        }

    });

    const upload = multer({storage: storage});




const ObtenerTodosLosProductos = (req,res) => 
{
    const sql = `
        SELECT productos.id, productos.nombre, productos.descripcion, productos.precio, productos.stock, productos.categoria_id, categorias.nombre AS categoria_nombre, productos.url_imagen
        FROM productos
        JOIN categorias ON productos.categoria_id = categorias.id ORDER BY productos.id`;

    db.query(sql, (err,result) => 
    {
        if(err) throw err;

        res.json(result);
    });
}


const ObtenerProductoPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


//ESTO SI ES NECESARIO EDITAR CON MULTER
const crearProducto = (req, res) =>{
    // en el req.body vienen los name del formulario de crear producto, no los saco del data que esta en el script
    const { nombreProducto, descripcionProducto, precioProducto,stockProducto, categoriaProducto} = req.body;
    const archivo = req.file? req.file.filename: null;//Obtener el nombre del archivo guardado


    const sql = 'INSERT INTO productos (nombre,descripcion,precio,stock,categoria_id,url_imagen) VALUES (?,?,?,?,?,?)';


    db.query(sql,[nombreProducto, descripcionProducto, precioProducto,stockProducto, categoriaProducto,archivo], (err,result) =>
    {
        if(err) throw err;


        res.json({
            message : 'Producto Creado',
            idProducto: result.insertId
            });
    });
};






const ActualizarProducto = (req, res) =>{
    const {id} = req.params;
    const {nombre,descripcion,precio,stock,categoria} = req.body;


    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?';
    db.query(sql,[nombre,descripcion,precio,stock,categoria,id], (err,result) =>
    {
        if(err) throw err; 


        res.json(
            {
                message : 'Producto editado'
            });
    });


};


const BorrarProducto = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM productos WHERE id= ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                message: 'Producto eliminado'
            });
    });
};

//aqui tambien agrego multer para exportar el modulo UPLOAD
module.exports = 
{
    ObtenerTodosLosProductos,
    ObtenerProductoPorId,
    crearProducto,
    ActualizarProducto,
    BorrarProducto,
    upload
}