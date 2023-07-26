import Gachi from "../core/framework.tsx"
import { importCss } from "../modules/cssLoader.js"
import Button from "./button.jsx"
importCss("./index.css")

const container = document.getElementById("root")

const elem = (
	<div>
		<h1 style={"display: flex;"}>first title</h1>
		<div>{/* <Button /> */}</div>
		<div className="header">aboba</div>
	</div>
)

// const elem = Gachi.createElement(
// 	"div",
// 	null,
// 	Gachi.createElement("h1", { style: "display: flex;" }, "first title"),
// 	Gachi.createElement("div", null, <Button />),
// 	Gachi.createElement("div", { className: "header" }),
// 	"aboba"
// )

console.log(elem)

Gachi.render(elem, container)
