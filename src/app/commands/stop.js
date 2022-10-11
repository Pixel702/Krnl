module.exports = class StopCommand {

    constructor() {
        this.name = "stop";
        this.description = "Stop the current session";
    };

    async run() {
        console.log("Goodbye");
        process.exit();
    };

};