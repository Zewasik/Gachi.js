import { isEvent, isProps } from "../utils/filters"

export function updateRealDom(
	rootElement: FiberElement,
	toDelete: FiberElement[] = []
) {
	for (let element of toDelete) {
		updateNode(element)
	}
	updateNode(rootElement.child)
}

function updateNode(element: FiberElement | undefined) {
	if (!element || !element.parent) return

	let domParentFiber: FiberElement = element.parent
	while (!domParentFiber.dom) {
		domParentFiber = domParentFiber.parent!
	}
	const parentDom = domParentFiber.dom

	if (element.dom) {
		if (element.effectTag === "COMMIT") {
			parentDom.appendChild(element.dom)
		} else if (element.effectTag === "UPDATE") {
			updateDomNode(element.dom, element.props, element.alternate?.props)
		}
	}
	if (element.effectTag === "DELETE") {
		deleteNode(element, parentDom)
	}
	if (element.effectTag !== "DELETE") {
		updateNode(element.child)
	}
	updateNode(element.sibling)
}

function deleteNode(element: FiberElement, parentDom: HTMLElement | Text) {
	if (!element) return

	if (element.dom) {
		parentDom.removeChild(element.dom)
	} else if (element.child) {
		deleteNode(element.child, parentDom)
	}
}

export function createDom(element: FiberElement) {
	if (typeof element.type !== "string") {
		return
	}

	const dom =
		element.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type)

	updateDomNode(dom, element.props)

	element.dom = dom
}

function updateDomNode(
	dom: HTMLElement | Text,
	newProps: ElementProps,
	oldProps: ElementProps = { children: [] }
) {
	const oldPropsArr = Object.entries(oldProps || {}).filter(([key]) =>
		isProps(key)
	)
	const newPropsArr = Object.entries(newProps || {}).filter(([key]) =>
		isProps(key)
	)

	oldPropsArr
		.filter(([key, value]) => isEvent(key, value))
		.forEach(([key, eventFunc]) => {
			dom.removeEventListener(key.substring(2).toLowerCase(), eventFunc)
		})

	newPropsArr
		.filter(([key, value]) => isEvent(key, value))
		.forEach(([key, eventFunc]) => {
			dom.addEventListener(key.substring(2).toLowerCase(), eventFunc)
		})

	oldPropsArr.forEach(([key, value]) => {
		dom[key] = ""
	})

	newPropsArr.forEach(([key, value]) => {
		dom[key] = value
	})
}
