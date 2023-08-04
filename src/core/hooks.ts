import { VirtualDom } from "./virtualDom"

export class Hooks extends VirtualDom {
	private _currentComponent: FiberElement | null
	private _currentHook: number

	constructor() {
		super()
		this._currentComponent = null
		this._currentHook = 0
	}

	useState<T>(initialState: T): [T, (newState: T) => void] {
		if (!this._currentComponent) {
			throw new Error("no component")
		}

		const hookIndex = this._currentHook
		let hooks: any[] = []

		if (
			this._currentComponent.alternate &&
			this._currentComponent.alternate.hooks
		) {
			hooks = this._currentComponent.alternate.hooks
			if (this._currentComponent.alternate.hooks[hookIndex]) {
				initialState = this._currentComponent.alternate.hooks[hookIndex]
			}
		}

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

			if (this.currentRoot) {
				this.workLoop({
					props: { children: this.currentRoot.props.children },
					type: "ROOT",
					dom: this.currentRoot.dom,
					alternate: this.currentRoot,
				})
			}
		}

		this._currentComponent.hooks = hooks
		this._currentHook++

		return [this._currentComponent.hooks[hookIndex], setState]
	}

	set currentComponent(c: FiberElement | null) {
		this._currentComponent = c
		this._currentHook = 0
	}
}

const hooksInst = new Hooks()

export default hooksInst
