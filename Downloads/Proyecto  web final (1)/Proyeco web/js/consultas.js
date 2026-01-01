function validarFormulario() {
  // Limpiar errores previos
  limpiarErroresConsulta();

  var nombre = document.getElementById("nombre");
  var email = document.getElementById("email");
  var asunto = document.getElementById("asunto");
  var mensaje = document.getElementById("mensaje");
  var mensajeError = document.getElementById("mensajeError");

  var hayError = false;

  // Validar nombre
  if (nombre.value.trim() === "") {
    mostrarErrorConsulta(nombre, "Por favor ingrese su nombre");
    hayError = true;
  }

  // Validar email
  if (email.value.trim() === "") {
    mostrarErrorConsulta(email, "Por favor ingrese su correo electrónico");
    hayError = true;
  }

  // Validar asunto
  if (asunto.value.trim() === "") {
    mostrarErrorConsulta(asunto, "Por favor ingrese el asunto");
    hayError = true;
  }

  // Validar mensaje
  if (mensaje.value.trim() === "") {
    mostrarErrorConsulta(mensaje, "Por favor escriba su mensaje");
    hayError = true;
  }

  if (hayError) {
    return false;
  }

  // Mensaje de éxito
  mensajeError.style.color = "green";
  mensajeError.innerHTML = "Formulario enviado con éxito ";
  return true;
}

function mostrarErrorConsulta(campo, mensajeTexto) {
  // Marcar campo con borde rojo
  campo.style.borderColor = '#ef4444';
  campo.style.borderWidth = '2px';

  // Crear mensaje de error
  var mensajeError = document.createElement('small');
  mensajeError.className = 'error-mensaje-consulta';
  mensajeError.textContent = mensajeTexto;
  mensajeError.style.color = '#fca5a5';
  mensajeError.style.fontSize = '0.85rem';
  mensajeError.style.marginTop = '0.3rem';
  mensajeError.style.display = 'block';

  // Insertar después del campo
  campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
}

function limpiarErroresConsulta() {
  // Quitar bordes rojos
  var inputs = document.querySelectorAll('#registroForm input, #registroForm textarea');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style.borderColor = '';
    inputs[i].style.borderWidth = '';
  }

  // Quitar mensajes de error
  var errores = document.querySelectorAll('.error-mensaje-consulta');
  for (var i = 0; i < errores.length; i++) {
    errores[i].remove();
  }

  // Limpiar mensaje general
  var mensajeError = document.getElementById("mensajeError");
  if (mensajeError) {
    mensajeError.innerHTML = "";
  }
}

