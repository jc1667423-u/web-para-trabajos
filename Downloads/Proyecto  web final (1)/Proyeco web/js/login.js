// Login simple con validación mejorada
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpiar errores previos
    limpiarErrores();

    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var mensaje = document.getElementById('mensaje');

    var hayError = false;

    // Validar email
    if (email.value.trim() === '') {
        mostrarError(email, 'Por favor ingresa tu correo');
        hayError = true;
    }

    // Validar contraseña
    if (password.value === '') {
        mostrarError(password, 'Por favor ingresa tu contraseña');
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Obtener usuarios del localStorage
    var usuarios = localStorage.getItem('usuarios');

    if (!usuarios) {
        mostrarError(email, 'No hay usuarios registrados');
        return;
    }

    usuarios = JSON.parse(usuarios);

    // Buscar usuario
    var usuarioEncontrado = null;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email.value) {
            usuarioEncontrado = usuarios[i];
            break;
        }
    }

    if (!usuarioEncontrado) {
        mostrarError(email, 'Usuario no encontrado');
        return;
    }

    if (usuarioEncontrado.password !== password.value) {
        mostrarError(password, 'Contraseña incorrecta');
        return;
    }

    // Login exitoso
    localStorage.setItem('usuarioActual', JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email
    }));

    mensaje.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
    mensaje.className = 'mensaje exito';

    setTimeout(function () {
        window.location.href = 'index.html';
    }, 1500);
});

function mostrarError(campo, mensajeTexto) {
    // Marcar campo con borde rojo
    campo.style.borderColor = '#ef4444';
    campo.style.borderWidth = '2px';

    // Crear mensaje de error
    var mensajeError = document.createElement('small');
    mensajeError.className = 'error-mensaje';
    mensajeError.textContent = mensajeTexto;
    mensajeError.style.color = '#fca5a5';
    mensajeError.style.fontSize = '0.85rem';
    mensajeError.style.marginTop = '0.3rem';
    mensajeError.style.display = 'block';

    // Insertar después del campo
    campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
}

function limpiarErrores() {
    // Quitar bordes rojos
    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = '';
        inputs[i].style.borderWidth = '';
    }

    // Quitar mensajes de error
    var errores = document.querySelectorAll('.error-mensaje');
    for (var i = 0; i < errores.length; i++) {
        errores[i].remove();
    }
}
