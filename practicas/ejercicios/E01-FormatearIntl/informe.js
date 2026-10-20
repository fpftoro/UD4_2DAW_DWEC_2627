// E01 · Informe internacional de pedidos

// Fecha fija de «hoy» para que la salida sea siempre la misma
const HOY = new Date(2025, 2, 15, 12, 0);
// Cambio fijo de dólares a euros
const EUROS_POR_DOLAR = 0.92;
const IVA = 0.21;

const pedidos = [
  { id: 1, cliente: 'Ana', idioma: 'es-ES', moneda: 'EUR', importe: 1234.5, fecha: '2025-03-14T10:00:00', productos: ['libro', 'lámpara'] },
  { id: 2, cliente: 'John', idioma: 'en-US', moneda: 'USD', importe: 89.99, fecha: '2025-03-01T18:30:00', productos: ['taza'] },
  { id: 3, cliente: 'Ébano Ruiz', idioma: 'es-ES', moneda: 'EUR', importe: 15, fecha: '2025-03-15T09:15:00', productos: ['bolígrafo', 'cuaderno', 'regla'] },
  { id: 4, cliente: 'Lena', idioma: 'de-DE', moneda: 'EUR', importe: 2500, fecha: '2025-02-13T08:00:00', productos: ['mesa'] },
];

// TODO: muestra el informe siguiendo el enunciado.
