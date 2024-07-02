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