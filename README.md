# TopChartJS

General Charting Library for plotting statistical data.
Provides customizable user configurations for enhanced usability in terms of user interaction and user experience.

[![License][license-badge]][license-badge-url] 
 
[license-badge]: https://img.shields.io/aur/license/yaourt.svg
[devDependencies-badge]: https://img.shields.io/david/dev/mrdoob/three.js.svg
[license-badge-url]: ./LICENSE
[![Dependencies][dependencies-badge]][dependencies-badge-url]

[dependencies-badge]: https://img.shields.io/david/mrdoob/three.js.svg
[dependencies-badge-url]: https://david-dm.org/mrdoob/three.js
[devDependencies-badge]: https://img.shields.io/david/dev/mrdoob/three.js.svg
[devDependencies-badge-url]: https://david-dm.org/mrdoob/three.js#info=devDependencies

## Live Demo
 
http://htmlpreview.github.io/?https://github.com/jshamble/TopChartJS/blob/master/examples/basic/index.html

## Usage

### Includes (See examples/basic to retrieve files)

-TopChartJS.css 
-d3.min.js
-TopChartJS.js

Modify the configuration JSON file located in json/config_main.json with the target html id or class nodes in the DOM.
Then specify the parameters specifically for each target.

The config_main.json file will be populated with a sample subset of all of the features/parameters that you can modify.
The complete list of features per chart and their function will be listed in the features below.

See the demo html file in the examples folder for an example template.

http://htmlpreview.github.io/?https://github.com/jshamble/TopChartJS/blob/master/examples/basic/index.html



## Features

Customizable user parameters for enhanced user experience.
There is an optional GUI to edit these parameters and update the JSON file on-the-fly.



#### dom_node_name
	This indicates the target html DOM node for the Chart to be attached to. Supply either the class name or id, it will search for both.
	You can use flexbox and css to style the inner chart elements however you want (column, grid, row grid, etc... it's up to you)
	A javascript map stores all relevant parsed data from the config_main.json file. 
	Map[Html target node name] -> .children. The children will each be the "charts" associated with the html node.
#### chart_type
Indicates what chart you want to display. The following types are available:
		-Pie
		-Horizontal Bar
		-Vertical Bar
#### color_palette
	Returns a randomly selected value from a supplied color JSON array, 
	modify colors.json in the examples/json to add/remove a color array in hex format.
	colorblind-friendly color palettes taken from:
	https://www.zoomdata.com/docs/3/Topics/Reference/zoomdata-color-palettes.html
	
#### viewbox
	The dimensions of the viewbox of the svg element. 
	Read documentation for svg viewbox for more info on how this works.
#### css
	color: The Font color of the chart.
	font: The Font type of the chart, from google fonts.
	and other general css properties that you wish to apply to the chart.
#### search regex / filter data -> 
	Filter in / out which range of data to be rendered. [ inclusive_low, inclusive_high ( exclusive_low, exclusive_high )
#### axis_labels : (labels for your chart) css props [position, rotation, scale, font_type, font_color]
#### Inheritance (parent-child)
	Any Node can inherit from any parent above in the hierarchy, specified with the parent paramter.
	All properties of the parent will be passed down to the child, but they can be overidden...

## Gallery

Sampel Images of different chart types:

### Pie

![alt text](https://github.com/jshamble/TopChartJS/blob/master/examples/basic/img/Pie.png)

### Bar (Horizontal)

![alt text](https://github.com/jshamble/TopChartJS/blob/master/examples/basic/img/Horizontal%20Bar.png)

### Bar (Vertical)

![alt text](https://github.com/jshamble/TopChartJS/blob/master/examples/basic/img/Vertical%20Bar.png)

### Example JSON File:

{
  "q" : "*:*",
  "description" : "Search s_entry: *:*",
  "results" : [ null ],
  "drilldowns" : [ {
    "ref_url" : "/rcsbsearch/v1/search/s_entry?q=*:*",
    "categories" : [ {
      "core" : "s_entry",
      "display_name" : "X-ray Resolution",
      "field_name" : "resolution",
      "groups" : [ {
        "label" : "<0.5",
        "population" : 2,
        "filter" : "[* TO 0.5}"
      }, {
        "label" : "0.5 - 1",
        "population" : 641,
        "filter" : "[0.5 TO 1}"
      }, {
        "label" : "1 - 1.5",
        "population" : 11380,
        "filter" : "[1 TO 1.5}"
      }, {
        "label" : "1.5 - 2",
        "population" : 44867,
        "filter" : "[1.5 TO 2}"
      }, {
        "label" : "2 - 2.5",
        "population" : 42203,
        "filter" : "[2 TO 2.5}"
      }, {
        "label" : "2.5 - 3",
        "population" : 23302,
        "filter" : "[2.5 TO 3}"
      }, {
        "label" : "3 - 3.5",
        "population" : 7728,
        "filter" : "[3 TO 3.5}"
      }, {
        "label" : "3.5 - 4",
        "population" : 1716,
        "filter" : "[3.5 TO 4}"
      }, {
        "label" : "4 - 4.5",
        "population" : 450,
        "filter" : "[4 TO 4.5}"
      }, {
        "label" : "4.5 - 5",
        "population" : 120,
        "filter" : "[4.5 TO 5}"
      }, {
        "label" : "> 4.5",
        "population" : 275,
        "filter" : "[4.5 TO *}"
      } ]
    } ]
  } ]
}
