/*
tenemos que esperar a que el documento este completamente cargado
del DOM para poder manipularlo con javascript para eso usamos el evento
Entonces podemos agregar las variables y funciones que necesitamos
para manipular el DOM en este caso el formulario de crear usuario 
*/

document.addEventListener('DOMContentLoaded', () =>
    {
        const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');// boton que muestra el formulario para crear usuarios
        const crearUsuarioForm = document.getElementById('crearUsuarioForm');// formulario para crear usuarios
        const editarUsuarioForm = document.getElementById('editarUsuarioForm');// formulario para editar usuarios
        const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');// boton para listar usuarios
        const listaUsuarios = document.getElementById('listaUsuarios');// lista de usuarios
    
 
      
    
        //mostrar imagen de multer
    const currentImage = document.getElementById('currentImage');

   
    
    // mostrar u ocultar formulario de crear usuario
        mostrarCrearUsuarioFormBtn.addEventListener('click',() =>
        {   
            crearUsuarioForm.classList.toggle('hidden');
        });
    
    
        //CREAR USUARIOS NUEVOS
        crearUsuarioForm.addEventListener('submit', async (e) => 
        {
            e.preventDefault();//evita qaue la pagina se actualice
    
            const formData = new FormData(crearUsuarioForm);
    
            const data = 
            {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                email: formData.get('mail'),
                password: formData.get('password'),
                url_imagen: formData.get('archivo')
            };
    
            const response = await fetch('https://back-nodejs-one.vercel.app/usuarios',
            {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
            alert(result.message);
            crearUsuarioForm.reset();
            crearUsuarioForm.classList.add('hidden');
            listarUsuarios();
        });
    
    
        // //EDITAR USUARIO
        // editarUsuarioForm.addEventListener('submit', async(e) => 
        // {   
        //     e.preventDefault();
        //     const formData = new FormData(editarUsuarioForm);
    
        //     const id = formData.get('editID');
            
        //     const data = 
        //     {
        //         nombre: formData.get('editNombre'),
        //         apellido: formData.get('editApellido'),
        //         email: formData.get('editMail'),
        //         ruta_archivo: formData.get('editArchivo')
        //     };
    
        //     const response = await fetch(`/usuarios/${id}`,
        //     {
        //         method: 'PUT',
        //         headers: 
        //         {
        //             'Content-Type':'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
    
        //     const result = await response.json();
        //     alert(result.message);
        //     editarUsuarioForm.reset();
        //     editarUsuarioForm.classList.add('hidden');
        //     listarUsuarios();
    
        // });
    
    
        editarUsuarioForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(editarUsuarioForm);
            const id = formData.get('editID');
            const data = {
                nombre: formData.get('editNombre'),
                apellido: formData.get('editApellido'),
                mail: formData.get('editMail')
            };
    
            const response = await fetch(`https://back-nodejs-one.vercel.app/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
            alert(result.message);
            editarUsuarioForm.reset();
            editarUsuarioForm.classList.add('hidden');
            listarUsuarios();
        });
    
    
    
    
    
        //listar todos los usuarios este hace primero
        // una peticion GET a /usuarios con localhost:3000/usuarios
        // y luego recibe un array de usuarios y los muestra en el
        // DOM y los agrega a la lista de usuarios ul
        listarUsuariosBtn.addEventListener('click', listarUsuarios);
        // trabajamos con funcion asincrona para esperar a que la peticion
        // y que no se cuelgue la pagina
        // fetch es una funcion que hace peticiones http a un servidor y 
        // devuelve una promesa con el listado de los usuarios de la db
        // usuarios es un array de objetos que tiene los datos de los usuarios
        // y los mostramos en el DOM con un forEach que recorre el array
        async function listarUsuarios()
        {   
            listaUsuarios.classList.toggle('hidden');
            const response = await fetch('https://back-nodejs-one.vercel.app/usuarios');
            const usuarios = await response.json();
    
            listaUsuarios.innerHTML = '';//limpiamos la lista de usuarios
            // por cada usuario en el array de usuarios creamos un li
            // y le agregamos el nombre y el mail del usuario
            // y lo agregamos a la lista de usuarios ul
    
            usuarios.forEach(usuario => 
                {
                    const li = document.createElement('li');//creamos un li
    
                  //  const imageSrc = usuario.url_imagen ? `/uploads/${usuario.url_imagen}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
    
                  const imageSrc = usuario.url_imagen.startsWith('http') ? usuario.url_imagen : `/uploads/usuarios/${usuario.url_imagen}`;
                    // agregamos span con los datos del usuario: id, nombre, apellido y mail
                    // la clase actions esta en el css y le da estilo a los botones
                    // el boton de actualizar tiene un data-id que es el id del usuario y data-nombre que es el nombre del usuario
                    // el boton de eliminar tiene un data-id que es el id del usuario 
                    
                    li.innerHTML = `
                        <img src="${imageSrc}" alt="Img de perfil" width="50px">
                        <span> ID: ${usuario.id}, Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, Email: ${usuario.email}, Archivo: ${usuario.url_imagen} </span>
                        
    
                         <!-- Estos son los botones Actualizar y Eliminar de cada usuario listado, son los que envian 
                            todos los datos al formulario oculto de usuarios-->
                        <div class="actions"> 
                            <button class="update" data-id= "${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-email="${usuario.email}" data-image="${imageSrc}"> Actualizar </button>
                        
                            <button class="delete" data-id="${usuario.id}"> Eliminar </button>
                        </div>
                    
                    `;
    
                    //agregamos el li a la lista de usuarios ul todos los li
                    // voy mostrando el html que cree arriba 
                    listaUsuarios.appendChild(li);
                });
    
                //ACTUALIZAR USUARIO
                document.querySelectorAll('.update').forEach(button => 
                    {
                        button.addEventListener('click', (e) => 
                        {
                            const id = e.target.getAttribute('data-id');
                            const nombre = e.target.getAttribute('data-nombre');
                            const apellido = e.target.getAttribute('data-apellido');
                            const email = e.target.getAttribute('data-email');
                            const imagen = e.target.getAttribute('data-image');
    
    
                            document.getElementById('editID').value = id;
                            document.getElementById('editNombre').value = nombre;
                            document.getElementById('editApellido').value = apellido;
                            document.getElementById('editMail').value = email;
                            
                            
    
                            currentImage.src = imagen;
    
    
    
                            editarUsuarioForm.classList.remove('hidden');
                        });
                    });
    
    
                    document.querySelectorAll('.delete').forEach(button =>
                        {
                            button.addEventListener('click', async (e) =>
                            {
                                const id = e.target.getAttribute('data-id');
                                const response = await fetch(`https://back-nodejs-one.vercel.app/usuarios/${id}`,
                                {
                                    method: 'DELETE'
                                });
    
                                const result = await response.json();
                                alert(result.message);
                                listarUsuarios();
    
                            });
    
                        });
    
    
        }
    
    
    });