// E03 · URL y parámetros
import { leerPedido, enlaceCompartir } from './url.js';

// Buscar los elementos de la página, añadir filas a una tabla y responder a los
// botones es DOM y eventos: viene hecho y lo verás en la UD5 y la UD6.
// Tú programas lo que usa location, URLSearchParams, URL e history (los TODO).
const parrafoPedido = document.querySelector('#pedido');
const enlace = document.querySelector('#compartir');
const vistaActual = document.querySelector('#vista-actual');

/**
 * Añade a la tabla de partes de la dirección una fila con dos celdas.
 * Escribe con textContent: los valores vienen de la URL y no se interpretan como HTML.
 *
 * @param {string} nombre Nombre de la propiedad de location.
 * @param {string} valor Su valor.
 */
function anadirFila(nombre, valor) {
  const fila = document.querySelector('#partes').insertRow();
  fila.insertCell().textContent = nombre;
  fila.insertCell().textContent = valor;
}

/**
 * Cambia el parámetro vista de la URL sin recargar la página y muestra la vista.
 *
 * @param {string} vista 'lista' o 'tarjetas'.
 */
function cambiarVista(vista) {
  // TODO (requisito 6)
}

// Cada botón llama a su función al pulsarlo
document.querySelector('#vista-lista').addEventListener('click', () => cambiarVista('lista'));
document.querySelector('#vista-tarjetas').addEventListener('click', () => cambiarVista('tarjetas'));
document.querySelector('#atras').addEventListener('click', () => {
  // TODO (requisito 7)
});
document.querySelector('#recargar').addEventListener('click', () => {
  // TODO (requisito 7)
});

// TODO (requisitos 3 a 6): las partes de la dirección con anadirFila, el pedido en
// parrafoPedido, el enlace para compartir, la vista inicial y el evento popstate.
