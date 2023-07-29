# Git Documentation: Gachi.js - A Simple JSX Framework

## Introduction

Gachi.js is a lightweight and simple JSX-based framework that allows you to create and manipulate DOM elements. In this documentation, we will explore the features of Gachi.js and provide code examples with explanations to demonstrate how to perform various tasks, such as creating elements, handling events, nesting elements, and adding attributes.

Happy coding with Gachi.js! 🚀

## Features of Gachi.js

-   JSX-based syntax for creating and manipulating DOM elements.
-   Support for creating functional components and nesting them.
-   Event handling for interactive web applications.
-   Efficient rendering using a virtual DOM approach.

## Creating an Element

In Gachi.js, you can use JSX to create DOM elements effortlessly. Here's an example of how to create a simple element:

```jsx
import Gachi from "/src/core/framework.ts"

const element = <div>Hello, Gachi.js!</div>

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We import Gachi.js, which includes the functions required for creating and rendering elements.
2. We define an element using JSX syntax, in this case, a `<div>` element containing the text "Hello, Gachi.js!".
3. We render the element by calling `Gachi.render()` and passing the element and the target container (`root` in this example).

## Creating an Event

Gachi.js allows you to easily add event handlers to elements. Here's an example of how to create a button with a click event:

```jsx
import Gachi from "/src/core/framework.ts"

function handleClick() {
	alert("Button clicked!")
}

const element = <button onClick={handleClick}>Click Me!</button>

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We define a function `handleClick` that will be called when the button is clicked.
2. The `<button>` element is created using JSX, and we attach the `onClick` event to the `handleClick` function.
    1. All events starts with `on` and continue with event name capital letter for every new word. Example: `onDoubleClick`
3. When the button is clicked, the `handleClick` function is executed, and an alert will be shown.

## Nesting Elements

Gachi.js supports nesting elements, allowing you to create complex structures easily. Here's an example of nesting elements:

```jsx
import Gachi from "/src/core/framework.ts"

const element = (
	<div>
		<h1>Welcome to Gachi.js!</h1>
		<p>This is a simple JSX framework.</p>
	</div>
)

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We use JSX to create a `<div>` element that contains an `<h1>` and a `<p>` element.
2. The nested elements will be rendered inside the parent `<div>`.

## Adding Attributes to an Element

Gachi.js allows you to add custom attributes to elements using JSX. Here's an example of how to add a custom attribute:

```jsx
import Gachi from "/src/core/framework.ts"

function Button(props) {
	return (
		<button>
			This button has a custom attribute with value: {props.innerValue}
		</button>
	)
}

Gachi.render(<Button innerValue="example" />, document.getElementById("root"))
```

Explanation:

1. We use JSX to create a functional component `<Button>` with a custom `innerValue` attribute.
2. The attribute can be accessed in functional component. First parameter in functional component is an object with fields of your custom props.

## Functional Components

Functional components in Gachi.js allow you to create reusable and composable UI elements. Functional components are JavaScript functions that return JSX elements. Here's an example of a functional component:

```jsx
import Gachi from "/src/core/framework.ts"

function Greeting(props) {
	return <h1>Hello, {props.name}!</h1>
}

const element = <Greeting name="John" />

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We define a functional component `Greeting` that takes a `props` parameter and returns an `<h1>` element containing a personalized greeting.
2. We use the `<Greeting>` component as if it were an HTML tag, passing the `name` prop as an attribute.
3. The `Greeting` component is rendered with the provided prop, and the personalized greeting is displayed.

## Hooks

Gachi.js provides hooks to manage state and side effects within functional components. The `useState` hook allows you to add state to a functional component. Here's an example of using the `useState` hook:

```jsx
import Gachi from "/src/core/framework.ts"

function Counter() {
	const [count, setCount] = Gachi.useState(0)

	function handleIncrement() {
		setCount(count + 1)
	}

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={handleIncrement}>Increment</button>
		</div>
	)
}

const element = <Counter />

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We use the `useState` hook from Gachi to add state to the `Counter` component. The `count` state variable and the `setCount` function to update it are obtained from the `useState` hook.
2. When the "Increment" button is clicked, the `handleIncrement` function is called, updating the `count` state.
3. The updated `count` is displayed in the component, and clicking the button increments its value.
