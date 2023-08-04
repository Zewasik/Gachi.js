import Gachi, { useState } from "../core/framework"
// import Hooks from "../core/hooks"

export default function Button({ value = "default" }) {
	const [c, setC] = useState(0)

	return (
		<div>
			<button onClick={() => setC(c + 1)} className="main-button">
				{value} {c}
			</button>
			<button onClick={() => setC(0)} className="main-button">
				Reset
			</button>
			{c > 5 ? <Button /> : null}
		</div>
	)
}
