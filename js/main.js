import { data } from "./data.js"

/**
 * Laboratorio de JavaScript de quien quiere ser millonario.
 *
 * @version 1.0.0 2022-06-02
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 */
const container = document.querySelector(".container");
container.classList.add("container-lg", "d-flex", "justify-content-center", "align-items-center", "bg-muted");
const nombre = document.createElement("input");
nombre.type = "text";
nombre.placeholder = "Ingresa tu nombre";
const buttonOk = document.createElement("button");
buttonOk.classList.add("btn", "btn-success", "ms-2", "mt-2");
const buttonRendirse = document.createElement("button");
buttonRendirse.classList.add("btn", "btn-outline-danger", "btn-lg", "w-50", "ms-2", "mt-2");
buttonOk.innerHTML = "Enviar";
buttonRendirse.innerHTML = "Rendirse";
const img = document.createElement("img");
img.src = "/imagenes/sof.webp";
buttonOk.onclick = () => enviar()
buttonRendirse.onclick = () => rendirse()
container.appendChild(nombre);
container.appendChild(buttonOk);
container.appendChild(img);
let pregunta;
const tdA = document.createElement("td");
const tdB = document.createElement("td");
const tdC = document.createElement("td");
const tdD = document.createElement("td");
let iCategoria = 0

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Metodo para crear en localStorage la persona con el nombre(key) con su premio en 0.
 */
function enviar() {
    localStorage.setItem(nombre.value, 0)
    container.innerHTML = "";
    nuevaPregunta()
}

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Metodo para mostrar una pregunta nueva e mostrarla por pantalla.
 */
function nuevaPregunta() {
    const containerPreguntas = document.createElement("div");
    containerPreguntas.classList.add("d-flex", "flex-column", "justify-content-between", "align-items-center");
    const categoria = data[iCategoria];
    pregunta = categoria.preguntas[Math.floor(Math.random() * categoria.preguntas.length)]
    const titulo = document.createElement("h1");
    titulo.classList.add("h1");
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-info", "fs-2", "w-75");
    const tr1 = document.createElement("tr");
    const tr2 = document.createElement("tr");
    tdA.textContent = `A: ${pregunta.respuestas[0].respuesta}`;
    tdB.textContent = `B: ${pregunta.respuestas[1].respuesta}`;
    tdC.textContent = `C: ${pregunta.respuestas[2].respuesta}`;
    tdD.textContent = `D: ${pregunta.respuestas[3].respuesta}`;
    tabla.append(tr1);
    tr1.append(tdA, tdB);
    tabla.append(tr2);
    tr2.append(tdC, tdD);
    titulo.innerHTML = pregunta.pregunta;
    containerPreguntas.append(titulo, tabla, buttonRendirse, img);
    container.append(containerPreguntas);
}

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Se hace la validacion de click en la pregunta para posteriormene enviarla a la clase de validacion.
 */
tdA.addEventListener('click', async(e) => {
    validacion(0)
})

tdB.addEventListener('click', async(e) => {
    validacion(1)
})

tdC.addEventListener('click', async(e) => {
    validacion(2)
})

tdD.addEventListener('click', async(e) => {
    validacion(3)
})

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Se hace la validacion de la respuesta a la pregunta que hizo el cliente si esta correcta la manda a nueva pregunta de lo contrario perdio.
 */
function validacion(respuesta) {
    container.innerHTML = "";
    if (pregunta.respuestas[respuesta].correcta) {
        localStorage.setItem(nombre.value, parseInt(localStorage.getItem(nombre.value)) + 1);
        if (iCategoria < data.length - 1) {
            iCategoria += 1;
            nuevaPregunta();
        } else {
            alert(`GANASTE FELICIDADES, tu puntaje: ${localStorage.getItem(nombre.value)}`)
            location.reload()
        }

    } else perdiste()
}

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Se hace la validacion de click en el boton si se rinde queda con el premio que estaba.
 */
function rendirse() {
    alert(`Te rendiste, tu puntaje: ${localStorage.getItem(nombre.value)}`)
    location.reload()
}

/**
 * @author Daniel Steven Gil Cruz <danistcruz@gmail.com>
 * @since 1.0.0
 * Si pierde se hace el cambio de puntaje para que quede en 0 el premio ya que perdio.
 */
function perdiste() {
    localStorage.setItem(nombre.value, 0)
    alert(`Perdiste, tu puntaje: ${localStorage.getItem(nombre.value)}`)
    location.reload()
}