import debounce from 'debounce'
import Store from 'electron-store'
import { BrowserWindow } from 'electron'

import { Options, FinalOptions, State, CreateBrowserWindowOptions } from './types'

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

	reset() {
		this.store.clear()
	}

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

	static createBrowserWindow(options: CreateBrowserWindowOptions<any>): BrowserWindow {
		// Parse winState specific options from options
		const winStateOpts = Object.assign({}, { defaultWidth: options.width, defaultHeight: options.width }, options.winState)

		const winState = new WinState(winStateOpts)

		// Cleanup options object
		delete options.winState

		// Create a new BrowserWindow with the provided options and the current winState
		const win = new BrowserWindow({ ...options, ...winState.winOptions })

		winState.manage(win)

		return win
	}

	get winOptions() {
		return {
			width: this.width,
			height: this.height,
			x: this.x,
			y: this.y
		}
	}

	get height() {
		return this.state.height
	}

	get width() {
		return this.state.width
	}

	get x() {
		return this.state.x
	}

	get y() {
		return this.state.y
	}
}