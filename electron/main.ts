import {
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    app,
    nativeImage,
    protocol,
    shell
  } from 'electron'
  import { autoUpdater } from 'electron-updater'
  import * as path from 'path'
  import * as rimraf from 'rimraf'
  import * as url from 'url'
  
  import {
    getWindowBounds,
    setWindowBounds
  } from '../src/utils/windowBoundsController'
  
  let mainWindow: Electron.BrowserWindow | null
  
  console.log(app.getPath('userData'))
  const storePath = path.join(app.getPath('userData'), 'electron-store')
  rimraf.sync(storePath)
  
  function createWindow() {
    const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/version-icon-9.jpg`)
  
    if (app.dock) {
      app.dock.setIcon(icon)
    }
  
    mainWindow = new BrowserWindow({
      ...getWindowBounds(),
      icon,
      minWidth: 1000,
      minHeight: 600,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
  
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:4000')
    } else {
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, 'renderer/index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
    }
  
    mainWindow.on('close', () => {
      setWindowBounds(mainWindow?.getBounds())
    })
  
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }
  
  async function createMenu() {
  
    const template: MenuItemConstructorOptions[] = [
      {
        label: 'Desktop_Toolkit',
        submenu: [
          {
            type: 'separator'
          },
          {
            role: 'quit',
            accelerator: 'CmdOrCtrl+Q'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: () => {
              shell.openExternal('https://github.com/marcelio911/desktop-toolkit')
            }
          }
        ]
      }
    ]
  
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
  
  app.on('ready', () => {
    createWindow()
    autoUpdater.checkForUpdatesAndNotify()
    createMenu()
    protocol.registerHttpProtocol('devTeam', (request, callback) => {
      const url = request.url.substr(8) // remove the "myapp://" prefix
      // handle the URL as needed
      console.log('url:: ', url)
    })
  })
  
  