import {
    BrowserWindow,
    app,
    nativeImage,
    protocol,
  } from 'electron'
  import { autoUpdater } from 'electron-updater'
  import * as path from 'path'
  import * as url from 'url'
  

  let mainWindow: Electron.BrowserWindow | null
  
  console.log(app.getPath('userData'))
  const storePath = path.join(app.getPath('userData'), 'electron-store')
  
  function createWindow() {
    const icon = nativeImage.createFromPath(`${app.getAppPath()}/src/public/icon.png`)
  
    if (app.dock) {
      app.dock.setIcon(icon)
    }
  
    mainWindow = new BrowserWindow({
      icon,
      minWidth: 800,
      minHeight: 600,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
      }
    })
  
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:4000')
    } else {
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
    }
  
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }
  
  app.on('ready', () => {
    createWindow()
    autoUpdater.checkForUpdatesAndNotify()
    protocol.registerHttpProtocol('desktopToolkit', (request, callback) => {
      const url = request.url
      console.log('prefix', url)
    })
  })
  
  