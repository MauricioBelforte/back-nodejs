/*
tenemos que esperar a que el documento este completamente cargado
del DOM para poder manipularlo con javascript para eso usamos el evento
Entonces podemos agregar las variables y funciones que necesitamos
para manipular el DOM en este caso el formulario de crear usuario 
*/

document.addEventListener('DOMContentLoaded', () =>
    {

        const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');// boton que muestra el formulario para crear productos
        const crearProductoForm = document.getElementById('crearProductoForm');// formulario para crear productos
        const editarProductoForm = document.getElementById('editarProductoForm');// formulario para editar productos
        const listarProductosBtn = document.getElementById('listarProductosBtn');// boton para listar productos
        const listaProductos = document.getElementById('listaProductos');// lista de productos
      
    
        //mostrar imagen de multer

    const currentImageProducto = document.getElementById('currentImageProducto');
   
    

    
        /* Este metodo es para que el boton de crear producto muestre el formulario para crear el producto */
        mostrarCrearProductoFormBtn.addEventListener('click',() =>
            {
                
                crearProductoForm.classList.toggle('hidden');
            });
    
        /* Este metodo es el que captura el submit del formulario Crear Producto*/
        crearProductoForm.addEventListener('submit', async (e) => 
            {
                e.preventDefault();//evita qaue la pagina se actualice
        
                const formData = new FormData(crearProductoForm);
        
                /* Este objeto data no se esta utilizando ya que en body envio directamente el formData y los nombres que deberia usar en el 
                controlador son los name del formulario */
    
                const data = 
                {
                    nombre: formData.get('nombreProducto'),
                    descripcion: formData.get('descripcionProducto'),
                    precio: formData.get('precioProducto'),
                    categoria: formData.get('categoriaProducto'),
                    ruta_archivo: formData.get('archivoProducto')
                };
                
                /* Aca envio una peticion POST a mi API con 2 parametros ya que es POST y le mando todos los datos del formulario*/
               // const response = await fetch('http://localhost:3000/productos',
               const response = await fetch('https://back-nodejs-one.vercel.app/productos',
               
                {
                    method: 'POST',
                    body: formData
                });
        
                const result = await response.json();
                alert(result.message);
                crearProductoForm.reset();
                crearProductoForm.classList.add('hidden');
                listarProductos();
            });
    
    
        /* editarProductoForm lo traigo con getElementById(editarProductoForm) del html */    
        /* Este metodo es el que captura el submit con todos los datos del formulario editar producto que por defecto esta
        cargado con los datos que trae el boton Actualizar del listado de productos */
    
        /* Para ver este formulario hay que apretar el boton Actualizar, por lo que hay que presionar Listar Todos los productos
        y al hacer esto el boton actualizar precarga todos los campos del form */
        editarProductoForm.addEventListener('submit', async (e) => 
            {
                e.preventDefault();
                const formData = new FormData(editarProductoForm);
                const id = formData.get('editIDProducto');
                const data = {
                    nombre: formData.get('editNombreProducto'),
                    descripcion: formData.get('editDescripcionProducto'),
                    precio: formData.get('editPrecioProducto'),
                    stock: formData.get('editStockProducto'),
                    categoria: formData.get('editCategoriaProducto')
                };
        
                //const response = await fetch(`http://localhost:3000/productos/${id}`, {
                const response = await fetch(`https://back-nodejs-one.vercel.app/productos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                const result = await response.json();
                alert(result.message);
                editarProductoForm.reset();
                editarProductoForm.classList.add('hidden');
                listarProductos();
            });
    
    
        /* Esta funcion esta en el boton Listar Todos los productos */
        listarProductosBtn.addEventListener('click', listarProductos);
        
        /* Aca llama a esta funcion que hace la peticion a nuestra api */
        async function listarProductos()
        {
            listaProductos.classList.toggle('hidden');
            //const response = await fetch('http://localhost:3000/productos'); //Es una peticion GET por defecto, sino hay que pasar un segundo parametro a la funcion fetch
            const response = await fetch('https://back-nodejs-one.vercel.app/productos'); //Es una peticion GET por defecto, sino hay que pasar un segundo parametro a la funcion fetch
            const productos = await response.json();
    
            listaProductos.innerHTML = '';//limpiamos la lista de productos
            // por cada usuario en el array de productos creamos un li
            // y le agregamos el nombre, descripcion, precio del producto
            // y lo agregamos a la lista de productos ul del html
    
            /* productos contiene el un archivo JSON que trae los datos de nuestra base de datos*/
            productos.forEach(producto => 
                {
                    const li = document.createElement('li');//creamos un li
    
                    //const imageSrc = producto.url_imagen ? `/uploads/${producto.url_imagen}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
                    //Este código utiliza startsWith('http') para comprobar si la URL de la imagen (producto.url_imagen) comienza con "http". Si es así, significa que es una URL externa y la utiliza tal cual. Si no, utiliza la ruta local de la carpeta uploads.
                   // const imageSrc = producto.url_imagen.startsWith('http') ? producto.url_imagen : `/uploads/productos/${producto.url_imagen}`;
                   

                   const imageSrc = producto.url_imagen && producto.url_imagen.startsWith('http') ?  //Este código verifica primero si producto.url_imagen existe y si empieza con 'http'.
                    producto.url_imagen  //Si es así, usa ese valor.
                   : producto.url_imagen ? `/uploads/productos/${producto.url_imagen}` //Si no, verifica si producto.url_imagen existe y, de ser así, usa la ruta local.
                   : 'https://i.postimg.cc/2yvw1sDm/camisetaargentina.jpg'; //Si producto.url_imagen no existe o es nulo, usa la URL por defecto proporcionada.
                   
                   
                   
                   // agregamos span con los datos del producto: id, nombre, descripcion precio stock categoria
                    // la clase actions esta en el css y le da estilo a los botones
                    // el boton de actualizar tiene un data-id-producto que es el id del producto y
                    // data-nombre-producto que es el nombre del producto
                    // el boton de eliminar tiene un data-id-producto que es el id del producto 
                    
    
                    /* Aca se crea el listado de productos dinamicamente con los datos de nuestra base de datos */
                    li.innerHTML = `
                        
                        <div class= "item-producto">
                            <div class= "imagen-producto"> 
                                
                                <img src="${imageSrc}" alt="Img del producto">
                                <div> <p>Archivo: ${producto.url_imagen}</p> </div>
                            </div>
                            <div class= "datos-producto">
                                <p> ID: ${producto.id}  </p>
                                <p> Nombre: ${producto.nombre} </p>
                                <p> Descripción: ${producto.descripcion}</p>
                                <p> Precio: $${producto.precio} </p>
                                <p> Stock: ${producto.stock} </p>
                                <p> Categoria: ${producto.categoria_nombre} </p>
                                
                            </div>
                           
                        
                            <!-- Estos son los botones Actualizar y Eliminar de cada producto listado, son los que envian 
                            todos los datos al formulario oculto de productos-->
                            <div class="actions"> 
                                <button class="update" data-id-producto= "${producto.id}" data-nombre-producto="${producto.nombre}" data-descripcion-producto="${producto.descripcion}" data-precio-producto="${producto.precio} " data-stock-producto="${producto.stock}" data-categoria-producto="${producto.categoria_id}" data-image-producto="${imageSrc}"> Actualizar </button>
                            
                                <button class="delete" data-id-producto="${producto.id}"> Eliminar </button>
                            </div>
                        </div>
                    `;
    
                    //agregamos el li a la lista de usuarios ul todos los li
                    // voy mostrando el html que cree arriba 
    
                    /* listaProductos la cree en este archivo y la traigo con getElementById(listaProductos) que es el id del ul del html */
                    listaProductos.appendChild(li);
                });
    
                //ACTUALIZAR PRODUCTO
                /* Este es quien captura cuando presionamos el boton Actualizar y trae todos los datos que tenia el boton Actualizar,
                que se cargo al presionar el Boton Listar Todos los productos, y viene con los datos de la base de datos.
                Luego tiene que hacer su parte   editarProductoForm.addEventListener('submit', async (e) =>  */
                document.querySelectorAll('.update').forEach(button => 
                    {
                        button.addEventListener('click', (e) => 
                        {
                            const idProducto = e.target.getAttribute('data-id-producto');
                            const nombreProducto = e.target.getAttribute('data-nombre-producto');
                            const descripcionProducto = e.target.getAttribute('data-descripcion-producto');
                            const precioProducto = e.target.getAttribute('data-precio-producto');
                            const stockProducto = e.target.getAttribute('data-stock-producto');
                            const categoriaProducto = e.target.getAttribute('data-categoria-producto');
                            const imagenProducto = e.target.getAttribute('data-image-producto'); 
    
                            /* En esta parte cargamos el formulario Editar Producto */
                            document.getElementById('editIDProducto').value = idProducto;
                            document.getElementById('editNombreProducto').value = nombreProducto;
                            document.getElementById('editDescripcionProducto').value = descripcionProducto;
                            document.getElementById('editPrecioProducto').value =parseFloat(precioProducto).toFixed(2) ;// paso el numero de la base de datos a un numero con coma para poder colocarlo en el input, sino no funcionaba
                            document.getElementById('editStockProducto').value = stockProducto;
                            document.getElementById('editCategoriaProducto').value = categoriaProducto;
                            
                            
    
                            currentImageProducto.src = imagenProducto;
    
    
                            /* Aca mostramos el formulario Editar Producto porque estaba oculto */
                            editarProductoForm.classList.remove('hidden');
                        });
                    });
    
    
                    document.querySelectorAll('.delete').forEach(button =>
                        {
                            button.addEventListener('click', async (e) =>
                            {
                                const id = e.target.getAttribute('data-id-producto');
                                
                                //const response = await fetch(`http://localhost:3000/productos/${id}`,
                                const response = await fetch(`https://back-nodejs-one.vercel.app/productos/${id}`,
                                {
                                    method: 'DELETE'
                                });
    
                                const result = await response.json();
                                alert(result.message);
                                listarProductos();
    
                            });
    
                        });
    
    
        }
    
    
    });