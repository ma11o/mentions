import { ipcMain } from "electron";

export const initIpcMain = (): void => {
  ipcMain.handle("click", (event, data: any) => {
    console.log(`click: ${data}`);
  });
};
