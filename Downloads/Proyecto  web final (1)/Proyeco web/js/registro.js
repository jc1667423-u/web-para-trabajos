// Registro simple con validación mejorada
document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpiar errores previos
    limpiarErrores();

    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var mensaje = document.getElementById('mensaje');

    var hayError = false;

    // Validar nombre
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'Por favor ingresa tu nombre');
        hayError = true;
    }

    // Validar email
    if (email.value.trim() === '') {
        mostrarError(email, 'Por favor ingresa tu correo');
        hayError = true;
    } else if (!validarEmail(email.value)) {
        mostrarError(email, 'Por favor ingresa un correo válido');
        hayError = true;
    }

    // Validar contraseña
    if (password.value === '') {
        mostrarError(password, 'Por favor ingresa una contraseña');
        hayError = true;
    } else if (password.value.length < 6) {
        mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
        hayError = true;
    }

    // Validar confirmación de contraseña
    if (password2.value === '') {
        mostrarError(password2, 'Por favor confirma tu contraseña');
        hayError = true;
    } else if (password.value !== password2.value) {
        mostrarError(password2, 'Las contraseñas no coinciden');
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Obtener usuarios existentes
    var usuarios = localStorage.getItem('usuarios');
    if (!usuarios) {
        usuarios = [];
    } else {
        usuarios = JSON.parse(usuarios);
    }

    // Verificar si el email ya existe
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email.value) {
            mostrarError(email, 'Este correo ya está registrado');
            return;
        }
    }

    // Agregar nuevo usuario
    usuarios.push({
        nombre: nombre.value,
        email: email.value,
        password: password.value
    });

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensaje.textContent = 'Registro exitoso. Redirigiendo al login...';
    mensaje.className = 'mensaje exito';

    setTimeout(function () {
        window.location.href = 'login.html';
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
    var inputs = document.querySelectorAll('input, textarea');
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

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
