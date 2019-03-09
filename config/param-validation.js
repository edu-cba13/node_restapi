const Joi = require('joi');
const limit = require('./config').default.selectLimit;

const horario_atencion_put = Joi.object({
    id: Joi.number().required(),
    id_domicilio: Joi.number().required(),
    dia: Joi.string().valid('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo').required(),
    desde_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
    hasta_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
    desde_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi),
    hasta_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi)
});

const telefono_put = Joi.object({
    id: Joi.number().required(),
    id_domicilio: Joi.number().required(),
    codigo_area: Joi.number().required(),
    numero: Joi.number().required(),
    interno: Joi.number()
});

const domicilio_put = Joi.object({
    id: Joi.number().required(),
    id_localidad: Joi.number().required(),
    id_partido: Joi.number().required(),
    id_barrio: Joi.number(),
    id_profesional: Joi.number(),
    id_farmacia: Joi.number(),
    id_clinica: Joi.number(),
    id_clinica_alta_complejidad: Joi.number(),
    codigo_postal: Joi.number(),
    calle: Joi.string().min(1).max(80).required(),
    altura: Joi.string().min(1).max(20).regex(/^[a-zA-Z\-0-9-\|°/()'#-.,:;]+$/gi).required(),
    piso: Joi.string().min(1).max(20),
    departamento: Joi.string().min(1).max(10).regex(/^[a-zA-Z\-0-9-\|/()'#-.,:;]+$/gi),
    latitud: Joi.number(),
    longitud: Joi.number(),
    telefonos: Joi.array().items(telefono_put).min(1).required(),
    horarios_atencion: Joi.array().items(horario_atencion_put)
});

const horario_atencion_post = Joi.object({
    id_domicilio: Joi.number(),
    dia: Joi.string().valid('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo').required(),
    desde_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
    hasta_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
    desde_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi),
    hasta_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi)
});

const telefono_post = Joi.object({
    id_domicilio: Joi.number(),
    codigo_area: Joi.number().required(),
    numero: Joi.number().required(),
    interno: Joi.number()
});

const domicilio_post = Joi.object({
    id_localidad: Joi.number().required(),
    id_partido: Joi.number().required(),
    id_barrio: Joi.number(),
    id_profesional: Joi.number(),
    id_farmacia: Joi.number(),
    id_clinica: Joi.number(),
    id_clinica_alta_complejidad: Joi.number(),
    codigo_postal: Joi.number(),
    calle: Joi.string().min(1).max(80).required(),
    altura: Joi.string().min(1).max(20).regex(/^[a-zA-Z\-0-9-\|°/()'#-.,:;]+$/gi).required(),
    piso: Joi.string().min(1).max(20),
    departamento: Joi.string().min(1).max(10).regex(/^[a-zA-Z\-0-9-\|/()'#-.,:;]+$/gi),
    latitud: Joi.number(),
    longitud: Joi.number(),
    telefonos: Joi.array().items(telefono_post).min(1).required(),
    horarios_atencion: Joi.array().items(horario_atencion_post)
});

const profesional = Joi.object({
    id_categoria: Joi.number().valid(1, 2, 3, 4),
    id_profesion: Joi.number().required(),
    id_especialidad: Joi.number(),
    id_estado: Joi.number().valid(1, 2, 3).default(1),
    id_entidad: Joi.number().required(),
    id_entidad_hijo: Joi.number(),
    nombre: Joi.string().min(1).max(100).required().required(),
    apellido: Joi.string().min(1).max(130).required().required(),
    cuit: Joi.string().min(11).max(11).required(),
    matricula_provincial: Joi.number().required(),
    matricula_nacional: Joi.number(),
    estado_ioma: Joi.bool().default(true),
    domicilios: Joi.array().min(1).items(domicilio_post)
});

const farmacia = Joi.object({
    nombre: Joi.string().max(60).required(),
    razon_social: Joi.string().max(60).required(),
    cuit: Joi.string().min(11).max(11).required(),
    id_entidad: Joi.number().required(),
    id_entidad_hijo: Joi.number(),
    estado_ioma: Joi.bool().default(true),
    estado_prestador: Joi.bool().default(true),
    domicilios: Joi.array().min(1).max(3).items(domicilio_post)
});

const clinica = Joi.object({
    id_especialidad_clinica: Joi.number().required(),
    id_entidad: Joi.number().required(),
    id_entidad_hijo: Joi.number(),
    nombre: Joi.string().max(60).required(),
    razon_social: Joi.string().max(60).required(),
    cuit: Joi.string().min(11).max(11).required(),
    estado_ioma: Joi.bool().default(true),
    estado_prestador: Joi.bool().default(true),
    domicilios: Joi.array().min(1).items(domicilio_post)
});

const clinicaAltaComplejidad = Joi.object({
    id_especialidad_clinica_alta_complejidad: Joi.number().required(),
    id_entidad: Joi.number().required(),
    id_entidad_hijo: Joi.number(),
    nombre: Joi.string().max(60).required(),
    razon_social: Joi.string().max(60).required(),
    cuit: Joi.string().min(11).max(11).required(),
    estado_ioma: Joi.bool().default(true),
    estado_prestador: Joi.bool().default(true),
    domicilios: Joi.array().min(1).items(domicilio_post)
});

module.exports = {
    profesional,
    farmacia,
    clinica,
    clinicaAltaComplejidad,

    // Filtering params all endpoints order_by,sort_by,offset,limit
    params: {
        query: {
            offset: Joi.number().integer().min(0),
            limit: Joi.number().integer().min(0).max(limit),
            order_by: Joi.string(),
            sort_by: Joi.string(),
            filter: Joi.string()
        }
    },

    validateId: {
        params: {
            id: Joi.number().required()
        }
    },

    login: {
        body: {
            user: Joi.string().min(1).max(50).required(),
            password: Joi.string().min(1).max(180).required(),
        }
    },

    refresh: {
        body: {
            api_key: Joi.string().required()
        }
    },

    // Filtering where params
    barrios: {
        query: {
            id_localidad: Joi.number()
        }
    },

    // POST /api/telefonos
    createTelefonos: {
        body: {
            id_domicilio: Joi.number().required(),
            codigo_area: Joi.number().required(),
            numero: Joi.number().required(),
            interno: Joi.number()
        }
    },

    // PUT /api/telefonos
    updateTelefonos: {
        body: {
            id: Joi.number().required(),
            id_domicilio: Joi.number().required(),
            codigo_area: Joi.number().required(),
            numero: Joi.number(),
            interno: Joi.number()
        }
    },

    // PUT /api/horariosatencion
    updateHorariosAtencion: {
        body: {
            id: Joi.number().required(),
            id_domicilio: Joi.number().required(),
            dia: Joi.string().valid('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo').required(),
            desde_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
            hasta_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
            desde_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi),
            hasta_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi)
        }
    },

    // POST /api/horariosatencion
    createHorariosAtencion: {
        body: {
            id_domicilio: Joi.number().required(),
            dia: Joi.string().valid('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo').required(),
            desde_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
            hasta_1: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi).required(),
            desde_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi),
            hasta_2: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/gi)
        }
    },

    // POST /api/profesionales
    createProfesional: {
        body: {
            id_categoria: Joi.number().valid(1, 2, 3, 4),
            id_profesion: Joi.number().required(),
            id_especialidad: Joi.number(),
            id_estado: Joi.number().valid(1, 2, 3).default(1),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().min(1).max(100).required().required(),
            apellido: Joi.string().min(1).max(130).required().required(),
            cuit: Joi.string().min(11).max(11).required(),
            matricula_provincial: Joi.number().required(),
            matricula_nacional: Joi.number(),
            estado_ioma: Joi.bool().default(true),
            domicilios: Joi.array().min(1).items(domicilio_post)
        }
    },

    // POST /api/profesionales
    createProfesionales: {
        params: {
            id_entidad: Joi.string().hex().required()
        }
    },

    // PUT /api/profesionales
    updateProfesional: {
        body: {
            id_profesion: Joi.number().required(),
            id_categoria: Joi.number().valid(1, 2, 3, 4),
            id_especialidad: Joi.number(),
            id_estado: Joi.number().valid(1, 2, 3),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().min(1).max(100).required().required(),
            apellido: Joi.string().min(1).max(130).required().required(),
            cuit: Joi.number().min(11).max(11).required().required(),
            matricula_provincial: Joi.number().required(),
            matricula_nacional: Joi.number(),
            domicilios: Joi.array().min(1).items(domicilio_put),
        },
        params: {
            id: Joi.string().hex().required()
        }
    },

    // POST /api/farmacias
    createFarmacias: {
        body: {
            nombre: Joi.string().max(60).required(),
            razon_social: Joi.string().max(60).required(),
            cuit: Joi.string().min(11).max(11).required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            estado_ioma: Joi.bool().default(true),
            estado_prestador: Joi.bool().default(true),
            domicilios: Joi.array().min(1).max(3).items(domicilio_post)
        }
    },

    // PUT /api/farmacias
    updateFarmacias: {
        body: {
            nombre: Joi.string().max(60).required(),
            razon_social: Joi.string().max(60),
            cuit: Joi.string().min(11).max(11).required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            estado_prestador: Joi.bool(),
            domicilios: Joi.array().min(1).items(domicilio_put)
        },
        params: {
            id: Joi.string().hex().required()
        }
    },

    // POST /api/clinicas
    createClinicas: {
        body: {
            id_especialidad_clinica: Joi.number().required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().max(60).required(),
            razon_social: Joi.string().max(60).required(),
            cuit: Joi.string().min(11).max(11).required(),
            estado_ioma: Joi.bool().default(true),
            estado_prestador: Joi.bool().default(true),
            domicilios: Joi.array().min(1).items(domicilio_post)
        }
    },

    // PUT /api/clinicas
    updateClinicas: {
        body: {
            id_especialidad_clinica: Joi.number().required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().max(60).required(),
            razon_social: Joi.string().max(60).required(),
            cuit: Joi.string().min(11).max(11),
            estado_prestador: Joi.bool(),
            domicilios: Joi.array().min(1).items(domicilio_put)
        },
        params: {
            id: Joi.string().hex().required()
        }
    },

    // POST /api/clinciasaltacomplejidad
    createClinciasAltaComplejidad: {
        body: {
            id_especialidad_clinica_alta_complejidad: Joi.number().required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().max(60).required(),
            razon_social: Joi.string().max(60).required(),
            cuit: Joi.string().min(11).max(11).required(),
            estado_ioma: Joi.bool().default(true),
            estado_prestador: Joi.bool().default(true),
            domicilios: Joi.array().min(1).items(domicilio_post)
        }
    },

    // PUT /api/clinciasaltacomplejidad
    updateClinciasAltaComplejidad: {
        body: {
            id_especialidad_clinica_alta_complejidad: Joi.number().required(),
            id_entidad: Joi.number().required(),
            id_entidad_hijo: Joi.number(),
            nombre: Joi.string().max(60),
            razon_social: Joi.string().max(60),
            cuit: Joi.string().min(11).max(11).required(),
            estado_prestador: Joi.bool(),
            domicilios: Joi.array().min(1).items(domicilio_put)
        },
        params: {
            id: Joi.string().hex().required()
        }
    },

    // POST /api/domicilios
    createDomicilios: {
        body: {
            id_localidad: Joi.number().required(),
            id_partido: Joi.number().required(),
            id_barrio: Joi.number(),
            id_profesional: Joi.number(),
            id_farmacia: Joi.number(),
            id_clinica: Joi.number(),
            id_clinica_alta_complejidad: Joi.number(),
            codigo_postal: Joi.number(),
            calle: Joi.string().min(1).max(80).required(),
            altura: Joi.string().min(1).max(20).regex(/^[a-zA-Z\-0-9-\|°/()'#-.,:;]+$/gi).required(),
            piso: Joi.string().min(1).max(20),
            departamento: Joi.string().regex(/^[a-zA-Z\-0-9-]+$/gi),
            latitud: Joi.number(),
            longitud: Joi.number(),
            telefonos: Joi.array().items(telefono_post).min(1).max(3).required(),
            horarios_atencion: Joi.array().items(horario_atencion_post)
        }
    },

    // PUT /api/domicilios
    updateDomicilios: {
        body: {
            id: Joi.number().required(),
            id_localidad: Joi.number().required(),
            id_partido: Joi.number().required(),
            id_barrio: Joi.number(),
            id_profesional: Joi.number(),
            id_farmacia: Joi.number(),
            id_clinica: Joi.number(),
            id_clinica_alta_complejidad: Joi.number(),
            codigo_postal: Joi.number(),
            calle: Joi.string().min(1).max(80).required(),
            altura: Joi.string().min(1).max(20).regex(/^[a-zA-Z\-0-9-\|°/()'#-.,:;]+$/gi).required(),
            piso: Joi.string().min(1).max(20),
            departamento: Joi.string().regex(/^[a-zA-Z\-0-9-]+$/gi),
            latitud: Joi.number(),
            longitud: Joi.number(),
            telefonos: Joi.array().items(telefono_put).min(1).required(),
            horarios_atencion: Joi.array().items(horario_atencion_put)
        },
        params: {
            id: Joi.string().hex().required()
        }
    },
};