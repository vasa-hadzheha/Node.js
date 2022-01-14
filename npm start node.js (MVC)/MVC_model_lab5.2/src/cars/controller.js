const Cars = require("./model.js");

const carController = {
    getAll:(req, res)=>{
        res.send(Cars);
    },
    getQuery: (req,res)=>{
        let queriedCars = Cars;

        if (req.query.mark)
            queriedCars = queriedCars.filter((car) =>
                car.mark.includes(req.query.mark)
            );
        if (req.query.num)
            queriedCars = queriedCars.filter((car) =>
                car.number.includes(req.query.num)
            );    
        res.send(queriedCars);
    },
    getById: (req, res)=>{
        let car = Cars.find((car) => car.id === parseInt(req.params.id));
        if (car !== null) res.status(200).send(car);
        else res.status(404).send("Not Found");
    },
    delete: (req, res)=>{
        let index = Cars.findIndex((car) => car.id === parseInt(req.params.id));
        if (index >= 0) {
            let deletedCar = Cars[index];
            Cars.splice(index, 1);
            res.send(deletedCar);
        } else res.status(404).send("Not Found");
    }, 
    post: (req, res)=>{
        let newCar = {
            id: Number(Date.now()),
            ...req.body,
        };
        Cars.push(newCar);
        res.send(newCar);
    },
    patch: (req, res)=>{
        let index = Cars.findIndex((car) => car.id === parseInt(req.params.id));
        if (index >= 0) {
            let updatedCar = Cars[index];
            for (let key in updatedCar)
                if (req.body[key]) updatedCar[key] = req.body[key];
            res.send(updatedCar);
        } else res.status(404).send("Not Found");
    },
    put: (req, res)=>{
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
            Cars.push(newCars[i]);
        }
        res.send(newCars)
    }
};

module.exports = carController;