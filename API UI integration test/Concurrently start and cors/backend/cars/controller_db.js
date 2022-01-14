const Car = require("./model_db.js");
const {Op} = require("sequelize");

const carController = {
    getAll: async(req, res)=>{
        try {
            res.send( await Car.findAll());
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    getQuery: async(req,res)=>{
        try {
            let queryObject = { where:{} };
        
            if (req.query.mark)
                queryObject.where.mark = { [Op.substring]:req.query.mark }

            if (req.query.num)
                queryObject.where.number = { [Op.substring]:req.query.num }

            console.log(queryObject);
            let queriedCars = await Car.findAll(queryObject);
            res.send(queriedCars);
            
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    getById: async(req, res)=>{
        try {
            let car = await Car.findByPk(parseInt(req.params.id));
            if (car !== null) res.status(200).send(car);
            else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    delete: async(req, res)=>{
        try {
            let deletedCar = await Car.findByPk(parseInt(req.params.id));
            if (deletedCar) {
                await deletedCar.destroy();
                res.send(deletedCar);
            } else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }, 
    post: async(req, res)=>{
        try {
            let newCar = await Car.create(req.body);
            res.send(newCar);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    put: async(req, res)=>{
        try {
            let newCars = [];
        
            for (let i = 0; i < req.body.length; i++) {
                newCars.push(req.body[i]);
            } 
        
            for (let i = 0; i < newCars.length; i++) {
                await Car.create(newCars[i]);
            }
            res.send(newCars)
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    patch: async(req, res)=>{
        try {
            let updatedCar = await Car.findByPk(parseInt(req.params.id));
            if (updatedCar) {
                await updatedCar.update(req.body);
                res.send(updatedCar);
            } else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
};

module.exports = carController;