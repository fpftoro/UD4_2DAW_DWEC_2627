/**
 * Acceso a la base de datos IndexedDB de las notas.
 *
 * Base de datos `notas-e08`, versión 1, con un almacén `notas` de objetos
 * `{ id, texto, creada }` (`id` autoincremental, `creada` es un Date).
 *
 * Todas las funciones son asíncronas: avisan con un callback cuando terminan.
 * @module db
 */

/**
 * Abre la base de datos (y la crea la primera vez).
 * @param {function(IDBDatabase): void} alAbrir
 * @param {function(string): void} alFallar Recibe un mensaje de error.
 */
export function abrir(alAbrir, alFallar) {
  // TODO
}

/**
 * Guarda una nota nueva con la fecha actual.
 * @param {IDBDatabase} db
 * @param {string} texto
 * @param {function(): void} alTerminar
 */
export function anadirNota(db, texto, alTerminar) {
  // TODO
}

/**
 * Lee todas las notas.
 * @param {IDBDatabase} db
 * @param {function(Array<{ id: number, texto: string, creada: Date }>): void} alRecibir
 */
export function listarNotas(db, alRecibir) {
  // TODO
}

/**
 * Borra una nota.
 * @param {IDBDatabase} db
 * @param {number} id
 * @param {function(): void} alTerminar
 */
export function borrarNota(db, id, alTerminar) {
  // TODO
}
