// DIALOGO

document.getElementById("iniciar-sesion-btn")?.addEventListener("click", ()=>{
    document.getElementById("dialog")?.showModal()
});

document.getElementById("registrarme-btn")?.addEventListener("click", ()=>{
    document.getElementById("dialog")?.showModal()
});

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
      cover: "/images/carrousel/logo-el-padrino.webp",
      year: "2016",
      duration: "2h 08min",
      age: "12+",
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

rightArrow.addEventListener("click", () => {
    index++;
    if (index >= peliculas.length) index = 0; // vuelve al principio
    cargarPelicula(index);
});

leftArrow.addEventListener("click", () => {
    index--;
    if (index < 0) index = peliculas.length - 1; // va al final
    cargarPelicula(index);
});

cargarPelicula(index);

