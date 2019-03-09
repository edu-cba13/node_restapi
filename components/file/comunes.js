const _ = require('lodash');

const getObjectDomicilios = (data) => {
    let horarios_atencion = getObjetHorariosAtencion(data);
    let domicilios = {
        "id_localidad": Number(data[14]) === 0 ? null : Number(data[14]),
        "id_partido": Number(data[13]) === 0 ? null : Number(data[13]),
        "calle": data[8],
        "altura": data[9],
        "telefonos": getObjectTelefonos(data)
    };
    if (horarios_atencion) {
        domicilios.horarios_atencion = horarios_atencion;
    }
    if (data[10] !== '') {
        domicilios.piso = data[10];
    }
    if (data[11] !== '') {
        domicilios.departamento = data[11];
    }
    if (Number(data[12]) !== 0) {
        domicilios.codigo_postal = Number(data[12]);
    }
    if (Number(data[52]) !== 0) {
        domicilios.longitud = Number(data[53]);
    }
    if (Number(data[53]) !== 0) {
        domicilios.latitud = Number(data[54]);
    }
    return domicilios;
};

const getTelefonoValido = (codigo_area, numero) => {
    let telefono = {};
    if (codigo_area) {
        telefono.codigo_area = Number(codigo_area.trim());
    }

    if (numero) {
        telefono.numero = Number(numero.trim());
    }
    return telefono;
}

const getObjectTelefonos = (data) => {
    let telefonsoArray = [];
    let tel1 = getTelefonoValido(data[16], data[17]);
    let tel2 = getTelefonoValido(data[18], data[19]);
    let tel3 = getTelefonoValido(data[20], data[21]);
    if (!_.isEmpty(tel1)) telefonsoArray.push(tel1);
    if (!_.isEmpty(tel2)) telefonsoArray.push(tel2);
    if (!_.isEmpty(tel3)) telefonsoArray.push(tel3);
    return telefonsoArray;
}

const getHorariosAtencionValido = (dia, desde_1, hasta_1, desde_2, hasta_2) => {
    if (desde_1 && hasta_1) {
        return {
            "dia": dia,
            "desde_1": desde_1,
            "hasta_1": hasta_1,
            "desde_2": desde_2,
            "hasta_2": hasta_2
        };
    } else null;
}

const getObjetHorariosAtencion = (data) => {
    let horarios_atencion = [];
    let lunes = getHorariosAtencionValido("Lunes", data[22], data[23], data[24], data[25]);
    let martes = getHorariosAtencionValido("Martes", data[26], data[27], data[28], data[29]);
    let miercoles = getHorariosAtencionValido("Miercoles", data[30], data[31], data[32], data[33]);
    let jueves = getHorariosAtencionValido("Jueves", data[34], data[35], data[36], data[37]);
    let viernes = getHorariosAtencionValido("Viernes", data[38], data[39], data[40], data[41]);
    let sabado = getHorariosAtencionValido("Sabado", data[42], data[43], data[44], data[45]);
    let domingo = getHorariosAtencionValido("Domingo", data[46], data[47], data[48], data[49]);
    if (lunes) horarios_atencion.push(lunes);
    if (martes) horarios_atencion.push(martes);
    if (miercoles) horarios_atencion.push(miercoles);
    if (jueves) horarios_atencion.push(jueves);
    if (viernes) horarios_atencion.push(viernes);
    if (sabado) horarios_atencion.push(sabado);
    if (domingo) horarios_atencion.push(domingo);
    if (horarios_atencion && horarios_atencion.length !== 0) {
        return horarios_atencion;
    } else {
        return null;
    }
};


module.exports = {
    getObjectDomicilios
};