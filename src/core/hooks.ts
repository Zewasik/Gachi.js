import { workLoop } from "./framework"
import Globals from "./global"

export function useState<T>(initialState: T): [T, (newState: T) => void] {
	const temp = { ...Globals.currentComponent } as GachiElement

	const hookIndex = Globals.currentHook
	if (Globals.currentComponent === null) {
		throw new Error("no component")
	}

	let hooks = Globals.currentComponent["hooks"]
		? Globals.currentComponent.hooks
		: []

	Globals.currentComponent["hooks"] =
		Globals.currentComponent["hooks"] === undefined
			? []
			: Globals.currentComponent["hooks"]

	initialState =
		Globals.currentComponent && Globals.currentComponent.hooks[hookIndex]
			? Globals.currentComponent!.hooks[hookIndex]
			: initialState

	if (hooks[hookIndex] === undefined) {
		hooks.push(initialState)
	}

	const setState = (newState: T) => {
		hooks[hookIndex] =
			typeof newState === "function"
				? newState(hooks[hookIndex])
				: newState
		console.log("current component:", temp)

		if (temp.parent) {
			workLoop(temp.parent)
		}
	}

	Globals.currentComponent.hooks = hooks
	Globals.currentHook++

	return [Globals.currentComponent.hooks[hookIndex], setState]
}

class Context {
	private currentContext: Map<string, any> = new Map<string, any>()

	createContext<T>(name: string, initialState: T) {
		if (Globals.currentComponent === null) {
			throw new Error("no component")
		}

		if (this.currentContext.has(name))
			throw new Error(`Context with name \`${name}\` already exists`)

		this.currentContext.set(name, initialState)
	}

	useContext(name: string) {
		if (!this.currentContext.has(name))
			throw new Error(
				`Context with name \`${name}\` was not found. Check your code`
			)

		return this.currentContext.get(name)
	}
}

const Aboba = new Context()
export { Aboba }
