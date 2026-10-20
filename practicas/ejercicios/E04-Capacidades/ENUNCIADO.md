# E04 · Detector de capacidades y modo oscuro

**Tipo:** autocorrección

Una página que analiza el navegador y la ventana con `navigator`, `screen` y `matchMedia`, y cambia su aspecto con un tema claro u oscuro y la pantalla completa.

**CE:** RA3 b, c

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3404) y abre <http://localhost:3404> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3404 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3404 .`.

## Punto de partida

- `index.html`: la página con los elementos que hay que rellenar.
- `estilos.css`: define los colores con variables CSS para `:root` y para `:root[data-tema='oscuro']`. **No escribas estilos en el JavaScript**: cambia el atributo.
- `js/main.js`: vacío.

## Requisitos

1. **Capacidades:** rellena la tabla `#capacidades` con una fila por capacidad (nombre y `✅ Sí` / `❌ No`) para: geolocalización, portapapeles, notificaciones, IndexedDB, compartir (`navigator.share`), `BroadcastChannel` y pantalla completa. Usa **detección de capacidades**; `navigator.userAgent` no puede aparecer en el código. Guarda las capacidades en un array de pares `[nombre, función que comprueba]` y recórrelo.
2. **Idioma:** `navigator.language` y la lista de `navigator.languages`.
3. **Conexión:** `🟢 en línea` o `🔴 sin conexión`, actualizado con los eventos `online` y `offline`.
4. **Pantalla y ventana:** el tamaño de la pantalla (y el disponible) y el de la ventana con su densidad de píxeles. El de la ventana se actualiza al redimensionar.
5. **Diseño:** `📱 móvil` si la ventana mide 600 px de ancho o menos, `🖥️ escritorio` si no, con `matchMedia` y su evento `change` (no con `resize`).
6. **Tema:** al cargar, el de la preferencia del sistema (`prefers-color-scheme`). El botón alterna entre claro y oscuro cambiando `data-tema` en `<html>`, y su texto indica el tema al que se cambiará. Si el usuario ha pulsado el botón, los cambios de la preferencia del sistema ya no le afectan.
7. **Pantalla completa:** el botón entra y sale de la pantalla completa; si no está disponible, queda desactivado.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución», y la tabla de capacidades en dos navegadores.

## Comprueba tu solución

- Busca `userAgent` y `.style.` en `main.js`: no deben aparecer.
- En las DevTools, activa la **barra de herramientas del dispositivo** (*device toolbar*, `Ctrl+Mayús+M`) y cambia el ancho: «Diseño» cambia al pasar de 600 px, y «Ventana» se actualiza.
- En la pestaña **Red** (*Network*) elige **Sin conexión** (*Offline*): «Conexión» cambia sin recargar.
- Emula el modo oscuro del sistema (DevTools → menú ⋮ → **Más herramientas** (*More tools*) → **Renderizado** (*Rendering*) → **Emular función multimedia CSS prefers-color-scheme** → `prefers-color-scheme: dark`): la página cambia de tema. Pulsa después el botón y vuelve a cambiar la emulación: el tema ya no cambia.
- Abre la página en otro navegador de tu equipo (Firefox o Edge) y compara su tabla con la de Chrome en la sección «Capacidades en dos navegadores» del README. Puede que no cambie nada: «Compartir» (`navigator.share`), por ejemplo, depende del navegador y también del sistema operativo. Precisamente por eso se detectan las capacidades en lugar de suponerlas a partir del navegador.
- La pantalla completa funciona al pulsar el botón y `Esc` sale de ella.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
