const path = require("path")

module.exports = {
	mode: "development",
	entry: "./src/examples/index.js", // Entry point of the application
	output: {
		filename: "main.js", // Output bundle file name
		path: path.resolve(__dirname, "./src/examples"), // Output directory path
	},
	module: {
		rules: [
			{
				test: /\.m?js$/, // Process .js and .mjs files
				exclude: /node_modules/, // Exclude node_modules folder from processing
				use: {
					loader: "babel-loader", // Use Babel to transpile JavaScript
					options: {
						presets: [],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{
									pragma: "Gachi.createElement",
									pragmaFrag: "Gachi.createTextElement",
								},
							],
						],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".mjs"], // Add support for resolving .js and .mjs extensions
		fallback: { path: false, assert: false, fs: false },
	},
}
