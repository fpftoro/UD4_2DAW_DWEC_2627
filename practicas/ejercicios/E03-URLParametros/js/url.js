/**
 * Funciones puras para leer y construir URL. No usan location: reciben los textos.
 * @module url
 */

/**
 * Pedido leído de los parámetros de una URL.
 * @typedef {object} Pedido
 * @property {string} producto
 * @property {number} cantidad
 * @property {string|null} cupon
 * @property {string[]} errores Mensajes de los datos que faltan o no son válidos.
 */

/**
 * Lee el pedido de los parámetros `producto`, `cantidad` y `cupon`.
 * @param {string} busqueda Parte `search` de una URL, por ejemplo `'?producto=Taza&cantidad=2'`.
 * @returns {Pedido}
 */
export function leerPedido(busqueda) {
  // TODO
}

/**
 * Construye el enlace para compartir un pedido.
 * @param {string} base URL de la página, sin parámetros.
 * @param {{ producto: string, cantidad: number, cupon: string|null }} pedido
 * @returns {string}
 */
export function enlaceCompartir(base, pedido) {
  // TODO
}
