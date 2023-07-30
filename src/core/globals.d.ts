interface GachiElement {
	type: string | Function
	dom?: HTMLElement | Text
	parent?: GachiElement
	sibling?: GachiElement
	child?: GachiElement
	props: ElementProps
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
