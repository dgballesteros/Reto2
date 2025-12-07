// DIALOGO

/*document.getElementById("iniciar-sesion-btn")?.addEventListener("click", ()=>{
    document.getElementById("dialog")?.showModal()
});*/

document.getElementById("solicitar-ayuda-btn")?.addEventListener("click", ()=>{
    document.getElementById("dialog")?.showModal()
});

const dialogo = document.getElementById("dialog")
dialogo?.addEventListener("click",(ev)=>{
    if(ev.target === dialogo){
        dialogo.close()
    }
});

// SLIDER

const backgroundDiv = document.querySelector(".background-image");
const coverImg = document.querySelector("#film-container .cover");
const yearSpan = document.querySelector(".release-year");
const durationSpan = document.querySelector(".duration");
const ageSpan = document.querySelector(".limit-age");
const qualitySpan = document.querySelector(".quality");

const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");

let index = 0;

const peliculas = [
    {
        background: "/images/carrousel/el-padrino-carrousel.webp",
        cover: "/images/carrousel/logo-el-padrino.webp",
        year: "1972",
        duration: "2h 56min",
        age: "16+",
        quality: "HD"
    },
    {
        background: "/images/carrousel/una-mente-maravillosa-carrousel.webp",
        cover: "/images/carrousel/logo-una-mente-maravillosa.webp",
        year: "2001",
        duration: "2h 03min",
        age: "12+",
        quality: "HD"
    },
    {
        background: "/images/carrousel/la-la-land-carrousel.webp",
        cover: "/images/carrousel/logo-la-la-land.webp",
        year: "2016",
        duration: "2h 07min",
        age: "14+",
        quality: "HD"
    }
];

function cargarPelicula(i) {
    const pelicula = peliculas[i];
  
    backgroundDiv.style.backgroundImage = `url("${pelicula.background}")`;
    coverImg.src = pelicula.cover;
    yearSpan.textContent = pelicula.year;
    durationSpan.textContent = pelicula.duration;
    ageSpan.textContent = pelicula.age;
    qualitySpan.textContent = pelicula.quality;
}

if (rightArrow) {
    rightArrow.addEventListener("click", () => {
        index++;
        if (index >= peliculas.length) index = 0; 
        cargarPelicula(index);
    });
}

if (leftArrow) {
    leftArrow.addEventListener("click", () => {
        index--;
        if (index < 0) index = peliculas.length - 1; // va al final
        cargarPelicula(index);
    });
}

if (backgroundDiv && coverImg) {
    cargarPelicula(index);
}

// FUNCIÓN PARA AÑADIR PRIMERA COPIA (pelicula.ejs)
function addFirstCopy() {
    // Obtener la primera copia de la lista
    const primeraCopia = document.querySelector('tbody tr');
    if (primeraCopia) {
        const form = primeraCopia.querySelector('form');
        if (form) {
            form.submit();
        }
    }
}

// FUNCIÓN PARA CONFIRMAR ELIMINACIÓN (mi-coleccion.ejs)
let currentCopyIndex = null;

function confirmDelete(copyIndex) {
    currentCopyIndex = copyIndex;
    const dialog = document.getElementById('confirm-dialog');
    const input = document.getElementById('copy-index-input');
    if (dialog && input) {
        input.value = copyIndex;
        dialog.showModal();
    }
}

// MANEJO DE DIÁLOGOS DE ÉXITO Y CONFIRMACIÓN

// Diálogo de éxito (index.ejs, pelicula.ejs, mi-coleccion.ejs)
const successDialog = document.getElementById('success-dialog');
if (successDialog) {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success) {
        const message = document.getElementById('success-message');
        if (message) {
            if (success === 'login') {
                message.textContent = '¡Sesión iniciada correctamente!';
            } else if (success === 'logout') {
                message.textContent = '¡Sesión cerrada correctamente!';
            } else if (success === 'added') {
                message.textContent = '¡Película añadida correctamente a tu colección!';
            } else if (success === 'deleted') {
                message.textContent = '¡Película eliminada correctamente de tu colección!';
            }
            
            if (message.textContent) {
                successDialog.showModal();
            }
        }
    }
    
    // Cerrar diálogo al hacer clic en el botón
    const closeBtn = document.getElementById('close-dialog-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            successDialog.close();
            // Limpiar query parameter
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
    
    // Cerrar diálogo al hacer clic fuera
    successDialog.addEventListener('click', (ev) => {
        if (ev.target === successDialog) {
            successDialog.close();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });
}

// Diálogo de confirmación (mi-coleccion.ejs)
const confirmDialog = document.getElementById('confirm-dialog');
if (confirmDialog) {
    // Cerrar diálogo de confirmación
    const cancelBtn = document.getElementById('cancel-delete-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            confirmDialog.close();
        });
    }
    
    // Cerrar diálogo de confirmación al hacer clic fuera
    confirmDialog.addEventListener('click', (ev) => {
        if (ev.target === confirmDialog) {
            confirmDialog.close();
        }
    });
}

