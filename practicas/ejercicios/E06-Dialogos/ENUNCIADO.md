# E06 · Diálogos: de `confirm` y `prompt` a `<dialog>`

**Tipo:** autocorrección

Sustituye `alert`, `confirm` y `prompt` de una lista de deseos por diálogos `<dialog>` con el diseño de la página y por avisos que no interrumpen.

**CE:** RA3 e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3406) y abre <http://localhost:3406> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3406 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3406 .`.

## Punto de partida

La página `index.html` con `js/main.js` ya funciona: añade deseos con `prompt`, pide confirmación con `confirm` antes de quitar uno o vaciar la lista, e informa con `alert`. Pruébala antes de cambiar nada y fíjate en qué pasa al pulsar Aceptar con el campo vacío y al pulsar Cancelar.

## Requisitos

1. Añade a `index.html` dos `<dialog>` con `<form method="dialog">`: uno para **pedir un texto** (con su campo, un párrafo para el error y los botones Cancelar y Añadir) y otro para **confirmar** (con la pregunta y los botones Cancelar y Aceptar). Cada botón lleva un `value`.
2. Añade una zona de avisos con `role="status"` y `aria-live="polite"`.
3. Crea `js/dialogos.js` con tres funciones exportadas y documentadas:
   - `pedirTexto(pregunta, alResponder)`: abre el diálogo con `showModal()`. Si se acepta con el campo vacío, **no se cierra**: muestra «El deseo no puede estar vacío». Si se cancela (o se pulsa `Esc`), no llama a `alResponder`.
   - `confirmar(pregunta, alResponder)`: llama a `alResponder(true)` o `alResponder(false)` según el botón, usando `returnValue` y el evento `close` con `{ once: true }`.
   - `avisar(texto, duracion = 3000)`: muestra el texto en la zona de avisos y lo borra pasado el tiempo.
4. Cambia `js/main.js` para usarlas: ningún `alert`, `confirm` ni `prompt` en todo el proyecto. La pregunta y los avisos se escriben con `textContent` (llevan texto del usuario).
5. Da estilo a los diálogos en `estilos.css`, incluido el fondo con `::backdrop`.
6. Completa en el `README.md` la tabla que compara los diálogos del navegador con `<dialog>` (bloqueo, diseño, validación, accesibilidad, código) y explica qué cambió en la estructura del código al pasar de `if (confirm(…))` a un callback.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Busca `alert(`, `confirm(` y `prompt(` en `js/`: no deben aparecer.
- Pulsa Añadir y acepta con el campo vacío o con espacios: el diálogo sigue abierto y muestra el error. Escribe un deseo: se añade y aparece «✅ Añadido: …», que desaparece a los tres segundos.
- Añade un deseo y pulsa `Esc`: no se añade nada.
- Quita un deseo y pulsa Cancelar: sigue en la lista. Pulsa ❌ otra vez y Aceptar: se quita.
- Añade el deseo `<b>Patines</b>`: se ve el texto con las etiquetas, en la lista, en la pregunta de confirmación y en el aviso.
- Con un diálogo abierto, la página de detrás no responde al ratón y el foco está dentro del diálogo.
- Activa un lector de pantalla (o mira el árbol de accesibilidad en las DevTools): los avisos se anuncian.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
