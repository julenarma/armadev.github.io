document.addEventListener("DOMContentLoaded", function () {
    // Inicializar EmailJS
    emailjs.init({
        publicKey: "6hyWYVyeV1RABuFLB",
    });
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
    var botonEnviar = $("#botonContactoEnviar");
    botonEnviar.prop("disabled", true);
    botonEnviar.text("Enviando...");

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
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
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
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
        return;
    }

    // Datos a enviar a MySQL y EmailJS
    var data = {
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje,
    };

    // Ahora solo enviar el correo con EmailJS
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
        Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por ponerte en contacto. He recibido tu mensaje y lo revisaré tan pronto como sea posible.',
            background: '#343a40',  // Fondo oscuro
            color: '#f8f9fa',  // Texto claro
            iconColor: '#28a745',  // Color del ícono de éxito (verde)
            confirmButtonColor: '#007bff', // Color del botón (azul)
        });
        $("#nombreContacto").val("");
        $("#emailContacto").val("");
        $("#asuntoContacto").val("");
        $("#mensajeContacto").val("");

        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
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
