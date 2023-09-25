const ConectorEscposAndroid = (() => {

    /**
     * Una clase para interactuar con el plugin de impresoras térmicas en Android
     *
     * @date 2022-10-28
     * @author parzibyte
     * @see https://parzibyte.me/blog
     */

    class Operacion {
        constructor(nombre, argumentos) {
            this.nombre = nombre;
            this.argumentos = argumentos;
        }
    }

    class ConectorPlugin {

        static URL_PLUGIN_POR_DEFECTO = "http://localhost:8000";
        static Operacion = Operacion;
        static TAMAÑO_IMAGEN_NORMAL = 0;
        static TAMAÑO_IMAGEN_DOBLE_ANCHO = 1;
        static TAMAÑO_IMAGEN_DOBLE_ALTO = 2;
        static TAMAÑO_IMAGEN_DOBLE_ANCHO_Y_ALTO = 3;
        static TAMAÑO_IMAGEN_DOBLE_ANCHO_Y_ALTO = 3;
        static ALINEACION_IZQUIERDA = 0;
        static ALINEACION_CENTRO = 1;
        static ALINEACION_DERECHA = 2;
        static RECUPERACION_QR_BAJA = 0;
        static RECUPERACION_QR_MEDIA = 1;
        static RECUPERACION_QR_ALTA = 2;
        static RECUPERACION_QR_MEJOR = 3;


        constructor(serial, ruta) {
            if (!serial) serial = "";
            if (!ruta) ruta = ConectorPlugin.URL_PLUGIN_POR_DEFECTO;
            this.ruta = ruta;
            this.operaciones = [];
            this.serial = serial;
            return this;
        }

        CargarImagenLocalEImprimir(ruta, tamaño, maximoAncho) {
            this.operaciones.push(new ConectorPlugin.Operacion("CargarImagenLocalEImprimir", Array.from(arguments)));
            return this;
        }
        CorteCompletoUno() {
            this.operaciones.push(new ConectorPlugin.Operacion("CorteCompletoUno"));
            return this;
        }
        CorteCompletoDos() {
            this.operaciones.push(new ConectorPlugin.Operacion("CorteCompletoDos"));
            return this;
        }
        Corte(lineas) {
            this.operaciones.push(new ConectorPlugin.Operacion("Corte", Array.from(arguments)));
            return this;
        }
        CorteParcial() {
            this.operaciones.push(new ConectorPlugin.Operacion("CorteParcial", Array.from(arguments)));
            return this;
        }
        DescargarImagenDeInternetEImprimir(urlImagen, tamaño, maximoAncho) {
            this.operaciones.push(new ConectorPlugin.Operacion("DescargarImagenDeInternetEImprimir", Array.from(arguments)));
            return this;
        }
        DeshabilitarElModoDeCaracteresChinos() {
            this.operaciones.push(new ConectorPlugin.Operacion("DeshabilitarElModoDeCaracteresChinos", Array.from(arguments)));
            return this;
        }
        EscribirTexto(texto) {
            this.operaciones.push(new ConectorPlugin.Operacion("EscribirTexto", Array.from(arguments)));
            return this;
        }
        EstablecerAlineacion(alineacion) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerAlineacion", Array.from(arguments)));
            return this;
        }
        EstablecerEnfatizado(enfatizado) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerEnfatizado", Array.from(arguments)));
            return this;
        }
        EstablecerFuente(fuente) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerFuente", Array.from(arguments)));
            return this;
        }
        EstablecerImpresionAlReves(alReves) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerImpresionAlReves", Array.from(arguments)));
            return this;
        }
        EstablecerImpresionBlancoYNegroInversa(invertir) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerImpresionBlancoYNegroInversa", Array.from(arguments)));
            return this;
        }
        EstablecerRotacionDe90Grados(rotar) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerRotacionDe90Grados", Array.from(arguments)));
            return this;
        }
        EstablecerSubrayado(subrayado) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerSubrayado", Array.from(arguments)));
            return this;
        }
        EstablecerTamañoFuente(multiplicadorAncho, multiplicadorAlto) {
            this.operaciones.push(new ConectorPlugin.Operacion("EstablecerTamañoFuente", Array.from(arguments)));
            return this;
        }
        Feed(lineas) {
            this.operaciones.push(new ConectorPlugin.Operacion("Feed", Array.from(arguments)));
            return this;
        }
        HabilitarElModoDeCaracteresChinos() {
            this.operaciones.push(new ConectorPlugin.Operacion("HabilitarElModoDeCaracteresChinos", Array.from(arguments)));
            return this;
        }
        ImprimirCodigoDeBarras(tipo, datos, tamaño, ancho, alto) {
            this.operaciones.push(new ConectorPlugin.Operacion("ImprimirCodigoDeBarras", Array.from(arguments)));
            return this;
        }

        ImprimirImagenEnBase64(imagenCodificadaEnBase64, tamaño, maximoAncho) {
            this.operaciones.push(new ConectorPlugin.Operacion("ImprimirImagenEnBase64", Array.from(arguments)));
            return this;
        }

        Iniciar() {
            this.operaciones.push(new ConectorPlugin.Operacion("Iniciar", Array.from(arguments)));
            return this;
        }

        Pulso(pin, tiempoEncendido, tiempoApagado) {
            this.operaciones.push(new ConectorPlugin.Operacion("Pulso", Array.from(arguments)));
            return this;
        }

        TextoSegunPaginaDeCodigos(numeroPagina, pagina, texto) {
            this.operaciones.push(new ConectorPlugin.Operacion("TextoSegunPaginaDeCodigos", Array.from(arguments)));
            return this;
        }


        static async obtenerImpresoras(ruta) {
            if (ruta) ConectorPlugin.URL_PLUGIN_POR_DEFECTO = ruta;
            const response = await fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/impresoras");
            return await response.json();
        }

        async imprimirEn(macImpresora) {
            const payload = {
                operaciones: this.operaciones,
                impresora: macImpresora,
                serial: this.serial,
            };
            const response = await fetch(this.ruta + "/imprimir", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            return await response.json();
        }
    }
    return ConectorPlugin;
})();