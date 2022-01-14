
//Connect express
const express = require("express");
// Create object app
const app = express();

//----------------------------Don`t understend-------------------------------

//отримання вибірки з колекції згідно з вказаними параметрами (параметри передаються через рядок стану)
// додавання колекції об’єктів,

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//-----------------------------------------------------------------------------

let Cars = [{
    id: 0,
    owner: "David Flanagan",
    mark: "Audi",
    number: "BC3104OB",
    colour: "gray",
},
{
    id: 1,
    owner: "Richard Helm",
    mark: "Audi",
    number: "AA9999II",
    colour: "black",
},
{
    id: 2,
    owner: "Ralph Johnson",
    mark: "Porsche",
    number: "AE6886HX",
    colour: "orange",
},
];

app.get("/cars", (req, res) => {
    res.send(Cars);
});

app.get("/cars/query", (req, res) => {
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
});

app.get("/cars/:id", (req, res) => {
    let car = Cars.find((car) => car.id === parseInt(req.params.id));
    if (car !== null) res.status(200).send(car);
    else res.status(404).send("Not Found");
});

app.delete("/cars/:id", (req, res) => {
    let index = Cars.findIndex((car) => car.id === parseInt(req.params.id));
    if (index >= 0) {
        let deletedCar = Cars[index];
        Cars.splice(index, 1);
        res.send(deletedCar);
    } else res.status(404).send("Not Found");
});

app.post("/cars", (req, res) => {
    let newCar = {
        id: Number(Date.now()),
        ...req.body,
    };
    Cars.push(newCar);
    res.send(newCar);
});

app.put("/cars", (req, res)=>{
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
});

app.patch("/cars/:id", (req, res) => {
    let index = Cars.findIndex((car) => car.id === parseInt(req.params.id));
    if (index >= 0) {
        let updatedCar = Cars[index];
        for (let key in updatedCar)
            if (req.body[key]) updatedCar[key] = req.body[key];
        res.send(updatedCar);
    } else res.status(404).send("Not Found");
});

//handler for route
app.get("/get",(req,res)=>{
    //send respond
    res.send("Hello world")
})
app.all("/", (req, res) => {
    res.send("Test");
});

//connect to 3000 port
app.listen(3000, () => {
    console.log("http://localhost:3000");
});