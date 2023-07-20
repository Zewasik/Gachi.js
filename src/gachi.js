import express from "express"

export const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.send("Hello, this is a simple Express server!")
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
