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

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-extrabold">¡Error!</strong>
        <span class="block font-semibold">${mensaje}</span>
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

    console.log(url);
    /** respuesta con el JSON.
     * https://api.openweathermap.org/data/2.5/weather?q=Montevideo,UY&appid=39c87c40eae6de90d31b287636d30ac9 */

     fetch( url )
        .then( respuesta => respuesta.json() )
        .then( datos => console.log(datos) );
         /** {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …} */
}