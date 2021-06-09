<div align="center">
  
# 🖼️💾 Electron Window State

[![Node CI](https://github.com/BetaHuhn/electron-win-state/workflows/Node%20CI/badge.svg)](https://github.com/BetaHuhn/electron-win-state/actions?query=workflow%3A%22Node+CI%22) [![Release CI](https://github.com/BetaHuhn/electron-win-state/workflows/Release%20CI/badge.svg)](https://github.com/BetaHuhn/electron-win-state/actions?query=workflow%3A%22Release+CI%22) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/electron-win-state/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/electron-win-state)

Store and restore your Electron Window's Size and Position.

</div>

## Features

- 💾 **Persistent** - *persistently stores your Electron Window's size and position*
- 🔌 **Easy integration** - *integrates easily with your existing BrowserWindow configuration*
- 🔨 **Customization** - *customize the behaviour and the underlying [electron-store](https://github.com/sindresorhus/electron-store) instance*
- 🖼️ **Frame option** - *you can [optionally](storing-the-frame-option) store the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option as well*

## 🚀 Get started

```shell
npm install electron-win-state
```

*Requires Electron 11 or later*

## 📚 Usage

The easiest way to use [electron-win-state](https://github.com/BetaHuhn/electron-win-state), is to add it as a wrapper around your normal [`BrowserWindow`](https://www.electronjs.org/docs/api/browser-window):

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	width: 800,
	height: 600,
	// your normal BrowserWindow options...
})
```

This will create a new [`BrowserWindow`](https://www.electronjs.org/docs/api/browser-window) with the provided options and store any changes once the window is closed.

Thats it! Your Electron app now has a persistent window! 🎉

### Manually

You can also use [electron-win-state](https://github.com/BetaHuhn/electron-win-state) manually:

```js
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

With `winState.winOptions` you have access to the restored size and position of the window: 

```js
console.log(winState.winOptions) // => { width: 800, height: 600, x: 0, y: 0, frame: true }
```

## ⚙️ Options

You can customize the behaviour of [electron-win-state](https://github.com/BetaHuhn/electron-win-state) further, by passing an options object to `new WinState()` or by specifying a `winState` object when using `.createBrowserWindow()`:

```js
new WinState({ 
	defaultWidth: 800,
	defaultHeight: 600,
	dev: true,
	addMethods: true
})
```

Or:

```js
WinState.createBrowserWindow({
    winState: {
		defaultWidth: 800,
		defaultHeight: 600,
		dev: true,
		addMethods: true
	}
})
```

Or:

```js
WinState.createBrowserWindow({
	width: 800,
	height: 600,
	winState: {
		dev: true,
		addMethods: true
	}
})
```

All of these result in the same.

Here are all the options [electron-win-state](https://github.com/BetaHuhn/electron-win-state) supports:
	
| Name | Type | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `defaultWidth` | `number` | The default width which will be used when no stored value was found | `800` |
| `defaultHeight` | `number` | The default height which will be used when no stored value was found | `600` |
| `defaultFrame` | `boolean` | The default value for the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option when no stored value was found | `true` |
| `storeFrameOption` | `boolean` | Store and restore the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option (will be enabled automatically if `defaultFrame` is provided) | `false` |
| `dev` | `boolean` | Enable development mode. Changes will be stored immediately after resizing or moving and not just after closing a window | `false` |
| `addMethods` | `boolean` | Add the `.resetWindowToDefault()`, `.setFramed()` and `.getStoredWinOptions()` methods to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) | `true` |
| `electronStoreOptions` | [`object`](https://github.com/sindresorhus/electron-store#options) | Will be passed to the underlying [electron-store](https://github.com/sindresorhus/electron-store) instance | `{ name: 'window-state' }` |
| `store` | [`instance`](https://github.com/sindresorhus/electron-store#instance) | An existing [electron-store](https://github.com/sindresorhus/electron-store) instance to use | n/a |

## 📖 Examples

Here are a few examples to help you get started!

### Basic Example

This is the most basic example. A new [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) will be created and the required event listeners will be attached automatically.

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	width: 800,
	height: 600
})

browserWindow.loadURL('https://github.com/BetaHuhn/electron-win-state')
```

---

### Development Mode

During development it might be helpful to store the window size and position immediately after changing it and not just after closing the window. You can enable this functionality by setting `dev` to true:

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	width: 800,
	height: 600,
	winState: {
		dev: true
	}
})

browserWindow.loadURL('https://github.com/BetaHuhn/electron-win-state')
```

### Resetting the Window

If `addMethods` is enabled (it is by default) a `.resetWindowToDefault()` method will be added to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) and can be used to both reset the stored state, as well as resizing the window to it's defaults:

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	width: 800,
	height: 600,
	winState: {
		dev: true
	}
})

// Later
browserWindow.resetWindowToDefault()
```

This method could also be accessed anywhere else in your Electron app by getting the currently focused window:

```js
const browserWindow = BrowserWindow.getFocusedWindow()
browserWindow.resetWindowToDefault()
```

---

### Storing the frame option

You can optionally store the [frame](https://www.electronjs.org/docs/api/frameless-window#frameless-window) option as well. This might be useful if you want your users to enable or disable the window frame and store their choice.

If `storeFrameOption` is enabled (or `defaultFrame` is provided) the `frame` or `defaultFrame` option will be stored and can be later changed with the `.setFramed()` method on the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) (will be added if `addMethods` is true).

> You have to recreate the window for the `frame` option to take effect

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	width: 800,
	height: 600,
	frame: false,
	winState: {
		storeFrameOption: true
	}
})

// Later
browserWindow.setFramed(true)
```

This method could also be accessed anywhere else in your Electron app by getting the currently focused window:

```js
const browserWindow = BrowserWindow.getFocusedWindow()
browserWindow.setFramed(true)
```

---

### Get stored values

You can access the restored window size and position with the `winOptions` object:

```js
const winState = new WinState({ 
	defaultWidth: 800,
	defaultHeight: 600,
	defaultFrame: false
})

winState.winOptions // => { width: 1200, height: 700, x: 50, y: 105, frame: true }
```

You can get the stored values at any time using the added `.getStoredWinOptions()` method on the [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) (only added if `addMethods` is true):

```js
import WinState from 'electron-win-state'

const browserWindow = WinState.createBrowserWindow({
	winState: {
		defaultWidth: 800,
		defaultHeight: 600,
		defaultFrame: false
	}
})

browserWindow.getStoredWinOptions() // => { width: 1200, height: 700, x: 50, y: 105, frame: true }
```

---

## 💻 Development

Issues and PRs are very welcome!

- run `yarn lint` or `npm run lint` to run eslint.
- run `yarn watch` or `npm run watch` to watch for changes.
- run `yarn build` or `npm run build` to produce a compiled version in the `lib` folder.

## ❔ About

This project was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F81S2RK)

### Credit

This library uses the great [electron-store](https://github.com/sindresorhus/electron-store) by [@sindresorhus](https://github.com/sindresorhus) under the hood and was inspired by [electron-window-state](https://github.com/mawie81/electron-window-state) and [electron-boilerplate](https://github.com/szwacz/electron-boilerplate/blob/master/src/helpers/window.js).

## 📄 License

Copyright 2021 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
