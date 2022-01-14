const express = require("express");

const app = express();

/*
Фото (Id, Автор, Назва, Опис, URL-
файлу, Список гештегів, Дата опублікування, Кількість «лайків»)
*/
let Photos = [{
            id: 1,
            author: "Yurii",
            title: "Uzhhorod",
            description: "My city",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/%D0%A3%D0%B6%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BA%D0%B0%D1%84%D0%B5%D0%B4%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80%2C_%D0%B0%D0%B5%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE_2.jpg/413px-%D0%A3%D0%B6%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BA%D0%B0%D1%84%D0%B5%D0%B4%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80%2C_%D0%B0%D0%B5%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE_2.jpg",
            hashtags: "#city, #uzhhorod",
            published: new Date(2020, 3, 6),
            likes: 4242
        },
        {
            id: 2,
            author: "Yurii",
            title: "Cat",
            description: "Cat",
            url: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
            hashtags: "#cat, #animal",
            published: new Date(2021, 12, 16),
            likes: 1000
        }
    ]

app.get("/photo",(req, res) => {
    res.send(Photos);
});
    
app.get("/photo/:id", (req, res) => {
    let photo = Photos.find((photo) => photo.id === parseInt(req.params.id));
    if (photo !== null) res.status(200).send(photo);
    else res.status(404).send("Not Found");
});
    

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/", (req, res) => {
    res.render("photo");
});

if (process.env.NODE_ENV == "test") module.exports = app;
else
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    })