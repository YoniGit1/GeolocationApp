const mongoose = require('mongoose');

module.exports = {
    dbStatus: (req, res, next) => {
        try {
            if(mongoose.connection.readyState != 1)
                throw new Error("Database not connected");
            res.sendStatus(200);
        }
        catch (error){
            next(error)
        }
    }
}