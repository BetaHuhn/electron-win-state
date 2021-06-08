"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debounce_1 = __importDefault(require("debounce"));
const electron_store_1 = __importDefault(require("electron-store"));
const electron_1 = require("electron");
class WinState {
    constructor(options) {
        const defaultOptions = {
            defaultWidth: 600,
            defaultHeight: 800,
            dev: false,
            debounce: 500,
            electronStoreOptions: {
                name: 'window-state'
            },
            addReset: true,
            store: undefined
        };
        this.opts = Object.assign({}, defaultOptions, options);
        this.store = this.opts.store ? this.opts.store : new electron_store_1.default(this.opts.electronStoreOptions);
        this.state = this.getState();
    }
    getState() {
        const stored = this.store.store;
        const defaults = { width: this.opts.defaultWidth, height: this.opts.defaultHeight };
        return Object.assign({}, defaults, stored);
    }
    saveState() {
        this.store.set(this.state);
    }
    reset() {
        this.store.clear();
    }
    manage(win) {
        this.win = win;
        this.win.on('resize', debounce_1.default(() => this.changeHandler(), this.opts.debounce));
        this.win.on('move', debounce_1.default(() => this.changeHandler(), this.opts.debounce));
        this.win.on('close', () => this.closeHandler());
        this.win.on('closed', () => this.closeHandler());
        // Add a reset method to the window
        if (this.opts.addReset) {
            this.win.resetWindowToDefault = () => {
                var _a;
                (_a = this.win) === null || _a === void 0 ? void 0 : _a.setSize(this.opts.defaultWidth, this.opts.defaultHeight);
                this.reset();
            };
        }
    }
    unmanage() {
        if (this.win) {
            this.win.removeListener('resize', debounce_1.default(() => this.changeHandler(), this.opts.debounce));
            this.win.removeListener('move', debounce_1.default(() => this.changeHandler(), this.opts.debounce));
            this.win.removeListener('close', () => this.closeHandler());
            this.win.removeListener('closed', () => this.closeHandler());
            this.win = undefined;
        }
    }
    changeHandler() {
        try {
            if (!this.win)
                return;
            const winBounds = this.win.getBounds();
            if (this.isNormal()) {
                this.state.x = winBounds.x;
                this.state.y = winBounds.y;
                this.state.width = winBounds.width;
                this.state.height = winBounds.height;
            }
            // Not working, reference: https://git.io/JZ3n5
            /* this.state.isMaximized = this.win.isMaximized()
            this.state.isFullScreen = this.win.isFullScreen() */
            // this.state.displayBounds = screen.getDisplayMatching(winBounds).bounds
            if (this.opts.dev) {
                this.saveState();
            }
        }
        catch (err) {
            // Don't throw an error when window was closed
        }
    }
    closeHandler() {
        // Unregister listeners and save state
        this.unmanage();
        this.saveState();
    }
    isNormal() {
        var _a, _b, _c;
        return !((_a = this.win) === null || _a === void 0 ? void 0 : _a.isMaximized()) && !((_b = this.win) === null || _b === void 0 ? void 0 : _b.isMinimized()) && !((_c = this.win) === null || _c === void 0 ? void 0 : _c.isFullScreen());
    }
    static createBrowserWindow(options) {
        // Parse winState specific options from options
        const winStateOpts = Object.assign({}, { defaultWidth: options.width, defaultHeight: options.width }, options.winState);
        const winState = new WinState(winStateOpts);
        // Cleanup options object
        delete options.winState;
        // Create a new BrowserWindow with the provided options and the current winState
        const win = new electron_1.BrowserWindow(Object.assign(Object.assign({}, options), winState.winOptions));
        winState.manage(win);
        return win;
    }
    get winOptions() {
        return {
            height: this.height,
            width: this.width,
            x: this.x,
            y: this.y
        };
    }
    get height() {
        return this.state.height;
    }
    get width() {
        return this.state.width;
    }
    get x() {
        return this.state.x;
    }
    get y() {
        return this.state.y;
    }
}
exports.default = WinState;
