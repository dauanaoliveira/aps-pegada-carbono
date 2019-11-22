module.exports = {
    // === Funcao de calculo de emissao ===
    calculate: function (jsonData) {
        var mediaCombustivel = 0;

        // === Caso o veiculo seja Carro, é definido a média do combustivel de acordo com o motor e tipo de combustivel ===
        var veiculo = jsonData['carroKm'];
        if(veiculo != '' && veiculo != 0){
            var motor = jsonData['motor'];
            var tipoCombustivel = jsonData['combustivel'];

            switch(motor) {
                case '1.0 (flex)':
                    if(tipoCombustivel == 'Etanol'){
                        mediaCombustivel = 0.05295;
                    }else if(tipoCombustivel == 'GasolinaEtanol'){
                        mediaCombustivel = 0.14295;
                    }
                break;
                case '1.4 a 1.6 (flex)':
                    if(tipoCombustivel == 'Etanol'){
                        mediaCombustivel = 0.05825;
                    }else if(tipoCombustivel == 'GasolinaEtanol'){
                        mediaCombustivel = 0.15325;
                    }
                break;
                case '1.8 (flex)':
                    if(tipoCombustivel == 'Etanol'){
                        mediaCombustivel = 0.0683;
                    }else if(tipoCombustivel == 'GasolinaEtanol'){
                        mediaCombustivel = 0.1797;
                    }
                break;
                case '1.4 a 3.8 (gasolina)':
                  mediaCombustivel = 0.23275;
                break;
            }
        }

        // === Json com calculo por tipo ===
        var jsonResult = {
            energiaCO2: (jsonData['energiaKwh'] && jsonData['qtdPessoasCasa'] ? ((jsonData['energiaKwh'] * 0.0740) / jsonData['qtdPessoasCasa']) : (jsonData['energiaKwh'] ? jsonData['energiaKwh'] * 0.0740 : 0)),
            aguaCO2: (jsonData['aguam3'] && jsonData['qtdPessoasCasa'] ? ((jsonData['aguam3'] * 0.0176) / jsonData['qtdPessoasCasa']) : (jsonData['aguam3'] ? jsonData['aguam3'] * 0.0176 : 0)),
            carroCO2: (jsonData['carroKm'] ? (jsonData['carroKm'] * mediaCombustivel ) : 0),
            motoCO2: (jsonData['motoKm'] ? (jsonData['motoKm'] * 0.14295) : 0),
            tremCO2: (jsonData['tremKm'] ? (jsonData['tremKm'] * 0.058) : 0),
            metroCO2: (jsonData['metroKm'] ? (jsonData['metroKm'] * 0.080) : 0),
            onibusCO2: (jsonData['onibusKm'] ? (jsonData['onibusKm'] * 0.11) : 0),
            TotalEmissaoKgCO2: 0
        }

        // === Calculo da emissao total mensal ===
        var sum = 0;
        for (var prop in jsonResult) {
            sum += jsonResult[prop];
        }

        jsonResult['TotalEmissaoKgCO2'] = sum;
        
        return jsonResult;
    }
}