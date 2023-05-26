"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var path = __importStar(require("path"));
var rimraf = __importStar(require("rimraf"));
var url = __importStar(require("url"));
var windowBoundsController_1 = require("../src/utils/windowBoundsController");
var mainWindow;
console.log(electron_1.app.getPath('userData'));
var storePath = path.join(electron_1.app.getPath('userData'), 'electron-store');
rimraf.sync(storePath);
function createWindow() {
    var icon = electron_1.nativeImage.createFromPath("".concat(electron_1.app.getAppPath(), "/build/logo-192.png"));
    if (electron_1.app.dock) {
        electron_1.app.dock.setIcon(icon);
    }
    mainWindow = new electron_1.BrowserWindow(__assign(__assign({}, (0, windowBoundsController_1.getWindowBounds)()), { icon: icon, minWidth: 1000, minHeight: 600, frame: false, transparent: true, webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        } }));
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:4000');
    }
    else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'renderer/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    mainWindow.on('close', function () {
        (0, windowBoundsController_1.setWindowBounds)(mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.getBounds());
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
function createMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var template, menu;
        return __generator(this, function (_a) {
            template = [
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
                            click: function () {
                                electron_1.shell.openExternal('https://github.com/marcelio911/desktop-toolkit');
                            }
                        }
                    ]
                }
            ];
            menu = electron_1.Menu.buildFromTemplate(template);
            electron_1.Menu.setApplicationMenu(menu);
            return [2 /*return*/];
        });
    });
}
electron_1.app.on('ready', function () {
    createWindow();
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    createMenu();
    electron_1.protocol.registerHttpProtocol('devTeam', function (request, callback) {
        var url = request.url.substr(8); // remove the "myapp://" prefix
        // handle the URL as needed
        console.log('url:: ', url);
    });
});
//# sourceMappingURL=electron.js.map