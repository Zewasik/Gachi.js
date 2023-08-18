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

Gachi.js provides hooks to manage state and side effects within functional components. In Gachi.js, hooks are implemented using the `Hooks` class, which extends the `VirtualDom` class for handling virtual DOM updates.

### useState

The `useState` hook allows you to add state to a functional component. Here's an example of using the `useState` hook:

```jsx
import Gachi, { useState } from "/src/core/framework.ts"

function Counter() {
	const [count, setCount] = useState(0)

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

### useEffect

The `useEffect` hook allows you to perform side effects in functional components, such as data fetching, subscriptions, or manually interacting with the DOM.

Inside the callback function you can also return a cleanup function. It will be called first after every re-render.

`useEffect` can be used in 3 different ways:

-   with a non-empty dependency array:
    -   `useEffect` is triggered when any entry in the dependency array is changed.
-   with an empty dependency array:
    -   `useEffect` is triggered only once after initial component render.
-   without dependencies:
    -   `useEffect` is triggered each time the component is re-rendered.

Here's an example of using the `useEffect` hook with a non-empty dependency array:

```jsx
import Gachi, { useState, useEffect } from "/src/core/framework.ts"

function App() {
	const [count, setCount] = useState(0)
	const incrementHandler = () => setCount(count + 1)

	useEffect(() => {
		if (count > 10) setCount(0)
	}, [count])

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={incrementHandler}>Increment</button>
		</div>
	)
}

const element = <App />

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We use the `useState` hook to create a `count` component with an initial count of 0.
2. We use a button with `incrementHandler` to increment the `count` by 1.
3. We use the `useEffect` hook to restart the `count` when it reaches 11.

### createContext + useContext

The `createContext` method allows you to create a new context for sharing data with nested components.

The `useContext` hook allows you to access the value of a context created using the `createContext` method. This hook is used inside functional components. Here's an example of using the `createContext` and `useContext` methods:

```jsx
import Gachi, { useContext } from "/src/core/framework.ts"

function App() {
	const ThemeContext = Gachi.createContext("theme", "light")

	return <ThemedButton />
}

function ThemedButton() {
	const theme = useContext("theme")

	return (
		<button style={{ background: theme === "light" ? "#fff" : "#000" }}>
			Themed Button
		</button>
	)
}

const element = <App />

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We create a new context named `ThemeContext` using the `createContext` method. The initial value of the context is set to `"light"`.
2. In the `ThemedButton` component, we use the `useContext` method to access the current value of the `ThemeContext`.

### useNavigate <a name="navigate-router-example"></a>

The `useNavigate` hook allows you to navigate to a new URL programmatically. This is useful for building single-page applications (SPAs) without full-page reloads. Here's an example of using the `useNavigate` hook:

```jsx
import Gachi, { useNavigate } from "/src/core/framework.ts"
import { Router, Route } from "/src/components/router.ts"

function Home() {
	const navigate = useNavigate()

	return (
		<div>
			<h1>Welcome to the Home page!</h1>
			<button onClick={() => navigate("/about")}>Go to About</button>
		</div>
	)
}

function About() {
	const navigate = useNavigate()

	return (
		<div>
			<h1>About Page</h1>
			<button onClick={() => navigate("/")}>Go to Home page</button>
		</div>
	)
}

function App() {
	return (
		<Router
			routes={[
				{ path: "/", element: <Home /> },
				{ path: "/about", element: <About /> },
			]}
		/>
	)
}

const element = <App />

Gachi.render(element, document.getElementById("root"))
```

Explanation:

1. We use the `useNavigate` hook from Gachi to obtain the `navigate` function.
2. When the "Go to About" button is clicked, the `handleButtonClick` function is called, and it uses the `navigate` function to change the URL to "/about".
3. The `App` component renders both the `Home` and `About` components, and we can switch between them by clicking the button.

## Components

### Router

The `Router` module provides a simple way to handle routing in your application. It allows you to define routes and their corresponding elements, and based on the current URL path, it renders the appropriate element.

---

**NOTE**

When defining routes with path parameters (variables starting with `:`) like `/products/:productId`, the Router component will automatically extract the parameter values from the URL and assign a `params` property of the corresponding element.

---

[Use example](#navigate-router-example)
