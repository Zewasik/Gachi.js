import { createDom, updateRealDom } from "./dom"
import hooksInst from "./hooks"

export class VirtualDom {
	currentRoot: FiberElement | null = null
	deletitionList: FiberElement[] = []

	workLoop(element: FiberElement) {
		let domParentFiber: FiberElement | null = element

		while (domParentFiber) {
			domParentFiber = this.setUpFiberTree(domParentFiber)
		}

		if (element) {
			updateRealDom(element, this.deletitionList)
		}

		this.deletitionList = []
		this.currentRoot = element
	}

	private setUpFiberTree(pointElement: FiberElement): FiberElement | null {
		if (pointElement.type instanceof Function) {
			hooksInst.currentComponent = pointElement
			let children = pointElement.type(pointElement.props)
			hooksInst.currentComponent = null

			children = (
				Array.isArray(children) ? children : [children]
			) as GachiElement[]

			this.parseChildren(pointElement, children)
		} else {
			if (!pointElement.dom) {
				createDom(pointElement)
			}
			this.parseChildren(pointElement, pointElement.props.children)
		}

		if (pointElement.child) {
			return pointElement.child
		}

		let nextFiber: FiberElement | undefined = pointElement
		while (nextFiber) {
			if (nextFiber.sibling) {
				return nextFiber.sibling
			}
			nextFiber = nextFiber.parent
		}

		return null
	}

	private parseChildren(element: FiberElement, children: GachiElement[]) {
		let prevSibling: FiberElement | null = null
		let alternateChild = element.alternate && element.alternate.child
		let index: number = 0

		while (index < children.length || alternateChild) {
			let newFiberElement: FiberElement | null = null

			const child = children[index]
			const sameType =
				child && alternateChild && child.type == alternateChild.type

			if (sameType) {
				newFiberElement = {
					type: child.type,
					props: child.props,
					parent: element,
					dom: alternateChild?.dom,
					effectTag: "UPDATE",
					alternate: alternateChild,
				}
			} else if (child) {
				newFiberElement = {
					type: child.type,
					props: child.props,
					parent: element,
					effectTag: "COMMIT",
				}
			} else if (alternateChild) {
				alternateChild.effectTag = "DELETE"
				this.deletitionList.push(alternateChild)
				// TODO: fix deletition -> remove doesn't work properly for functional component
			}

			if (index === 0) {
				element.child = newFiberElement!
			} else if (prevSibling) {
				prevSibling.sibling = newFiberElement!
			}
			prevSibling = newFiberElement

			if (alternateChild) {
				alternateChild = alternateChild.sibling
			}

			index++
		}
	}

	render(element: GachiElement, container: HTMLElement) {
		const root: FiberElement = {
			type: "ROOT",
			props: {
				children: [element],
			},
			dom: container,
			alternate: this.currentRoot || undefined,
		}

		this.workLoop(root)
	}
}
