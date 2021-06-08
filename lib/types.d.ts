import Store, { Options as electronStoreOptions } from 'electron-store';
import { SetRequired } from 'type-fest';
import { BrowserWindowConstructorOptions } from 'electron';
export interface Options<T> {
    defaultWidth?: number;
    defaultHeight?: number;
    dev?: boolean;
    debounce?: number;
    addReset?: boolean;
    electronStoreOptions?: electronStoreOptions<T>;
    store?: Store;
}
export declare type FinalOptions<T> = SetRequired<Options<T>, 'defaultWidth' | 'defaultHeight' | 'dev' | 'debounce' | 'addReset' | 'electronStoreOptions'>;
export interface CreateBrowserWindowOptions<T> extends BrowserWindowConstructorOptions {
    width?: number;
    height?: number;
    winState?: Options<T>;
}
export interface State {
    width: number;
    height: number;
    x?: number;
    y?: number;
    isMaximized?: boolean;
    isFullScreen?: boolean;
}
