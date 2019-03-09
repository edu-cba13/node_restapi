const config = require('./../config/config').default;

const csv = (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({
                message: "Not send any file",
                stack: ""
            });
        };

        if (req.file.size > config.filemaxsize) {
            res.status(400).json({
                message: "File Must be less than 2 megabytes",
                stack: ""
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};


module.exports = { csv };