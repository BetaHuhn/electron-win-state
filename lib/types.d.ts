import Store, { Options as electronStoreOptions } from 'electron-store';
import { SetRequired } from 'type-fest';
import { BrowserWindowConstructorOptions } from 'electron';
/**
 * Options to configure [electron-win-state](https://github.com/BetaHuhn/electron-win-state)
 */
export interface Options<T> {
    /**
     * Default width which will be used when no stored value was found
     *
     * @default 800
     */
    defaultWidth?: number;
    /**
     * Default height which will be used when no stored value was found
     *
     * @default 600
     */
    defaultHeight?: number;
    /**
     * Default value for the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option
     *
     * @default true
     */
    defaultFrame?: boolean;
    /**
     * Store and restore the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option
     *
     * Will be enabled automatically if `defaultFrame` is provided.
     * @default false
     */
    storeFrameOption?: boolean;
    /**
     * Enable development mode
     *
     * Changes will be stored immediately after resizing or moving and not just after closing a window.
     *
     * @default false
     */
    dev?: boolean;
    /**
     * Add the `.resetWindowToDefault()`, `.setFramed()` and `.getStoredWinOptions()` methods to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
     *
     * Can be used to both reset the stored state, as well as resizing the window to it's defaults.
     *
     * @default true
     */
    addMethods?: boolean;
    debounce?: number;
    electronStoreOptions?: electronStoreOptions<T>;
    store?: Store;
}
export declare type FinalOptions<T> = SetRequired<Options<T>, 'defaultWidth' | 'defaultHeight' | 'defaultFrame' | 'storeFrameOption' | 'dev' | 'debounce' | 'addMethods' | 'electronStoreOptions'>;
export interface CreateBrowserWindowOptions<T> extends BrowserWindowConstructorOptions {
    /**
     * Default width which will be used when no stored value was found
     *
     * @default 800
     */
    width?: number;
    /**
     * Default height which will be used when no stored value was found
     *
     * @default 600
     */
    height?: number;
    /**
     * Options to configure [electron-win-state](https://github.com/BetaHuhn/electron-win-state) itself
     */
    winState?: Options<T>;
}
export interface State {
    /**
     * The current window width
     */
    width: number;
    /**
     * The current window height
     */
    height: number;
    /**
     * If the window has a frame
     */
    frame?: boolean;
    /**
     * The current window x position
     */
    x?: number;
    /**
     * The current window y position
     */
    y?: number;
    /**
     * Indicates if the window is maximized
     */
    isMaximized?: boolean;
    /**
     * Indicates if the window is in fullscreen
     */
    isFullScreen?: boolean;
}
