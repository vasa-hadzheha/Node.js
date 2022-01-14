const supertest = require("supertest");
const app = require("../src");
const { copyFile, unlink } = require("fs").promises;

const testCar = {
    owner: "David Flanagan",
    mark: "Audi",
    number: "BC3104OB",
    colour: "gray"
};

describe("Integration test API", () =>{
    beforeAll(async() =>{
        await copyFile("./backend/data/Test.db", "./backend/data/Copy.db");
    });

    afterAll(async() => {
        await copyFile("./backend/data/Copy.db", "./backend/data/Test.db");
        await unlink("./backend/data/Copy.db");
    });

    it("should create object if Post", async() =>{
        const response = await supertest(app).post("/cars/").send(testCar);
        const data = JSON.parse(response.text);
        // data.date = new Date(data.date);

        expect(response.status).toBe(200);
        expect(data).toMatchObject(testCar);
    });

    it("should be able GET/:id after POST", async() => {
        let response = await supertest(app).post("/cars/").send(testCar);
        const id = JSON.parse(response.text).id;
        response = await supertest(app).get(`/cars/${id}`);
        const data = JSON.parse(response.text);
        // data.date = new Date(data.date);

        expect(response.status).toBe(200);
        expect(data).toMatchObject(testCar);
    });
});