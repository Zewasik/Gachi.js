import Gachi, { useContext, useState } from "../core/framework.ts"
import { importCss } from "../modules/cssLoader.js"
import Button from "./button.jsx"
importCss("./index.css")

const container = document.getElementById("root")

function App() {
	const [c, setC] = useState(0)
	Gachi.createContext("count", { c, setC })

	return (
		<div>
			<h1 style={"display: flex;"}>first title</h1>
			<div id="aboba">
				{[1, 2, 3].map((i) => {
					return (
						<div className="pizdec">
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
	Gachi.createContext("undefined", "really totally undefined")

	return <SecondLevelA />
}

function FirstLevelB() {
	Gachi.createContext("number", 555)

	return <SecondLevelB />
}

function SecondLevelA() {
	const ctx = useContext("undefined")
	const { c } = useContext("count")

	return (
		<h1>
			I m first context: {ctx}, I m top level: {c}
		</h1>
	)
}

function SecondLevelB() {
	const ctx = useContext("number")
	const { c, setC } = useContext("count")

	return (
		<>
			<h1>
				I m first context: {ctx}, I m top level: {c}
			</h1>
			<button onClick={() => setC(0)}>Reset top level hook</button>
		</>
	)
}

Gachi.render(<App />, container)
