const {writeFile, readFile}=require("fs").promises;
const options = require("../options");

const Cars = {
    data: [],
    fileName: options.fileName,
    loadFromFile: async function(){
        const dataStr = await readFile(this.fileName, "utf-8");
        return JSON.parse(dataStr);
    },
    saveToFile: async function(data){
        try {
            const dataStr = JSON.stringify(data);
            await writeFile(this.fileName, dataStr, "utf-8");
        } catch (e) {
            if(e.fileIsBusy) setInterval(()=>{this.saveToFile(data)}, 1000);
        }
    },

    keys: ["owner", "mark", "number", "colour"],

    read: async function(condition){
        this.data = await this.loadFromFile();
        if (condition)
            return this.data.filter(condition);
        return this.data;
    },
    find: async function(condition) {
        this.data = await this.loadFromFile();
        return this.data.find(condition);
    },
    delete: async function(condition) {
        this.data = await this.loadFromFile();
        let index = this.data.findIndex(condition);
        if (index === -1) return null;
        //if (index >= 0)
        let deletedCar = this.data[index];
        this.data.splice(index, 1);
        await this.saveToFile(this.data);
        return deletedCar;
    },
    create: async function(options) {
        this.data = await this.loadFromFile();
        let newCar = {
            id: Number(Date.now()),
        };
        for (let key of this.keys) {
            newCar[key] = options[key];
        }
        this.data.push(newCar);
        await this.saveToFile(this.data);
        return newCar;
    },
    update: async function(condition, options) {
        this.data = await this.loadFromFile();
        let index = this.data.findIndex(condition);
        if (index === -1) return null;
        let updatedCar = this.data[index];
        for (let key of this.keys)
            if (options[key]) updatedCar[key] = options[key];
        await this.saveToFile(this.data);
        return updatedCar;
    },
};

module.exports = Cars;