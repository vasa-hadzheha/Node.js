const Car = require("./model_db");
const controller = require("./controller_db");

describe("DB car model testing", () =>{
    const testCar = {
        owner: "David Flanagan",
        mark: "Audi",
        number: "BC3104OB",
        colour: "gray"
    };

    const res = {
        send: jest.fn(),
        status: jest.fn(()=> res),
    };

    beforeEach(async()=>{
        await Car.truncate();
    });

    it("should crate car", async() =>{
        const req = { body: testCar };
        await controller.post(req, res);
        expect(res.send).toBeCalledWith(expect.objectContaining(testCar));
    });

    it("should update car", async() => {
        const car = await Car.create(testCar);
        const updatedCar = {
            owner: "Vasyl",
            mark: "Porshe",
            number: "AA8888AA",
            colour: "green"
        };

        const req = { body: updatedCar, params: { id: car.id } };

        await controller.patch(req, res);

        expect(res.send).toBeCalledWith(expect.objectContaining(updatedCar));
    });

    it("should return Not Found if Car for update is not found", async() => {
        const updatedCar = {
            owner: "Vasyl",
            mark: "Porshe",
            number: "AA8888AA",
            colour: "green"
        };

        const req = { body: updatedCar, params: { id: -1 } };

        await controller.patch(req, res);

        expect(res.status).toBeCalledWith(404);
    });
});