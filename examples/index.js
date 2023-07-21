import Gachi from "../src/core/index.js"
import { importCss } from "/src/modules/cssLoader.js"

importCss("./index.css")

const container = document.getElementById("root")

const elem = Gachi.createElement(
	"div",
	null,
	Gachi.createElement("h1", { style: "display: flex;" }, "first title"),
	Gachi.createElement(
		"div",
		null,
		Gachi.createElement("h3", { style: "display: flex;" }, "third title"),
		"just div"
	),
	Gachi.createElement("div", { className: "header" }),
	"aboba"
)

console.log(elem)
// const elem = (
// 	<div>
// 		<h1 style="display: flex">first title</h1>
// 		<h2>second title</h2>
// 		<div className="header"></div>
// 		aboba
// 	</div>
// )

Gachi.render(elem, container)

setTimeout(() => {
	const elem = Gachi.createElement(
		"div",
		null,
		Gachi.createElement("div", { className: "header" }),
		Gachi.createElement("h2", { style: "display: flex;" }, "first title"),
		Gachi.createElement(
			"div",
			null,
			Gachi.createElement(
				"h3",
				{ style: "display: flex;" },
				"third title"
			),
			"just div"
		),
		"aboba"
	)

	Gachi.render(elem, container)
}, 3000)
