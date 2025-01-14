// Agrega la función getParameterByName antes de su uso
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Agrega un script para recuperar los parámetros de la URL y mostrar la factura
document.addEventListener('DOMContentLoaded', function () {
  // Obtén los valores de la URL
  var nombre = getParameterByName('nombre');
  var cantidad = getParameterByName('cantidad');

  // Obtiene la fecha y hora actual
  var fechaHoraActual = obtenerFechaHoraActual();

  // Función para obtener la fecha y hora actual en el formato deseado

  function obtenerFechaHoraActual() {
    // Intenta obtener la fecha y hora almacenada en el almacenamiento local
    var fechaHoraAlmacenada = localStorage.getItem('fechaHoraDonacion');

    // Si no hay fecha y hora almacenada, obtén la fecha y hora actual
    if (!fechaHoraAlmacenada) {
      var fecha = new Date();

      // Obtiene los componentes de la fecha y hora
      var dia = fecha.getDate();
      var mes = fecha.getMonth() + 1; // Meses en JavaScript van de 0 a 11
      var anio = fecha.getFullYear();
      var horas = fecha.getHours();
      var minutos = fecha.getMinutes();
      var segundos = fecha.getSeconds();

      // Formatea la fecha y hora como DD/MM/AAAA HH:MM:SS
      var fechaHoraActual = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

      // Guarda la fecha y hora actual en el almacenamiento local
      localStorage.setItem('fechaHoraDonacion', fechaHoraActual);

      return fechaHoraActual;
    } else {
      // Si hay fecha y hora almacenada, devuelve esa fecha y hora
      return fechaHoraAlmacenada;
    }
  }


  // Intenta obtener la fecha y hora almacenada en el almacenamiento local
  var fechaHoraAlmacenada = localStorage.getItem(obtenerFechaHoraActual());

  // Si no hay fecha y hora almacenada, obtén la fecha y hora actual
  var fechaHoraActual = fechaHoraAlmacenada || obtenerFechaHoraActual();

  // Si no hay fecha y hora almacenada, guárdala en el almacenamiento local
  if (!fechaHoraAlmacenada) {
    localStorage.setItem('fechaHoraDonacion', fechaHoraActual);
  }

  // Agrega un evento de clic al botón para manejar la descarga
  var botonDescarga = document.getElementById('descargarFactura');
  botonDescarga.addEventListener('click', function () {
    descargarFactura(nombre, fechaHoraActual, cantidad);
  });

});


// Función para descargar la factura en formato PDF
function descargarFactura(nombre, fechaHora, cantidad) {
  // Crea el contenido HTML para la factura
  var contenidoFactura = `
  <div style="text-align: center; font-family: Arial, sans-serif; margin: 50px;">
  <h1 style="color: black; font-weight: 600; margin-top: 50px;">Factura de Donación</h1>
  <hr style="border: 1px solid #ccc;">
  <p style="font-size: 16px; margin-top: 20px;"><strong>Nombre:</strong> ${nombre}</p>
  <p style="font-size: 16px;"><strong>Fecha y Hora:</strong> ${fechaHora}</p>
  <p style="font-size: 16px;"><strong>Cantidad:</strong> ${cantidad}€</p>
  <!-- Puedes agregar más detalles si es necesario -->

  <div style="margin-top: 20px;">
    <p style="color: #333333;">¡Agradecemos tu generosidad! Tu donación ha sido procesada con éxito.</p>
  </div>

  <div style="margin-top: 20px;">
    <p style="color: #333333;">Por favor, encuentra adjunta la factura correspondiente a tu donación.</p>
  </div>

  <hr style="border: 1px solid #ccc; margin-top: 20px;">

  <p style="font-size: 14px; color: #888;">Gracias por tu apoyo.</p>
</div>
`;

  // Convierte el contenido HTML a un archivo PDF y guarda con FileSaver.js
  html2pdf().from(contenidoFactura).toPdf().output('arraybuffer').then(function (pdf) {
    try {
      var blob = new Blob([pdf], {
        type: 'application/pdf'
      });
      saveAs(blob, 'factura_donacion.pdf');
      console.log('Guardado exitoso');
    } catch (error) {
      console.error('Error en el guardado:', error);
    }
  });


}