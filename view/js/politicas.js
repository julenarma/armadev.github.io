$(document).scroll(function () {
    if (window.pageYOffset >= 500) {
      $('.go-top').show();
    } else {
      $('.go-top').hide();
    }
  });
  
  // Adjuntar el controlador de clic fuera del controlador de desplazamiento
  $('.go-top').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });
  
  window.onscroll = function () {
    stickyMenu();
  };
  
  
  var image = document.getElementById('scrollImage');
  var navbar = document.getElementById('navbar');
  var navText = document.querySelector('.nav1-principal');
  var toggleMenu = document.getElementById('toggleMenu');
  var goTopButton = document.querySelector('.go-top');
  var sticky = navbar.offsetTop;
  var on_off = true;
  
  
  
  /*Responsive Menu*/
  
  toggleMenu.addEventListener('click', function () {
    if (on_off) {
      //Si es true que no se desplace
      navText.style.left = '0';
      on_off = false; // lo desactivamos porque ya está activado
      navbar.classList.add('sticky');
      toggleMenu.style.color = 'white';
      goTopButton.style.visibility = 'hidden'; // Muestra el botón "Go top" al cerrar el menú
      disableScroll();
  
    } else {
      //Si es false que se desplace
      navText.style.left = '-120%';
      navbar.classList.remove('sticky');
      toggleMenu.style.color = 'white';
      goTopButton.style.visibility = 'visible'; // Muestra el botón "Go top" al cerrar el menú
      on_off = true; // lo activamos para que funcione ya que está cerrado
      enableScroll()
    }
  
  })
  // Funciones para desactivar y activar el scroll
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  
  function enableScroll() {
    document.body.style.overflow = 'auto';
  }
  
  function stickyMenu() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky');
     
    } else {
      navbar.classList.remove('sticky');
    
    }
  }