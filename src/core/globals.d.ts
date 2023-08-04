interface GachiElement {
	type: string | ((props: ElementProps) => GachiElement | GachiElement[])
	props: ElementProps
}

interface FiberElement extends GachiElement {
	dom?: HTMLElement | Text
	parent?: FiberElement
	sibling?: FiberElement
	child?: FiberElement
	alternate?: FiberElement
	effectTag?: string
	hooks?: any[]
}

interface BaseProps {
	style?: string
	className?: string
	nodeValue?: string
}

interface ElementProps extends BaseProps {
	children: Array<GachiElement>
}
