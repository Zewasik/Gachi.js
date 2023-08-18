import { VirtualDom } from "./virtualDom"

export class Hooks extends VirtualDom {
	private _currentComponent: FiberElement | null
	private _callHistory: FiberElement[]
	private _currentHook: number
	private _currentContext: Map<string, any> = new Map<string, any>()

	constructor() {
		super()
		this._currentComponent = null
		this._currentHook = 0
		this._callHistory = []
		window.addEventListener("popstate", () => this.triggerRender())
	}

	useState<T>(initialState: T): [T, (newState: T) => void] {
		if (!this.currentComponent) {
			throw new Error("no component")
		}

		const hookIndex = this._currentHook
		let hooks: Hook[] = this.currentComponent.hooks
			? this.currentComponent.hooks
			: []

		if (
			this.currentComponent.alternate &&
			this.currentComponent.alternate.hooks
		) {
			hooks = this.currentComponent.alternate.hooks
			if (this.currentComponent.alternate.hooks[hookIndex]) {
				initialState =
					this.currentComponent.alternate.hooks[hookIndex].value
			}
		}

		if (hooks[hookIndex] === undefined) {
			hooks.push({ hookName: "STATE", value: initialState })
		}

		const setState = (newState: T) => {
			const prevValue = hooks[hookIndex].value

			hooks[hookIndex] =
				typeof newState === "function"
					? {
							hookName: "STATE",
							value: newState(hooks[hookIndex].value),
					  }
					: { hookName: "STATE", value: newState }

			if (prevValue === hooks[hookIndex].value) {
				return
			}

			this.triggerRender()
		}

		this.currentComponent.hooks = hooks
		this._currentHook++

		return [this.currentComponent.hooks[hookIndex].value, setState]
	}

	createContext<T>(name: string, initialState: T) {
		if (this._currentComponent === null) {
			throw new Error("no component")
		}

		if (this._currentContext.has(name))
			throw new Error(`Context with name \`${name}\` already exists`)

		this._currentContext.set(name, initialState)
	}

	useContext(name: string): any {
		if (this._currentComponent === null) {
			throw new Error("no component")
		}

		if (!this._currentContext.has(name))
			throw new Error(
				`Context with name \`${name}\` was not found. Check your code`
			)

		return this._currentContext.get(name)
	}

	useNavigate(): (url: string) => void {
		if (this._currentComponent === null) {
			throw new Error("no component")
		}

		return (url: string) => {
			const startUrl = document.location.pathname
			url = url.charAt(0) === "/" ? url : "/" + url

			if (url === startUrl) return

			history.pushState({}, "", url)
			this.triggerRender()
		}
	}

	useEffect(
		callback: () => () => void,
		dependancies: Array<any> | null = null
	) {
		if (!this.currentComponent) {
			throw new Error("no component")
		}

		const hookIndex = this._currentHook
		let hooks: Hook[] = this.currentComponent.hooks
			? this.currentComponent.hooks
			: []

		if (
			this.currentComponent.alternate &&
			this.currentComponent.alternate.hooks
		) {
			hooks = this.currentComponent.alternate.hooks
		}

		if (hooks[hookIndex] === undefined) {
			hooks.push({
				hookName: "EFFECT",
				value: dependancies,
				callbackResult: callback(),
			})
		} else if (
			!dependancies ||
			(hooks[hookIndex].value.length > 0 &&
				hooks[hookIndex].value.length === dependancies.length &&
				hooks[hookIndex].value.every(
					(value: any, i: number) =>
						!Object.is(value, dependancies[i])
				))
		) {
			hooks[hookIndex].callbackResult?.call(null)
			hooks[hookIndex] = {
				hookName: "EFFECT",
				value: dependancies,
				callbackResult: callback(),
			}
		}

		this.currentComponent.hooks = hooks
		this._currentHook++
	}

	private clearContext() {
		this._currentContext.clear()
	}

	private triggerRender() {
		if (this.currentRoot) {
			this.workLoop(
				{
					props: { children: this.currentRoot.props.children },
					type: "ROOT",
					dom: this.currentRoot.dom,
					alternate: this.currentRoot,
				},
				false,
				this.clearContext.bind(this)
			)
		}
	}

	set currentComponent(c: FiberElement | null) {
		this._currentComponent = c
		this._currentHook = 0
		c ? this._callHistory.push(c) : this._callHistory.pop()
	}

	get currentComponent(): FiberElement {
		return this._callHistory[this._callHistory.length - 1]
	}
}

const hooksInst = new Hooks()

export default hooksInst
