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
})
//---------------------------------Validación de Apellido----------------------------------------
window.addEventListener('load', function(){
    let telefono = document.querySelector('#apellido')
    
    telefono.addEventListener ('blur', function(e){
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
})
//---------------------------------Validación de DNI----------------------------------------------
window.addEventListener('load', function(){
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
})
//---------------------------------Validación de Telefono-----------------------------------------
window.addEventListener('load', function(){
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
})
//---------------------------------Validación de Domicilio----------------------------------------
window.addEventListener('load', function(){
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
})
//---------------------------------Validación de Pais---------------------------------------------
    window.addEventListener('load', function(){
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
    })

//---------------------------------Validación de Usuarios---------------------------------------------

window.addEventListener('load', function(){
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
})

//---------------------------------Validación de Email---------------------------------------------

window.addEventListener('load', function(){
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
})

//---------------------------------Confirmación de Email---------------------------------------------

window.addEventListener('load', function(){
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
})

//---------------------------------Validación de Contraseña---------------------------------------------

window.addEventListener('load', function(){
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
})

//---------------------------------Confirmación de Password---------------------------------------------

window.addEventListener('load', function(){
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