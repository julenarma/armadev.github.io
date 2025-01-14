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

    // Guardar en MySQL
    fetch('path_to_backend/cInsertContact.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((response) => {
        if (!response.error) {
            console.log("Datos guardados en la base de datos:", data);
            // Enviar el correo con EmailJS
            enviarEmailJS(data, botonEnviar);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al procesar tu mensaje. Intenta nuevamente.',
            });
            botonEnviar.prop("disabled", false);
            botonEnviar.text("Enviar mensaje");
        }
    })
    .catch((error) => {
        console.error("Error al guardar en la base de datos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron guardar los datos. Intenta más tarde.',
        });
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
    });
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
            text: 'Tu mensaje fue enviado correctamente.',
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
        });
        botonEnviar.prop("disabled", false);
        botonEnviar.text("Enviar mensaje");
    });
}
