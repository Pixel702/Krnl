const fs = require("node:fs");
const path = require("node:path");

class Core extends Map {

    constructor(src="./.core/") {
        super();

        const rawExtensions = fs.readdirSync(path.join(src, "extensions"), { withFileTypes: true }).filter(file => file.isDirectory());
        for (const extension of rawExtensions) {
            if (!fs.existsSync(path.join(src, "extensions", extension.name, "index.js"))) continue;
            const rEx = require(path.join(process.cwd(), src, "extensions", extension.name, "index.js"));
            const Ex = new rEx();
            this.set(Ex.name, Ex);
        };
    };

};

module.exports = Core;