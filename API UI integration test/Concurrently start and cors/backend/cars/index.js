const Router = require("express").Router;
const carController = require("./controller_db.js");

const carRouter = new Router();

carRouter.get("/", carController.getAll);
carRouter.get("/query", carController.getQuery);
carRouter.get("/:id", carController.getById);
carRouter.delete("/:id", carController.delete);
carRouter.post("/", carController.post);
carRouter.put("/", carController.put);
carRouter.patch("/:id", carController.patch);

module.exports = carRouter;