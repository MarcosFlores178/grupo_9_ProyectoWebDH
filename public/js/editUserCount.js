window.addEventListener('load', function() {
    const button = document.getElementById('enablePasswordChange');
    const newPassword = document.getElementById('newP');
    const confirmNewPassword = document.getElementById('confirmNewP');

    button.addEventListener('click', function() {
        if (newPassword.disabled) {
            // Habilita los campos de nueva contraseña y confirmación
            newPassword.disabled = false;
            confirmNewPassword.disabled = false;
            // Cambia el texto del botón a "Cancelar cambio de contraseña"
            this.textContent = 'Cancelar cambio de contraseña';
        } else {
            // Deshabilita los campos de nueva contraseña y confirmación
            newPassword.disabled = true;
            confirmNewPassword.disabled = true;
            // Cambia el texto del botón a "Cambiar contraseña"
            this.textContent = 'Habilitar cambio de contraseña';
        }
    });
 

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
        const validateFieldBlur = (field, minLength, message) => {
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
        let usuario = document.querySelector('#nombreUsuario');
    validateFieldBlur(usuario, 1, 'Escribe un nombre de Usuario');

    // Validar Email y Confirmación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let email = document.querySelector('#email');
    email.addEventListener('blur', function () {
        let valorEmail = email.value.trim();
        if (!emailRegex.test(valorEmail)) {
            email.classList.add('error');
            email.style.borderColor = 'red';
            email.placeholder = 'Introduce un email válido';
            email.value = ''; 
        } else {
            email.placeholder = '';  
            email.classList.remove('error'); 
            email.style.borderColor = ''; 
        }
        email.addEventListener('focus', function() {
            email.classList.remove('error'); // Eliminar el estilo de error
            email.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });

    let emailVerify = document.querySelector('#emailVerify');
    emailVerify.addEventListener('blur', function () {
        let valorEmailVerify = emailVerify.value.trim();
        if (!emailRegex.test(valorEmailVerify)) {
            emailVerify.classList.add('error');
            emailVerify.style.borderColor = 'red';
            emailVerify.placeholder = 'Confirma tu Email';
            emailVerify.value = '';
        } else if (valorEmailVerify !== email.value.trim()) {
            emailVerify.classList.add('error');
            emailVerify.style.borderColor = 'red';
            emailVerify.placeholder = 'Los emails no coinciden';
            emailVerify.value = '';
        } else {
            emailVerify.placeholder = '';  
            emailVerify.classList.remove('error'); 
            emailVerify.style.borderColor = ''; 
        }
        emailVerify.addEventListener('focus', function() {
            emailVerify.classList.remove('error'); // Eliminar el estilo de error
            emailVerify.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });

    // Validar Contraseña y Confirmación de Contraseña
    let password = document.querySelector('#newP');
    validateField(password, 8, 'Escribe una contraseña');

    let passwordVerify = document.querySelector('#confirmNewP');
    passwordVerify.addEventListener('blur', function () {
        if (passwordVerify.value.trim() === '') {
            passwordVerify.classList.add('error');
            passwordVerify.style.borderColor = 'red';
            passwordVerify.placeholder = 'Confirma tu contraseña';
            passwordVerify.value = '';
        } else if (passwordVerify.value.trim() !== password.value.trim()) {
            passwordVerify.classList.add('error');
            passwordVerify.style.borderColor = 'red';
            passwordVerify.placeholder = 'Las contraseñas no coinciden';
            passwordVerify.value = '';
        } else {
            passwordVerify.placeholder = '';  
            passwordVerify.classList.remove('error'); 
            passwordVerify.style.borderColor = ''; 
        }
        passwordVerify.addEventListener('focus', function() {
            passwordVerify.classList.remove('error'); // Eliminar el estilo de error
            passwordVerify.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });
    document.getElementById('formulario').addEventListener('submit', function (e) {
           

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

       
        const nombreUsuario = document.getElementById('nombreUsuario');
    
        const email = document.getElementById('email');
        const emailVerify = document.getElementById('emailVerify');
        const newP = document.getElementById('newP');
        const confirmNewP = document.getElementById('confirmNewP');
        const admin = document.getElementById('admin');
        const comp = document.getElementById('comp');
        const errorMessage = document.getElementById("error-message");

    

        // Validar Descripción
      
        const nombreUsuarioValue = nombreUsuario.value.trim();
        if (nombreUsuarioValue.length < 1) {
            validateField(usuario, 1, 'Escribe un nombre de Usuario');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
   
        const emailValue = email.value.trim();
        if (emailValue.length < 1) {
            validateField(email, 1, 'Introduce un email válido');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const emailVerifyValue = emailVerify.value.trim();
        if (emailVerifyValue.length < 1) {
            validateField(emailVerify, 1, 'Introduce un email válido');

            formIsValid = false;

            // alert('Debe ingresar el precio.');
        }
        const passwordValue = newP.value.trim();
        if (passwordValue.length < 1) {
            validateField(password, 8, 'Escribe una contraseña');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const passwordVerifyValue =confirmNewP.value.trim();
        if (passwordVerifyValue.length < 1) {
            validateField(passwordVerify, 8, 'Escribe una contraseña');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const adminValue = admin.checked;
        const compValue = comp.checked;
        if (!adminValue && !compValue) {
            errorMessage.textContent = "Debes seleccionar una opción.";
            formIsValid = false;
            
        }
        else { errorMessage.textContent = ""; }
        

        // Si el formulario no es válido, evitar el envío
        if (formIsValid) {
            // Aquí se puede proceder con el envío del formulario si es válido
            alert('Formulario enviado con éxito.');
            console.log(formIsValid);

        } else {
            alert('Debe completar todos los campos');
            
            e.preventDefault();
             // Evita que el formulario se envíe si no es válido
        }
    });
});
