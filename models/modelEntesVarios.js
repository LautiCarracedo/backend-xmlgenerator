/*La clase ValoresInput se encarga de obtener el valor de aquellso valores que se ingresan*/
class ValoresInputEntesVarios{
    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual){
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
    }

    getNroBanco(){
        return this.banco;
    }

    getArrayBoletas(){
        let arrayBoletas = this.boletas.split('\n')
        return arrayBoletas
    }

    getFechaRendicion(){
        return this.fechaRendicion;
    }


    getArrayImportes(){
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }
 
    getArrayFechasPagos(){
        let arrayPagos = this.fechasPagos.split('\n')
        return arrayPagos
    }  

    getArrayCantCuotas(){
        let arrayCantCuotas = this.cantCuotas.split('\n');
        let arrayCantCuotasOK = [];
        if (this.banco != "00935"){
            for (let i = 0; i < arrayCantCuotas.length; i++){
                arrayCantCuotasOK.push('1');
            }
        }
        else{
            arrayCantCuotasOK = arrayCantCuotas;
        }
       return arrayCantCuotasOK;
    }

    getArrayCuotasActuales(){
       let arrayCuotasActuales = this.cuotaActual.split('\n')
       return arrayCuotasActuales
    }

}
//
/*La clase ValoresFijosGeneral sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosGeneral{
    constructor(banco){
        this.banco = banco;
    }
    getNroBanco(){
        return this.banco;
    }
    getNroTransaccion(){
        this.nroTransaccion = 0;
        return this.nroTransaccion;
    }
    getNroRendicion(){
        this.nroRendicion = Math.floor(Math.random() * (999999 - 0)) + 0;
        return this.nroRendicion;
    }
    getCbusyCuits(){
        this.cbuOrigen = '0200925801000040012697';
        this.cuitOrigen = '30999256712';
        this.cbuDestino = '0200900501000000402265';
        this.cuitDestino = '34999230573';
        return [this.cbuOrigen, this.cuitOrigen, this.cbuDestino, this.cuitDestino];
    }

    getTotalImpRecaudadoYDepositadoYADepositar(){
        this.totalRecDep = '0.00';
        return this.totalRecDep;
    }
}

/*La clase ValoresFijosSucursal sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosSucursal{
    /*Algunos valores quedaron como estaban del BPC. Cuidado que cambian acá. Ya están corregidos!*/
    getSucursal(){
        this.sucursal = "001";
        return this.sucursal;
    }

    getTotalImpRecaudadoYDepositadoYADepositar(){
        this.totalRecDep = '0.00';
        return this.totalRecDep;
    }
}

/*La clase ValoresFijosPagos sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosPagos{
    getCodigoRegistro(){
        this.codRegistro = '021';
        return this.codRegistro;
    }
    getCaja(){
        this.caja = '0000';
        return this.caja;
    }
    getCajero(){
        this.cajero = '000000';
        return this.cajero;
    }
    getLote(){
        this.lote = 2;
        return this.lote;
    }

    getTotalImpRecaudadoYDepositadoYADepositar(){
        this.totalRecDep = '0.00';
        return this.totalRecDep;
    }
}

/*La clase ValoresFijosDP   sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosDP{
    getCodigoRegistro(){
        this.codRegistro = '022';
        return this.codRegistro;
    }
    getMarcaMovimiento(){
        this.marcaMovimiento = "P";
        return this.marcaMovimiento;
    }
    getTipoOperacion(){
        this.tipoOperacion = "01";
        return this.tipoOperacion;
    }
    getTipoRendicion(){
        this.tipoRendicion = "01";
        return this.tipoRendicion;
    }
    getMoneda(){
        this.moneda = "01";
        return this.moneda;
    }

    getNroComercio(){
        this.nroComercio = "27426748";
        return this.nroComercio;
    }

    getObligacion(){
        this.obligacion = "0";
        return this.obligacion;
    }
    /*getNroControl(){
        this.NroControl = '032';
        return this.NroControl;
    }*/
}

class ValoresCalculablesEntesVarios{
    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual, nroComercio, lote){
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
        this.nroComercio = nroComercio;
        this.lote = lote;
    }
    obtenerArrayImportes(){
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }

    calcTotalImportesDeterminadoYPagado(){
        let arrayImportes = this.obtenerArrayImportes();

        let totalImportesDeterminadoYPagado = 0
        for(let i = 0; i < arrayImportes.length; i++){
            totalImportesDeterminadoYPagado += Number(arrayImportes[i])
        }
        return totalImportesDeterminadoYPagado;
    }

    calcCantRegistros(){
        let arrayImportes = this.obtenerArrayImportes();

        let cantidadBoletas = arrayImportes.length
        //let cantidadImportes = arrayImportes.length
        //let cantidadPagos = arrayPagos.length

        return cantidadBoletas;
    }

    getNroComercio(){
        return this.nroComercio;
    }

    getLote(){
        return this.lote;
    }
}

