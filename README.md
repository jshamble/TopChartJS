# TopChartJS

General Charting Library for plotting statistical data.
Provides customizeable user configurations for enhanced usability in terms of user interaction and user experience.

[![License][license-badge]][license-badge-url] 
 
[license-badge]: https://img.shields.io/aur/license/yaourt.svg
[devDependencies-badge]: https://img.shields.io/david/dev/mrdoob/three.js.svg
[license-badge-url]: ./LICENSE
[![Dependencies][dependencies-badge]][dependencies-badge-url]

[dependencies-badge]: https://img.shields.io/david/mrdoob/three.js.svg
[dependencies-badge-url]: https://david-dm.org/mrdoob/three.js
[devDependencies-badge]: https://img.shields.io/david/dev/mrdoob/three.js.svg
[devDependencies-badge-url]: https://david-dm.org/mrdoob/three.js#info=devDependencies

## Demo

http://htmlpreview.github.io/?https://github.com/rcsb/TopChartJS/blob/master/index.html

## Usage

### Includes (See examples/basic to retrieve files)

-TopChartJS.css 
-jquery.min.js
-d3.min.js
-d3pie.min.js
-TopChartJS.js

Modify the configuration JSON file located in json/config.json with the target html id or class nodes in the DOM.
Then specify the parameters specifically for each target.

The config.json file will be populated with a sample subset of all of the features/parameters that you can modify.
The complete list of features per chart and their function will be listed in the features below.

See the demo html file in the exampels folder for an example template.

http://htmlpreview.github.io/?https://github.com/rcsb/TopChartJS/blob/master/index.html

## Example config.json

(Validated JSON file with https://jsonlint.com/ )

{ 
  "htmlNodes": 
  [ {
		"dom_node_name": "wholeChartContainer1",
		"children":
		[
			{
				"target":"pie_chart",
				"props": 
				[
					{
						"dom_type": "id",
						"color": "rand",
						"chart_type": "pie",
						"pie_target": "pieChartDataColumn",
						"viewbox":[750,500,0,0],
						"css":[{"font":"Roboto","font_color":"#FFFFFF"}],
						"filter":"*",
						"axis_labels":
						[
							{"position":[0,0],"css":[{"font":"Roboto","font_color":"#FFFFFF"}]}
						]
					}
				]
			},
			{
				"target":"horiz_bar_chart",
				"props": 
				[
					{
						"dom_type": "id",
						"color": "rand",
						"chart_type": "horizontal bar",
						"viewbox":[750,500,0,0],
						"css":[{"font":"Roboto","font_color":"#FFFFFF"}],
						"filter":"*",
						"axis_labels":
						[
							{"position":[0,0],"css":[{"font":"Roboto","font_color":"#FFFFFF"}]}
						]
					}
				]
			}
		]
   } ]
}

## Features

Customizeable user parameters for enhanced user experience.
There is an optional GUI to edit these parameters and update the JSON file on-the-fly.

#### dom_node_name
	This indicates the target html DOM node for the Chart to be attached to. 
	Supply either the class name or id.
	You can use flexbox and css to style the inner chart elements however you want (column, grid, row grid, etc... it's up to you)
	A javascript mpa stores all relevand parsed data from the config.json file. 
	Map[Html target node name] -> .children. The children will each be the "charts" associated with the html node.
#### css
	color: The Font color of the chart.
	font: The Font type, from google fonts.
#### chart_type
	Indicates what chart you want to display. THe follwoing types are available:
		-Pie
		-Horizontal Bar
		-Vertical Bar
#### pie_target
	id name of the <div></div> of the adjacent data to the pie chart
#### viewbox
	The dimensions of the viewbox of the svg element. 
	Search svg viewbox for more info on how this works.
#### search regex / filter data -> 
	Filter in / out which range of data to be rendered. [ inclusive_low, inclusive_high ( exlusive_low, exclusive_high )
#### axis label : css props [position, font color]
		

## Plans

Having d3 transforms like translations, scales, etc. paresable.
		
## Goals

Different Chart types:

### Pie

![alt text](https://github.com/rcsb/TopChartJS/blob/master/img/Pie.png)

### Bar (Horizontal)

![alt text](https://github.com/rcsb/TopChartJS/blob/master/img/Horizontal%20Bar.png)

### Bar (Vertical)

![alt text](https://github.com/rcsb/TopChartJS/blob/master/img/Vertical%20Bar.png)
