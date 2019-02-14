//production server environment


const dotenv = require("dotenv")
dotenv.config();

var express = require("express")
var path = require("path")
const server = express()
const webpack = require("webpack")

//have to set this when using production for obfuscation to work correctly...

if(process.env.NODE_ENV === 'production')
{
	config = require("../../config/webpack.prod.js")
}
else
{
	config = require("../../config/webpack.dev.js")
}

const compiler = webpack(config)

const webpackDevMiddleware =
require("webpack-dev-middleware")(
	compiler,
	config.devServer
)

server.use(webpackDevMiddleware)

const webpackHotMiddleware =
require("webpack-hot-middleware")(
	compiler
)

server.use(webpackHotMiddleware)

const staticMiddleware = express.static("./src/client")

server.use(staticMiddleware)

server.listen(8080, () => {} )