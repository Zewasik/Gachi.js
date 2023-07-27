import Gachi from "../core/framework"

export default function Button() {
	const [count, setCount] = Gachi.useState(0)
	const [count2, setCount2] = Gachi.useState(500)

	return (
		<div>
			<button
				onClick={() => {
					setCount(count + 1)
					setCount2(count2 + 500)
				}}
				className="main-button"
			>
				Suka blyat {count} {count2}
			</button>
			<button
				onClick={() => {
					setCount(0)
					setCount2(500)
				}}
				className="main-button"
			>
				Reset
			</button>
			{count > 10 ? <Button /> : <a></a>}
		</div>
	)
}
