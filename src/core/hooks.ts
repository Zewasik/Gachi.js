import { VirtualDom } from "./virtualDom"

export class Hooks extends VirtualDom {
	private _currentComponent: FiberElement | null
	private _currentHook: number
	private _currentContext: Map<string, any> = new Map<string, any>()

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
				this.clearContext()
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

	createContext<T>(name: string, initialState: T) {
		if (this._currentComponent === null) {
			throw new Error("no component")
		}

		if (this._currentContext.has(name))
			throw new Error(`Context with name \`${name}\` already exists`)

		this._currentContext.set(name, initialState)
	}

	useContext(name: string) {
		if (!this._currentContext.has(name))
			throw new Error(
				`Context with name \`${name}\` was not found. Check your code`
			)

		return this._currentContext.get(name)
	}

	private clearContext() {
		this._currentContext.clear()
	}

	set currentComponent(c: FiberElement | null) {
		this._currentComponent = c
		this._currentHook = 0
	}
}

const hooksInst = new Hooks()

export default hooksInst
