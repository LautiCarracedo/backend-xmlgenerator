const { ValoresInputEntesVarios, ValoresFijosGeneral, ValoresFijosSucursal, ValoresFijosPagos, ValoresFijosDP, ValoresCalculablesEntesVarios, IVATagGeneral, IVATagSucursalYPagos, IVATagDetallePago } = require('../models/modelEntesVarios');
class GeneradorEntesVarios{
    //por el momento vamos a generarXML de Cordobesa solamente
    generarXMLEnte(origen, ente, comisionCred, comisionDeb, nroDeComercio, nroLote, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2){ 
        
        /*Instanciamos las clases: ValoresInputEntesVarios, ValoresFijosGeneral, ValoresFijosSucursal, ValoresFijosPagos,
        ValoresFijosDP. En cada clase se explica que función cumple cada una.*/

        //Valores que son los input de la interfaz, los cargamos en clase ValoresInputEntesVarios
        let valoresInputEntesVarios = new ValoresInputEntesVarios(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2)
        
        let nroBanco = valoresInputEntesVarios.getNroBanco();
        let fechaDeRendicion = valoresInputEntesVarios.getFechaRendicion();
        let arrayImportes = valoresInputEntesVarios.getArrayImportes();
        let arrayBoletas = valoresInputEntesVarios.getArrayBoletas();
        let inputFechasPagos = valoresInputEntesVarios.getArrayFechasPagos();
        let arrayCantCuotas = valoresInputEntesVarios.getArrayCantCuotas();
        let arrayCuotasActuales = valoresInputEntesVarios.getArrayCuotasActuales();


        //Valores que son siempre fijos del tag General
        let valoresFijosTagGeneral = new ValoresFijosGeneral(ente);

        let nroTransaccion = valoresFijosTagGeneral.getNroTransaccion();
        let nroRendicion = valoresFijosTagGeneral.getNroRendicion();
        const [cbuOrigen, cuitOrigen, cbuDestino, cuitDestino] = valoresFijosTagGeneral.getCbusyCuits();
        let totalImpRecaudadoYDepositadoYADepositar = valoresFijosTagGeneral.getTotalImpRecaudadoYDepositadoYADepositar();
  

        //Valores que son siempre fijos del tag Sucursal
        let valoresFijosTagSucursal = new ValoresFijosSucursal();
        let sucursal = valoresFijosTagSucursal.getSucursal();

        //Valores que son siempre fijos del tag Pagos
        let valoresFijosTagPagos = new ValoresFijosPagos();
        let codigoRegistroPagos = valoresFijosTagPagos.getCodigoRegistro();
        let caja = valoresFijosTagPagos.getCaja();
        let cajero = valoresFijosTagPagos.getCajero();



        //Valores que son siempre fijos del tag DetallePago
        let valoresFijosTagDP = new ValoresFijosDP();
        let codRegistroDP = valoresFijosTagDP.getCodigoRegistro();
        let marcaMovimiento = valoresFijosTagDP.getMarcaMovimiento();
        let tipoOperacion = valoresFijosTagDP.getTipoOperacion();
        let tipoRendicion = valoresFijosTagDP.getTipoRendicion();
        let moneda = valoresFijosTagDP.getMoneda();
        let obligacion = valoresFijosTagDP.getObligacion();



        /*Valores que necesitan ser calculados a partir de los datos ingresados. Para ello,
        instanciamos la clase ValoresCalculablesEntesVarios*/
        let valoresCalculablesEntesVarios = new ValoresCalculablesEntesVarios(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales,  nroDeComercio, nroLote);
        let cantRegistros = valoresCalculablesEntesVarios.calcCantRegistros();
        let totalImpDeterminadoPagado = valoresCalculablesEntesVarios.calcTotalImportesDeterminadoYPagado();
        let nroComercio = valoresCalculablesEntesVarios.getNroComercio();
        let lote = valoresCalculablesEntesVarios.getLote();
        


        /*Para la parte de los ivas, usamos la interfaz definida para trabajar con ello. En este caso,
        instanciamos la clase IVATAGGeneral e IVATagSucursalYPagos*/
        let calculosIVAYComisionTagGeneral = new IVATagGeneral(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales);
        let calculosIVAYComisionTagSucursalYPagos = new IVATagSucursalYPagos(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales);
        let calculosIVAYComisionTagDP = new IVATagDetallePago(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales);

        let comisionTagGeneral = calculosIVAYComisionTagGeneral.calcComision();
        let ivaTagGeneral = calculosIVAYComisionTagGeneral.calcIva();

        let comisionTagSucursalYPagos = calculosIVAYComisionTagSucursalYPagos.calcComision();
        let ivaTagSucursalYPagos = calculosIVAYComisionTagSucursalYPagos.calcIva()

        let arrayComisiones = calculosIVAYComisionTagDP.calcComision();
        let arrayIVAs = calculosIVAYComisionTagDP.calcIva();

        console.log('arrayCom', arrayComisiones);
        console.log('comisiontagsucpag', comisionTagSucursalYPagos);

        
        return [nroBanco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
                cantRegistros, totalImpDeterminadoPagado, totalImpRecaudadoYDepositadoYADepositar, comisionTagGeneral,
                ivaTagGeneral, sucursal, comisionTagSucursalYPagos, ivaTagSucursalYPagos, codigoRegistroPagos, caja,
                cajero, lote, codRegistroDP, marcaMovimiento, tipoOperacion, tipoRendicion, moneda, arrayBoletas, inputFechasPagos,
                arrayImportes, arrayComisiones, arrayIVAs, nroComercio, arrayCantCuotas, arrayCuotasActuales, obligacion]
    }
}


module.exports = {
    GeneradorEntesVarios
}