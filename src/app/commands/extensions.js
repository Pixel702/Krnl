const axios = require("axios").default;

module.exports = class ExtensionsCommand {

    constructor() {
        this.name = "extensions";
        this.description = "Get a list of all extensions";
    };

    async run() {
        const extensions = (await axios.get(`http://${process.env.HOST}/extensions`)).data;
        if (!extensions.length) return console.log("No extensions were found");
        const text = [];
        for (const extension of extensions) {
            text.push(`${extension.name}@${extension.version} - ${extension.description ?? "No Description"}`);
        };
        console.log(`EXTENSIONS:\n${text.join("\n")}`);
    };

};