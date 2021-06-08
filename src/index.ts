import debounce from 'debounce'
import Store from 'electron-store'
import { BrowserWindow } from 'electron'

import { Options, FinalOptions, State, CreateBrowserWindowOptions } from './types'

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

	opts: FinalOptions<T>
	store: Store
	state: State
	win?: BrowserWindow

	constructor(options: Options<T>) {
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
		}

		this.opts = Object.assign({}, defaultOptions, options)
		this.store = this.opts.store ? this.opts.store : new Store(this.opts.electronStoreOptions as any)
		this.state = this.getState()
	}

	getState() {
		const stored = this.store.store
		const defaults = { width: this.opts.defaultWidth, height: this.opts.defaultHeight }

		return Object.assign({}, defaults, stored)
	}

	saveState() {
		this.store.set(this.state as any)
	}

	/**
	 * Reset the stored window size and position
	 */
	reset() {
		this.store.clear()
	}

	/**
	 * Attach event listeners to the BrowserWindow.
	 * 
	 * Will listen to the `resize`, `move`, `close` and `closed event`.
	 * 
	 * By default the changes will only be stored on the `close` and `closed` event.
	 * Use the `dev` option to store the changes on `resize` and `move` as well.
	 * @param win 
	 */
	manage(win: BrowserWindow) {
		this.win = win

		this.win.on('resize', debounce(() => this.changeHandler(), this.opts.debounce))
		this.win.on('move', debounce(() => this.changeHandler(), this.opts.debounce))
		this.win.on('close', () => this.closeHandler())
		this.win.on('closed', () => this.closeHandler())

		// Add a reset method to the window
		if (this.opts.addReset) {
			(this.win as any).resetWindowToDefault = () => {
				this.win?.setSize(this.opts.defaultWidth, this.opts.defaultHeight)
				this.reset()
			}
		}
	}

	/**
	 * Remove all attached event listeners
	 */
	unmanage() {
		if (this.win) {
			this.win.removeListener('resize', debounce(() => this.changeHandler(), this.opts.debounce))
			this.win.removeListener('move', debounce(() => this.changeHandler(), this.opts.debounce))
			this.win.removeListener('close', () => this.closeHandler())
			this.win.removeListener('closed', () => this.closeHandler())
			this.win = undefined
		}
	}

	changeHandler() {
		try {
			if (!this.win) return

			const winBounds = this.win.getBounds()

			if (this.isNormal()) {
				this.state.x = winBounds.x
				this.state.y = winBounds.y
				this.state.width = winBounds.width
				this.state.height = winBounds.height
			}

			// Not working, reference: https://git.io/JZ3n5
			/* this.state.isMaximized = this.win.isMaximized()
			this.state.isFullScreen = this.win.isFullScreen() */

			// this.state.displayBounds = screen.getDisplayMatching(winBounds).bounds

			if (this.opts.dev) {
				this.saveState()
			}
		} catch (err) {
			// Don't throw an error when window was closed
		}
	}

	closeHandler() {
		// Unregister listeners and save state
		this.unmanage()
		this.saveState()
	}

	isNormal() {
		return !this.win?.isMaximized() && !this.win?.isMinimized() && !this.win?.isFullScreen()
	}

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
	static createBrowserWindow(options: CreateBrowserWindowOptions<any>): BrowserWindow {
		// Parse winState specific options from options
		const winStateOpts = Object.assign({}, { defaultWidth: options.width, defaultHeight: options.height }, options.winState)

		const winState = new WinState(winStateOpts)

		// Cleanup options object
		delete options.winState

		// Create a new BrowserWindow with the provided options and the current winState
		const win = new BrowserWindow({ ...options, ...winState.winOptions })

		winState.manage(win)

		return win
	}

	/**
	 * The current window size and position
	 */
	get winOptions() {
		return {
			width: this.width,
			height: this.height,
			x: this.x,
			y: this.y
		}
	}

	/**
	 * The current window width
	 */
	get width() {
		return this.state.width
	}

	/**
	 * The current window height
	 */
	 get height() {
		return this.state.height
	}

	/**
	 * The current window x position
	 */
	get x() {
		return this.state.x
	}

	/**
	 * The current window y position
	 */
	get y() {
		return this.state.y
	}
}