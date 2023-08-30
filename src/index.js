const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  let { screen } = require('electron');
  let primaryDisplay = screen.getPrimaryDisplay();
  let { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
