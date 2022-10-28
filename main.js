document.addEventListener("DOMContentLoaded", async () => {
    const conector = new ConectorEscposAndroid("", "http://192.168.0.3:8000");
    //const respuesta = await conector.Iniciar().EscribirTexto("Hola JS").Feed(2).imprimirEn("86:67:7A:AC:E4:40")
    const respuesta = await conector
        .Iniciar()
        /*
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .DescargarImagenDeInternetEImprimir("http://assets.stickpng.com/thumbs/587e32259686194a55adab73.png", 0, 216)
        .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .Feed(1)
        .EscribirTexto("Parzibyte's blog\n")
        .EscribirTexto("Blog de un programador\n")
        .EscribirTexto("Teléfono: 123456798\n")
        .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())))
        .Feed(1)
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
        .EscribirTexto("____________________\n")
        .EscribirTexto("Venta de plugin para impresoras térmicas Bluetooth con Android (1 mes)\n")
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_DERECHA)
        .EscribirTexto("$7.00\n")
        .EscribirTexto("____________________\n")
        .EscribirTexto("TOTAL: $7.00\n")
        .EscribirTexto("____________________\n")
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .EstablecerEnfatizado(true)
        .EstablecerTamañoFuente(1, 1)
        .EscribirTexto("¡Gracias por su compra!\n")
        .Feed(1)
        .ImprimirCodigoDeBarras("qr", "https://parzibyte.me/blog", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 160, 160)
        .Iniciar()
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .Feed(1)
        .ImprimirCodigoDeBarras("code128", "parzibyte.me", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 320, 50)
        .Iniciar()
        .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
        .Feed(1)
        */
        .EstablecerTamañoFuente(1, 1)
        .EscribirTexto("parzibyte.me\n")
        .Feed(2)
        .Corte(1)
        .Pulso(48, 60, 120)
        .imprimirEn("");
    console.log({ respuesta });
});