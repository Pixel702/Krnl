const fs = require("node:fs");
const path = require("node:path");

const storage = new Map();

class DataStorage {

    constructor(id, dump="./.datastorage", suffix=".dtvalue") {
        if (!id) return;
        super();
        storage.set(id, new Map());

        this.id = id;
        this.dump = dump;
        this.suffix = suffix;

        this.load();
    };

    add(name) {
        if (storage.get(this.id).has(name)) return;
        storage.get(this.id).set(name, new Map());
        this.save();
        return storage.get(this.id).get(name);
    };

    get(name) {
        if (!storage.get(this.id).has(name)) return;
        this.save();
        return storage.get(this.id).get(name);
    };

    delete(name) {
        if (!storage.get(this.id).has(name)) return;
        const data = storage.get(this.id).get(name);
        storage.get(this.id).delete(name);
        this.save();
        return data;
    };

    async load() {
        if (!fs.existsSync(this.dump)) fs.mkdirSync(this.dump);
        if (!fs.existsSync(path.join(this.dump, this.id))) fs.mkdirSync(path.join(this.dump, this.id));

        const rawvals = fs.readdirSync(path.join(this.dump, this.id)).filter(file => file.endsWith(this.suffix));
        for (const rawval of rawvals) {
            const name = rawval.replace(this.suffix.startsWith(".") ? this.suffix : `.${this.suffix}`, "");
            const rawdat = fs.readFileSync(path.join(this.dump, this.id, `${rawVal}${this.suffix.startsWith(".") ? this.suffix : `.${this.suffix}`}`));
            const dat = JSON.parse(rawdat);
            const keys = Object.keys(dat);
            for (const key of keys) {
                storage.get(this.id).get(name).set(key, dat[key]);
            };
        };
    };

    async save() {
        if (!fs.existsSync(this.dump)) fs.mkdirSync(this.dump);
        if (!fs.existsSync(path.join(this.dump, this.id))) fs.mkdirSync(path.join(this.dump, this.id));

        const dvals = Array.from(storage.get(this.id).keys());
        for(const dval of dvals) {
            const data = {};
            const keys = Array.from(storage.get(this.id).get(dval).keys());
            for (const key of keys) {
                data[key] = storage.get(this.id).get(dval).get(key);
            };
            fs.writeFileSync(path.join(this.dump, this.id, `${dval}${this.suffix.startsWith(".") ? this.suffix : `.${this.suffix}`}`), JSON.stringify(data));
        };
    };

};

module.exports = DataStorage;