const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: "./src/examples/index.js", // Entry point of the application
	output: {
		path: path.resolve(__dirname, "dist"), // Output directory path
		filename: "bundle.js", // Output bundle file name
		publicPath: "/",
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
		static: path.join(__dirname, "./src/examples"),
		historyApiFallback: true,
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/examples/index.html"), // Path to your HTML template
			filename: "index.html", // Output HTML file name
		}),
	],
}
