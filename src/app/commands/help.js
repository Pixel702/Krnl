module.exports = class HelpCommand {

    constructor() {
        this.name = "help";
        this.description = "Get the help menu";
    };

    async run({ commands }) {
        const keys = Array.from(commands.keys());
        const text = [];
        for (const key of keys) {
            const command = commands.get(key);
            text.push(`${command.name} - ${command.description ?? "No Description"}`);
        };
        console.log(text.join("\n"));
    };

};