const { app, BrowserWindow } = require("electron");

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, icon: "" });

  win.loadFile("./public/index.html");
}

app.on("ready", createWindow);
