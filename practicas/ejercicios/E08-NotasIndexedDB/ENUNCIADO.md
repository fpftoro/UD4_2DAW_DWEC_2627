# E08 · Notas en IndexedDB

**Tipo:** autocorrección

Una pequeña aplicación de notas que se guardan en **IndexedDB** y siguen ahí al recargar la página o al cerrar el navegador.

**CE:** RA3 g

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3408) y abre <http://localhost:3408> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3408 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3408 .`.

## Punto de partida

- `index.html` y `estilos.css`: un formulario con un campo, un párrafo de estado y una lista.
- `js/db.js`: cuatro funciones documentadas, sin programar. El JSDoc del módulo describe la base de datos.
- `js/main.js`: vacío.

## Requisitos

**`js/db.js`**: la única parte del programa que conoce IndexedDB.

1. `abrir(alAbrir, alFallar)`: abre la base de datos `notas-e08` (versión 1). En `upgradeneeded`, crea el almacén `notas` con `keyPath: 'id'` y `autoIncrement: true`. Si el navegador no tiene IndexedDB (detección de capacidades) o falla, llama a `alFallar` con un mensaje.
2. `anadirNota(db, texto, alTerminar)`: guarda `{ texto, creada: new Date() }` en una transacción `readwrite` y avisa en el evento `complete`.
3. `listarNotas(db, alRecibir)`: lee todas con `getAll` en una transacción `readonly`.
4. `borrarNota(db, id, alTerminar)`: borra por su `id`.

**`js/main.js`**:

5. Al abrir la base de datos, muestra las notas **de la más reciente a la más antigua** (sin modificar el array recibido), con su fecha formateada con `Intl.DateTimeFormat` dentro de un `<time datetime="…">` y un botón 🗑️ por nota. Genera la lista con **una sola** asignación a `innerHTML`, escapando el texto de cada nota.
6. En `#estado`, el número de notas (`1 nota guardada`, `3 notas guardadas`), o el mensaje de error si no se pudo abrir.
7. Al enviar el formulario: si el texto (sin espacios) no está vacío, guarda la nota, vacía el campo y vuelve a pintar la lista. Usa `evento.preventDefault()` para que no se recargue la página.
8. Al pulsar 🗑️, borra esa nota y vuelve a pintar. Usa **un solo** oyente en la lista y el atributo `data-id` del botón.

> 📝 **Nota del Profesor**: Los formularios y los oyentes compartidos (delegación de eventos) son de la UD6. Para los requisitos 7 y 8 te bastan estos dos fragmentos:
>
> ```js
> // Al enviar el formulario: preventDefault evita que la página se recargue
> document.querySelector('#formulario').addEventListener('submit', (evento) => {
>   evento.preventDefault();
>   // …
> });
>
> // Un solo oyente para toda la lista: evento.target es el elemento pulsado
> document.querySelector('#notas').addEventListener('click', (evento) => {
>   const id = evento.target.dataset.id; // undefined si no se ha pulsado un botón 🗑️
>   // …
> });
> ```
>
> El `id` que lees de `data-id` es un **texto**, y el de IndexedDB, un número: conviértelo antes de borrar.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Añade tres notas y recarga: siguen ahí, la última arriba.
- Cierra el navegador y vuelve a abrir la página: siguen ahí.
- En DevTools → **Aplicación** (*Application*) → **IndexedDB** → `notas-e08` → `notas`: ves los objetos con su `id` y la fecha `creada` como un **Date** (no como texto). Pulsa el botón **Actualizar** de la vista después de cada cambio.
- Borra una nota desde la página y comprueba en Aplicación que ha desaparecido. Borra un registro desde Aplicación y recarga la página: tampoco está.
- Añade la nota `<i>importante</i>`: se ve el texto con las etiquetas.
- Abre la página en una ventana privada: empieza sin notas (cada contexto tiene su propio almacenamiento).
- **Borrar datos de sitios** (*Clear site data*) en Aplicación: la base de datos desaparece y, al recargar, se vuelve a crear vacía (pasa otra vez por `upgradeneeded`).

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
