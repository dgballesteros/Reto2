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