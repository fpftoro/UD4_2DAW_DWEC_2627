// E06 · Lista de deseos con los diálogos del navegador.
// Funciona, pero usa alert, confirm y prompt: hay que sustituirlos (ver ENUNCIADO.md).
const deseos = ['Una bicicleta', 'Un libro de JavaScript'];
const lista = document.querySelector('#deseos');

function pintar() {
  lista.innerHTML = '';
  deseos.forEach((deseo, i) => {
    const elemento = document.createElement('li');
    elemento.textContent = deseo;
    const boton = document.createElement('button');
    boton.textContent = '❌';
    boton.addEventListener('click', () => {
      if (confirm(`¿Quitar «${deseo}»?`)) {
        deseos.splice(i, 1);
        pintar();
        alert('Deseo quitado');
      }
    });
    elemento.append(boton);
    lista.append(elemento);
  });
}

document.querySelector('#anadir').addEventListener('click', () => {
  const texto = prompt('¿Qué deseas?');
  if (texto === null) return;
  if (texto.trim() === '') {
    alert('El deseo no puede estar vacío');
    return;
  }
  deseos.push(texto.trim());
  pintar();
  alert(`Añadido: ${texto.trim()}`);
});

document.querySelector('#vaciar').addEventListener('click', () => {
  if (deseos.length > 0 && confirm(`¿Vaciar la lista de ${deseos.length} deseos?`)) {
    deseos.length = 0;
    pintar();
  }
});

pintar();
