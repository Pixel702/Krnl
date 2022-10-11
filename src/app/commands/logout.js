module.exports = class LogoutCommand {

    constructor() {
        this.name = "logout";
        this.description = "Exit the current session";
    };

    async run() {
        console.log("Goodbye");
        process.exit();
    };

};