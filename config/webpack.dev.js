const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')

module.exports = {
	entry: {
		
		main: ['babel-polyfill','./src/client/js/main.js']
	},
	mode: "development",
	output: {
		filename: "[name]-bundle.js",
		path: path.resolve(__dirname,"../dist")
	},
	devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
	},
	devtool: "source-map",
	module: {
		rules: [
			// Babel loader compiles ES2015 into ES5 for
			// complete cross-browser support
			{
			  loader: 'babel-loader',
			  test: /\.js$/,
			  // only include files present in the `src` subdirectory
			  include: [path.resolve(__dirname, "src")],
			  // exclude node_modules, equivalent to the above line
			  exclude: /node_modules/,
			  query: {
				// Use the default ES2015 preset
				// to include all ES2015 features
				presets: ['es2015'],
				plugins: ['transform-runtime']
			  }
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{ 
				test: /\.(jpg|gif|png)$/,
				use: [{
					loader: 'file-loader',
					options: { name: 'images/[name].[ext]' },
				}]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), 
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'index.html',
				template: './src/client/html/grid.html',
			})
	]
}
