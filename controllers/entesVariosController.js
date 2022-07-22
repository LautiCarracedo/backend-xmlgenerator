const fs = require('fs');
var builder = require('xmlbuilder2');
const { GeneradorEntesVarios } = require('../generador/generadorEntesVarios');
const { definirFormatoXML } = require('./entesVariosValues');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
const valoresEnte = require('../controllers/entesVariosValues.js');

//Leo archivo
const jsonEntes = fs.readFileSync('configuration/entesUpdate.json','utf-8')
const entes = JSON.parse(jsonEntes);

exports.obtenerEntesCargados = (req, res) => {
    try {
        const jsonEntes = entes;
        res.json(jsonEntes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerEnteSeleccionado = (req, res) => {
    try {
        let nroEnteAModif = req.params.nroEnte;
        let origenDelEnte = req.params.origen;

        for (let i = 0; i < entes.length; i++) {
            if (entes[i].origen === origenDelEnte) {
                if (entes[i].nroEnte === nroEnteAModif) {
                  const jsonEntes = entes[i];
                  res.json(jsonEntes);
                  break;
                }
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.updateEntes = (req, res) => {
    try {
        const {origen, nroEnte, nombreEnte, comisionDebito, comisionCredito, lote, nroComercio, tagGeneral, tagSucursal, tagPagos, tagDetallePago} = req.body
        
        let objectEnte = {
            origen: origen,
            nroEnte: nroEnte,
            nombreEnte: nombreEnte,
            comisionDebito: comisionDebito,
            comisionCredito: comisionCredito,
            lote: lote,
            nroComercio: nroComercio,
            tagGeneral: tagGeneral,
            tagSucursal: tagSucursal,
            tagPagos: tagPagos,
            tagDetallePago: tagDetallePago
        }

        entes.push(objectEnte);
        //console.log(entes);

        //toma un json
        const jsonEntes = JSON.stringify(entes);
        fs.writeFileSync('configuration/entesUpdate.json', jsonEntes, 'utf-8');

        res.send('OK!');

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crearXMLEnte = (req, res) => {
    try {
        let origen = req.body.origen;
        let banco = req.body.banco;
        let fechaRendicion = req.body.fechaRendicion;
        let comision = req.body.comision;
        let boletas = req.body.boletas;
        let importes = req.body.importes;
        let fechasPagos = req.body.fechasPagos;
        let cantCuotas = req.body.cantCuotas;
        let cuotaActuales = req.body.cuotaActuales;
        let codBarras1 = req.body.codBarras1;
        let codBarras2 = req.body.codBarras2;

        const [ente, comisionCred, comisionDeb, nroDeComercio, nroLote] = valoresEnte.definirBancoInput(banco);

        console.log(ente, comisionCred, comisionDeb, nroDeComercio, nroLote);
        

        const [arrayTagGeneralAGenerar, arrayTagSucursalAGenerar, arrayTagPagosAGenerar, arrayTagDetallePagoAGenerar] = 
                definirFormatoXML(origen, banco);
        

        let xmlEntes = new GeneradorEntesVarios();

        const [nroBanco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
            cantRegistros, totalImpDeterminadoPagado, totalImpRecaudadoYDepositadoYADepositar, comisionTagGeneral,
            ivaTagGeneral, sucursal, comisionTagSucursalYPagos, ivaTagSucursalYPagos, codigoRegistroPagos, caja,
            cajero, lote, codRegistroDP, marcaMovimiento, tipoOperacion, tipoRendicion, moneda, arrayBoletas, inputFechasPagos,
            arrayImportes, arrayComisiones, arrayIVAs, nroComercio, arrayCantCuotas, arrayCuotasActuales, obligacion] = 
            xmlEntes.generarXMLEnte(origen, ente, comisionCred, comisionDeb, nroDeComercio, nroLote, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2)

        console.log("Creando XML EntesVarios desde crear XML");

        let arrayDatosTagGeneral = [nroBanco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino,
                                cuitDestino, cantRegistros, totalImpDeterminadoPagado, totalImpDeterminadoPagado, 
                                totalImpRecaudadoYDepositadoYADepositar, totalImpRecaudadoYDepositadoYADepositar, totalImpRecaudadoYDepositadoYADepositar,
                                comisionTagGeneral, ivaTagGeneral];
        
        let arrayDatosTagSucursal = [sucursal, cantRegistros, totalImpDeterminadoPagado, totalImpDeterminadoPagado,
                                    totalImpRecaudadoYDepositadoYADepositar, totalImpRecaudadoYDepositadoYADepositar,
                                    totalImpRecaudadoYDepositadoYADepositar, comisionTagSucursalYPagos, ivaTagSucursalYPagos];
        
        let arrayDatosTagPagos = [codigoRegistroPagos, caja, cajero, lote, cantRegistros, totalImpDeterminadoPagado,
                                totalImpDeterminadoPagado, comisionTagSucursalYPagos, ivaTagSucursalYPagos];

        let arrayDatosTagDetallePago = [];
        let arrayDatosXCadaDetallePago = [];

        //console.log('ente', ente);
        //console.log('nro',nroComercio);
        for(let i = 0; i < cantRegistros; i++){
            arrayDatosTagDetallePago = [codRegistroDP, i + 1, i + 1, marcaMovimiento, tipoOperacion, tipoRendicion,
                                        moneda, arrayBoletas[i], arrayBoletas[i], inputFechasPagos[i], arrayImportes[i],
                                        arrayImportes[i], arrayComisiones[i], arrayIVAs[i], nroComercio, arrayCantCuotas[i], 
                                        arrayCuotasActuales[i],obligacion];

            
            arrayDatosXCadaDetallePago.push(arrayDatosTagDetallePago);
        }

        

        const source = `<?xml version="1.0" encoding="UTF-8"?>`
        

        const doc = new DOMParser().parseFromString(source, 'application/xml');
        var tagGeneral = doc.createElement("General");
        var tagSucursal = doc.createElement("Sucursal");
        var tagPagos = doc.createElement("Pagos");

        for (let i = 0; i < arrayTagGeneralAGenerar.length; i++){
            tagGeneral.setAttribute(arrayTagGeneralAGenerar[i], arrayDatosTagGeneral[i]);
        }

        for (let i = 0; i < arrayTagSucursalAGenerar.length; i++){
            tagSucursal.setAttribute(arrayTagSucursalAGenerar[i], arrayDatosTagSucursal[i]);
        }

        for (let i = 0; i < arrayTagPagosAGenerar.length; i++){
            tagPagos.setAttribute(arrayTagPagosAGenerar[i], arrayDatosTagPagos[i]);
        }

        for (let i = 0; i < cantRegistros; i++){
            var tagDetallePagos = doc.createElement("DetallePagos");
            for (let j = 0; j < arrayTagDetallePagoAGenerar.length; j++){
                tagDetallePagos.setAttribute(arrayTagDetallePagoAGenerar[j], arrayDatosXCadaDetallePago[i][j]);  
            }  
            tagPagos.appendChild(tagDetallePagos);
        }



        tagGeneral.appendChild(tagSucursal);
        tagSucursal.appendChild(tagPagos);
        doc.appendChild(tagGeneral);
        

        const serialized = new XMLSerializer().serializeToString(doc);
        //console.log(serialized);
        

        fs.writeFile("test.xml", serialized, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("Archivo guardado");
            
            res.send(serialized);

        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');

    }
}