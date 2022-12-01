const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    /** Validar */
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    /** Consultariamos la API */
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    // console.log(mensaje);

    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        /** Crear una alerta*/
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'uppercase');

        alerta.innerHTML = `
        <strong class="font-extrabold">¡Error!</strong>
        <span class="block font-bold">${mensaje}</span>
    `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad, pais) {
    const appId = '39c87c40eae6de90d31b287636d30ac9';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // console.log(url);
    /** respuesta con el JSON.
     * https://api.openweathermap.org/data/2.5/weather?q=Montevideo,UY&appid=39c87c40eae6de90d31b287636d30ac9 */

    spinner(); /** Lo mandamos llamar aquí porque en este lugar es donde comienza, digamos, a consultar el servidor y después limpiar HTML */

     fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            // console.log(datos);
            /** {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …} 
             * Si no encuentar la Ciudad: 
             {cod: '404', message: 'city not found'}
            */

            console.log(datos);

            limpiarHTML(); /** Limpiar HTML previo */

            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada');

                return;
            }

            /** Imprimir la respuesta en el HTML */
            mostrarClima(datos);
        });

}

function mostrarClima(datos) {

    /** Destructuring a un objeto que está dentro de otro objeto */
    const { name, main: { temp, temp_max, temp_min } } = datos;

    // console.log(temp - 273.15);
    // const centigrados = Math.round(temp - 273.15);
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const ResultadoDiv = document.createElement('div');
    ResultadoDiv.classList.add('text-center', 'text-white')
    ResultadoDiv.appendChild(nombreCiudad);
    ResultadoDiv.appendChild(actual);
    ResultadoDiv.appendChild(tempMaxima);
    ResultadoDiv.appendChild(tempMinima);

    resultado.appendChild(ResultadoDiv);

}

/** function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
} */

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML(); // Asegurarme de que limpie cualquier registro previo que haya.

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner);
}