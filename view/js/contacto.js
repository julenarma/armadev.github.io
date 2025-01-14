document.addEventListener("DOMContentLoaded", function () {
    // Inicializar EmailJS
    emailjs.init({
        publicKey: "6hyWYVyeV1RABuFLB",
    });
});

// Validar formato del correo electrónico
function esCorreoValido(correo) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Enviar formulario de contacto
function enviarContactoForm() {
    // Desactivar el botón de envío para evitar múltiples clics
    var botonEnviar = $("#botonContactoEnviar");
    botonEnviar.prop("disabled", true);
    botonEnviar.text("Enviando..."); // Cambiar texto del botón para dar retroalimentación al usuario

    // Obtener vaores de los campos del formulario
    var nombre = $("#nombreContacto").val();
    var email = $("#emailContacto").val();
    var asunto = $("#asuntoContacto").val();
    var mensaje = $("#mensajeContacto").val();

    // Validar campos
    if (!nombre || !email || !asunto || !mensaje) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
        });
        botonEnviar.prop("disabled", false); // Reactivar el botón
        botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
        return;
    }

    if (!esCorreoValido(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'Introduce un correo electrónico válido.',
        });
        botonEnviar.prop("disabled", false); // Reactivar el botón
        botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
        return;
    }

    // Datos para enviar a MySQL y EmailJS
    var data = {
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje,
    };

    // 1. Insertar en la base de datos (PHP)
    fetch('../../controller/cInsertContact.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response) => {
            if (!response.error) {
                console.log("Datos guardados en la base de datos:", data);

                // 2. Enviar correo con EmailJS
                enviarEmailJS(data, botonEnviar);
            } else {
                // Mostrar mensaje único de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al procesar tu mensaje. Intenta nuevamente.',
                });
                botonEnviar.prop("disabled", false); // Reactivar el botón
                botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
            }
        })
        .catch((error) => {
            console.error("Error al guardar en la base de datos:", error);
            // Mostrar mensaje único de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron guardar los datos. Intenta más tarde.',
            });
            botonEnviar.prop("disabled", false); // Reactivar el botón
            botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
        });
}

// Función para enviar correo con EmailJS
function enviarEmailJS(data, botonEnviar) {
    console.log("Datos enviados a EmailJS:", data);
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
            // Mostrar mensaje único de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Tu mensaje fue enviado correctamente.',
            });

            // Limpiar campos del formulario después de éxito en ambos procesos
            $("#nombreContacto").val("");
            $("#emailContacto").val("");
            $("#asuntoContacto").val("");
            $("#mensajeContacto").val("");

            // Reactivar el botón después de enviar el mensaje
            botonEnviar.prop("disabled", false);
            botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
            // Mostrar mensaje único de error
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el correo',
                text: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.',
            });

            // Reactivar el botón después de error
            botonEnviar.prop("disabled", false);
            botonEnviar.text("Enviar mensaje"); // Restablecer el texto del botón
        });
}