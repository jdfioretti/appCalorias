const contadorCalorias = document.getElementById('contador-calorias');
const presupuestoNumeroInput = document.getElementById('presupuesto');
const listaEntradas = document.getElementById('lista-entradas');
const agregarEntradaBoton = document.getElementById('agregar-entrada');
const limpiarBoton = document.getElementById('limpiar');
const resultado = document.getElementById('resultado');

let hayError = false;

function limpiarCadenaInput(cadena) {
    const regex = /[+-\s]/g;
    return cadena.replace(regex, '');
}

function esEntradaInvalida(cadena) {
    const regex = /\de\d/i;
    return cadena.match(regex);
}

function agregarEntrada() {
    const contenedorEntradaObjetivo = document.querySelector(`#${listaEntradas.value} .contenedor-entrada`);
    const numeroEntrada = contenedorEntradaObjetivo.querySelectorAll('input[type="text"]').length + 1;
    const cadenaHTML = `
    <div class="entry">
    <label for="${listaEntradas.value}-${numeroEntrada}-nombre">Entrada ${numeroEntrada} Nombre</label>
    <input type="text" id="${listaEntradas.value}-${numeroEntrada}-nombre" placeholder="Nombre" />
    <label for="${listaEntradas.value}-${numeroEntrada}-calorias">Entrada ${numeroEntrada} Calorías</label>
    <input type="number" min="0" placeholder="Calorías" id="${listaEntradas.value}-${numeroEntrada}-calorias" />
    </div>
    `;
    contenedorEntradaObjetivo.insertAdjacentHTML("beforeend", cadenaHTML);
}

function obtenerCaloriasDesdeInputs(lista) {
    let calorias = 0;

    for (let i = 0; i < lista.length; i++) {
        const valorActual = limpiarCadenaInput(lista[i].value);
        const coincidenciaEntradaInvalida = esEntradaInvalida(valorActual);

        if (coincidenciaEntradaInvalida) {
            alert(`Entrada Inválida: ${coincidenciaEntradaInvalida[0]}`);
            hayError = true;
            return null;
        }
        calorias += Number(valorActual);
    }
    return calorias;
}

function calcularCalorias(e) {
    e.preventDefault();
    hayError = false;
    const desayunoInputsNumeros = document.querySelectorAll('#desayuno input[type=number]');
    const almuerzoInputsNumeros = document.querySelectorAll('#almuerzo input[type=number]');
    const cenaInputsNumeros = document.querySelectorAll('#cena input[type=number]');
    const tentempiesInputsNumeros = document.querySelectorAll('#tentempiés input[type=number]');
    const ejercicioInputsNumeros = document.querySelectorAll('#ejercicio input[type=number]');

    const desayunoCalorias = obtenerCaloriasDesdeInputs(desayunoInputsNumeros);
    const almuerzoCalorias = obtenerCaloriasDesdeInputs(almuerzoInputsNumeros);
    const cenaCalorias = obtenerCaloriasDesdeInputs(cenaInputsNumeros);
    const tentempiesCalorias = obtenerCaloriasDesdeInputs(tentempiesInputsNumeros);
    const ejercicioCalorias = obtenerCaloriasDesdeInputs(ejercicioInputsNumeros);

    /* const presupuestoCalorias = obtenerCaloriasDesdeInputs([presupuestoNumeroInput]); */
    const presupuestoCalorias = Number(presupuestoNumeroInput.value);

    if (hayError) {
        return;
    }

    const caloriasConsumidas = desayunoCalorias + almuerzoCalorias + cenaCalorias + tentempiesCalorias;
    const caloriasRestantes = presupuestoCalorias - caloriasConsumidas + ejercicioCalorias;

    const excedenteODeficit = caloriasRestantes >= 0 ? 'Déficit' : 'Excedente';

    resultado.innerHTML = `<span class="${excedenteODeficit.toLowerCase()}">${Math.abs(caloriasRestantes)} Caloría ${excedenteODeficit}</span>
    <hr />
    <p>${presupuestoCalorias} Calorías Presupuestadas</p>
    <p>${caloriasConsumidas} Calorías Consumidas</p>
    <p>${ejercicioCalorias} Calorías Quemadas</p>

    `;
    resultado.classList.remove("oculto");
}

function limpiarFormulario() {
    const contenedoresEntrada = Array.from(document.querySelectorAll(".contenedor-entrada"));

    for (let i = 0; i < contenedoresEntrada.length; i++) {
        contenedoresEntrada[i].innerHTML = '';
    }
    presupuestoNumeroInput.value = '';
    resultado.innerText = '';
    resultado.classList.add("oculto");
}

agregarEntradaBoton.addEventListener("click", agregarEntrada);
contadorCalorias.addEventListener("submit", calcularCalorias);
limpiarBoton.addEventListener("click", limpiarFormulario);
