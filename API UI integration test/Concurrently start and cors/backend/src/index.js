const express = require("express");
const options = require("./options");
const carRouter = require("../cars");

const cors = require("cors");

const backendServer = express();

backendServer.use(
    cors({
      origin: `http://${options.frontendIP}:${options.frontendPort}`,
    })
  );

backendServer.use(express.urlencoded({extended: false}));
backendServer.use(express.json());

backendServer.use("/cars", carRouter);

backendServer.all("*",(req, res)=>{
    res.status(404).send("URL not found");
});

backendServer.listen(options.backendPort, () => {
    console.log(`Backend runs on http://localhost:${options.backendPort}`);
  });