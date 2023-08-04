import Gachi, { useContext, useState } from "../core/framework"

export default function Button({ value = "default" }) {
	// const [c, setC] = useState(0)
	const { c, setC } = useContext("count")

	return (
		<div>
			<button onClick={() => setC(c + 1)} className="main-button">
				{value} {c}
			</button>
			<button onClick={() => setC(0)} className="main-button">
				Reset
			</button>
			{/* {c > 5 ? <Button /> : null} */}
		</div>
	)
}
