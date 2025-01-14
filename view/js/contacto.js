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

    // Validación de campos vacíos
    if (!nombre || !email || !asunto || !mensaje) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
            background: '#343a40',
            color: '#f8f9fa',
            iconColor: '#ffc107',
            confirmButtonColor: '#007bff',
        });
        return;
    }

    // Validación de correo electrónico
    if (!esCorreoValido(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'Introduce un correo electrónico válido.',
            background: '#343a40',
            color: '#f8f9fa',
            iconColor: '#dc3545',
            confirmButtonColor: '#007bff',
        });
        return;
    }

    // Verificar el tiempo restante para el próximo envío
    var tiempoEnvio = localStorage.getItem('ultimoEnvio');
    if (tiempoEnvio) {
        var tiempoRestante = (Date.now() - tiempoEnvio) / 1000; // tiempo en segundos
        if (tiempoRestante < 180) { // Si han pasado menos de 20 segundos
            Swal.fire({
                icon: 'info',
                title: 'Espera antes de enviar otro mensaje',
                text: 'Ya has enviado un mensaje recientemente. Por favor, espera unos minutos antes de intentar nuevamente.',
                background: '#343a40',
                color: '#f8f9fa',
                iconColor: '#17a2b8',
                confirmButtonColor: '#007bff',
            });
            return; // No continuar con el envío si el tiempo de espera no ha pasado
        }
    }

    // Si todas las validaciones son correctas, proceder con el envío
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

        // Guardar el tiempo de envío en localStorage (tiempo actual)
        localStorage.setItem('ultimoEnvio', Date.now());

        Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por ponerte en contacto. He recibido tu mensaje y lo revisaré tan pronto como sea posible.',
            background: '#343a40',
            color: '#f8f9fa',
            iconColor: '#28a745',
            confirmButtonColor: '#007bff',
        });

        // Limpiar los campos del formulario
        $("#nombreContacto").val("");
        $("#emailContacto").val("");
        $("#asuntoContacto").val("");
        $("#mensajeContacto").val("");

        // Volver a habilitar el botón
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
    })
    .catch((error) => {
        console.error("Error al enviar el correo:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.',
            background: '#343a40',
            color: '#f8f9fa',
            iconColor: '#dc3545',
            confirmButtonColor: '#007bff',
        });
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
    });
}