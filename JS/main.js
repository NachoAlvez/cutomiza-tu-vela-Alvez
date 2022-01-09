
const IVA = 1.21;
let totalCompra = 0;


 //llamado a función cotizar para los 8 input radios.
let bamboo = $("#1");
bamboo.click(cotizar)
let lavanda = $("#2");
lavanda.click(cotizar)
let rosa = $("#3");
rosa.click(cotizar)
let vainilla = $("#4");
vainilla.click(cotizar)


let cristales = $("#5");
cristales.click(cotizar)
let flores = $("#6");
flores.click(cotizar)
let madera = $("#7");
madera.click(cotizar)
let festiva = $("#8");
festiva.click(cotizar)


//calcula el precio de la vela customizada 
function cotizar() {
    let precio = 0.0;
    precio += precioAroma();
    precio += precioDecoracion();
    precio = sumarIva(precio);
    totalCompra = precio;
    $("#precio").html(`Precio: <b>$${precio}</b>`)

}

//Devuelve valor del input clickeado
function precioAroma() {
    if ($("#1").prop("checked")) {
        return 500;
    } else if ($("#2").prop("checked")) {
        return 600;
    } else if ($("#3").prop("checked")) {
        return 500;
    } else if ($("#4").prop("checked")) {
        return 650;
    }

}


//Devuelve valor del input clickeado
function precioDecoracion() {
    if ($("#5").prop("checked")) {
        return 300;
    } else if ($("#6").prop("checked")) {
        return 200;
    } else if ($("#7").prop("checked")) {
        return 250;
    } else if ($("#8").prop("checked")) {
        return 180;
    }
}


//Agrega el IVA al precio de la vela
function sumarIva(precio) {
    return (precio * IVA);
}

let velas = cargarVelas();

// Botones de agregar, eliminar producto, descuento y final compra
let boton = $("#btn").click(agregarVela);
let botonEliminar = $("#btn_eliminar").click(eliminarVelas).click(mostrarTicketFinal);
let botonDescuento = $("#btn_desc").click(calcularFactura);
let botonFinal = $("#btn__finalizar").click(calcularFactura).click(mostrarTicketFinal);
$("btn_finalizar").click(mostrarTicketFinal);


//agrega el objeto vela al array de velas
function agregarVela() {
    const vela = {
        aroma: document.querySelector('input[name="bandtype"]:checked').value,
        decoracion: document.querySelector('input[name="bandtyp"]:checked').value,
        valor: totalCompra
        
    }
    cargarVelas();
    velas.push(vela);
    document.forms[0].reset();
    //guardo la lista de velas en localStorage.
    localStorage.setItem("listaVelas", JSON.stringify(velas));

    mostrarLista()

}
//Lee entradas guardadas en localStorage y lo devuelve
function cargarVelas(){
    if(localStorage.getItem("listaVelas")){
        return JSON.parse(localStorage.getItem("listaVelas"))
    }
    return [];
}

//Imprime en pantalla las velas seleccionadas por el usuario y las guardadas en localStorage
function mostrarLista() {
    let velas = cargarVelas()
    $("#lista").empty();

    for (const [index, vela ] of velas.entries()) {
        let li = `<li class= "lista-velas"></li>`;
        let description = `<b>vela: ${vela.aroma} decoración: ${vela.decoracion} precio: $${vela.valor}</b>`;
        let button = `<button type='button' class= 'btn-close' data-bs-dismiss='alert' aria-label='Cerrar' onclick='eliminarVela(${index});'></button>`

        let nodo =  $(`<li class= "lista-velas"></li>`).append(description).append(button);

        $("#lista").append(nodo);

    }


}
//elimina la vela seleccionada del array mediante método filter
function eliminarVela(index) {
    velas = velas.filter( (vela, i) => {
        return (i != index);
    })

    localStorage.setItem("listaVelas", JSON.stringify(velas));
    
    if (velas.length == 0) {
        $("#precio_final").html(`Precio Final: <b>$0</b>`);
    }
    mostrarLista();
    
}
//elimina todas las velas del array y del localStorage
function eliminarVelas(){
    velas.length = 0;
    localStorage.clear();
    mostrarLista();
    $("#tituloVelasFinal").html("");
    info = "";
    $("#listarVelasFinal").html(info)
    calcularFactura();

}


//Compara el array de cupones validos para un descuento e imprime en html el total de la compra
function calcularFactura() {
    let acum = 0;
    for (let vela of velas) {
        acum += vela.valor;
    }

    const cupones = ["coder2021", "cupon1", "javaScript2021", "aguanteArrays", "React", "algunDescuento", "cyberweek"]; // array de cupones de descuento

    let cuponIngresado = $("#descuento").val();

    if (cupones.includes(cuponIngresado)) {
        $("#mensajeDesc").html(`Descuento del 15% aplicado`)

        $("#mensajeDesc").css("color", "green")
            .fadeIn(1500)
            .fadeOut(1500)
        acum = (acum * 0.85);

    } else if(cuponIngresado === ""){
        console.log("Hola")
    }else{
        $("#mensajeDesc").html(`Cupón no valido :( `)
        $("#mensajeDesc").css("color", "red")
            .fadeIn(1500)
            .fadeOut(1500)
    }
    $("#descuento").val("");
    $("#precio_final").html(`Monto Final: <b>$${parseInt(acum)}</b>`);

    return acum;
}

//Muestra las velas seleccionadas una vez tocado el boton de finalizar la compra
function mostrarTicketFinal(){
    let velas = cargarVelas();
    let info = "";
    $("#listaVelasFinal").empty();

    if(velas.length > 0){
        for(let vela of velas){
            info += "<div class='alert alert-success d-flex align-items-center' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg><div>Vela con aroma: " + vela.aroma + " y decoración: " + vela.decoracion + " </div></div>"
        }
        $("#tituloVelasFinal").html("Gracias por su compra!").fadeIn(2000)
        $("#listaVelasFinal").html(info).fadeIn(2000);
    }
}

//llama al método que lee el array guardado en localStorage.
$(window).on("load", function(){
    mostrarLista();
})
