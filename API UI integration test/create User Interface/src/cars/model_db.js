const { Sequelize, DataTypes, Model } = require("sequelize");
const options = require("../options");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: options.dbPath
});

class Car extends Model{}

Car.init(
    {
        owner:{
            type: DataTypes.STRING,
        },
        mark:{
            type: DataTypes.STRING,
        },
        number:{
            type: DataTypes.STRING,
        },
        colour:{
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: "Car",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Car;