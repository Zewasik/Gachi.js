import Gachi from "/src/core/index.js";
// import "./index.css";

const container = document.getElementById("root");

const elem = Gachi.createElement(
  "div",
  null,
  Gachi.createElement("h1", null, "first title"),
  Gachi.createElement("h2", null, "second title")
);
console.log(elem);

Gachi.render(elem, container);
