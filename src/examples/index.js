import Gachi from "../core/framework.ts"
import { importCss } from "../modules/cssLoader.js"
import Button from "./button.jsx"
importCss("./index.css")

const container = document.getElementById("root")

function App() {
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
		</div>
	)
}

Gachi.render(App(), container)
