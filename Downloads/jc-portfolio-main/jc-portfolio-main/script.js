/** Esperar a que el DOM esté completamente cargado */
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SCROLL HEADER =====
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ===== MENÚ MÓVIL =====
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // ===== CERRAR MENÚ AL HACER CLIC EN UN ENLACE =====
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // ===== SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN =====
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== ANIMACIÓN PARA ELEMENTOS CON SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
  const skillSection = document.getElementById('habilidades');
  let skillAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillAnimated) {
        animateSkillBars();
        skillAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, index * 100);
    });
  }

  // ===== FORMULARIO DE CONTACTO CON VALIDACIÓN Y MÉTODO DE ENVÍO =====
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const numeroInput = document.getElementById('number');
    const mensajeInput = document.getElementById('mensaje');
    const btnEnviar = document.getElementById('btn-enviar');
    const sendOptions = document.querySelectorAll('.btn-send-option');
    
    let metodoSeleccionado = null;

    // ===== SELECCIÓN DE MÉTODO DE ENVÍO =====
    sendOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover selección previa
        sendOptions.forEach(b => b.classList.remove('selected'));
        
        // Marcar como seleccionado
        btn.classList.add('selected');
        metodoSeleccionado = btn.dataset.method;
        
        // Activar botón de envío y actualizar texto
        btnEnviar.disabled = false;
        
        if (metodoSeleccionado === 'whatsapp') {
          btnEnviar.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp';
          btnEnviar.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
        } else {
          btnEnviar.innerHTML = '<i class="fa-solid fa-envelope"></i> Enviar por Gmail';
          btnEnviar.style.background = 'linear-gradient(135deg, #EA4335 0%, #C5221F 100%)';
        }
      });
    });

    // Función para mostrar error
    function mostrarError(input, mensaje) {
      const formGroup = input.parentElement;
      formGroup.classList.add('error');
      
      // Remover mensaje de error previo si existe
      const errorPrevio = formGroup.querySelector('.error-message');
      if (errorPrevio) {
        errorPrevio.remove();
      }
      
      // Crear nuevo mensaje de error
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = mensaje;
      formGroup.appendChild(errorDiv);
    }

    // Función para limpiar error
    function limpiarError(input) {
      const formGroup = input.parentElement;
      formGroup.classList.remove('error');
      formGroup.classList.add('success');
      
      const errorMessage = formGroup.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    }

    // Validar campo individual
    function validarCampo(input) {
      const valor = input.value.trim();
      
      // Limpiar estado previo
      input.parentElement.classList.remove('success');
      
      switch(input.id) {
        case 'nombre':
          if (valor === '') {
            mostrarError(input, 'El nombre es obligatorio');
            return false;
          } else if (valor.length < 3) {
            mostrarError(input, 'El nombre debe tener al menos 3 caracteres');
            return false;
          } else {
            limpiarError(input);
            return true;
          }
        
        case 'email':
          if (valor === '') {
            mostrarError(input, 'El correo es obligatorio');
            return false;
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
              mostrarError(input, 'Por favor ingresa un correo válido');
              return false;
            } else {
              limpiarError(input);
              return true;
            }
          }
        
        case 'number':
          // El número es opcional, solo validar si hay contenido
          if (valor !== '') {
            const numeroRegex = /^[\d\s\+\-\(\)]+$/;
            if (!numeroRegex.test(valor)) {
              mostrarError(input, 'Por favor ingresa un número válido');
              return false;
            } else if (valor.replace(/\D/g, '').length < 9) {
              mostrarError(input, 'El número debe tener al menos 9 dígitos');
              return false;
            }
          }
          limpiarError(input);
          return true;
        
        case 'mensaje':
          if (valor === '') {
            mostrarError(input, 'El mensaje es obligatorio');
            return false;
          } else if (valor.length < 10) {
            mostrarError(input, 'El mensaje debe tener al menos 10 caracteres');
            return false;
          } else {
            limpiarError(input);
            return true;
          }
        
        default:
          return true;
      }
    }

    // Validar en tiempo real (al salir del campo)
    [nombreInput, emailInput, numeroInput, mensajeInput].forEach(input => {
      if (input) {
        input.addEventListener('blur', () => {
          validarCampo(input);
        });

        // Limpiar error mientras escribe
        input.addEventListener('input', () => {
          if (input.parentElement.classList.contains('error')) {
            validarCampo(input);
          }
        });
      }
    });

    // ===== ENVIAR FORMULARIO =====
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Verificar que se haya seleccionado un método
      if (!metodoSeleccionado) {
        mostrarMensajeError('Por favor selecciona un método de envío (WhatsApp o Gmail)');
        return;
      }
      
      // Validar todos los campos
      const nombreValido = validarCampo(nombreInput);
      const emailValido = validarCampo(emailInput);
      const numeroValido = validarCampo(numeroInput);
      const mensajeValido = validarCampo(mensajeInput);
      
      // Si todos son válidos, enviar
      if (nombreValido && emailValido && numeroValido && mensajeValido) {
        const datos = {
          nombre: nombreInput.value.trim(),
          email: emailInput.value.trim(),
          numero: numeroInput.value.trim(),
          mensaje: mensajeInput.value.trim()
        };
        
        // Enviar según el método seleccionado
        if (metodoSeleccionado === 'whatsapp') {
          enviarPorWhatsApp(datos);
        } else if (metodoSeleccionado === 'gmail') {
          enviarPorGmail(datos);
        }
      } else {
        // Hacer scroll al primer error
        const primerError = document.querySelector('.form-group.error');
        if (primerError) {
          primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // ===== FUNCIÓN PARA ENVIAR POR WHATSAPP =====
    function enviarPorWhatsApp(datos) {
      // Número de WhatsApp (reemplaza con tu número)
      const numeroWhatsApp = '51994206261';
      
      // Construir el mensaje
      let mensaje = `*Nuevo mensaje desde el portafolio*%0A%0A`;
      mensaje += `*Nombre:* ${datos.nombre}%0A`;
      mensaje += `*Email:* ${datos.email}%0A`;
      if (datos.numero) {
        mensaje += `*Teléfono:* ${datos.numero}%0A`;
      }
      mensaje += `%0A*Mensaje:*%0A${datos.mensaje}`;
      
      // Crear URL de WhatsApp
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(urlWhatsApp, '_blank');
      
      // Mostrar mensaje de éxito
      mostrarMensajeExito('whatsapp');
      
      // Limpiar formulario después de 1 segundo
      setTimeout(() => {
        limpiarFormulario();
      }, 1000);
    }

    // ===== FUNCIÓN PARA ENVIAR POR GMAIL =====
    function enviarPorGmail(datos) {
      // Tu email
      const emailDestino = 'mailto:jc1667423@gmail.com';
      
      // Construir el asunto y cuerpo del email
      const asunto = `Mensaje de ${datos.nombre} - Portafolio`;
      
      let cuerpo = `Nuevo mensaje desde el portafolio:%0D%0A%0D%0A`;
      cuerpo += `Nombre: ${datos.nombre}%0D%0A`;
      cuerpo += `Email: ${datos.email}%0D%0A`;
      if (datos.numero) {
        cuerpo += `Teléfono: ${datos.numero}%0D%0A`;
      }
      cuerpo += `%0D%0AMensaje:%0D%0A${datos.mensaje}`;
      
      // Crear URL de Gmail
      const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(asunto)}&body=${cuerpo}`;
      
      // Abrir Gmail en nueva pestaña
      window.open(urlGmail, '_blank');
      
      // Mostrar mensaje de éxito
      mostrarMensajeExito('gmail');
      
      // Limpiar formulario después de 1 segundo
      setTimeout(() => {
        limpiarFormulario();
      }, 1000);
    }

    // ===== LIMPIAR FORMULARIO =====
    function limpiarFormulario() {
      contactForm.reset();
      
      // Limpiar estados de validación
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
      });
      
      // Limpiar selección de método
      sendOptions.forEach(btn => btn.classList.remove('selected'));
      metodoSeleccionado = null;
      
      // Resetear botón de envío
      btnEnviar.disabled = true;
      btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Selecciona un método de envío';
      btnEnviar.style.background = '';
    }

    // ===== MENSAJES DE ÉXITO Y ERROR =====
    function mostrarMensajeExito(metodo) {
      const mensajeExito = document.createElement('div');
      mensajeExito.className = 'mensaje-exito';
      
      if (metodo === 'whatsapp') {
        mensajeExito.innerHTML = `
          <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
          <p>¡Redirigiendo a WhatsApp!</p>
          <p>Se abrirá una nueva ventana con tu mensaje.</p>
        `;
      } else {
        mensajeExito.innerHTML = `
          <i class="fa-solid fa-envelope" style="color: #EA4335;"></i>
          <p>¡Redirigiendo a Gmail!</p>
          <p>Se abrirá una nueva ventana para enviar el correo.</p>
        `;
      }
      
      document.body.appendChild(mensajeExito);
      
      // Animar entrada
      setTimeout(() => {
        mensajeExito.classList.add('visible');
      }, 100);
      
      // Remover después de 4 segundos
      setTimeout(() => {
        mensajeExito.classList.remove('visible');
        setTimeout(() => {
          mensajeExito.remove();
        }, 300);
      }, 4000);
    }

    function mostrarMensajeError(texto) {
      const mensajeError = document.createElement('div');
      mensajeError.className = 'mensaje-error';
      mensajeError.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${texto}</p>
      `;
      
      document.body.appendChild(mensajeError);
      
      setTimeout(() => {
        mensajeError.classList.add('visible');
      }, 100);
      
      setTimeout(() => {
        mensajeError.classList.remove('visible');
        setTimeout(() => {
          mensajeError.remove();
        }, 300);
      }, 4000);
    }
  }

  // ===== EFECTO DE TIPEO EN HERO SUBTITLE =====
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      if (!isDeleting && charIndex < originalText.length) {
        heroSubtitle.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
      } else if (isDeleting && charIndex > 0) {
        heroSubtitle.textContent = originalText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
      } else if (!isDeleting && charIndex === originalText.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, pauseDuration);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(typeEffect, typingSpeed);
      }
    }
    
    // Activar el efecto de tipeo
    setTimeout(typeEffect, 1000);
  }

  // ===== DESTACAR LINK DE NAVEGACIÓN ACTIVO =====
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ===== ANIMACIÓN DE ENTRADA INICIAL =====
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // ===== BOTÓN SCROLL TO TOP =====
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== BOTÓN LEER MÁS EN PROYECTOS =====
  const readMoreBtns = document.querySelectorAll('.btn-read-more');

  readMoreBtns.forEach(btn => {
    const description = btn.previousElementSibling;

    // Ocultar botón si el texto no está truncado
    if (description && description.scrollHeight <= description.clientHeight + 2) {
      btn.style.display = 'none';
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = description.classList.toggle('expanded');
      btn.classList.toggle('active');
      btn.textContent = isExpanded ? 'Leer menos' : 'Leer más';
    });
  });

  // ===== MENSAJE DE CONSOLA =====
  console.log('✅ Portafolio cargado exitosamente');
});

// ===== FUNCIONES AUXILIARES =====

// Función para detectar si un elemento está en viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Función para scroll suave en una posición específica
function smoothScrollTo(targetPosition, duration = 1000) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}