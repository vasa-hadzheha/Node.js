const supertest = require("supertest");
const app = require("../src");

const Photo = {
    id: 1,
    author: "Yurii",
    title: "Uzhhorod",
    description: "My city",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/%D0%A3%D0%B6%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BA%D0%B0%D1%84%D0%B5%D0%B4%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80%2C_%D0%B0%D0%B5%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE_2.jpg/413px-%D0%A3%D0%B6%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BA%D0%B0%D1%84%D0%B5%D0%B4%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80%2C_%D0%B0%D0%B5%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE_2.jpg",
    hashtags: "#city, #uzhhorod",
    published: new Date(2020, 3, 6),
    likes: 4242
};

describe("Integration test Photo API", () => {

    it("should get photo with unput id", async() => {
        const response = await supertest(app).get("/photo/1");
        const data = JSON.parse(response.text);
        data.published = new Date(data.published);

        expect(response.status).toBe(200);
        expect(data).toMatchObject(Photo);
    });

});