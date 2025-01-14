document.addEventListener("DOMContentLoaded", function () {
    // Inicializar EmailJS
    emailjs.init({
        publicKey: "6hyWYVyeV1RABuFLB",
    });

    // Scroll hacia la sección de contacto
    $('.button-contactame').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".white-section").offset().top
        }, 1000);
    });
});

// Variable para verificar si ya se envió un mensaje
var mensajeEnviado = false;
var tiempoRestante = 30; // Tiempo de espera en segundos

// Validar formato del correo electrónico
function esCorreoValido(correo) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function enviarContactoForm() {
    // Obtener valores de los campos
    var nombre = $("#nombreContacto").val();
    var email = $("#emailContacto").val();
    var asunto = $("#asuntoContacto").val();
    var mensaje = $("#mensajeContacto").val();

    // Validación de campos
    if (!nombre || !email || !asunto || !mensaje) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#ffc107',  // Color del ícono de advertencia (amarillo)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });
        return;
    }

    if (!esCorreoValido(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'Introduce un correo electrónico válido.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#dc3545',  // Color del ícono de error (rojo)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });
        return;
    }

    // Si ya se ha enviado un mensaje y los campos son válidos, mostrar el mensaje de advertencia
    if (mensajeEnviado) {
        Swal.fire({
            icon: 'info',
            title: 'Mensaje ya enviado',
            text: 'Tu mensaje ya ha sido enviado. Por favor, espera unos minutos antes de intentar nuevamente. Gracias por ponerte en contacto, pronto recibirás una respuesta.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#17a2b8',  // Color del ícono de información (azul)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });
        return;
    }

    var botonEnviar = $("#botonContactoEnviar");
    botonEnviar.prop("disabled", true);
    botonEnviar.text("Enviando...");

    // Datos a enviar
    var data = {
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje,
    };

    // Enviar mensaje usando EmailJS
    enviarEmailJS(data, botonEnviar);
}

// Función para enviar el correo con EmailJS
function enviarEmailJS(data, botonEnviar) {
    var service_id = 'service_fumdgpp';
    var template_id = 'template_0blrupb';

    emailjs.send(service_id, template_id, {
        from_name: data.nombre,
        from_email: data.email,
        subject: data.asunto,
        message: data.mensaje,
    })
    .then((response) => {
        console.log("Correo enviado con éxito:", response.status, response.text);

        // Cambiar la variable a true para indicar que el mensaje ya fue enviado
        mensajeEnviado = true;

        Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por ponerte en contacto. He recibido tu mensaje y lo revisaré tan pronto como sea posible.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#28a745',  // Color del ícono de éxito (verde)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });

        // Limpiar los campos del formulario
        $("#nombreContacto").val("");
        $("#emailContacto").val("");
        $("#asuntoContacto").val("");
        $("#mensajeContacto").val("");

        // Volver a habilitar el botón
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");

        // Iniciar el temporizador de 30 segundos
        setTimeout(function () {
            mensajeEnviado = false; // Restablecer el estado
        }, 180000); // 1 minuto (60000 milisegundos)
    })
    .catch((error) => {
        console.error("Error al enviar el correo:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#dc3545',  // Color del ícono de error (rojo)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
    });
}