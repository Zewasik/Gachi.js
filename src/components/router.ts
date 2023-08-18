/// <reference types="../core/globals.d.ts" />
import { useContext } from "../core/framework"

interface RouterParam {
	routes: { path: string; element: GachiElement }[]
}

export function Router({ routes }: RouterParam) {
	const referenceVariables = extractPathVariables(document.location.pathname)

	const resRoute = routes.find(({ path, element }) => {
		const pathVariables = extractPathVariables(path)
		const params = {}
		element.props["params"] = params

		return (pathVariables.length === 1 && pathVariables[0] === "*") ||
			(referenceVariables.length === pathVariables.length &&
				pathVariables.every((variable, i) => {
					if (variable.startsWith(":")) {
						params[variable.substring(1)] = referenceVariables[i]
						return true
					}
					return variable === referenceVariables[i]
				}))
			? element
			: null
	})

	return resRoute ? resRoute.element : null
}

function extractPathVariables(path: string): string[] {
	return path
		.replace(/\/{2,}/g, "/")
		.replace(/^\/+|\/+$/g, "")
		.split("/")
}
