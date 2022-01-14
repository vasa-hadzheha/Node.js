// app.set("view engine", "ejs");
// app.use(express.static('./public'));
// express.static('./files/screenshots_API');

// app.use("/images", express.static('./files/img'));
// app.use("/screen", express.static('./files/screenshots_API'));
//не працює вивід картинок з папки
//const url1 = require("../../files/screenshots_API");

const devController = {
    getAuthor: async(req, res)=>{
        res.render("author_Info",{
        });
    },
    getAPI: (req, res) => {
        res.render("Information_and_API",{
        //url1: url1,       
    });
    }
};

module.exports = devController;