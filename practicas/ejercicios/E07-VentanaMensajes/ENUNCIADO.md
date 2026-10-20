# E07 · Ventana emergente con `postMessage`

**Tipo:** autocorrección

Un editor de anuncios abre una ventana de vista previa que se actualiza mientras escribes. Las dos ventanas se comunican **solo con mensajes**, en los dos sentidos.

**CE:** RA3 f

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3407) y abre <http://localhost:3407> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3407 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3407 .`.

## Punto de partida

- `index.html` (editor) con `js/editor.js`, y `vista.html` (vista previa) con `js/vista.js`. Los dos `.js` están vacíos.
- Las dos páginas las sirve el mismo servidor del Dev Container, así que tienen el **mismo origen**.

## Requisitos

**Editor (`js/editor.js`)**:

1. **Abrir vista previa** abre `vista.html` como ventana emergente (`popup`, 420 × 360). Si ya está abierta, la trae al frente (`focus`) en lugar de abrir otra. Si el navegador la bloquea, lo indica en `#estado`.
2. **Cerrar vista previa** la cierra (solo si está abierta).
3. Mientras se escribe en el `textarea` (evento `input`), envía el texto a la vista con `postMessage({ tipo: 'texto', valor }, origen)`, **solo** si la vista está abierta y ya ha avisado de que está lista.
4. Recibe los mensajes de la vista con el evento `message`, aceptando solo los de su **mismo origen** y de la **ventana que abrió** (`evento.source`):
   - `{ tipo: 'lista' }`: marca la vista como lista, muestra `✅ Vista previa conectada` y le envía el texto actual.
   - `{ tipo: 'recuento', palabras }`: muestra `✅ Vista previa: N palabras` (o `1 palabra`).

**Vista previa (`js/vista.js`)**:

5. Si no tiene `opener` (se ha abierto directamente), muestra «Abre esta página desde el editor.» y no hace nada más.
6. Al cargar, avisa a su `opener` con `{ tipo: 'lista' }`.
7. Al recibir `{ tipo: 'texto', valor }` (comprobando origen y que viene de su `opener`), muestra el texto en `#anuncio` **con `textContent`**, pone en el título de la pestaña el número de palabras y responde con `{ tipo: 'recuento', palabras }`.

**En las dos**: nunca accedas directamente al `document` de la otra ventana; nunca uses `'*'` como origen destino.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Abre la vista previa: muestra el texto inicial y el editor dice `✅ Vista previa conectada` y, enseguida, `✅ Vista previa: 6 palabras`.
- Escribe en el editor: la vista previa cambia con cada tecla y el recuento se actualiza.
- Pulsa otra vez «Abrir vista previa»: no se abre una segunda ventana.
- Escribe `<b>Oferta</b>`: en la vista previa se ve tal cual, sin negrita.
- Cierra la vista previa con el botón y escribe: no hay errores en la consola.
- Abre `vista.html` directamente en otra pestaña: muestra el mensaje de que se abra desde el editor.
- Busca `.document` en `js/`: solo debe aparecer en `document.querySelector` y `document.title` de cada ventana sobre sí misma.
- Desde la consola del editor, ejecuta `postMessage({ tipo: 'recuento', palabras: 999 }, '*')`: el estado **no** cambia, porque el mensaje no viene de la vista previa.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
