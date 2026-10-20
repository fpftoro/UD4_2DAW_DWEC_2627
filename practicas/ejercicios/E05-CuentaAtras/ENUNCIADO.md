# E05 · Cuenta atrás

**Tipo:** autocorrección

Una cuenta atrás que se actualiza cada segundo en la página y en el **título de la pestaña**, con la lista de próximos eventos **generada desde el código**.

**CE:** RA3 c, d

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3405) y abre <http://localhost:3405> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3405 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3405 .`.

## Punto de partida

- `index.html` y `estilos.css`: la página (con las clases `terminado` y `pasado` ya definidas).
- `js/eventos.js`: los eventos del calendario. Uno de sus nombres contiene `<DWEC>`.
- `js/cuenta.js` y `js/main.js`: vacíos.

## Requisitos

**`js/cuenta.js`**: funciones puras exportadas, documentadas con JSDoc (sin usar `document`, `location` ni la fecha actual: la reciben como parámetro).

1. `descomponer(ms)` → `{ dias, horas, minutos, segundos }` completos (una duración negativa cuenta como 0).
2. `formatearCuenta(ms)` → `'2 d 03:04:05'`, o `'03:04:05'` si queda menos de un día (usa `padStart`).
3. `leerObjetivo(busqueda, ahora)` → `{ objetivo, nombre }`: la fecha del parámetro `hasta` de la URL y el nombre del parámetro `nombre`. Si `hasta` no existe o no es una fecha válida, el próximo 1 de enero a las 00:00, con el nombre `Año Nuevo AAAA`.
4. `tiempoRelativo(fecha, ahora)` → con `Intl.RelativeTimeFormat` en español (`numeric: 'auto'`), en días si la diferencia es de un día o más, si no en horas, minutos o segundos: «dentro de 3 días», «mañana», «hace 2 horas».

**`js/main.js`**:

5. Muestra el título (con `textContent`: el nombre puede venir de la URL) y la fecha objetivo con `Intl.DateTimeFormat` (`dateStyle: 'full'`, `timeStyle: 'short'`).
6. Cada segundo (`setInterval`), actualiza el contador y **el título de la pestaña** con `⏳ ` seguido de la cuenta.
7. Al llegar a cero: detén el temporizador (`clearInterval`), muestra `🎉 ¡Ya!` con la clase `terminado` y pon de título `🎉 ¡Ya es <nombre>!`.
8. Genera la lista `#eventos` con **una sola asignación** a `innerHTML`, a partir de los eventos ordenados por fecha (sin modificar el array original), con su tiempo relativo. Los pasados llevan la clase `pasado`. **Escapa** los nombres.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

Los parámetros se escriben detrás de la dirección de la página: `/?hasta=fecha-mala` es <http://localhost:3405/?hasta=fecha-mala>. No pongas `index.html` delante del `?`: `serve` redirige `/index.html` a `/index` y por el camino se pierden los parámetros.

- Abre `/?hasta=2030-01-01T00:00&nombre=Mi%20cumpleaños`: título «Cuenta atrás para Mi cumpleaños» y la cuenta en días.
- Abre `/?hasta=` con una fecha **un minuto** en el futuro (escríbela a mano): el contador baja sin días (`00:00:59`…) y al llegar a cero aparece `🎉 ¡Ya!`, el título cambia y el contador se detiene (no salen cuentas negativas).
- Cambia de pestaña: el título sigue actualizándose.
- Abre `/?hasta=fecha-mala`: la cuenta es hasta el próximo Año Nuevo.
- Abre `/?nombre=<b>Pepe</b>&hasta=2030-01-01T00:00`: se ve `<b>Pepe</b>` como texto.
- En la lista se ve `Examen de la UD4 <DWEC>` como texto y los eventos pasados, tachados.
- En la consola (con un `import` dinámico o copiando las funciones): `formatearCuenta(93784000)` → `'1 d 02:03:04'`; `formatearCuenta(-5)` → `'00:00:00'`.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
