window.addEventListener('load', function () {
    console.log('este es el script de editregister.js');
    // --------------------------------- Buscador ---------------------------------------------
    document.getElementById('button-search').addEventListener('click', function () {
        var inputSearch = document.getElementById('buscador');
        if (window.innerWidth <= 769) {
            if (inputSearch.classList.contains('show')) {
                inputSearch.classList.remove('show');
                inputSearch.style.display = 'none';
            } else {
                inputSearch.classList.add('show');
                inputSearch.style.display = 'inline-block';
            }
        }
    });

    window.addEventListener('resize', function () {
        var inputSearch = document.getElementById('buscador');
        if (window.innerWidth > 769) {
            inputSearch.classList.remove('show');
            inputSearch.style.display = '';
        }
    });

    document.querySelectorAll('.footer-h3').forEach(item => {
        item.addEventListener('click', event => {
            const content = event.target.nextElementSibling;
            const isVisible = content.style.display === 'block';
            document.querySelectorAll('.sub-menus-footer').forEach(content => {
                content.style.display = 'none';
            });
            content.style.display = isVisible ? 'none' : 'block';
        });
    });

    // --------------------------------- Validaciones de Formulario ---------------------------------------------
    const validateField = (field, minLength, message) => {
        field.addEventListener('blur', function () {
            console.log('Campo:', field.id);
            let value = field.value.trim();
            if (value.length < minLength) {
                field.classList.add('error');
                field.style.borderColor = 'red';
                field.placeholder = message;
                field.value = ''; // Reset the value
            } else {
                field.placeholder = '';
                field.classList.remove('error');
                field.style.borderColor = '';
            }
        });
        field.addEventListener('focus', function() {
            field.classList.remove('error'); // Eliminar el estilo de error
            field.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    };

    // Validar Nombre y Apellido
    let nombre = document.querySelector('#nombre');
    validateField(nombre, 2, 'Nombre debe tener más de 2 caracteres');
    
    let apellido = document.querySelector('#apellido');
    validateField(apellido, 2, 'Apellido debe tener más de 2 caracteres');

    // Validar DNI, Teléfono, Domicilio, País y Usuario
    let dni = document.querySelector('#dni');
    validateField(dni, 1, 'Escribe tu DNI');

    let telefono = document.querySelector('#telefono');
    validateField(telefono, 1, 'Escribe tu Teléfono');

    let domicilio = document.querySelector('#domicilio');
    validateField(domicilio, 1, 'Escribe tu Domicilio');

    let pais = document.querySelector('#country');
    validateField(pais, 1, 'Escribe tu país');



  console.log('este lugar es el de la validación de los campos del formulario');
  document.querySelector('#nuevaFoto').addEventListener('change', function() {
    const fileInput = document.querySelector('#nuevaFoto');
    const file = fileInput.files[0];  // Captura el archivo subido
console.log('se activo el evento change');
    if (file) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];  // Extensiones válidas
        const fileName = file.name.toLowerCase();  // Nombre del archivo en minúsculas
        const fileExtension = fileName.split('.').pop();  // Extraer la extensión del archivo

        if (!allowedExtensions.includes(fileExtension)) {
            alert('Solo se permiten archivos de imagen: ' + allowedExtensions.join(', ')); //esta linea hace lo siguiente: si el archivo no es una imagen, muestra un alert con el mensaje que se encuentra entre comillas. Es decir, si el archivo no es una imagen, se mostrará un mensaje que dice "Solo se permiten archivos de imagen: jpg, jpeg, png, gif"
            fileInput.value = '';  // Limpiar el input si no es válido
        } else {
            // Aquí puedes proceder con el procesamiento del archivo válido
            console.log('Archivo válido: ', file.name);
        }
    }
});
    document.getElementById('editarRegistro').addEventListener('submit', function (e) {
           console.log('inicio de submit');

        let formIsValid = true;
        const validateField = (field, minLength, message) => {
           
                let value = field.value.trim();
                if (value.length < minLength) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = message;
                    field.value = ''; // Reset the value
                } else {
                    field.placeholder = '';
                    field.classList.remove('error');
                    field.style.borderColor = '';
                }
            };  

       
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const dni = document.getElementById('dni');
        const telefono = document.getElementById('telefono');
        const domicilio = document.getElementById('domicilio');
        const nombreUsuario = document.getElementById('nombreUsuario');
        const country = document.getElementById('country');
        
        const nombreValue = nombre.value.trim();
        if (nombreValue.length < 2) {
            validateField(nombre, 2, 'Nombre debe tener más de 2 caracteres');

            formIsValid = false;
            
        }

        // Validar Descripción
        const apellidoValue = apellido.value.trim();
        if (apellidoValue.length < 2) {
            validateField(apellido, 2, 'Apellido debe tener más de 2 caracteres');

            formIsValid = false;
            // alert('La descripción debe tener al menos 20 caracteres.');
        }
        // Validar Color
        const dniValue = dni.value.trim();
        if (dniValue.length < 8) {
            validateField(dni, 1, 'Escribe tu DNI');

            formIsValid = false;
            // alert('Debe ingresr el color.');
        }
        // Validar Precio
        const telefonoValue = telefono.value.trim();
        if (telefonoValue.length < 1) {
            validateField(telefono, 1, 'Escribe tu Teléfono');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const domicilioValue = domicilio.value.trim();
        if (domicilioValue.length < 1) {
            validateField(domicilio, 1, 'Escribe tu Domicilio');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
    
        const countryValue = country.value.trim();
        if (countryValue.length < 1) {
            validateField(country, 1, 'Escribe tu país');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
       
        
        console.log('final de submit');

console.log(formIsValid);
        // Si el formulario no es válido, evitar el envío
        if (formIsValid) {
            // Aquí se puede proceder con el envío del formulario si es válido
            alert('Formulario enviado con éxito.');
            console.log(formIsValid);

        } else {
            alert('Debe completar todos los campos');
            console.log(formIsValid);
            console.log('Formulario no enviado');
            e.preventDefault();
             // Evita que el formulario se envíe si no es válido
        }
    });

   
    
});
