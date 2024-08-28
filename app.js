const contenidoResultadoVacio=`<img class="encriptador__resultado__imagen" src="./assets/Muñeco.png" alt="imagen de una persona buscando">
<p class="encriptador__resultado__mensaje">
    <strong class="encriptador__resultado__mensaje__resaltar">Ningún mensaje fue encontrado</strong>
    Ingresa el texto que desees encriptar o desencriptar.
</p>`;
const conntenidoResultado=`<textarea id="encriptador__resultado__texto" readonly></textarea>
<button id="boton__copy" class="encriptador__resultado__boton">Copiar</button>`;
let moduloResultado=document.getElementsByClassName("encriptador__resultado")[0];
modificaResultado(contenidoResultadoVacio);
cargarEventos();
function modificaResultado(cambio) {
    moduloResultado.innerHTML=cambio;
}
function obtenerItemId(id) {
    return document.getElementById(id);
}
function copiar() {
    obtenerItemId("boton__copy").addEventListener("click", function() {
        let resultado = obtenerItemId("encriptador__resultado__texto");
        resultado.select();
        resultado.setSelectionRange(0, 99999); // Para dispositivos móviles
        // Copia el texto al portapapeles
        navigator.clipboard.writeText(resultado.value)
    });
}
function cargarEventos() {
    validaTextoIngresado("encriptador__principal__texto","input");
    botonesEncriptarDesencriptar("boton__encriptar");
    botonesEncriptarDesencriptar("boton__desencriptar");

}
function validaTextoIngresado(id,evento) {
    obtenerItemId(id).addEventListener(evento, function() {
        this.value = this.value.toLowerCase();
        this.value = this.value.replace(/[^a-z\s]/g, '');
    });
}
function encriptarDesencriptarTexto(texto,busqueda,remplazo) {
    texto = texto.replaceAll(busqueda[0],remplazo[0])
        .replaceAll(busqueda[1],remplazo[1])
        .replaceAll(busqueda[2],remplazo[2])
        .replaceAll(busqueda[3],remplazo[3])
        .replaceAll(busqueda[4],remplazo[4]);
    return texto;
}
function botonesEncriptarDesencriptar(id) {
    let vocales=["e","i","a","o","u"];
    let encriptacion=["enter","imes","ai","ober","ufat"];
    obtenerItemId(id).addEventListener("click", function() {
        let texto = obtenerItemId("encriptador__principal__texto").value.trim();
        if (texto!="") {
            modificaResultado(conntenidoResultado);
            let textoConvertido="";
            if(id === "boton__encriptar"){
                textoConvertido = encriptarDesencriptarTexto(texto,vocales,encriptacion);
            }else{
                textoConvertido = encriptarDesencriptarTexto(texto,encriptacion,vocales);
            }
           obtenerItemId("encriptador__resultado__texto").value = textoConvertido;
            copiar();
        }else{
            let textoPrincipal=obtenerItemId("encriptador__principal__texto")
            textoPrincipal.value="";
            textoPrincipal.focus();
            modificaResultado(contenidoResultadoVacio);
        }
    });
}