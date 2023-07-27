const path = require("path")

module.exports = {
	entry: "./src/examples/index.js", // Entry point of the application
	output: {
		path: path.resolve(__dirname, "dist"), // Output directory path
		filename: "bundle.js", // Output bundle file name
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/, // Exclude node_modules folder from processing
				use: {
					loader: "babel-loader", // Use Babel to transpile JavaScript
					options: {
						presets: ["@babel/preset-typescript"],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{
									pragma: "Gachi.createElement",
									pragmaFrag: "Gachi.Fragment",
								},
							],
						],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"], // Add support for resolving .js and .mjs extensions
	},
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3000,
	},
}
