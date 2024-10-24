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
