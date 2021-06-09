import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import { Options, FinalOptions, State, CreateBrowserWindowOptions } from './types';
/**
 * Store and restore your Electron Window's Size and Position.
 * @example
    ```
    const winState = new WinState({
        defaultWidth: 800,
        defaultHeight: 600,
        // other winState options, see below
    })

    const browserWindow = new BrowserWindow({
        ...winState.winOptions,
        // your normal BrowserWindow options...
    })

    // Attach the required event listeners
    winState.manage(this.browserWindow)
    ```
 */
export default class WinState<T> {
    opts: FinalOptions<T>;
    store: Store;
    state: State;
    win?: BrowserWindow;
    constructor(options: Options<T>);
    getState(): {
        frame?: boolean | undefined;
        width: number;
        height: number;
    } & Record<string, unknown>;
    saveState(): void;
    /**
     * Change the stored frame option
     *
     * Note: You need to recreate the window for this to take effect
     */
    changeFrame(value: boolean): void;
    /**
     * Reset the stored window size and position
     */
    reset(): void;
    /**
     * Attach event listeners to the BrowserWindow.
     *
     * Will listen to the `resize`, `move`, `close` and `closed event`.
     *
     * By default the changes will only be stored on the `close` and `closed` event.
     * Use the `dev` option to store the changes on `resize` and `move` as well.
     * @param win
     */
    manage(win: BrowserWindow): void;
    /**
     * Remove all attached event listeners
     */
    unmanage(): void;
    changeHandler(): void;
    closeHandler(): void;
    isNormal(): boolean;
    /**
     * Create a new [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) with the restored window size and position.
     *
     * Will attach the event listeners automatically.
     * @param options Options for the new BrowserWindow as well as [electron-win-state](https://github.com/BetaHuhn/electron-win-state) itself.
     * @returns A new BrowserWindow
     * @example
        ```
        import WinState from 'electron-win-state'

        const browserWindow = WinState.createBrowserWindow({
            width: 800,
            height: 600,
            // your normal BrowserWindow options...
        })
        ```
     */
    static createBrowserWindow(options: CreateBrowserWindowOptions<any>): BrowserWindow;
    /**
     * The current window size and position
     */
    get winOptions(): {
        x: number | undefined;
        y: number | undefined;
        frame?: boolean | undefined;
        width: number;
        height: number;
    };
    /**
     * The current window width
     */
    get width(): number;
    /**
     * The current window height
     */
    get height(): number;
    /**
     * If the window has a frame
     */
    get frame(): boolean | undefined;
    /**
     * The current window x position
     */
    get x(): number | undefined;
    /**
     * The current window y position
     */
    get y(): number | undefined;
}
