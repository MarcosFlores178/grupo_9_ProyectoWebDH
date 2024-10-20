window.addEventListener('load', function () {
    console.log('este es el script de product.js');
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
    const validateField = (field, minLength, requiredMessage, minLengthMessage) => {
        field.addEventListener('blur', function () {
            let value = field.value.trim();
            console.log('Valor del campo:', value);
            console.log('Longitud del campo:', value.length);
    
            // Verificar si el campo está vacío
            if (value.length === 0) {
                field.classList.add('error');
                field.style.borderColor = 'red';
                field.placeholder = requiredMessage; // Mensaje para campo obligatorio
                // charCounter.textContent = ''; // Limpiar el contador
            } else if (minLength && value.length < minLength) {
                field.classList.add('error');
                field.style.borderColor = 'red';
                field.placeholder = minLengthMessage.replace('X', minLength); // Mensaje de longitud mínima
                field.value = '';
                // charCounter.textContent = ''; // Limpiar el contador
            } else {
                field.classList.remove('error');
                field.style.borderColor = ''; // Restablecer el borde si cumple con el mínimo
                field.placeholder = ''; // Limpiar el placeholder si está correcto
            }
        });
          // Evento focus para eliminar el borde rojo
    field.addEventListener('focus', function() {
        field.classList.remove('error'); // Eliminar el estilo de error
        field.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
    });
};
    
    
    const textarea = document.getElementById('descripcion');
    const charCounter = document.getElementById('charCounter');
    const minLength = 20; // Mínimo de caracteres requerido
    
    // Contador de caracteres en el textarea
    textarea.addEventListener('input', function () {
        const currentLength = textarea.value.length; // Longitud actual del texto
        const remainingChars = minLength - currentLength; // Cuántos faltan para el mínimo
    
        // Actualizar el contador de caracteres
        if (remainingChars > 0) {
            charCounter.textContent = `Faltan ${remainingChars} caracteres para el mínimo requerido (20).`;
            // charCounter.classList.remove('error');
            charCounter.classList.add('error'); // Mantener el contador en rojo si faltan caracteres
            textarea.style.borderColor = ''; // Eliminar borde rojo al escribir aunque no llegue al mínimo
        } else {
            charCounter.textContent = `Has alcanzado el mínimo de caracteres requeridos.`;
            charCounter.classList.remove('error'); // Asegurarse de que no esté en rojo si alcanzó el mínimo
            textarea.classList.remove('error'); // Asegurarse de que el textarea no esté en rojo si alcanzó el mínimo
            textarea.style.borderColor = ''; // Quitar borde rojo si alcanzó el mínimo
        }
    });
    
    // Evento blur para cuando el usuario sale del textarea
    textarea.addEventListener('blur', function() {
        const currentLength = textarea.value.length;
        
        // Si el número de caracteres es menor al mínimo, mostrar el contador en rojo
        if (currentLength < minLength) {
            charCounter.classList.add('error');
            textarea.classList.add('error');
            textarea.style.borderColor = 'red'; // Mantener el borde rojo si no cumple el mínimo
        } else {
            charCounter.classList.remove('error');
            textarea.classList.remove('error'); // Si se alcanza el mínimo, no aplicar el estilo de error
            textarea.style.borderColor = ''; // Quitar el borde rojo si cumple el mínimo
        }
    });

    
    
    // Evento focus para eliminar el borde rojo cuando el usuario vuelva a escribir
    textarea.addEventListener('focus', function() {
        textarea.style.borderColor = ''; // Quitar el borde rojo cuando el campo reciba foco
        const currentLength = textarea.value.length;
    
    // Si está por debajo del mínimo, mantener el contador en rojo
    if (currentLength < minLength) {
        charCounter.classList.add('error'); // Mantener el contador en rojo
        // textarea.style.borderColor = 'red'; // Mantener el borde rojo
    } else {
        charCounter.classList.remove('error'); // Eliminar el estilo de error si se cumple el mínimo
        // textarea.style.borderColor = ''; // Quitar borde rojo si cumple el mínimo
    }
    });
    // Validar producto
    let producto = document.querySelector('#producto');
    validateField(producto, 2, 'Debe ingresar el nombre del producto', 'El nombre debe tener al menos X caracteres');
    // Validar descripción
    let descripcion = document.querySelector('#descripcion');
    validateField(descripcion, 20, 'Debe ingresar una descripción');
    
    
    // Validar color
    let color = document.querySelector('#color');
    validateField(color, 1, 'Escribe el color');
    
    // Validar precio
    let precio = document.querySelector('#precio');
    validateField(precio, 1, 'Escribe el precio');
    

    document.getElementById('formulario').addEventListener('submit', function (e) {
        // e.preventDefault();

        let formIsValid = true;

        // Obtener el valor seleccionado del campo de marca
        const marcaSelect = document.getElementById('marca');
        const selectedMarcaValue = marcaSelect.value;
        const talleSelect = document.getElementById('talle');
        const selectedTalleValue = talleSelect.value;
        const nombre = document.getElementById('producto');
        const descripcion = document.getElementById('descripcion');
        const color = document.getElementById('color');
        const precio = document.getElementById('precio');
        const validateField = (field, minLength, requiredMessage, minLengthMessage) => {
       
                let value = field.value.trim();
                console.log('Valor del campo:', value);
                console.log('Longitud del campo:', value.length);
        
                // Verificar si el campo está vacío
                if (value.length === 0) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = requiredMessage; // Mensaje para campo obligatorio
                    // charCounter.textContent = ''; // Limpiar el contador
                } else if (minLength && value.length < minLength) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = minLengthMessage.replace('X', minLength); // Mensaje de longitud mínima
                    field.value = '';
                    // charCounter.textContent = ''; // Limpiar el contador
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = ''; // Restablecer el borde si cumple con el mínimo
                    field.placeholder = ''; // Limpiar el placeholder si está correcto
                }
            }

        // Limpiar mensaje de error previo
        // document.getElementById('marcaError').textContent = '';

        // Validar marca y talle
        if (!selectedMarcaValue) {
            formIsValid = false;
            // alert('Debe seleccionar una marca.');
        }

        if (!selectedTalleValue) {
            formIsValid = false;
            // alert('Debe seleccionar un talle.');
        }

        // Validar nombre
        const nombreValue = nombre.value.trim();
        if (nombreValue.length < 2) {
            validateField(producto, 2, 'Debe ingresar el nombre del producto', 'El nombre debe tener al menos X caracteres');

            formIsValid = false;
            // alert('El nombre debe tener al menos 2 caracteres.');
        }

        // Validar Descripción
        const descripcionValue = descripcion.value.trim();
        if (descripcionValue.length < 20) {
            validateField(descripcion, 20, 'Debe ingresar una descripción');

            formIsValid = false;
            // alert('La descripción debe tener al menos 20 caracteres.');
        }
        // Validar Color
        const colorValue = color.value.trim();
        if (colorValue.length < 1) {
            formIsValid = false;
            validateField(color, 1, 'Escribe el color');

            // alert('Debe ingresr el color.');
        }
        // Validar Precio
        const precioValue = precio.value.trim();
        if (precioValue.length < 1) {
            validateField(precio, 1, 'Escribe el precio');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }

        // Si el formulario no es válido, evitar el envío
        if (formIsValid) {
            // Aquí se puede proceder con el envío del formulario si es válido
            // e.target.reset();
            // Swal.fire({
            //     title: 'Éxito!',
            //     text: 'Producto creado con éxito.',
            //     icon: 'success',
            //     confirmButtonText: 'Aceptar'
            // });
            // alert('Formulario enviado con éxito.');
        } else {
            e.preventDefault();
            Swal.fire({
                title: 'Error',
                text: 'Debes completar todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }); // Evita que el formulario se envíe si no es válido
        }
    });

    document.querySelector('#imagen').addEventListener('change', function () {
        const imagen = document.querySelector('#imagen');
        const file = imagen.files[0];  // Captura el archivo subido

        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];  // Extensiones válidas
            const fileName = file.name.toLowerCase();  // Nombre del archivo en minúsculas. Y la razón por la que se hace esto es porque las extensiones de archivo son sensibles a mayúsculas y minúsculas. Y además se hace esto para que el usuario pueda subir archivos con mayúsculas o minúsculas.
            const fileExtension = fileName.split('.').pop();  // Extraer la extensión del archivo

            if (!allowedExtensions.includes(fileExtension)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Solo se permiten archivos de imagen: ' + allowedExtensions.join(', '),
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                // alert('Solo se permiten archivos de imagen: ' + allowedExtensions.join(', ')); //esta linea hace lo siguiente: si el archivo no es una imagen, muestra un alert con el mensaje que se encuentra entre comillas. Es decir, si el archivo no es una imagen, se mostrará un mensaje que dice "Solo se permiten archivos de imagen: jpg, jpeg, png, gif"
                imagen.value = '';  // Limpiar el input si no es válido
            } else {
                // Aquí puedes proceder con el procesamiento del archivo válido
                console.log('Archivo válido: ', file.name);
            }
        }
    });

});
