const express = require("express");
const options = require("../src/options");

const devRouter = require("../for_devs")
const interfaceRouter = require("../user_interface")

const frontendServer = express();

frontendServer.set("view engine", "ejs");
frontendServer.use(express.static('./public'));
frontendServer.use("/images", express.static('./files/img'));
frontendServer.use("/screen", express.static('./files/screenshots_API'));

frontendServer.use("/for-developers", devRouter)
frontendServer.use("/", interfaceRouter);

frontendServer.all("*",(req, res)=>{
    res.render("NotFound404", {
        url: "./images/404.png",
        text: "Page not found"
    });
});

frontendServer.listen(options.frontendPort, options.frontendIP, ()=>{
    console.log(`Frontend runs on http://${options.frontendIP}:${options.frontendPort}`);
});