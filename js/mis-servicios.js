// Script simple para mostrar servicios contratados

// Verificar si hay usuario logueado
var usuarioActual = localStorage.getItem('usuarioActual');

if (!usuarioActual) {
    // Si no hay usuario, redirigir al login
    alert('Debes iniciar sesión para ver tus servicios');
    window.location.href = 'login.html';
} else {
    usuarioActual = JSON.parse(usuarioActual);

    // Mostrar nombre del usuario
    document.getElementById('nombreUsuario').textContent = 'Bienvenido, ' + usuarioActual.nombre;

    // Cargar servicios del usuario
    cargarServicios();
}

function cargarServicios() {
    var servicios = localStorage.getItem('serviciosContratados');
    var listaServicios = document.getElementById('listaServicios');
    var sinServicios = document.getElementById('sinServicios');

    if (!servicios) {
        servicios = [];
    } else {
        servicios = JSON.parse(servicios);
    }

    // Filtrar servicios del usuario actual
    var misServicios = [];
    for (var i = 0; i < servicios.length; i++) {
        if (servicios[i].usuario === usuarioActual.email) {
            misServicios.push(servicios[i]);
        }
    }

    if (misServicios.length === 0) {
        // No hay servicios
        listaServicios.style.display = 'none';
        sinServicios.style.display = 'block';
    } else {
        // Mostrar servicios
        listaServicios.style.display = 'grid';
        sinServicios.style.display = 'none';

        // Limpiar lista
        listaServicios.innerHTML = '';

        // Crear tarjetas de servicios
        for (var i = 0; i < misServicios.length; i++) {
            var servicio = misServicios[i];
            var tarjeta = crearTarjetaServicio(servicio);
            listaServicios.appendChild(tarjeta);
        }
    }
}

function crearTarjetaServicio(servicio) {
    var tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-servicio';

    var html = '<h3>' + servicio.servicio + '</h3>';
    html += '<div class="info"><i class="fas fa-phone"></i> ' + servicio.telefono + '</div>';
    html += '<div class="info"><i class="fas fa-map-marker-alt"></i> ' + servicio.direccion + '</div>';
    html += '<div class="info"><i class="fas fa-calendar"></i> ' + servicio.fecha + '</div>';
    html += '<div class="info"><i class="fas fa-clock"></i> Contratado: ' + servicio.fechaContratacion + '</div>';

    if (servicio.detalles) {
        html += '<div class="detalles"><strong>Detalles:</strong> ' + servicio.detalles + '</div>';
    }

    html += '<span class="estado pendiente">' + servicio.estado + '</span>';
    html += '<br><button onclick="cancelarServicio(' + servicio.id + ')">Cancelar Servicio</button>';

    tarjeta.innerHTML = html;
    return tarjeta;
}

function cancelarServicio(id) {
    if (!confirm('¿Estás seguro de que deseas cancelar este servicio?')) {
        return;
    }

    var servicios = localStorage.getItem('serviciosContratados');
    servicios = JSON.parse(servicios);

    // Filtrar el servicio a eliminar
    var nuevosServicios = [];
    for (var i = 0; i < servicios.length; i++) {
        if (servicios[i].id !== id) {
            nuevosServicios.push(servicios[i]);
        }
    }

    // Guardar cambios
    localStorage.setItem('serviciosContratados', JSON.stringify(nuevosServicios));

    // Recargar servicios
    alert('Servicio cancelado exitosamente');
    cargarServicios();
}
