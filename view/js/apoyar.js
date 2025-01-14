// Cargar donaciones al cargar la página
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

    // Verifica si la cantidad está entre 0 y 10
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

    // Verifica si la cantidad está en el rango de 0 a 10z
    if (!isNaN(cantidadNumerica)) {
        cantidadNumerica = Math.min(100, Math.max(0, cantidadNumerica));
    }


    // Actualiza el campo de cantidad personalizada y el total de soporte
    actualizarCantidadPersonalizada(cantidadNumerica);
    actualizarTotalSoporte(cantidadNumerica);
});

// Incluir el SDK de PayPal

paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: getCantidadSeleccionada().toString() // Usa la cantidad seleccionada
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Lógica después de un pago exitoso
            procesarDonacion();
        });
    },
    client: {
        sandbox: 'AT-FpvT_iWqLPgQBMCU_L-ohOjzVPtVL3QV-gZCb2RI1Wc3SimIF5hiw8bncw9s9HnvVAM92BLnUM973',  // Client ID de sandbox (modo de prueba)
        // production: 'tu-client-id-aqui'  // Descomenta y reemplaza con tu client ID de producción cuando sea necesario
    },
    components: ['buttons', 'applepay'],  // Incluir el componente de Apple Pay
    applePay: {
        enabled: true,  // Habilitar Apple Pay
        merchantCapabilities: ['supports3DS', 'supportsDebit', 'supportsCredit'],  // Capacidades requeridas por Apple Pay
        countryCode: 'US',  // Código de país (modificar si es necesario)
        currencyCode: 'USD', // Moneda en la que se realizará el pago
    }
}).render('#paypal-button-container'); // Renderizar el botón de PayPal en el contenedor con id 'paypal-button-container'

function procesarDonacion() {

    var nombre = document.getElementById('donacionNombre').value;
    var mensaje = document.getElementById('donacionMensaje').value;
    var cantidad = document.getElementById('totalSoporte').innerText; // Cambiado a innerText

    var url = '../../controller/cInsertDonation.php';
    var data = {
        'nombre': nombre,
        'mensaje': mensaje,
        'cantidad': cantidad,
    };
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(result => {
            if (!result.error) {
                // Redirige a la página de donación exitosa y pasa los datos como parámetros de la URL
                window.location.href = `../pages/donacion_exitosa.html?nombre=${nombre}&cantidad=${cantidad}`;
            } else {
                // Muestra un mensaje de error al usuario o redirige a una página de error
                console.error('Error en la solicitud al servidor:', result.message);
                // Puedes redirigir a la página de error si es necesario
                window.location.href = '../pages/donacion_error.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//------------Donacion cafe end-------

function cargarDonaciones() {
    var url = '../../controller/cDonations.php';

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

            //Carousel(Con la librería OwlCarousel), Autoplay Carousel
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

}