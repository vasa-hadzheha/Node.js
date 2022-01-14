function sum(a, b) {
    return a + b;
}


describe("Sum function", function() {
    it("2 + 2 == 4", () => {
        //Arrange
        const a = 2;
        const b = 2;
        //Act
        const s = sum(a, b);
        //Assert
        expect(s).toBe(4);
    });
    it("2 + 3 == 5", () => {
        //Arrange
        const a = 2;
        const b = 3;
        //Act
        const s = sum(a, b);
        //Assert
        expect(s).toBe(5);
    });
});
