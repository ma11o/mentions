import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { initIpcMain } from "./ipc-main-handler";
import * as express from "express";

/*
const getResourceDirectory = () => {
  return process.env.NODE_ENV === 'development'
    ? path.join(process.cwd(), 'dist')
    : path.join(process.resourcesPath, 'app.asar.unpack', 'dist');
};
*/

let mainWindow: BrowserWindow | null;

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => mainWindow = null);

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }

  // DevTools
  /*
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  */
  if (isDev) {
    win.webContents.openDevTools();
  }

  return win
}

app.on("activate", async () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = await createWindow();
  }
});

app.on('ready', async () => {
  mainWindow = await createWindow();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.post("/post", (req, res) => {
    mainWindow!.webContents.send('add', {
      data: req.body
    });
    res.send();
  });
  const server = app.listen(4140, "localhost");
  server.timeout = 0;

  mainWindow!.webContents.send('add', {
    data: `Listening on http://localhost`
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

initIpcMain();

