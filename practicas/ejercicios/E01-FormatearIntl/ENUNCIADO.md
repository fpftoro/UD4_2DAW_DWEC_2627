# E01 · Formatear con Intl

**Tipo:** autocorrección

Muestra un informe de pedidos de clientes de varios países con los objetos nativos `Date` e `Intl`: cada importe y cada fecha con el formato de su país, y el resto en español.

**CE:** RA3 a

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

`informe.js` tiene una fecha fija `HOY` (para que la salida no cambie de un día a otro), un cambio fijo de dólares a euros, el IVA y cuatro pedidos. Cada pedido indica el idioma y país de su cliente (`idioma`) y su moneda.

## Requisitos

1. Crea **una vez**, al principio, los formateadores en español que vas a reutilizar: moneda en euros, porcentaje, tiempo relativo (`numeric: 'auto'`), lista, reglas de plural, fecha completa y comparador de textos.
2. Muestra la fecha del informe (`HOY`) con `dateStyle: 'full'`.
3. Para cada pedido, una línea con:
   - La **fecha** del pedido con `dateStyle: 'short'` y el **importe** en su moneda, los dos con el formato del **idioma del cliente**.
   - Entre paréntesis, cuánto hace del pedido en **días** respecto a `HOY`, redondeado, con `Intl.RelativeTimeFormat` («ayer», «hoy», «hace 14 días»).
   - El número de productos con la palabra en singular o plural decidida con `Intl.PluralRules`, y la lista de productos con `Intl.ListFormat`.
4. El total en euros (convierte los dólares con `EUROS_POR_DOLAR`) y el IVA, con su porcentaje formateado.
5. Los clientes ordenados con `Intl.Collator` y unidos con `Intl.ListFormat`.
6. No construyas a mano ningún separador, símbolo de moneda ni «y» de las listas: todo debe salir de `Intl`.

**Entrega.** Completa el `README.md`: cómo ejecutarlo, la salida, la tabla de los formateadores y la salida con `HOY` el 16 de marzo (la última comprobación de abajo).

## Comprueba tu solución

`npm start` (o `node informe.js`) muestra exactamente:

```text
📅 Informe del sábado, 15 de marzo de 2025
#1 Ana · 14/3/25 (ayer) · 1234,50 € · 2 productos: libro y lámpara
#2 John · 3/1/25 (hace 14 días) · $89.99 · 1 producto: taza
#3 Ébano Ruiz · 15/3/25 (hoy) · 15,00 € · 3 productos: bolígrafo, cuaderno y regla
#4 Lena · 13.02.25 (hace 30 días) · 2.500,00 € · 1 producto: mesa
💶 Total en euros: 3832,29 € · IVA (21 %): 804,78 €
👥 Clientes: Ana, Ébano Ruiz, John y Lena
```

- Si el total sale `3.832,29 €`, revisa: en español, los números de cuatro cifras **no** llevan separador de miles, e `Intl` lo respeta. Si lo has puesto tú a mano, sobra.
- Si Ébano Ruiz sale al final de la lista de clientes, estás ordenando con `sort()` sin `Collator`.
- Si el pedido 2 sale con la fecha `1/3/25`, has usado `'es-ES'` en lugar del idioma del cliente: en Estados Unidos el mes va primero.
- Si sale `hace 0 días` en lugar de `hoy`, te falta `numeric: 'auto'`.
- Cambia `HOY` al 16 de marzo: la primera línea debe decir `anteayer` y la tercera `ayer`.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
