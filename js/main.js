import { data } from "./data.js"


const container = document.querySelector(".container");
const nombre = document.createElement("input");
nombre.type = "text";
nombre.id = "nombre";
const buttonOk = document.createElement("button");
buttonOk.classList.add("btn", "btn-success", "ms-2", "mt-5");
const buttonRendirse = document.createElement("button");
buttonOk.innerHTML = "Enviar";
buttonRendirse.innerHTML = "Rendición";
buttonOk.onclick = () => enviar()
buttonRendirse.onclick = () => rendirse()
container.appendChild(nombre);
container.appendChild(buttonOk);
let pregunta;
const tdA = document.createElement("td");
const tdB = document.createElement("td");
const tdC = document.createElement("td");
const tdD = document.createElement("td");
let iCategoria = 0

function enviar() {
    localStorage.setItem(nombre.value, 0)
    container.innerHTML = "";
    nuevaPregunta()
}


function nuevaPregunta() {
    container.appendChild(buttonRendirse);
    const categoria = data[iCategoria];
    pregunta = categoria.preguntas[Math.floor(Math.random() * categoria.preguntas.length)]
    const titulo = document.createElement("p");
    const tabla = document.createElement("table");
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
    container.appendChild(titulo);
    container.appendChild(tabla);
}


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

function validacion(respuesta) {
    container.innerHTML = "";
    if (pregunta.respuestas[respuesta].correcta) {
        localStorage.setItem(nombre.value, parseInt(localStorage.getItem(nombre.value)) + 1);
        if (iCategoria < data.length - 1) {
            iCategoria += 1;
            nuevaPregunta();
        } else {
            alert(`Te GANASTE, tu puntaje: ${localStorage.getItem(nombre.value)}`)

        }

    } else perdiste()
}

function rendirse() {
    alert(`Te rendiste, tu puntaje: ${localStorage.getItem(nombre.value)}`)
    location.reload()
}

function perdiste() {
    localStorage.setItem(nombre.value, 0)
    alert(`Perdiste, tu puntaje: ${localStorage.getItem(nombre.value)}`)
    location.reload()
}