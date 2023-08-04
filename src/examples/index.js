import Gachi from "../core/framework.ts"
import { Aboba } from "../core/hooks.ts"
import { importCss } from "../modules/cssLoader.js"
import Button from "./button.jsx"
importCss("./index.css")

const container = document.getElementById("root")

function App() {
	Aboba.createContext("top level", 9000)

	return (
		<div>
			<h1 style={"display: flex;"}>first title</h1>
			<div id="aboba">
				{[1, 2, 3].map((i) => {
					return (
						<div>
							<Button value={"no default " + i} />
						</div>
					)
				})}
			</div>
			<div className="header">aboba</div>
			<FirstLevelA />
			<FirstLevelB />
		</div>
	)
}

function FirstLevelA() {
	Aboba.createContext("undefined", "really totally undefined")

	return <SecondLevelA />
}

function FirstLevelB() {
	Aboba.createContext("number", 555)

	return <SecondLevelB />
}

function SecondLevelA() {
	const ctx = Aboba.useContext("undefined")
	const ctx2 = Aboba.useContext("top level")

	return (
		<h1>
			I m first context: {ctx}, I m top level: {ctx2}
		</h1>
	)
}
function SecondLevelB() {
	const ctx = Aboba.useContext("number")
	const ctx2 = Aboba.useContext("top level")

	return (
		<h1>
			I m second context: {ctx}, I m top level: {ctx2}
		</h1>
	)
}

Gachi.render(<App />, container)
