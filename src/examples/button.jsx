import Gachi from "../core/framework"
import { useState } from "../core/hooks"

export default function Button({ value = "default" }) {
	const [c, setC] = Gachi.useState(0)

	return (
		<>
			<button onClick={() => setC(c + 1)} className="main-button">
				{value} {c}
			</button>
			<button onClick={() => setC(0)} className="main-button">
				Reset
			</button>
			{c > 5 ? <Button /> : null}
		</>
	)
}
