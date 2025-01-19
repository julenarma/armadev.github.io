$(document).scroll(function () {
  if (window.pageYOffset >= 500) {
    $('.go-top').show();
  } else {
    $('.go-top').hide();
  }
});

// Manejo del clic en el botón "Go Top"
$('.go-top').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 600, function () {
    window.scrollTo(0, 0);
  });
});

// Variables
var image = document.getElementById('scrollImage');
var navbar = document.getElementById('navbar');
var navText = document.querySelector('.nav1-principal');
var toggleMenu = document.getElementById('toggleMenu');
var goTopButton = document.querySelector('.go-top');
var body = document.getElementById('pageBody');
var darkModeToggle = document.getElementById('dark-mode-toggle');
var sticky = navbar.offsetTop;
var on_off = true;

// Estado del modo oscuro
let isDarkMode = localStorage.getItem('dark-mode') === 'enabled';


// Función stickyMenu actualizada
function stickyMenu() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('sticky');
    navbar.style.backgroundColor = body.classList.contains('dark-mode') ? 'black' : 'white'; // Estilo según el modo

    // Cambiar el logo y el color de los enlaces
    image.src = body.classList.contains('dark-mode') ? getRelativeImagePath('view/img/index/armadev_blanco.png') : getRelativeImagePath('view/img/index/armadev_azul.png');
    toggleMenu.style.color = body.classList.contains('dark-mode') ? 'white' : 'black';
    darkModeToggle.style.color = body.classList.contains('dark-mode') ? 'white' : 'black';

    // Si el modo oscuro está activado, aseguramos que el icono sea "sol"
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Modo oscuro activado: icono del sol
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Modo claro
    }

    navText.querySelectorAll('a').forEach(link => {
      link.style.color = body.classList.contains('dark-mode') ? 'white' : 'black'; // Colores de enlaces según el modo
      // Cambiar el borde de los enlaces activos
      if (link.classList.contains('active')) {
        link.style.borderBottom = body.classList.contains('dark-mode') ? '2px solid white' : '2px solid black';
      }
    });

    // Si el fondo es blanco, añadimos la clase 'white-background'
    if (!body.classList.contains('dark-mode')) {
      navbar.classList.add('white-background');
    } else {
      navbar.classList.remove('white-background');
    }
  } else {
    navbar.classList.remove('sticky');
    navbar.style.backgroundColor = 'transparent'; // Navbar transparente cuando no es sticky
    // No cambiar el icono del modo oscuro cuando el navbar es transparente
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Siempre sol si está en modo oscuro
    }

    toggleMenu.style.color = 'white';  // El menú siempre en blanco
    darkModeToggle.style.color = 'white';  // El botón siempre en blanco
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');  // Logo siempre blanco
    navText.querySelectorAll('a').forEach(link => {
      link.style.color = 'white'; // Los enlaces siempre en blanco
      if (link.classList.contains('active')) {
        link.style.borderBottom = '2px solid white'; // Borde blanco en modo transparente
      }
    });
    navbar.classList.remove('white-background'); // Elimina la clase 'white-background' cuando el navbar es transparente
  }
}
// Evento de scroll
window.onscroll = function () {
  stickyMenu();
};

// Cambiar el estado del menú
toggleMenu.addEventListener('click', function () {
  handleToggleMenu();
});

// Manejo de apertura y cierre del menú
function handleToggleMenu() {
  if (on_off) {
    openMenu();
  } else {
    closeMenu();
  }
  on_off = !on_off;
}

// Abrir menú
function openMenu() {
  navText.style.left = '0';
  body.classList.add('menu-open');
  goTopButton.style.visibility = 'hidden';
  document.body.style.overflow = 'hidden';

  // Cambiar el fondo del navbar y el logo solo si el menú está abierto
  updateNavbarAndLogo();
}

// Cerrar menú
function closeMenu() {
  navText.style.left = '-100%';
  body.classList.remove('menu-open');
  document.body.style.overflow = 'auto';
  goTopButton.style.visibility = 'visible';

  // Restaurar el navbar
 
  navbar.style.backgroundColor = 'transparent ';
  
  updateNavbarAndLogo();
}

// Actualizar el navbar y logo según el modo oscuro
function updateNavbarAndLogo() {
  // Verificar si el navbar está en la parte superior
  if (window.pageYOffset === 0) {
    navbar.style.backgroundColor = 'transparent'; // Navbar transparente
    toggleMenu.style.color = 'white';  // El menú siempre en blanco
    darkModeToggle.style.color = 'white';  // El botón siempre en blanco

    // Actualizar el icono del modo oscuro según el estado
    if (isDarkMode) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Modo claro (sol)
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Modo oscuro (luna)
    }

    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');  // Logo siempre blanco
    navText.querySelectorAll('a').forEach(link => {
      link.style.color = 'white'; // Los enlaces siempre en blanco
    });
  } else {
    // Cuando el navbar no está en la parte superior (es sticky)
    stickyMenu();
  }
}

// Cambiar Modo Oscuro
darkModeToggle.addEventListener('click', function () {
  handleDarkModeToggle();
});


// Función para manejar el modo oscuro
function handleDarkModeToggle() {
  // Cambiar la clase dark-mode en el body
  body.classList.toggle('dark-mode');
  isDarkMode = body.classList.contains('dark-mode');

  // Guardar la preferencia de modo oscuro en el almacenamiento local
  localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');

  // Actualizar el botón y otros elementos según el estado
  updateDarkModeButton();

  // Solo actualizar navbar si no está en la parte superior
  if (window.pageYOffset !== 0) {
    stickyMenu();
  } else {
    updateNavbarAndLogo();
  }
}

// Función para actualizar el botón de modo oscuro

function updateDarkModeButton() {
  if (isDarkMode) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Modo claro
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Modo oscuro
  }
}


// Manejo del redimensionamiento de la ventana
window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) {
    closeMenu();
    navbar.style.backgroundColor = 'transparent';
  } else if (body.classList.contains('menu-open')) {
    navbar.style.backgroundColor = 'black';
  }
});



// Cargar el estado del modo oscuro desde localStorage
if (isDarkMode) {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  updateDarkModeButton();  // Asegurarse de que el botón esté correctamente actualizado
}
// Función para obtener la ruta de la imagen relativa
function getRelativeImagePath(relativePath) {
  const currentUrl = window.location.href;
  const depth = (currentUrl.match(/\//g) || []).length;
  const prefix = Array(depth).fill('..').join('/') + '/';
  return prefix + relativePath;
}