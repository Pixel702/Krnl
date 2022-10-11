const { app, BrowserWindow, ipcMain } = require("electron");

class Window {

	constructor() {
		const _this = this;
		app.on("ready", function() {
			_this.win = _this.createWindow();
		});
		app.on("activate", function () {
			if (BrowserWindow.getAllWindows().length == 0) _this.createWindow();
		});
		app.on("window-all-closed", function () {
			if (process.platform !== "darwin") app.quit();
		});
	};

	createWindow() {
		var win = new BrowserWindow({
			width: 876,
			height: 734,
			resizable: true,
			fullscreenable: false,
			transparent: false,
			title: "Krnl",
			frame: true,
			darkTheme: false,
			titleBarStyle: "hidden",
			webPreferences: {
				nodeIntegration: true
			},
			titleBarOverlay: {
				color: "#111827",
				symbolColor: "#fff",
				height: 33
			}
		});

		ipcMain.on("window", async options => {
			var window = new BrowserWindow(options.window);
			window.on("focus", function () { return window.flashFrame(false); });
			window.flashFrame(true);
			window.setMenuBarVisibility(false);
			window.loadURL(`http://127.0.0.1/${options.url}`);
		});

		win.on("focus", function () { return win.flashFrame(false); });
		win.flashFrame(true);
		win.setMenuBarVisibility(false);
		win.loadURL(`http://127.0.0.1/`);

		return win;
	};

};

module.exports = Window;