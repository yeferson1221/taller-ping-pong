import { data } from "./data.js"


const container = document.querySelector(".container");
const nombre = document.createElement("input");
nombre.type = "text";
nombre.id = "nombre";
const buttonOk = document.createElement("button");
buttonOk.innerHTML = "Enviar";
buttonOk.onclick = () => enviar()
container.appendChild(nombre);
container.appendChild(buttonOk);

function enviar() {
    localStorage.setItem('Jugadores', nombre.value)
    container.innerHTML = "";
    pregunta()
}


function pregunta() {
    const pregunta = data[Math.floor(Math.random() * data.length)];
    const titulo = document.createElement("p");
    titulo.innerHTML = pregunta.pregunta;
    container.appendChild(titulo);
}