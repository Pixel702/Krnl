const fs = require("node:fs");
const path = require("node:path");

class Pages extends Map {

    constructor(src="./src/web/pages") {
        super();
        
        const files = fs.readdirSync(src).filter(file => file.endsWith(".html"));
        for (const file of files) {
            const name = file.replace(".html", "");
            this.set(name, path.join(src, file));
        };
    };

};

module.exports = Pages;