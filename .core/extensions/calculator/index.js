class Extension {

    constructor() {
        this.name = "Calculator";
        this.version = "1.0.0";
        this.description = "A simple calculator application";
        this.type = "Executable"

        this.run = [ "start calc.exe" ];
    };

    render() {
        return JSON.parse(JSON.stringify(this));
    };

};

module.exports = Extension;