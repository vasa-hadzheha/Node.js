module.exports = {
    backendPort: 3000,
    fileName: "./data/Car.json",
    retryInterval: 1000,
    dbPath: process.env.NODE_ENV == "test" ?  "./backend/data/Test.db": "./data/Cars.db",
    frontendPort: 5000,
    frontendIP: "127.0.0.42",
}