import Gachi from "../core/framework.ts"
import { importCss } from "../modules/cssLoader.js"
import Button from "./button.jsx"
importCss("./index.css")

const container = document.getElementById("root")

function aboba() {
	console.log("this property")
}

function App() {
	return (
		<div>
			<h1 style={"display: flex;"}>first title</h1>
			<div>
				<Button temp={aboba} />
				{/* <Button temp={aboba} /> */}
			</div>
			<div className="header">aboba</div>
		</div>
	)
}

Gachi.render(App(), container)

// setTimeout(() => {
// 	const elem = (
// 		<div>
// 			<h1 style={"display: grid;"}>фирст тайтле</h1>
// 			<div>
// 				<Button temp={"я добрая кнопка"} />
// 			</div>
// 			<div className="header">абоба</div>
// 		</div>
// 	)

// 	Gachi.render(elem, container)
// }, 3000)
