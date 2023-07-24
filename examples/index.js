import Gachi from "../dist/core/index.js"
import { importCss } from "../src/modules/cssLoader.js"
importCss("./index.css")
const container = document.getElementById("root")
const a = Gachi.createElement(
	"div",
	null,
	Gachi.createElement("h1", null, "this is jsx transpilation test"),
	Gachi.createElement("h1", null, "this is jsx transpilation test"),
	Gachi.createElement("h1", null, "this is jsx transpilation test")
)
console.log(a)

// const elem = Gachi.createElement(
// 	"div",
// 	null,
// 	Gachi.createElement("h1", { style: "display: flex;" }, "first title"),
// 	Gachi.createElement(
// 		"div",
// 		null,
// 		Gachi.createElement("h3", { style: "display: flex;" }, "third title"),
// 		"just div"
// 	),
// 	Gachi.createElement("div", { className: "header" }),
// 	"aboba"
// )

// console.log(elem)

Gachi.render(a, container)

// setTimeout(() => {
// 	const elem = Gachi.createElement(
// 		"div",
// 		null,
// 		Gachi.createElement("div", { className: "header" }),
// 		Gachi.createElement("h2", { style: "display: flex;" }, "first title"),
// 		Gachi.createElement(
// 			"div",
// 			null,
// 			Gachi.createElement(
// 				"h3",
// 				{ style: "display: flex;" },
// 				"third title"
// 			),
// 			"just div"
// 		),
// 		"aboba"
// 	)

// 	Gachi.render(elem, container)
// }, 3000)
