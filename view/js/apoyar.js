// Cargar donaciones al cargar la página
document.addEventListener('DOMContentLoaded', cargarDonaciones);
//------------Donacion cafe start-------

function seleccionarCantidad(cantidad) {
    actualizarCantidadPersonalizada(cantidad);
    actualizarTotalSoporte(cantidad);
}

function getCantidadSeleccionada() {
    return parseFloat(document.getElementById('cantidadPersonalizada').value) || 0;
}

function getMensaje() {
    return document.getElementById('mensaje').value;
}

function actualizarCantidadPersonalizada(cantidad) {
    document.getElementById('cantidadPersonalizada').value = cantidad === 0 ? '' : cantidad;
}

function actualizarTotalSoporte(cantidad) {
    var totalSoporteElement = document.getElementById('totalSoporte');

    // Verifica si la cantidad está entre 0 y 100
    if (cantidad >= 0 && cantidad <= 100) {
        // Muestra la cantidad en el total
        totalSoporteElement.innerText = cantidad.toFixed(0);
    } else {
        // Si no está en el rango, muestra 0€
        totalSoporteElement.innerText = '0';
    }
}

// Añadir evento input para validar la entrada en el campo de cantidad personalizada
document.getElementById('cantidadPersonalizada').addEventListener('input', function () {
    var cantidadInput = this.value;

    // Reemplaza todo lo que no sea un número con una cadena vacía
    var cantidadNumerica = cantidadInput.replace(/[^\d.]/g, '');

    // Si la entrada está vacía, establece la cantidad en 0
    if (cantidadNumerica === '') {
        cantidadNumerica = 0;
    }

    // Convierte la cantidad a un número flotante
    cantidadNumerica = parseFloat(cantidadNumerica);

    // Verifica si la cantidad está en el rango de 0 a 100
    if (!isNaN(cantidadNumerica)) {
        cantidadNumerica = Math.min(100, Math.max(0, cantidadNumerica));
    }

    // Actualiza el campo de cantidad personalizada y el total de soporte
    actualizarCantidadPersonalizada(cantidadNumerica);
    actualizarTotalSoporte(cantidadNumerica);
});

// Incluir el SDK de PayPal
paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: getCantidadSeleccionada().toString()
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            // Lógica después de un pago exitoso
            // Redirige a la página de éxito de donación
            window.location.href = `donacion_exitosa.html?nombre=${details.payer.name.given_name}&cantidad=${getCantidadSeleccionada()}`;
        });
    },
    // Configura las credenciales aquí
    client: {
        sandbox: 'AT-FpvT_iWqLPgQBMCU_L-ohOjzVPtVL3QV-gZCb2RI1Wc3SimIF5hiw8bncw9s9HnvVAM92BLnUM973',
        // production: 'AUP12vPigK8ANBi187po0u3M2mQreUtlRK83g91lUd58WGwLVvnU1MSTcHEC6gAes_nsCVyPZtT3STIG'
    }
}).render('#paypal-button-container');

//------------Donacion cafe end-------

