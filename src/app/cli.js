const readline = require("node:readline");
const { stdin, stdout } = require("node:process");
const fs = require("node:fs");
const path = require("node:path");

const rl = readline.createInterface({ input: stdin, output: stdout });

const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const commandFile of commandFiles) {
    const command = new (require(path.join(__dirname, "commands", commandFile)));
    commands.set(command.name, command);
};

class CLI {

    constructor(server) {
        this.server = server;
        this.rat = null;
        this.main();
    };

    async main() {
        rl.question(`krnl@${this.rat ?? "ratless"} > `, async (c) => {
            if (!c) return this.main();

            const args = c.split(" ");
            const command = args.shift();
            const cli = this;

            if (!commands.has(command)) {
                console.log(`Command not found ${command} try using help instead`);
                return this.main();
            };

            const server = this.server;

            const cmd = commands.get(command);
            await cmd.run({ commands, server, args, command, cli });
            console.log("");

            return this.main();
        });
    };

};

module.exports = CLI;