class InterfazIVAEntesVarios{
     /*Esta clase no hace nada, es una interfaz (aunque en JavaScript no se pueden usar interfaces).
    Revisar principios de diseño, como el principio de Segregacion de Interfaces para entender como funciona.*/
    
    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual){
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
    }
    
    splitImportes(){
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }

    splitCantCuotas(){
        let arrayCantCuotas = this.cantCuotas.split('\n');
        let arrayCantCuotasOK = [];
        if (this.banco != "00935"){
            for (let i = 0; i < arrayCantCuotas.length; i++){
                arrayCantCuotasOK.push('1');
            }
        }
        else{
            arrayCantCuotasOK = arrayCantCuotas;
        }
       return arrayCantCuotasOK;
    }

    calcIva(){
        throw UnsupportedOperationException();
    }

    calcComision(){
        throw UnsupportedOperationException();
    }
}


class IVATagGeneral extends InterfazIVAEntesVarios{
    calcComision(){
        //console.log(this.comisionCred, this.comisionDeb);
        //Suma de importes de comisión de cada detalle de pago.
        let arrayImportes = this.splitImportes();
        let arrayCantCuotas = this.splitCantCuotas();
        let totalComision = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C"){
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D"){
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else{
                if (this.comisionCred != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            totalComision += comisionPorImportes;
        }
        return totalComision.toFixed(2);

    }

    calcIva(){
        //Total importe comisión (del tag general) * 0.21
        let totalComisionTagGeneral = this.calcComision();
        let ivaTagGeneral = totalComisionTagGeneral * 0.21;

        return ivaTagGeneral.toFixed(2);

    }
}

class IVATagSucursalYPagos extends InterfazIVAEntesVarios{
    calcComision(){
        //Suma de importes de comisión de cada detalle de pago. En este caso solo hacemos para cordobesa (comision = 0.01 o 1%)
        let arrayImportes = this.splitImportes();
        let arrayCantCuotas = this.splitCantCuotas();
        let totalComision = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C"){
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D"){
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else{
                if (this.comisionCred != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            totalComision += comisionPorImportes;
        }

        return totalComision.toFixed(2);
    }

    calcIva(){
        //Suma de importes IVA de cada detalle de pago.
        let arrayImportes = this.splitImportes();
        let arrayCantCuotas = this.splitCantCuotas();
        let ivaTagSucursalYPagos = 0;
        let comisionPorImportes = 0;
        let ivaPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C"){
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D"){
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else{
                if (this.comisionCred != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            ivaPorImportes += comisionPorImportes * 0.21;
            ivaTagSucursalYPagos = ivaPorImportes;
        }
        return ivaTagSucursalYPagos.toFixed(2);
    }
}

class IVATagDetallePago extends InterfazIVAEntesVarios{
    calcComision(){
        console.log(this.comisionCred, this.comisionDeb);
        //Suma de importes de comisión de cada detalle de pago.
        let arrayImportes = this.splitImportes();
        let arrayCantCuotas = this.splitCantCuotas();
        let arrayComisiones = [];
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C"){
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D"){
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else{
                if (this.comisionCred != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            arrayComisiones.push(comisionPorImportes.toFixed(2));
            
        }
        return arrayComisiones;
    }

    calcIva(){
        //Suma de importes IVA de cada detalle de pago.
        let arrayImportes = this.splitImportes();
        let arrayCantCuotas = this.splitCantCuotas();
        let arrayIVAs = [];
        let ivaPorImportes = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C"){
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D"){
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else{
                if (this.comisionCred != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != ""){
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            ivaPorImportes = comisionPorImportes * 0.21;
            arrayIVAs.push(ivaPorImportes.toFixed(2));
        }
        return arrayIVAs;
    }
}


module.exports = {
    ValoresInputEntesVarios,
    ValoresCalculablesEntesVarios,
    ValoresFijosDP,
    ValoresFijosGeneral,
    ValoresFijosPagos,
    ValoresFijosSucursal,
    IVATagGeneral,
    IVATagSucursalYPagos,
    IVATagDetallePago
}