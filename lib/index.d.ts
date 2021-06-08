import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import { Options, FinalOptions, State, CreateBrowserWindowOptions } from './types';
export default class WinState<T> {
    opts: FinalOptions<T>;
    store: Store;
    state: State;
    win?: BrowserWindow;
    constructor(options: Options<T>);
    getState(): {
        width: number;
        height: number;
    } & Record<string, unknown>;
    saveState(): void;
    reset(): void;
    manage(win: BrowserWindow): void;
    unmanage(): void;
    changeHandler(): void;
    closeHandler(): void;
    isNormal(): boolean;
    static createBrowserWindow(options: CreateBrowserWindowOptions<any>): BrowserWindow;
    get winOptions(): {
        height: number;
        width: number;
        x: number | undefined;
        y: number | undefined;
    };
    get height(): number;
    get width(): number;
    get x(): number | undefined;
    get y(): number | undefined;
}
