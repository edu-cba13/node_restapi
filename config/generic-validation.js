const Profesionales = require('../components/profesionales/profesionales.models');

const cuitValida = (cuit) => {
    let inputString = cuit.toString();
    let result = false;
    if (inputString.length == 11) {
        var Caracters_1_2 = inputString.charAt(0) + inputString.charAt(1)
        if (Caracters_1_2 == "20" || Caracters_1_2 == "23" || Caracters_1_2 == "24" || Caracters_1_2 == "27" || Caracters_1_2 == "30" || Caracters_1_2 == "33" || Caracters_1_2 == "34") {
            var Count = inputString.charAt(0) * 5 + inputString.charAt(1) * 4 + inputString.charAt(2) * 3 + inputString.charAt(3) * 2 + inputString.charAt(4) * 7 + inputString.charAt(5) * 6 + inputString.charAt(6) * 5 + inputString.charAt(7) * 4 + inputString.charAt(8) * 3 + inputString.charAt(9) * 2 + inputString.charAt(10) * 1
            let Division = Count / 11;
            if (Division == Math.floor(Division)) {
                result = true;
            }
        }
    }
    return result;
};


const validateNotExistProfesional = async(profesional) => {
    try {
        let respuesta = false;
        let resultado = await Profesionales.findAndCountAll({
            where: {
                matricula_provincial: profesional.matricula_provincial,
                id_especialidad: profesional.id_especialidad,
                id_profesion: profesional.id_profesion,
            },
        });
        if (resultado.count === 0) { respuesta = true }
        return respuesta;
    } catch (err) {
        next(err);
    }
};

const requiereCuit = (req, res, next) => {
    try {
        if (cuitValida(req.body.cuit)) {
            next();
        } else {
            throw Error('\"cuit\" format invalid');
        }
    } catch (err) {
        res.status(400).json({
            message: "\"cuit\" format invalid",
            stack: ""
        });
    }
};

const requiereNotExistProfesional = async(req, res, next) => {
    try {
        let profesional = {
            matricula_provincial: req.body.matricula_provincial,
            id_especialidad: req.body.id_especialidad,
            id_profesion: req.body.id_profesion
        };
        let respuesta = await validateNotExistProfesional(profesional);
        if (respuesta) {
            next();
        } else {
            throw Error(`Can not insert a professional with id_profesion ${req.body.id_profesion} and id_especialidad ${req.body.id_especialidad} and matricula ${req.body.matricula_provincial}`);
        }
    } catch (err) {
        res.status(400).json({
            message: `Can not insert a professional with id_profesion ${req.body.id_profesion} and id_especialidad ${req.body.id_especialidad} and matricula_provincial ${req.body.matricula_provincial}`,
            stack: ""
        });
    }
};

const requiereIdsEqueals = (req, res, next) => {
    try {
        if (req.body.id.toString() === req.params.id) {
            next();
        } else {
            throw Error('Not match ids');
        }
    } catch (err) {
        res.status(400).json({
            message: "Not match ids",
            stack: ""
        });
    }
};

const requiereExistsRow = (req, res, next) => {
    try {
        if (req.rowResult.count() !== 0) {
            next();
        } else {
            throw Error(`Not exist row with id ${req.params.id}`);
        }
    } catch (err) {
        res.status(400).json({
            message: `Not exist row with id ${req.params.id}`,
            stack: ""
        });
    }
};

module.exports = {
    requiereCuit,
    requiereExistsRow,
    requiereIdsEqueals,
    requiereNotExistProfesional,
    cuitValida
};