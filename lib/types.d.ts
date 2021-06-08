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
     * Enable development mode.
     *
     * Changes will be stored immediately after resizing or moving and not just after closing a window
     *
     * @default false
     */
    dev?: boolean;
    /**
     * Add the `.resetWindowToDefault()` method to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window).
     *
     * Can be used to both reset the stored state, as well as resizing the window to it's defaults.
     *
     * @default true
     */
    addReset?: boolean;
    debounce?: number;
    electronStoreOptions?: electronStoreOptions<T>;
    store?: Store;
}
export declare type FinalOptions<T> = SetRequired<Options<T>, 'defaultWidth' | 'defaultHeight' | 'dev' | 'debounce' | 'addReset' | 'electronStoreOptions'>;
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
