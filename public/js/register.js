document.getElementById('button-search').addEventListener('click', function() {
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

window.addEventListener('resize', function() {
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
<<<<<<< HEAD
//---------------------------------Validación de Nombre------------------------------------------
window.addEventListener('load', function(){
    let nombre = document.querySelector('#nombre')
    nombre.addEventListener ('blur', function(e){
        if(nombre.value.trim() === ''){
            nombre.classList.add('error');
            nombre.style.borderColor = 'red';
            nombre.placeholder = 'Escribe tus Nombres';
            nombre.value = '';
            
                    } 
        else {
            nombre.placeholder = '';  
            nombre.classList.remove('error'); 
            nombre.style.borderColor = ""; 
                      }

    })

//---------------------------------Validación de Apellido----------------------------------------

    let apellido = document.querySelector('#apellido')
    
    apellido.addEventListener ('blur', function(e){
        if(apellido.value.trim() === ''){
            apellido.classList.add('error');
            apellido.style.borderColor = 'red';
            apellido.placeholder = 'Escribe tus Apellido';
            apellido.value = '';
                    }
        else {
            apellido.placeholder = '';  
            apellido.classList.remove('error'); 
            apellido.style.borderColor = ""; 
                                  }

    })

//---------------------------------Validación de DNI----------------------------------------------

    let dni = document.querySelector('#dni')
    
    dni.addEventListener ('blur', function(e){
        if(dni.value.trim() === ''){
            dni.classList.add('error');
            dni.style.borderColor = 'red';
            dni.placeholder = 'Escribe tu DNI';
            dni.value = '';
                    }
        else {
            dni.placeholder = '';  
            dni.classList.remove('error'); 
            dni.style.borderColor = ""; 
                                  }

    })

//---------------------------------Validación de Telefono-----------------------------------------

    let telefono = document.querySelector('#telefono')
    
    telefono.addEventListener ('blur', function(e){
        if(telefono.value.trim() === ''){
            telefono.classList.add('error');
            telefono.style.borderColor = 'red';
            telefono.placeholder = 'Escribe tu Teléfono';
            telefono.value = '';
                    }
        else {
            telefono.placeholder = '';  
            telefono.classList.remove('error'); 
            telefono.style.borderColor = ""; 
                                              }

    })

//---------------------------------Validación de Domicilio----------------------------------------

    let domicilio = document.querySelector('#domicilio')
    
    domicilio.addEventListener ('blur', function(e){
        if(domicilio.value.trim() === ''){
            domicilio.classList.add('error');
            domicilio.style.borderColor = 'red';
            domicilio.placeholder = 'Escribe tu Domicilio';
            domicilio.value = '';
                    }
        else {
            domicilio.placeholder = '';  
            domicilio.classList.remove('error'); 
            domicilio.style.borderColor = ""; 
                                              }

    })

//---------------------------------Validación de Pais---------------------------------------------

        let pais = document.querySelector('#country')
    
        pais.addEventListener ('blur', function(e){
            if(pais.value.trim() === ''){
                pais.classList.add('error');
                pais.style.borderColor = 'red';
                pais.placeholder = 'Escribe tu país';
                pais.value = '';
                        }
            else {
                pais.placeholder = '';  
                pais.classList.remove('error'); 
                pais.style.borderColor = ""; 
                                                  }
    
        })
   

//---------------------------------Validación de Usuarios---------------------------------------------


    let usuario = document.querySelector('#nombreUsuario')
    
    usuario.addEventListener ('blur', function(e){
        if(usuario.value.trim() === ''){
            usuario.classList.add('error');
            usuario.style.borderColor = 'red';
            usuario.placeholder = 'Escribe un nombre de Usuario';
            usuario.value = '';
                    }
        else {
            usuario.placeholder = '';  
            usuario.classList.remove('error'); 
            usuario.style.borderColor = ""; 
                                              }

    })


//---------------------------------Validación de Email---------------------------------------------

    let email = document.querySelector('#email')
    
    email.addEventListener ('blur', function(e){
        if(email.value.trim() === ''){
            email.classList.add('error');
            email.style.borderColor = 'red';
            email.placeholder = 'Escribe un Em@il válido';
            email.value = '';
                    }
        else {
            email.placeholder = '';  
            email.classList.remove('error'); 
            email.style.borderColor = ""; 
                                              }

    })


//---------------------------------Confirmación de Email---------------------------------------------

    let emailVerify = document.querySelector('#emailVerify')
    
    emailVerify.addEventListener ('blur', function(e){
        if(emailVerify.value.trim() === ''){
            emailVerify.classList.add('error');
            emailVerify.style.borderColor = 'red';
            emailVerify.placeholder = 'Confirma tu Em@il';
            emailVerify.value = '';
                    }
        else {
            emailVerify.placeholder = '';  
            emailVerify.classList.remove('error'); 
            emailVerify.style.borderColor = ""; 
                                              }

    })


//---------------------------------Validación de Contraseña---------------------------------------------

    let password = document.querySelector('#password')
    
    password.addEventListener ('blur', function(e){
        if(password.value.trim() === ''){
            password.classList.add('error');
            password.style.borderColor = 'red';
            password.placeholder = 'Escribe una contraseña';
            password.value = '';
                    }
        else {
            password.placeholder = '';  
            password.classList.remove('error'); 
            password.style.borderColor = ""; 
                                              }

    })


//---------------------------------Confirmación de Password---------------------------------------------

    let passwordVerify = document.querySelector('#passwordVerify')
    
    passwordVerify.addEventListener ('blur', function(e){
        if(passwordVerify.value.trim() === ''){
            passwordVerify.classList.add('error');
            passwordVerify.style.borderColor = 'red';
            passwordVerify.placeholder = 'Confirma tu contraseña';
            passwordVerify.value = '';
                    }
        else {
            passwordVerify.placeholder = '';  
            passwordVerify.classList.remove('error'); 
            passwordVerify.style.borderColor = ""; 
                                              }

    })
})
=======

window.addEventListener('load', function() {
    let nombre = document.querySelector('#nombre')
    let apellido = document.querySelector('#apellido')
    let dni = document.querySelector('#dni')
    let telefono = document.querySelector('#telefono')
    let ei = document.querySelector('#izquierda')
    let ed = document.querySelector('#derecha')
    nombre.addEventListener('blur', function (e){
        if(nombre.value == ''){
            nombre.style.borderColor= 'red';
            ei.innerText= 'campo vacio'
            ei.style.color= 'red'
        }
    })
    nombre.addEventListener('input', function(e) {
        if (nombre.value !== '') {
            nombre.style.borderColor = '';
            ei.innerText = '';
        }
    });
    apellido.addEventListener('blur', function (e){
        if(apellido.value == ''){
            apellido.style.borderColor= 'red';
            ed.innerText= 'campo vacio'
            ed.style.color= 'red'
        }
    })
    apellido.addEventListener('input', function(e) {
        if (apellido.value !== '') {
            apellido.style.borderColor = '';
            ed.innerText = '';
        }
    });
    dni.addEventListener('blur', function (e){
        if(dni.value == ''){
            dni.style.borderColor= 'red';
            ei.innerText= 'campo vacio'
            ei.style.color= 'red'
        }
    })
    dni.addEventListener('input', function(e) {
        if (dni.value !== '') {
            dni.style.borderColor = '';
            ei.innerText = '';
        }
    });
    telefono.addEventListener('blur', function (e){
        if(telefono.value == ''){
            telefono.style.borderColor= 'red';
            ed.innerText= 'campo vacio'
            ed.style.color= 'red'
        }
    })
    telefono.addEventListener('input', function(e) {
        if (telefono.value !== '') {
            telefono.style.borderColor = '';
            ed.innerText = '';
        }
    });
})
>>>>>>> main
