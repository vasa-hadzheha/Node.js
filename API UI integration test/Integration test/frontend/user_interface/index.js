const Router = require("express").Router;
const interfaceController = require("./controller");

const inerfaceRouter = new Router();

inerfaceRouter.get("/", interfaceController.carList);

module.exports = inerfaceRouter;