module.exports = class ExitCommand {

    constructor() {
        this.name = "exit";
        this.description = "Exit the current session";
    };

    async run() {
        console.log("Goodbye");
        process.exit();
    };

};