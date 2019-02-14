
require("babel-runtime/regenerator")
require("webpack-hot-middleware/client?reload=true")
require("./TopChart.js")
require("../html/grid.html") /// need to inlcude this for hot reloading
//debugger - use in conjunction with source map in order to debug the correct line 