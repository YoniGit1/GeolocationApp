const mongoose = require('mongoose');

module.exports = {
    getHello: (req, res, next) => {
        try {
            res.sendStatus(200);
        }
        catch (error){
            next(error)
        }
    }
}