const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


var transportRotate = new(DailyRotateFile)({
    filename: 'loggin/loggin',
    level: 'error',
    datePattern: 'DD-MM-YYYY',
    localTime: true,
    timestamp: new Date(),
    maxSize: '1m',
    maxFiles: '15d'
        //level: process.env.ENV === 'development' ? 'debug' : 'info'
});

var transport = new(winston.transports.File)({
    filename: 'loggin/error.log',
    level: 'error',
    maxSize: '1m',
    maxFiles: '14d'
        //level: process.env.ENV === 'development' ? 'debug' : 'info'
});

const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            json: true,
            colorize: true
        }),
        transportRotate
    ]
});


module.exports = logger;