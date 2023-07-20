import Gachi from "/src/core/index.js"
import { importCss } from "/src/modules/cssLoader.js"

importCss("./index.css")

const container = document.getElementById("root")

// const elem = Gachi.createElement(
// 	"div",
// 	null,
// 	Gachi.createElement("h1", { style: "display: flex;" }, "first title"),
// 	Gachi.createElement(
// 		"h2",
// 		{
// 			onClick: () => {
// 				setA(a + 1)
// 			},
// 		},
// 		"second title"
// 	),
// 	Gachi.createElement("div", { className: "header" }),
// 	"aboba"
// )

const elem = (
	<div>
		<h1 style="display: flex">first title</h1>
		<h2>second title</h2>
		<div className="header"></div>
		aboba
	</div>
)

Gachi.render(elem, container)
