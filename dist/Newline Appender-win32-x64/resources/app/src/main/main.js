const {
  app,
  BrowserWindow
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
  })

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: win,
        width: 300,
        height: 300,
        show: false,
      })
      event.newGuest = new BrowserWindow(options)
      event.newGuest.maximize()
      event.newGuest.setResizable(false)
      event.newGuest.removeMenu()
      event.newGuest.loadFile('src/renderer/about.html')
      event.newGuest.show();
    }
  })

  // remove alt menu
  win.removeMenu()

  // and load the index.html of the app.
  win.loadFile('src/renderer/index.html')

  // maximize window size
  win.maximize()

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Show application window
  win.show()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
