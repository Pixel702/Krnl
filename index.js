const Server = require("./src/app/server/index");
const Window = require("./src/app/index");
const CLI = require("./src/app/cli");

require("dotenv").config();

const server = new Server();

try {
    new Window();
} catch(e) {
    new CLI(server);
};