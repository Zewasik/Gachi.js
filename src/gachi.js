import { app } from "./core/dungeonServer.mjs"
import { assManager } from "./core/assManager.mjs"

const ass = new assManager()

//example for string
const [getStronker, setStronker] = ass.useAss("i am stronk")
console.log(getStronker())
setStronker("i am getting stronker")
console.log(getStronker())

//example for number
const [getNumber, setNumber] = ass.useAss(1)
console.log(getNumber())
setNumber(500)
console.log(getNumber())
