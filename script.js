
    const btnMenu = document.getElementById('btn-menu');
    const nav = document.querySelector('nav');
    const linksMenu = document.querySelectorAll('nav ul li a');

    // Alterna a abertura do menu ao clicar no botão
    btnMenu.addEventListener('click', () => {
        nav.classList.toggle('menu-aberto');
        
        // Altera visualmente o ícone (fa-bars para fa-xmark)
        if (nav.classList.contains('menu-aberto')) {
            btnMenu.classList.remove('fa-bars');
            btnMenu.classList.add('fa-xmark');
        } else {
            btnMenu.classList.remove('fa-xmark');
            btnMenu.classList.add('fa-bars');
        }
    });

    // Fecha o menu automaticamente quando um link for clicado
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-aberto');
            btnMenu.classList.remove('fa-xmark');
            btnMenu.classList.add('fa-bars');
        });
    });