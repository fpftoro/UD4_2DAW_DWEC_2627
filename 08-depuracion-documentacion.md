# 8. Depuración, documentación y pruebas

[⬅️ Volver a la unidad](./README.md)

## Índice

- [8.1. Qué se añade en esta unidad](#81-qué-se-añade-en-esta-unidad)
- [8.2. La pestaña Application](#82-la-pestaña-application)
  - [8.2.1. Ver, editar y borrar lo guardado](#821-ver-editar-y-borrar-lo-guardado)
  - [8.2.2. Depurar problemas de almacenamiento](#822-depurar-problemas-de-almacenamiento)
- [8.3. Documentar un módulo de utilidades](#83-documentar-un-módulo-de-utilidades)
- [8.4. Probar código que depende del navegador](#84-probar-código-que-depende-del-navegador)
  - [8.4.1. El problema](#841-el-problema)
  - [8.4.2. Inyectar la dependencia](#842-inyectar-la-dependencia)
  - [8.4.3. Un almacenamiento falso](#843-un-almacenamiento-falso)
- [8.5. Mocks con Vitest](#85-mocks-con-vitest)
  - [8.5.1. Controlar la fecha: `vi.setSystemTime`](#851-controlar-la-fecha-visetsystemtime)
  - [8.5.2. Controlar el azar: `vi.spyOn`](#852-controlar-el-azar-vispyon)
  - [8.5.3. Sustituir un global: `vi.stubGlobal`](#853-sustituir-un-global-vistubglobal)
  - [8.5.4. Funciones espía: `vi.fn`](#854-funciones-espía-vifn)
- [8.6. Ejemplo integrador: el módulo `racha`](#86-ejemplo-integrador-el-módulo-racha)
- [Resumen](#resumen)
- [Ejercicios de reflexión](#ejercicios-de-reflexión)

> **CE que trabaja este tema:** RA3 h.

---

## 8.1. Qué se añade en esta unidad

| | UD3 | UD4 (este tema) |
|---|---|---|
| **Depuración** | Pila de llamadas, ámbitos y closures | Pestaña **Application**: ver y editar el almacenamiento |
| **Documentación** | JSDoc completo y `jsdoc` | Documentar **módulos de utilidades** que dependen del navegador: qué necesitan y qué guardan |
| **Pruebas** | Tests unitarios de funciones y clases | **Mocks**: probar código que usa `localStorage`, `Date` o `Math.random` |

El código de esta unidad depende de cosas que **no controlas**: la fecha de hoy, el azar o lo que hay guardado en el navegador. Para depurarlo hay que poder **ver** ese estado, y para probarlo hay que poder **fijarlo**.

---

## 8.2. La pestaña Application

En Chrome y Edge se llama **Application** (Aplicación); en Firefox, **Storage** (Almacenamiento). Muestra todo lo que la página guarda en el navegador.

### 8.2.1. Ver, editar y borrar lo guardado

| Sección | Qué puedes hacer |
|---------|------------------|
| **Local storage** y **Session storage** | Ver las claves y valores de cada origen, editarlos con doble clic, añadir y borrar |
| **Cookies** | Ver cada cookie con su caducidad, ruta, `HttpOnly`, `Secure` y `SameSite`; editarlas y borrarlas |
| **IndexedDB** | Ver las bases de datos, sus almacenes y sus objetos; borrar registros o la base entera |
| **Cache storage** | Ver las respuestas guardadas |
| **Storage** (resumen) | Espacio usado y botón **Clear site data** para empezar de cero |

### 8.2.2. Depurar problemas de almacenamiento

| Síntoma | Qué mirar en Application |
|---------|--------------------------|
| "No se guarda la preferencia" | ¿Aparece la clave? Si el valor es `[object Object]`, faltó `JSON.stringify` |
| "La página falla al cargar después de un cambio" | ¿Hay un valor con un formato antiguo? Edítalo o bórralo y comprueba que el código lo tolera (`try…catch`) |
| "La cookie no llega al servidor" | `path`, `SameSite`, `Secure` (sin HTTPS no se envía) y la caducidad |
| "Los datos de IndexedDB no se actualizan" | Pulsa el botón de **actualizar** del almacén: la vista no se refresca sola |
| "Funciona en mi equipo pero no recién instalado" | **Clear site data** y recarga: así lo ve un usuario nuevo |

> ✅ **Buena práctica**: Antes de dar por terminada una funcionalidad que guarda datos, pruébala tres veces: con el almacenamiento **vacío**, con datos **correctos** y con datos **corruptos** (edita el valor a mano en Application). El código debe funcionar en los tres casos.

Se combina con el depurador de la UD3: pon un punto de ruptura en la línea que lee el almacenamiento, mira en **Ámbito** qué ha leído y en **Application** qué hay guardado.

> 💡 **Tip del Examinador**: "¿Cómo comprobarías qué ha guardado una página en `localStorage`?" → En la pestaña Application de las DevTools, sección Local storage, seleccionando el origen de la página. Desde la consola, también con `localStorage.getItem(clave)` o mostrando `localStorage` entero.

---

## 8.3. Documentar un módulo de utilidades

Un módulo que usa objetos del navegador tiene que documentar, además de sus funciones, **qué necesita del entorno** y **qué guarda**. Si no, quien lo use no sabrá que escribe en `localStorage` ni con qué clave.

```js
/**
 * Preferencias del usuario guardadas en el navegador.
 *
 * Guarda un objeto JSON en `localStorage` con la clave `preferencias`. Si no hay nada guardado
 * o el valor está corrupto, devuelve las preferencias por defecto.
 *
 * Necesita un almacenamiento con la interfaz `Storage` (`getItem`, `setItem`); por defecto,
 * `localStorage`. Se puede pasar otro (por ejemplo, uno falso en los tests).
 *
 * @module preferencias
 * @example
 * import { leerPreferencias, guardarPreferencias } from './preferencias.js';
 * guardarPreferencias({ tema: 'oscuro' });
 * leerPreferencias().tema; // 'oscuro'
 */
```

| Qué documentar | Dónde |
|----------------|-------|
| Para qué sirve el módulo | Descripción del bloque `@module` |
| Qué objetos del navegador usa (`localStorage`, `document.cookie`, `Date`…) | Descripción del módulo y de cada función |
| Qué claves, cookies o bases de datos crea, y con qué formato | Descripción del módulo |
| Qué pasa si no hay datos o están corruptos | `@returns` de las funciones de lectura |
| Qué errores puede lanzar o qué devuelve si falla al guardar | `@throws` o `@returns` |

> 📝 **Nota del Profesor**: Documentar las claves que usa un módulo evita un error muy común en proyectos con varias personas: dos módulos que usan la misma clave de `localStorage` y se pisan los datos.

---

## 8.4. Probar código que depende del navegador

### 8.4.1. El problema

Esta función es difícil de probar:

```js
export function contarVisita() {
  const visitas = Number(localStorage.getItem('visitas') ?? 0) + 1;
  localStorage.setItem('visitas', String(visitas));
  return visitas;
}
```

- En **Node.js** (donde se ejecuta Vitest) **no existe** `localStorage`: el test falla con `ReferenceError`.
- Aunque existiera, el resultado dependería de lo que hubiera guardado **antes** y de los otros tests.

Lo mismo pasa con el código que usa `new Date()` (el resultado cambia cada día) o `Math.random()` (cambia cada vez).

### 8.4.2. Inyectar la dependencia

La solución más limpia es que la función **reciba** lo que necesita como parámetro, con el objeto real como **valor por defecto**. Se llama **inyección de dependencias** (la verás de nuevo en Angular, UD8):

```js
/**
 * Suma una visita y devuelve el total.
 * @param {Storage} [almacen=globalThis.localStorage]
 * @returns {number}
 */
export function contarVisita(almacen = globalThis.localStorage) {
  const visitas = Number(almacen.getItem('visitas') ?? 0) + 1;
  almacen.setItem('visitas', String(visitas));
  return visitas;
}
```

En la página se llama sin argumentos (`contarVisita()`) y usa el `localStorage` real. En los tests se le pasa uno **falso**.

> 📝 **Nota del Profesor**: Se escribe `globalThis.localStorage` y no `localStorage` porque, en Node.js, el valor por defecto no llega a evaluarse si el test pasa un almacén: `globalThis.localStorage` valdría `undefined`, pero `localStorage` a secas lanzaría un `ReferenceError` en cuanto se usara.

### 8.4.3. Un almacenamiento falso

Un **doble de prueba** (*test double*) es un objeto que sustituye a uno real en los tests. Para `localStorage` basta con una clase que tenga los mismos métodos, sobre un `Map`:

```js
// tests/AlmacenFalso.js
/** Almacenamiento en memoria con la misma interfaz que localStorage, para los tests. */
export class AlmacenFalso {
  #datos = new Map();

  getItem(clave) {
    return this.#datos.has(clave) ? this.#datos.get(clave) : null;
  }

  setItem(clave, valor) {
    this.#datos.set(clave, String(valor)); // como el real: todo se guarda como texto
  }

  removeItem(clave) {
    this.#datos.delete(clave);
  }

  clear() {
    this.#datos.clear();
  }

  get length() {
    return this.#datos.size;
  }
}
```

```js
// tests/visitas.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { contarVisita } from '../src/visitas.js';
import { AlmacenFalso } from './AlmacenFalso.js';

describe('contarVisita', () => {
  let almacen;

  beforeEach(() => {
    almacen = new AlmacenFalso(); // vacío en cada test
  });

  it('empieza en 1 si no hay nada guardado', () => {
    expect(contarVisita(almacen)).toBe(1);
  });

  it('suma a lo que ya había y lo guarda como texto', () => {
    almacen.setItem('visitas', '41');
    expect(contarVisita(almacen)).toBe(42);
    expect(almacen.getItem('visitas')).toBe('42');
  });
});
```

Ahora el test no depende del navegador ni del orden de los tests, y puedes preparar **cualquier** estado: vacío, con datos, corrupto.

> 📝 **Nota del Profesor**: Un test con un doble de prueba sigue siendo **unitario** (UD3, tema 10, apartado 10.5.8): el doble sustituye al `localStorage` real precisamente para probar `contarVisita` **sola**. Lo que usa el DOM (pintar la lista, abrir un `<dialog>`) se prueba en la UD5 con tests **de integración** que simulan el documento, y la página completa en un navegador real, con pruebas **de extremo a extremo** con Playwright.

---

## 8.5. Mocks con Vitest

Cuando no puedes (o no quieres) añadir un parámetro, Vitest ofrece herramientas para **sustituir** temporalmente objetos globales en los tests. Se llaman ***mocks*** y se importan del objeto `vi`.

| Herramienta | Para qué | Deshacer |
|-------------|----------|----------|
| `vi.useFakeTimers()` + `vi.setSystemTime(fecha)` | Fijar la fecha que devuelven `new Date()` y `Date.now()` | `vi.useRealTimers()` |
| `vi.spyOn(objeto, 'metodo').mockReturnValue(v)` | Fijar lo que devuelve un método (`Math.random`) | `vi.restoreAllMocks()` |
| `vi.stubGlobal(nombre, valor)` | Crear o sustituir un global (`localStorage`) | `vi.unstubAllGlobals()` |
| `vi.fn()` | Crear una función espía que registra sus llamadas | — |

> ⚠️ **Cuidado**: Deshaz **siempre** los mocks al terminar cada test (en un `afterEach`). Si no, un test deja la fecha o el azar trucados para los siguientes, y los resultados dependen del orden.

### 8.5.1. Controlar la fecha: `vi.setSystemTime`

```js
// src/saludo.js
export function saludo(fecha = new Date()) {
  const hora = fecha.getHours();
  if (hora < 12) return 'Buenos días';
  if (hora < 20) return 'Buenas tardes';
  return 'Buenas noches';
}
```

```js
// tests/saludo.test.js
import { describe, it, expect, afterEach, vi } from 'vitest';
import { saludo } from '../src/saludo.js';

describe('saludo', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    [9, 'Buenos días'],
    [12, 'Buenas tardes'],
    [19, 'Buenas tardes'],
    [20, 'Buenas noches'],
  ])('a las %i dice «%s»', (hora, esperado) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 0, 15, hora, 0)); // la "hora actual" del test
    expect(saludo()).toBe(esperado);
  });
});
```

`saludo` también admite la fecha como parámetro (inyección): `saludo(new Date(2025, 0, 15, 9))`. Con `vi.setSystemTime` se prueba además el caso real, sin argumentos.

### 8.5.2. Controlar el azar: `vi.spyOn`

```js
// src/dado.js
export const tirarDado = () => Math.floor(Math.random() * 6) + 1;
```

```js
// tests/dado.test.js
import { it, expect, afterEach, vi } from 'vitest';
import { tirarDado } from '../src/dado.js';

afterEach(() => {
  vi.restoreAllMocks(); // Math.random vuelve a ser el de verdad
});

it('el valor más bajo de Math.random da un 1', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0);
  expect(tirarDado()).toBe(1);
});

it('el valor más alto de Math.random da un 6', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.9999);
  expect(tirarDado()).toBe(6);
});
```

Con el azar fijado, se prueban justo los **casos límite**, que de otra forma saldrían muy pocas veces.

### 8.5.3. Sustituir un global: `vi.stubGlobal`

Si el código usa `localStorage` directamente y no puedes cambiarlo, `vi.stubGlobal` crea ese global en Node.js durante el test:

```js
import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import { contarVisita } from '../src/visitas.js';
import { AlmacenFalso } from './AlmacenFalso.js';

beforeEach(() => {
  vi.stubGlobal('localStorage', new AlmacenFalso());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it('usa el localStorage global si no se le pasa ninguno', () => {
  contarVisita();
  expect(contarVisita()).toBe(2);
});
```

### 8.5.4. Funciones espía: `vi.fn`

Una **función espía** registra cada llamada y sus argumentos. Sirve para comprobar que el código **llama** a un callback, por ejemplo en el patrón Observer de la UD3 o en una función que recibe `alResponder`:

```js
import { it, expect, vi } from 'vitest';

it('avisa al callback con el total', () => {
  const alTerminar = vi.fn();
  procesarPedido({ precio: 5, cantidad: 3 }, alTerminar);
  expect(alTerminar).toHaveBeenCalledTimes(1);
  expect(alTerminar).toHaveBeenCalledWith(15);
});
```

> 💡 **Tip del Examinador**: "¿Qué es un mock y para qué sirve?" → Un objeto o función que sustituye a uno real durante un test, para que el resultado no dependa de cosas que no controlas (la fecha, el azar, el almacenamiento del navegador, un servidor) y para poder preparar cualquier situación, incluidos los casos límite.

---

## 8.6. Ejemplo integrador: el módulo `racha`

Una aplicación de estudio cuenta los **días seguidos** que el usuario la abre. Depende de la fecha y de `localStorage`, así que recibe los dos por parámetro.

```js
// src/racha.js
/**
 * Racha de días seguidos de uso de la aplicación.
 *
 * Guarda en el almacenamiento la clave `racha` con el JSON `{ dias, ultimo }`, donde `ultimo`
 * es la fecha del último uso en formato `AAAA-MM-DD`.
 *
 * @module racha
 */

/**
 * Fecha local en formato AAAA-MM-DD.
 * @param {Date} fecha
 * @returns {string}
 */
function diaLocal(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

/**
 * Registra el uso de hoy y devuelve la racha actual.
 *
 * @param {Date} [hoy=new Date()]
 * @param {Storage} [almacen=globalThis.localStorage]
 * @returns {number} Días seguidos, contando hoy.
 */
export function registrarUso(hoy = new Date(), almacen = globalThis.localStorage) {
  let guardado = { dias: 0, ultimo: null };
  try {
    guardado = { ...guardado, ...JSON.parse(almacen.getItem('racha') ?? '{}') };
  } catch {
    // valor corrupto: se empieza de cero
  }
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  let dias = 1;
  if (guardado.ultimo === diaLocal(hoy)) dias = guardado.dias; // ya contado hoy
  else if (guardado.ultimo === diaLocal(ayer)) dias = guardado.dias + 1; // racha que sigue

  almacen.setItem('racha', JSON.stringify({ dias, ultimo: diaLocal(hoy) }));
  return dias;
}
```

```js
// tests/racha.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { registrarUso } from '../src/racha.js';
import { AlmacenFalso } from './AlmacenFalso.js';

describe('registrarUso', () => {
  let almacen;
  beforeEach(() => {
    almacen = new AlmacenFalso();
  });

  it('la primera vez la racha es 1', () => {
    expect(registrarUso(new Date(2025, 2, 10), almacen)).toBe(1);
  });

  it('suma un día si el último uso fue ayer, también al cambiar de mes', () => {
    registrarUso(new Date(2025, 1, 28), almacen); // 28 de febrero
    expect(registrarUso(new Date(2025, 2, 1), almacen)).toBe(2); // 1 de marzo
  });

  it('no suma dos veces el mismo día', () => {
    registrarUso(new Date(2025, 2, 10, 9), almacen);
    expect(registrarUso(new Date(2025, 2, 10, 22), almacen)).toBe(1);
  });

  it('vuelve a 1 si se salta un día', () => {
    registrarUso(new Date(2025, 2, 10), almacen);
    expect(registrarUso(new Date(2025, 2, 12), almacen)).toBe(1);
  });

  it('tolera un valor corrupto', () => {
    almacen.setItem('racha', '{roto');
    expect(registrarUso(new Date(2025, 2, 10), almacen)).toBe(1);
  });
});
```

| Técnica | Dónde |
|---------|-------|
| Documentar qué clave y qué formato guarda | Bloque `@module` |
| Inyección de dependencias | Parámetros `hoy` y `almacen` con valores por defecto reales |
| Doble de prueba | `AlmacenFalso` |
| Casos límite de fechas | Cambio de mes, mismo día, día saltado |
| Datos corruptos | `try…catch` en el código y un test que lo comprueba |
| Depurar en el navegador | Ver y editar la clave `racha` en Application |

---

## Resumen

- La pestaña **Application** de las DevTools muestra, edita y borra cookies, Web Storage, IndexedDB y Cache Storage. **Clear site data** simula a un usuario nuevo.
- Prueba lo que guarda datos con el almacenamiento vacío, con datos correctos y con datos corruptos.
- Un módulo que usa el navegador documenta qué objetos usa y qué claves y formatos guarda.
- El código que depende de la fecha, del azar o del almacenamiento se prueba **inyectando** esas dependencias como parámetros con valor por defecto, y pasando **dobles de prueba** en los tests.
- Vitest ofrece **mocks**: `vi.useFakeTimers` y `vi.setSystemTime` (fecha), `vi.spyOn(…).mockReturnValue` (métodos como `Math.random`), `vi.stubGlobal` (globales como `localStorage`) y `vi.fn` (funciones espía). Se deshacen en `afterEach`.

## Ejercicios de reflexión

1. Guarda un objeto en `localStorage` sin `JSON.stringify` y búscalo en la pestaña Application. ¿Qué ves?
2. ¿Por qué un test que usa la fecha real puede pasar hoy y fallar mañana? Pon un ejemplo.
3. ¿Qué ventaja tiene la inyección de dependencias frente a `vi.stubGlobal`? ¿Y al revés?
4. Escribe el test que comprueba que `registrarUso` funciona al cambiar de año (31 de diciembre y 1 de enero).
5. ¿Qué pasaría si olvidas `vi.restoreAllMocks()` después de un test que fija `Math.random` en 0?

---

[⬅️ Volver a la unidad](./README.md)
