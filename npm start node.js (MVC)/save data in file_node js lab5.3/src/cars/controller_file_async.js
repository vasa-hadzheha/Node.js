const Cars = require("./model_file_async.js");

const carController = {
    getAll: async(req, res)=>{
        try {
            res.send( await Cars.read());
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    getQuery: async(req,res)=>{
        try {
            let queriedCars = await Cars.read();
        
            if (req.query.mark)
            queriedCars = queriedCars.filter((car) =>
            car.mark?.includes(req.query.mark)
            );
            console.log(queriedCars);
            if (req.query.num)
                queriedCars = queriedCars.filter((car) =>
                    car.number?.includes(req.query.num)
                );  
                  
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    getById: async(req, res)=>{
        try {
            let car = await Cars.find((car) => car.id === parseInt(req.params.id));
            if (car !== null) res.status(200).send(car);
            else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    delete: async(req, res)=>{
        try {
            let deletedCar = await Cars.delete((car) => car.id === parseInt(req.params.id));
            if (deletedCar) {
                res.send(deletedCar);
            } else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }, 
    post: async(req, res)=>{
        try {
            let newCar = await Cars.create(req.body);
            res.send(newCar);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    put: async(req, res)=>{
        try {
            let newCars = [];
        
            //check including of id
            for (let i = 0; i < req.body.length; i++) {
                if(req.body[i].id === undefined){
                    req.body[i].id=Number(Date.now());
                }
            }
        
            for (let i = 0; i < req.body.length; i++) {
                newCars.push(req.body[i]);
            } 
        
            for (let i = 0; i < newCars.length; i++) {
                await Cars.create(newCars[i]);
            }
            res.send(newCars)
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    patch: async(req, res)=>{
        try {
            let updatedCar = await Cars.update((car) => car.id === parseInt(req.params.id), req.body);
            if (updatedCar) {
                res.send(updatedCar);
            } else res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
};

module.exports = carController;