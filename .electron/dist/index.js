
"use strict";
module.exports = (context) => {
  if(context.electron.ipcMain.on._hof) {
    context.electron.ipcMain.on = context.electron.ipcMain.on("/Users/debuginn/Code/src/github.com/debuginn/profile/.electron/dist/index.js");
    context.electron.ipcMain.handle = context.electron.ipcMain.handle("/Users/debuginn/Code/src/github.com/debuginn/profile/.electron/dist/index.js");
  }

  return ((require, getBrowserWindowRuntime) => {
    const exports = {};
    

    

getBrowserWindowRuntime().webContents.openDevTools();
    

    return exports;
  })((moduleId) => {
    const __require = require;
    if (context[moduleId]) {
      return context[moduleId];
    }
    if(moduleId.startsWith('.')) {
      return __require(moduleId)(context);
    }
    return __require(moduleId);
  },()=>context.browserWindow)
};
