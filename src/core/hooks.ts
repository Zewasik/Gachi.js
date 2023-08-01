import { workLoop } from "./virtualDom"

export class Hooks {
	private _currentComponent: GachiElement | null
	private _currentHook: number

	constructor() {
		this._currentComponent = null
		this._currentHook = 0
	}

	useState<T>(initialState: T): [T, (newState: T) => void] {
		if (!this._currentComponent) {
			throw new Error("no component")
		}

		const temp = { ...this._currentComponent } as GachiElement
		const hookIndex = this._currentHook

		let hooks = this._currentComponent["hooks"]
			? this._currentComponent.hooks
			: []

		this._currentComponent["hooks"] =
			this._currentComponent["hooks"] === undefined
				? []
				: this._currentComponent["hooks"]

		initialState =
			this._currentComponent && this._currentComponent.hooks[hookIndex]
				? this._currentComponent!.hooks[hookIndex]
				: initialState

		if (hooks[hookIndex] === undefined) {
			hooks.push(initialState)
		}

		const setState = (newState: T) => {
			const prevValue = hooks[hookIndex]

			hooks[hookIndex] =
				typeof newState === "function"
					? newState(hooks[hookIndex])
					: newState

			if (prevValue === hooks[hookIndex]) {
				console.log("same value")
				return
			}

			if (temp.parent) {
				workLoop(temp.parent)
			}
		}

		this._currentComponent.hooks = hooks
		this._currentHook++

		return [this._currentComponent.hooks[hookIndex], setState]
	}

	set currentComponent(c: GachiElement | null) {
		this._currentComponent = c
		this._currentHook = 0
	}
}

const hooksInst = new Hooks()

export default hooksInst
