import Gachi from "../core/framework"
import { useContext } from "../core/framework"

export function Router({ children }) {
	Gachi.createContext("currentPath", document.location.pathname)

	return children
}

export function Route({ path, element }) {
	const currentPath = useContext("currentPath")

	return currentPath === path ? element : null
}
