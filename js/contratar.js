// Script simple para contratar servicios

// Abrir modal de contratación
function abrirModalContratar(nombreServicio, descripcion) {
    var modal = document.getElementById('modalContratar');
    document.getElementById('servicioNombre').textContent = nombreServicio;
    document.getElementById('servicioSeleccionado').value = nombreServicio;
    document.getElementById('servicioDescripcion').textContent = descripcion;
    modal.style.display = 'flex';
}

// Cerrar modal
document.addEventListener('DOMContentLoaded', function () {
    var cerrarBtn = document.getElementById('cerrarModalContratar');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', function () {
            document.getElementById('modalContratar').style.display = 'none';
        });
    }

    // Enviar formulario de contratación
    var form = document.getElementById('formContratar');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Limpiar errores previos
            limpiarErroresContratar();

            // Verificar si hay usuario logueado
            var usuarioActual = localStorage.getItem('usuarioActual');
            if (!usuarioActual) {
                alert('Debes iniciar sesión para contratar servicios');
                window.location.href = 'login.html';
                return;
            }

            usuarioActual = JSON.parse(usuarioActual);

            // Obtener datos del formulario
            var servicio = document.getElementById('servicioSeleccionado').value;
            var telefono = document.getElementById('telefono');
            var direccion = document.getElementById('direccion');
            var fecha = document.getElementById('fecha');
            var detalles = document.getElementById('detalles');

            var error = false;

            // Validar teléfono
            if (telefono.value.trim() === '') {
                mostrarErrorContratar(telefono, 'Por favor ingresa tu teléfono');
                error = true;
            }

            // Validar dirección
            if (direccion.value.trim() === '') {
                mostrarErrorContratar(direccion, 'Por favor ingresa la dirección');
                error = true;
            }

            // Validar fecha
            if (fecha.value === '') {
                mostrarErrorContratar(fecha, 'Por favor selecciona una fecha');
                error = true;
            }

            if (error) {
                return;
            }

            // Crear objeto de servicio contratado
            var servicioContratado = {
                id: Date.now(),
                usuario: usuarioActual.email,
                servicio: servicio,
                telefono: telefono.value,
                direccion: direccion.value,
                fecha: fecha.value,
                detalles: detalles.value,
                fechaContratacion: new Date().toLocaleDateString(),
                estado: 'Pendiente'
            };

            // Obtener servicios existentes
            var servicios = localStorage.getItem('serviciosContratados');
            if (!servicios) {
                servicios = [];
            } else {
                servicios = JSON.parse(servicios);
            }

            // Agregar nuevo servicio
            servicios.push(servicioContratado);

            // Guardar en localStorage
            localStorage.setItem('serviciosContratados', JSON.stringify(servicios));

            // Mostrar mensaje de éxito
            alert('¡Servicio contratado exitosamente! Puedes ver tus servicios en "Mis Servicios"');

            // Cerrar modal y limpiar formulario
            document.getElementById('modalContratar').style.display = 'none';
            form.reset();
            limpiarErroresContratar();
        });
    }
});

function mostrarErrorContratar(campo, mensajeTexto) {
    // Marcar campo con borde rojo
    campo.style.borderColor = '#ef4444';
    campo.style.borderWidth = '2px';

    // Crear mensaje de error
    var mensajeError = document.createElement('small');
    mensajeError.className = 'error-mensaje-contratar';
    mensajeError.textContent = mensajeTexto;
    mensajeError.style.color = '#fca5a5';
    mensajeError.style.fontSize = '0.85rem';
    mensajeError.style.marginTop = '0.3rem';
    mensajeError.style.display = 'block';

    // insertar despues del campo
    campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
}

function limpiarErroresContratar() {
    // Quitar bordes rojos
    var inputs = document.querySelectorAll('#formContratar input, #formContratar textarea');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = '';
        inputs[i].style.borderWidth = '';
    }

    // Quitar mensajes de error
    var errores = document.querySelectorAll('.error-mensaje-contratar');
    for (var i = 0; i < errores.length; i++) {
        errores[i].remove();
    }
}
