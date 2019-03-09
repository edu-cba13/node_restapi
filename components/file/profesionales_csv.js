const { getObjectDomicilios } = require('./comunes');

const getProfesionalesKey = (data) => {
    let key = data[0] + data[6] + data[50] + data[4];
    if (data[7]) {
        key = key + data[7];
    }
    return key;
};

const getObjectProfesionales = (data) => {
    let prestador = {
        "id": getProfesionalesKey(data),
        "id_estado": Number(data[51]),
        "id_profesion": Number(data[6]),
        "id_entidad": Number(data[50]),
        "nombre": data[2],
        "apellido": data[1],
        "cuit": data[0],
        "matricula_provincial": Number(data[4]),
        "estado_ioma": true,
        "domicilios": [getObjectDomicilios(data)]
    };
    if (Number(data[3]) !== 0) {
        prestador.id_categoria = Number(data[3]);
    }
    if (Number(data[7]) !== 0) {
        prestador.id_especialidad = Number(data[7]);
    }
    if (Number(data[5]) !== 0) {
        prestador.matricula_nacional = Number(data[5]);
    }
    return prestador;
};

const getJsonProfesionales = (arrayProfesionales) => {

    let i = 0;
    let object = {};
    let id = arrayProfesionales[0].id;
    let domiciliosArray = [];
    let domicilio = {};
    let prestadoresArray = [];

    object = {
        "id_estado": arrayProfesionales[i].id_estado,
        "id_profesion": arrayProfesionales[i].id_profesion,
        "id_entidad": arrayProfesionales[i].id_entidad,
        "nombre": arrayProfesionales[i].nombre,
        "apellido": arrayProfesionales[i].apellido,
        "cuit": arrayProfesionales[i].cuit,
        "matricula_provincial": arrayProfesionales[i].matricula_provincial,
        "id_categoria": arrayProfesionales[i].id_categoria,
        "id_especialidad": arrayProfesionales[i].id_especialidad,
        "estado_ioma": true,
    };

    for (let data of arrayProfesionales) {
        domicilio = data.domicilios[0];
        if (id == data.id) {
            domiciliosArray.push(domicilio);
        } else {
            if (domiciliosArray.length == 0) {
                object.domicilios = domicilio;
            } else {
                object.domicilios = domiciliosArray;
            }
            prestadoresArray.push(object);
            domiciliosArray = [];
            domiciliosArray.push(domicilio);
            object = {
                "id_estado": data.id_estado,
                "id_profesion": data.id_profesion,
                "id_entidad": data.id_entidad,
                "nombre": data.nombre,
                "apellido": data.apellido,
                "cuit": data.cuit,
                "matricula_provincial": data.matricula_provincial,
                "id_categoria": data.id_categoria,
                "id_especialidad": data.id_especialidad,
                "estado_ioma": true,
            };
            id = arrayProfesionales[i].id;
        }
        i++;
    }

    if (domiciliosArray.length == 0) {
        object.domicilios = domicilio;
    } else {
        object.domicilios = domiciliosArray;
    }

    prestadoresArray.push(object);

    return prestadoresArray;
}

const header = [
    "Cuit",
    "Apellido",
    "Nombres",
    "Categoria_id",
    "Matricula_Provincial",
    "Matricula_Nacional",
    "Profesion_id",
    "Especialidad_id",
    "Nombre_Completo_De_La_Calle",
    "Altura",
    "Piso",
    "Depto",
    "Codigo_Postal",
    "Partido_id",
    "Localidad_id",
    "Barrio_id",
    "Cod_Area1",
    "Telefono1",
    "Cod_Area2",
    "Telefono2",
    "Cod_Area3",
    "Telefono3",
    "Lunes_Desde",
    "Lunes_Hasta",
    "Lunes_Desde2",
    "Lunes_Hasta2",
    "Martes_Desde",
    "Martes _Hasta",
    "Martes_Desde2",
    "Martes_Hasta2",
    "Miercoles_Desde",
    "Miercoles_Hasta",
    "Miercoles_Desde 2",
    "Miercoles_Hasta 2",
    "Jueves_Desde",
    "Jueves_Hasta",
    "Jueves_Desde2",
    "Jueves_Hasta2",
    "Viernes_Desde",
    "Viernes_Hasta",
    "Viernes_Desde2",
    "Viernes_Hasta2",
    "Sabado_Desde",
    "Sabado_Hasta",
    "Sabado_ Desde2",
    "Sabado_Hasta2",
    "Domingo_Desde",
    "Domingo_Hasta",
    "Domingo_Desde2",
    "Domingo_Hasta2",
    "Entidad_id",
    "Estado_Id",
    "Latitud",
    "Longitud",
    "Tipo_Transaccion_id"
];

module.exports = {
    getObjectProfesionales,
    getJsonProfesionales
};