/*function cargarDonaciones() {
    // En GitHub Pages, no podemos usar PHP para hacer solicitudes al servidor, por lo que esta parte debería estar adaptada
    // Aquí se utiliza una URL de ejemplo que puedes reemplazar por una fuente de datos que esté en un archivo JSON o un backend accesible
    var url = '../../controller/cDonations.php'; // Aquí depende de tu estructura, este código no funcionará sin un backend real

    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
        var myHtml = "";
        var donaciones = result.list;

        for (let i = 0; i < donaciones.length; i++) {
            myHtml += `<div class='item' style="text-align: center; margin: 20px; display: flex; flex-direction: column; align-items: center;">
                <h3 style="margin-top: 10px; color: #000; line-height: 26px; font-weight: 600 !important; letter-spacing: 1px !important; text-transform: uppercase; font-size: 14px !important; margin-bottom: 5% !important; ">${donaciones[i].nombre}</h3>
                <p>Mensaje: "${donaciones[i].mensaje}"</p>
                <p>Cantidad Donada: ${donaciones[i].cantidad}€</p>
            </div>`;
        }

        document.getElementById('donaciones').innerHTML = myHtml;

        // Carousel (Con la librería OwlCarousel), Autoplay Carousel
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 3, // Número de elementos a mostrar en el carrusel
            loop: true, // Repetir el carrusel infinitamente
            margin: 10, // Espaciado entre elementos
            autoplay: true, // Reproducción automática del carrusel
            autoplayTimeout: 2000, // Tiempo de espera entre transiciones (en milisegundos)
            autoplayHoverPause: true, // Pausar la reproducción automática al pasar el ratón sobre el carrusel
            responsive: { // Configuración responsiva para diferentes tamaños de pantalla
                0: {
                    items: 1 // Para pantallas más pequeñas, muestra solo 1 elemento a la vez
                },
                600: {
                    items: 2 // Para pantallas medianas, muestra 2 elementos a la vez
                },
                1000: {
                    items: 3 // Para pantallas más grandes, muestra 3 elementos a la vez
                }
            }
        });
    })
    .catch(error => console.error('Error status:', error)); 
}*/


function cargarDonaciones() {
    // Datos simulados para la vista previa de donaciones
    var donaciones = [
        { nombre: "María López", mensaje: "Juntos podemos más", cantidad: 4 },
        { nombre: "Pedro Benito", mensaje: "Por un futuro mejor", cantidad: 6 },
        { nombre: "Lucía Martínez", mensaje: "¡A ayudar siempre!", cantidad: 7 },
        { nombre: "Javier Ruiz", mensaje: "Por los que más lo necesitan", cantidad: 3 },
        { nombre: "Laura Fernández", mensaje: "Cada pequeña ayuda cuenta", cantidad: 2 },
        { nombre: "Raúl González", mensaje: "Por un mundo más justo", cantidad: 8 },
        { nombre: "Carmen Díaz", mensaje: "Siempre apoyando causas nobles", cantidad: 5 },
        { nombre: "Sergio Ramírez", mensaje: "La solidaridad es nuestro mejor camino", cantidad: 9 },
        { nombre: "Ana María Pérez", mensaje: "Un granito de arena", cantidad: 1 },
        { nombre: "David García", mensaje: "Porque todos merecemos un mejor futuro", cantidad: 6 },
        { nombre: "Clara Fernández", mensaje: "Con amor y esperanza", cantidad: 4 },
        { nombre: "Andrés Jiménez", mensaje: "Cada gesto cuenta", cantidad: 10 }
    ];

    var myHtml = "";
    for (let i = 0; i < donaciones.length; i++) {
        myHtml += `
            <div class='item donation-card'>
                <h3 class='donacion-nombre'>${donaciones[i].nombre}</h3>
                <p class='donacion-mensaje'>"${donaciones[i].mensaje}"</p>
                <p class='donacion-cantidad'>Cantidad Donada: <span class='cantidad-highlight'>${donaciones[i].cantidad}€</span></p>
            </div>`;
    }
    document.getElementById('donaciones').innerHTML = myHtml;

    // Carousel (Con la librería OwlCarousel), Autoplay Carousel
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 3, // Número de elementos a mostrar en el carrusel
        loop: true, // Repetir el carrusel infinitamente
        margin: 15, // Espaciado entre elementos
        autoplay: true, // Reproducción automática del carrusel
        autoplayTimeout: 3000, // Tiempo de espera entre transiciones (en milisegundos)
        autoplayHoverPause: true, // Pausar la reproducción automática al pasar el ratón sobre el carrusel
        smartSpeed: 600, // Velocidad de transición suave
        dots: true, // Mostrar indicadores de puntos
        responsive: { // Configuración responsiva para diferentes tamaños de pantalla
            0: {
                items: 1 // Para pantallas más pequeñas, muestra solo 1 elemento a la vez
            },
            600: {
                items: 2 // Para pantallas medianas, muestra 2 elementos a la vez
            },
            1000: {
                items: 3 // Para pantallas más grandes, muestra 3 elementos a la vez
            }
        }
    });
}