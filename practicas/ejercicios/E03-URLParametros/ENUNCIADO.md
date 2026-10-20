# E03 · URL y parámetros

**Tipo:** autocorrección

Analiza la dirección de la página con `location`, lee y construye parámetros con `URLSearchParams` y `URL`, y cambia la URL sin recargar con `history`.

**CE:** RA3 b

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3403) y abre <http://localhost:3403> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3403 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3403 .`.

## Punto de partida

- `index.html` y `estilos.css`: la página, con los elementos que tienes que rellenar (no hace falta cambiarlos).
- `js/url.js`: dos funciones puras con su JSDoc, sin programar.
- `js/main.js`: busca los elementos de la página, trae la función `anadirFila(nombre, valor)`, que añade una fila a la tabla, y responde a los botones. Eso es DOM y eventos (UD5 y UD6): viene hecho. Tú completas los `TODO`.

## Requisitos

**`js/url.js`** (sin usar `location`: las funciones reciben textos, para poder probarlas en la consola o en Node.js):

1. `leerPedido(busqueda)` lee con `URLSearchParams` los parámetros `producto`, `cantidad` y `cupon`. El producto, sin espacios en los extremos; la cantidad, 1 si no viene. Devuelve el objeto del JSDoc, con un array `errores` que contiene `Falta el producto` y/o `Cantidad no válida: «…»` (la cantidad debe ser un entero mayor o igual que 1).
2. `enlaceCompartir(base, pedido)` construye la URL con `new URL(base)` y `searchParams.set`. El cupón solo se añade si existe.

**`js/main.js`**:

3. Rellena la tabla `#partes` con `anadirFila`: una fila por cada propiedad de `location` (`href`, `protocol`, `host`, `pathname`, `search`, `hash` y `origin`), con `(vacío)` si no tiene valor. Recorre los nombres de las propiedades en lugar de escribir siete llamadas.
4. Muestra en `#pedido` (`parrafoPedido`) el pedido o sus errores, con `textContent`, porque los valores vienen de la URL. Si hay errores, añade la clase `error` con `parrafoPedido.classList.add('error')`.
5. Si el pedido es válido, pon en `#compartir` el enlace de `enlaceCompartir` (como `href` y como texto).
6. Programa `cambiarVista(vista)`, a la que llaman los botones **Lista** y **Tarjetas**: cambia el parámetro `vista` de la URL con `history.pushState`, **sin recargar**, y muestra la vista en `#vista-actual` y en el título de la pestaña. Al cargar la página, muestra la vista de la URL (`lista` si no hay). Al pulsar el botón **Atrás** del navegador (evento `popstate`, tema 2), la vista mostrada vuelve a ser la de la URL.
7. Completa los oyentes de los botones **Atrás** (con `history.back()`) y **Recargar** (con `location.reload()`).

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

Los parámetros se escriben detrás de la dirección de la página: `/?producto=Pan` es <http://localhost:3403/?producto=Pan>. No pongas `index.html` delante del `?`: `serve` redirige `/index.html` a `/index` y por el camino se pierden los parámetros.

- Con `/?producto=Taza%20%26%20plato&cantidad=3&cupon=VERANO#detalle`:
  - La tabla muestra `search` = `?producto=Taza%20%26%20plato&cantidad=3&cupon=VERANO` y `hash` = `#detalle`.
  - El pedido dice `✅ 3 × Taza & plato (cupón VERANO)`.
  - El enlace para compartir termina en `?producto=Taza+%26+plato&cantidad=3&cupon=VERANO` (`URLSearchParams` codifica los espacios como `+`).
- Con `/?cantidad=0`: `❌ Falta el producto · Cantidad no válida: «0»`.
- Con `/?producto=Pan`: `✅ 1 × Pan`.
- Con `/?producto=<b>Pan</b>`: se ve `<b>Pan</b>` como texto, no en negrita.
- Pulsa Tarjetas, Lista y Tarjetas: la URL cambia sin recargar (el contador de la pestaña Red no aumenta). Pulsa tres veces el botón Atrás del navegador: la vista mostrada cambia en cada paso hasta la inicial.
- En la consola: `leerPedido('?producto=%20Café%20&cantidad=2.5').errores` devuelve `[ 'Cantidad no válida: «2.5»' ]`.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
