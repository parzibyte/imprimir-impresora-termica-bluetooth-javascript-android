document.addEventListener("DOMContentLoaded", async () => {
    const URLPlugin = "http://localhost:8000"; // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000

    const $listaDeImpresoras = document.querySelector("#listaDeImpresoras"),
        $btnImprimir = document.querySelector("#btnImprimir"),
        $licencia = document.querySelector("#licencia"),
        $contenedorListaImpresoras = document.querySelector("#contenedorListaImpresoras");

    $btnImprimir.addEventListener("click", () => {
        const direccionMacDeLaImpresora = $listaDeImpresoras.value;
        const licencia = $licencia.value;
        if (!direccionMacDeLaImpresora) {
            return alert("Por favor seleccione una impresora. Si no hay ninguna, asegúrese de haberla emparejado al dispositivo y que la misma esté encendida")
        }
        demostrarCapacidades(direccionMacDeLaImpresora, licencia);
    });
    const init = async () => {
        $contenedorListaImpresoras.classList.add("is-loading");
        $btnImprimir.disabled = true;
        try {
            const impresoras = await ConectorEscposAndroid.obtenerImpresoras(URLPlugin);
            for (const impresora of impresoras) {
                $listaDeImpresoras.appendChild(Object.assign(document.createElement("option"), {
                    value: impresora.mac,
                    text: `${impresora.nombre} (${impresora.mac})`,
                }));
            }
        } catch (e) {
            alert("Error obteniendo lista de impresoras: " + e.message);
        } finally {
            $contenedorListaImpresoras.classList.remove("is-loading");
            $btnImprimir.disabled = false;
        }
    }
    const demostrarCapacidades = async (macImpresora, licencia) => {
        const conector = new ConectorEscposAndroid(licencia, URLPlugin);
        conector
            .Iniciar()
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
            .EstablecerTamañoFuente(1, 1)
            .EscribirTexto("parzibyte.me\n")
            .Feed(2)
            .Corte(1)
            .Pulso(48, 60, 120)

        try {
            $btnImprimir.disabled = true;
            $contenedorListaImpresoras.classList.add("is-loading");
            const respuesta = await conector.imprimirEn(macImpresora);
            if (respuesta === true) {
                alert("Impreso correctamente");
            } else {
                alert("Error: " + respuesta);
            }
        } catch (e) {
            alert("Error imprimiendo: " + e.message);
        } finally {
            $contenedorListaImpresoras.classList.remove("is-loading");
            $btnImprimir.disabled = false;
        }
    }
    init();
});