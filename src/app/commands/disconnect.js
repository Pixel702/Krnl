module.exports = class DisconnectCommand {

    constructor() {
        this.name = "disconnect";
        this.description = "Disconnect the CLI";
    };

    async run({ cli }) {
        if (!cli.rat) return console.log("No rat selected");
        cli.rat = null;
    };

};