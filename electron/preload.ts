import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
    click: (data: any) => ipcRenderer.invoke("click", data),
    on: (channel: any, func: any) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
});