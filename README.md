<div align="center">
  
# 🖼️💾 Electron Window State

[![Node CI](https://github.com/BetaHuhn/electron-win-state/workflows/Node%20CI/badge.svg)](https://github.com/BetaHuhn/electron-win-state/actions?query=workflow%3A%22Node+CI%22) [![Release CI](https://github.com/BetaHuhn/electron-win-state/workflows/Release%20CI/badge.svg)](https://github.com/BetaHuhn/electron-win-state/actions?query=workflow%3A%22Release+CI%22) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/electron-win-state/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/electron-win-state)

Store and restore your Electron Window's Size and Position.

</div>

## Features

- 💾 **Persistent** - *persistently stores your Electron Window's size and position*
- 🔌 **Easy integration** - *integrates easily with your existing BrowserWindow configuration*
- 🔨 **Customization** - *customize the behaviour and the underlying [electron-store](https://github.com/sindresorhus/electron-store) instance*

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
console.log(winState.winOptions) // => { width: 800, height: 600, x: 0, y: 0 }
```

## ⚙️ Options

You can customize the behaviour of [electron-win-state](https://github.com/BetaHuhn/electron-win-state) further, by passing an options object to `new WinState()` or by specifying a `winState` object when using `.createBrowserWindow()`:

```js
new WinState({ 
	defaultWidth: 800,
	defaultHeight: 600,
	dev: true,
	addReset: true
})
```

Or:

```js
WinState.createBrowserWindow({
    winState: {
		defaultWidth: 800,
		defaultHeight: 600,
		dev: true,
		addReset: true
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
		addReset: true
	}
})
```

All of these result in the same.

<details><summary>Here are all the options <a href="https://github.com/BetaHuhn/electron-win-state">electron-win-state</a> supports:</summary>
<br>

| Name | Type | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `defaultWidth` | `number` | The default width which will be used when no stored value was found | `800` |
| `defaultHeight` | `number` | The default height which will be used when no stored value was found | `600` |
| `dev` | `boolean` | Enable development mode. Changes will be stored immediately after resizing or moving and not just after closing a window | `false` |
| `addReset` | `boolean` | Add a `.resetWindowToDefault()` function to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) | `true` |
| `electronStoreOptions` | [`object`](https://github.com/sindresorhus/electron-store#options) | Will be passed to the underlying [electron-store](https://github.com/sindresorhus/electron-store) instance | `{ name: 'window-state' }` |
| `store` | [`instance`](https://github.com/sindresorhus/electron-store#instance) | An existing [electron-store](https://github.com/sindresorhus/electron-store) instance to use | n/a |

</details>

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

If `addReset` is enabled (it is by default) a `.resetWindowToDefault()` method will be added to the provided [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) and can be used to both reset the stored state, as well as resizing the window to it's defaults:

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
