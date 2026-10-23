botonesLetras[3].innerText = listaLetras[3] || "-";
// Si el bloque tiene más de 4 letras (como S-Z), agrupamos las sobrantes provisionalmente
if (listaLetras[4]) botonesLetras[3].innerText += ... ${listaLetras[listaLetras.length-1]};
} else {
// Segunda fase: ya seleccionó la letra exacta
let caracter = elemento.innerText.charAt(0);
if (caracter !== "-") {
textoActual += caracter;
actualizarPantalla();
}
resetearTeclado();
}
}
function resetearTeclado() {
modoSubgrupo = false;
botonesLetras[0].innerText = "A - F";
botonesLetras[1].innerText = "G - L";
botonesLetras[2].innerText = "M - R";
botonesLetras[3].innerText = "S - Z";
}
// CONFIGURACIÓN DE IA CON HANDSFREE.JS
const handsfree = new Handsfree({ weboji: true });
handsfree.enablePlugins('browser');
let yaHizoClic = false;
handsfree.use('clickPorPestañeo', (data) => {
if (!data.weboji || !data.weboji.morphs) return;
// Umbral del EAR (Eye Aspect Ratio): >0.80 indica ojo cerrado voluntariamente
const ojoIzquierdoCerrado = data.weboji.morphs[0] > 0.80;
const ojoDerechoCerrado = data.weboji.morphs[1] > 0.80;
if (ojoIzquierdoCerrado && ojoDerechoCerrado) {
if (!yaHizoClic) {
yaHizoClic = true;
const pX = data.weboji.pointer.x;
const pY = data.weboji.pointer.y;
const elementoMirado = document.elementFromPoint(pX, pY);
if (elementoMirado) {
// 1. Si mira un botón de frases rápidas de chisme
if (elementoMirado.classList.contains('btn-chisme')) {
let frase = elementoMirado.getAttribute('data-texto');
hablar(frase);
}
// 2. Si mira el teclado de bloques
else if (elementoMirado.classList.contains('bloque-letras')) {
manejarSeleccionBloque(elementoMirado);
}
// 3. Ejecuta los clics de los botones de control nativos
else if (elementoMirado.classList.contains('btn-accion')) {
elementoMirado.click();
}
}
}
} else {
if (yaHizoClic) yaHizoClic = false;
}
});
// Inicio automático del motor
handsfree.start();
handsfree.on('start', () => {
document.getElementById('estado').innerText = "Rastreador Ocular Listo";
actualizarPantalla();
});
