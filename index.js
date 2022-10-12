const Server = require("./src/app/server/index");
const Window = require("./src/app/index");
const CLI = require("./src/app/cli");

require("dotenv").config();

try { const server = new Server(); } catch (e) { console.log("[INFO]: Server already running") };

try {
    new Window();
} catch(e) {
    new CLI(server);
};