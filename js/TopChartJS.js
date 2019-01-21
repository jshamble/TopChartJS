'use strict';
 
let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};


function wrap_text_vert(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/,+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.0, // ems
        y = text.attr("y"),
        dy = 1.0,//parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
	  
      //if (tspan.node().getComputedTextLength() > width) 
	  {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber *lineHeight  + dy + "em").text(word);
      }
    }
  });
}


function wrap_text_horiz(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/,+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 0.0, // ems
        y = text.attr("y"),
        dy = 1.0,//parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      //if (tspan.node().getComputedTextLength() > width) 
	  {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber *lineHeight  + dy + "em").text(word);
      }
    }
  });
}


function getRandIntRange(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var map_DATA_to_JSON = new Map(); 
var chart_name = {};
var last_known_entry_name = "";

//append chart types here as nescessary
var chart_type = ["pie","bar horizontal","bar vertical"];

function getParentNodeIndex(nodes,nodeName)
{
	for(let i = 0; i < nodes.length; i++)
	{
		if(nodeName == nodes[i])
		{
				return i;
		}
	}
	
	return 0;
}	

function loadChartData(config_main,config_color)
{
	//for each html node
	for(let k = 0; k < config_main["HTMLNodes"].length; k++)
	{
		//for each child in the html node
		//let i = 0;.
		
		let childChartNode = document.createElement('div');
		childChartNode.id = "boxContentContainer" + k;
		let gridContainer = document.createElement('div');
		gridContainer.id = "gridContainer" + k;
			
		//see Namespace URI's, must use for svgs https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#Valid%20Namespace%20URIs
		let chartContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		chartContainer.id = "chartContainer" + k;
						
		let pieChartDataColumn = document.createElement('div');
		pieChartDataColumn.id = "pChartDataColumn" + k;
			
			
		let chart_select = document.createElement('select');
		//1)<div class="boxContentContainer + 'i'"> </div>
			
		//https://stackoverflow.com/questions/6318385/javascript-dynamic-onchange-event
			 
		chart_select.id = 'chart_select'+k;
		chart_select.className = 'chart_button_select'+k;
		
		
			
		//for(let i = 0; i < config_main["HTMLNodes"][k]["children"].length; i++)
		{
			if( config_main["HTMLNodes"][k]["parent"] != null)
			{
				config_main["HTMLNodes"][k]["properties"] = config_main["HTMLNodes"][ getParentNodeIndex(config_main["HTMLNodes"],config_main["HTMLNodes"][k]["parent"]) ]["properties"];
			}
			
			chartContainer.setAttribute("viewBox", config_main["HTMLNodes"][k]["properties"]["viewBox"]);
			chartContainer.setAttribute("preserveAspectRatio", "xMidYMid meet");
			chartContainer.setAttribute("width",config_main["HTMLNodes"][k]["properties"]["width"]);
			chartContainer.setAttribute("height",config_main["HTMLNodes"][k]["properties"]["height"]);
			
			//if has a specified width..., use it, etlse jsut use half of the width (default paramters)
			if(config_main["HTMLNodes"][k]["properties"]["data-column-width"] != null)
			{
				pieChartDataColumn.style.width = config_main["HTMLNodes"][k]["properties"]["data-column-width"];
				pieChartDataColumn.style.height = config_main["HTMLNodes"][k]["properties"]["data-column-height"];
			}
			else
			{
				let extract_width = config_main["HTMLNodes"][k]["properties"]["width"].replace( /^\D+/g, ''); // replace all leading non-digits with nothing
				let extract_height = config_main["HTMLNodes"][k]["properties"]["height"].replace( /^\D+/g, ''); // replace all leading non-digits with nothing
				
				pieChartDataColumn.style.width = parseFloat(extract_width)*0.5 + "em";	
				pieChartDataColumn.style.height = parseFloat(extract_height) + "em";
			}
			var URL_JSON = config_main["HTMLNodes"][k]["properties"]["data_url"];
						 
			var split_URL = URL_JSON.split('/');
						
			last_known_entry_name = split_URL[split_URL.length-1];
						
			gridContainer.appendChild(chartContainer);
			gridContainer.appendChild(pieChartDataColumn);
						
			childChartNode.appendChild(gridContainer);
			childChartNode.appendChild(chart_select);
				
			if(document.getElementById(config_main["HTMLNodes"][k]["DOM_name"]) != null)
			{
				document.getElementById(config_main["HTMLNodes"][k]["DOM_name"]).appendChild(childChartNode);
			}
			if(document.getElementsByClassName(config_main["HTMLNodes"][k]["DOM_name"])[0] != null)
			{
				for(var j = 0; j < document.getElementsByClassName.length; j++)
				{
					document.getElementsByClassName(config_main["HTMLNodes"][k]["DOM_name"])[j].appendChild(childChartNode);	
				}
			}
				
			let viewBox_props = config_main["HTMLNodes"][k]["properties"]["viewBox"].split(" ");
				
			chart_select.addEventListener("change", function() 
			{
				chart_name[this.id.slice(-1)] = document.getElementById("chart_select"+this.id.slice(-1)).value;
				// Store
				localStorage.setItem("chart_select"+this.id.slice(-1), chart_name[this.id.slice(-1)]);
					
				//the + id.slice(-1) is the dynamcially generated "index" of the created chart, for interal use and bookkeeping only.
					
				while(document.getElementById("chartContainer" + this.id.slice(-1) ).children.length > 0)
				{ 
					document.getElementById("chartContainer" + this.id.slice(-1)).removeChild(document.getElementById("chartContainer" + this.id.slice(-1)).children[0]);           // Remove <ul>'s first child node (index 0)
				}
					
				while(document.getElementById("pChartDataColumn"+ this.id.slice(-1)).children.length > 0)
				{
					document.getElementById("pChartDataColumn"+ this.id.slice(-1)).removeChild(document.getElementById("pChartDataColumn"+ this.id.slice(-1)).children[0]);           // Remove <ul>'s first child node (index 0)
				}
					
				chartFactory(chart_name[this.id.slice(-1)],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+ this.id.slice(-1)), config_main["HTMLNodes"][k]["properties"] , config_color[ config_main["HTMLNodes"][k]["properties"]["color_palette"] ],viewBox_props);
			});
				
			//(document.getElementsByClassName('chart_button_select'+i)[0]).empty();
				
			
			while (document.getElementById('chart_select'+k) != null && document.getElementById('chart_select'+k).firstChild) {
				document.getElementById('chart_select'+k).removeChild(document.getElementById('chart_select'+k).firstChild);
			}
				 
			for (let x = 0; x < chart_type.length; x++) 
			{
			  // ... lots of various jQuery effects ...
				  
			  var chart_type_option = document.createElement('option');
				  
			  chart_type_option.setAttribute("value", chart_type[x]);
			  var chart_type_options_text = document.createTextNode(chart_type[x]);
			  chart_type_option.appendChild(chart_type_options_text);
				  
				 if(document.getElementById('chart_select'+k) != null )
			  document.getElementById('chart_select'+k).appendChild(chart_type_option);
				  
			}
								 
				request({url: URL_JSON})
				.then(data => 
				{
						if(localStorage.getItem("chart_select"+k) != null)
						{
							chart_name[k] = localStorage.getItem("chart_select"+k);
						}
						else
						{
							chart_name[k] = config_main["HTMLNodes"][k]["properties"]["chart_type"];
						}
							
						setChartChange('chart_select'+k);
						map_DATA_to_JSON[last_known_entry_name] = JSON.parse(data); 
						
						chartFactory(chart_name[k],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+k),config_main["HTMLNodes"][k]["properties"] ,config_color[ config_main["HTMLNodes"][k]["properties"]["color_palette"] ],viewBox_props);
							
				})
				.catch(error => {
					console.log(error);
				});		
				
		}
			
		
	}
	
}



d3.select(window).on('resize', () => {
  onResize()
}).dispatch('resize')

function onResize(){
  d3.selectAll('[fit]').each(function() {
    var ratio = d3.select(this).attr('ratio')
    var factor = (ratio) ? (ratio.split(' ')[1] / ratio.split(' ')[0]) : 1
    var computedW = parseInt(window.getComputedStyle(this).width.split('px')[0])
    var attrH = d3.select(this).attr('height')
    var calcH = (attrH) ? attrH : parseInt( computedW * factor )
    d3.select(this)
      .attr('viewBox', '0 0 ' + parseInt(computedW) + ' ' + parseInt(calcH))
      .call(vis.width(computedW).height(calcH))
  }) 
}

function chartFactory(typeOfChart,data,DOMElement,config_main,colors,viewBox_props)
{
	 
    const margin = 120;
    const offset = 60;
	
	let centroid_x = 0;
	let centroid_y = 0;
	
	const sample = [];
		 
		 var groups = data['drilldowns'][0]['categories'][0]['groups'];
		 let max_range = 0;
		 var total_sum = 0;
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			 total_sum += groups[i].population;
		 }
		 
		 let data_object = {};
		 let data_object_small_group = {};
		 
		 let percentCutoff = 1.0; 
		 
	/*
	
		 const sample = [];
		 
		 let groups = data['drilldowns'][0]['categories'][0]['groups'];
		 let max_range = 0;
		 
		 for(let i = 0; i < groups.length; i++)
		 {
			 let data_object = {};
			 data_object.x_axis = groups[i].label;
			 data_object.value = groups[i].population;
			 data_object.color = colors[getRandIntRange(0,colors.length-1)];
			 //data_object.color = colors[i % colors.length -1];
			 max_range = Math.max(max_range,groups[i].population);
			 sample.push(data_object);
			 //checek if sample data matches object
		 }
	
	
	*/
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			let percentage_or_the_pie = Math.round(100.0*groups[i].population/total_sum);
			 if(percentCutoff < percentage_or_the_pie)
			 {
				 data_object = {};
				 data_object.label = groups[i].label;
				 data_object.value = groups[i].population;
				 data_object.color = colors[getRandIntRange(0,colors.length-1)];
				 data_object.percentage = percentage_or_the_pie;
				 
				 var pieChartDataCol = document.createElement("p");
				 pieChartDataCol.id = "PieChart" + DOMElement.id.slice(-1);
				 pieChartDataCol.style.opacity = "100";
				 pieChartDataCol.style["background-color"] = data_object.color;
				 pieChartDataCol.innerHTML = data_object.label + " " + "(" + data_object.value + ")";
				 
				 //since the chart is a pie, add to the DOM element the piechart DATA: pieChartData
				 
				 document.getElementById("pChartDataColumn" + DOMElement.id.slice(-1)).append(pieChartDataCol);
				 
				 //data_object.color = colors[i % colors.length -1];
				 max_range = Math.max(max_range,groups[i].population);
				 sample.push(data_object);
				 data_object = {};
				 data_object.label = "";
				 data_object.value = "";
				 data_object.color = "";
				 data_object.percentage = 0;
				 //checek if smaple data matches object
			}
			else //group small objects together, push into queue (group), then push one object later. 
			{
				if(data_object_small_group.label == null )
				{
				  data_object_small_group.label = "Less Than " + percentCutoff + "% ," + groups[i].label;
				}
				else
				{
				  data_object_small_group.label += ", " + groups[i].label;
				}
				
				
				if(data_object_small_group.value == null )
				{
				 data_object_small_group.value = groups[i].population;
				}
				else
				{
				 data_object_small_group.value += groups[i].population;
				}
				
				if(data_object_small_group.percentage == null )
				{
					data_object_small_group.percentage = 0;
				}
				else
				{
					data_object_small_group.percentage += Math.floor(100.0*groups[i].population/total_sum);
				}
				
				 data_object_small_group.color = colors[getRandIntRange(0,colors.length-1)];
				 
				 //data_object.color = colors[i % colors.length -1];
			}
			 
		 }
		 
		 
		 
		 //alert(data_object_small_group.label);
		 
		 if(Object.keys(data_object_small_group).length !== 0)
		 {
				 var pieChartDataCol = document.createElement("p");
				 pieChartDataCol.id = "PieChart" + DOMElement.id.slice(-1);
				 pieChartDataCol.style.opacity = "100";
				 pieChartDataCol.style["background-color"] = data_object_small_group.color;
				 pieChartDataCol.innerHTML = data_object_small_group.label + " " + "(" + data_object_small_group.value + ")";
				 
				 //since the chart is a pie, add to the DOM element the piechart DATA: pieChartData
				 document.getElementById("pChartDataColumn" + DOMElement.id.slice(-1)).append(pieChartDataCol);
				 
				 sample.push(data_object_small_group);
		 }
		  
	
		
		const svg = d3.select('svg');
		const svgContainer = d3.select('#chartContainer'+DOMElement.id.slice(-1)   );
		
		let width = viewBox_props[2] - 2 * margin;
		let height = viewBox_props[3] - 2 * margin;

	if(typeOfChart == 'bar vertical')
	{ 
		const chart = svgContainer.append('g') .attr('transform', `translate(${offset}, ${offset})`);

		const xScale = d3.scaleBand()
		  .range([0, width])
		  .domain(sample.map((s) => s.label))
		  .padding(0.3)
		
		const yScale = d3.scaleLinear()
		  .range([height, 0])
		  .domain([0, max_range]);

		const makeYLines = () => d3.axisLeft()
		  .scale(yScale)
		  
		  //
		chart.append('g')
		  .call(d3.axisBottom(xScale))
			  .attr('transform', 'translate(0,'+height*config_main["font-scale"][0]+')'+'scale('+config_main["font-scale"][0]+')')
		.selectAll(".tick:last-of-type text") // last child selector.
		  .call(wrap_text_vert, width); // d3.scaleBand().rangeRound([width])

		chart.append('g')
		  .call(d3.axisLeft(yScale))
			  .attr('transform', 'scale('+config_main["font-scale"][0]+')'); 

		chart.append('g')
		  .attr('class', 'grid')
		  .call(makeYLines()
			.tickSize(-width, 0, 0)
			.tickFormat('')
		  )
			  .attr('transform', 'scale('+config_main["font-scale"][0]+')')

		const barGroups = chart.selectAll()
		  .data(sample)
		  .enter()
		  .append('g')

		//decorator design pattern
		  
		barGroups
		  .append('rect')
		  .attr('class', 'bar')
		  .attr('x', (g) => xScale(g.label))
		  .attr('y', (g) => yScale(g.value))
		  .attr('height', (g) => height - yScale(g.value))
		  .attr('width', xScale.bandwidth())
		  .attr("fill", (g) => (g.color) )
			  .attr('transform', 'scale('+config_main["font-scale"][0]+')')
		  .on('mouseenter', function (actual, i) { 
			
			chart.selectAll('.value')
			.filter(function (d, x) { return i === x;})
			.attr("fill", (g) => ("#ED2939") )
			.transition()             // apply a transition
			.ease(d3.easeSin)           // control the speed of the transition
			.duration(200)           // apply it over 2000 milliseconds
		  .attr('y', (a) => (yScale(a.value) - 20* config_main["font-scale"][0])  )

			d3.select(this)
			  .transition()
			  .duration(300)
			  .attr('opacity', 0.8)
			  .attr('x', (a) => xScale(a.label) - 5)
			  .attr('width', xScale.bandwidth() + 10)

			const y = yScale(actual.value)

			const line = chart.append('line')
			  .attr('id', 'limit')
			  .attr('x1', 0)
			  .attr('y1', y)
			  .attr('x2', width)
			  .attr('y2', y)
			  .attr('transform', 'scale('+config_main["font-scale"][0]+')')
	 
		  })
		  .on('mouseleave', function () {
			chart.selectAll('.value')
			  .attr('opacity', 1) 
			  .attr("fill", "#000000" )
			  .transition()             // apply a transition
			.ease(d3.easeSin)           // control the speed of the transition
			.duration(400)           // apply it over 2000 milliseconds
		  .attr('y', (a) => yScale(a.value) - 10)
			

			d3.select(this)
			  .transition()
			  .duration(300)
			  .attr('opacity', 1)
			  .attr('x', (a) => xScale(a.label))
			  .attr('width', xScale.bandwidth())

			chart.selectAll('#limit').remove()
			chart.selectAll('.divergence').remove()
		  });

		barGroups 
		  .append('text')
		  .attr('class', 'value')
		  .attr('x', (a) => (xScale(a.label) + xScale.bandwidth() / 2))
		  .attr('y', (a) => yScale(a.value) - 10)
		  .attr('text-anchor', 'middle')
		  .text((a) => a.value)
		  .attr('transform', 'scale('+config_main["font-scale"][0]+')');
		
		
	
	}
	else if(typeOfChart == 'bar horizontal')
	{ 
		const chart = svgContainer.append('g') .attr('transform', `translate(${offset}, ${offset})`);

		//todo: two of them.
		const xScale = d3.scaleBand()
		  .range([0, width])
		  .domain(sample.map((s) => s.label))
		  .padding(0.3)
		
		const yScale = d3.scaleLinear()
		  .range([0,height])
		  .domain([max_range,0]); 

		const makeYLines = () => d3.axisTop()
		  .scale(yScale)

		//data swap:   
		//this changes the scale of the text size
		//make a parameter for this
		
		chart.append('g')
		  .attr('transform', `translate(0,-0)`)
		  .attr('transform', `scale(` + config_main["font-scale"][0] + `)`)
		  .call(d3.axisLeft(xScale))
		.selectAll(".tick:last-of-type text") // last child selector.
		  .call(wrap_text_horiz, width);
		  

		chart.append('g')
		  .attr('transform', `rotate(0)`)
		  .attr('transform', `scale(` + config_main["font-scale"][0] + `)`)
		  .call(d3.axisTop(yScale));

		chart.append('g')
		  .attr('class', 'grid')
		  .call(makeYLines()
			.tickSize(-width, 0, 0)
			.tickFormat('')
		  )
		  .attr('transform', `scale(` + config_main["font-scale"][0] + `)`)
		  
		  const x_val = (a) => height-yScale(a.value) + 305;
		  const y_val = (a) => xScale(a.label) + xScale.bandwidth() / 2 + 5;

		const barGroups = chart.selectAll()
		  .data(sample)
		  .enter()
		  .append('g')
		  .attr('transform', `scale(` + config_main["font-scale"][0] + `)`)
		   barGroups 
		  .append('text')
		  .attr('class', 'value')
		  .attr('y', (a) => xScale(a.label) + xScale.bandwidth() / 2 + 5)
		  .attr('x', (a) => height-yScale(a.value) + 30)
		  .attr('text-anchor', 'middle')
		  .text((a) => a.value)
		  // .attr('transform', 'translate(${x_val}, ${y_val})')
		  //.text((a) => `${a.value}%`)
		  
		barGroups
		  .append('rect')
		  .attr('class', 'bar')
		  .attr('x', (g) => xScale(g.label))
		  .attr('y', (g) => yScale(g.value) - height)
		  .attr('height', (g) => height - yScale(g.value))
		  .attr('width', xScale.bandwidth() )
		  .attr('transform', 'rotate(90)')
		  .attr("fill", (g) => (g.color) )
				.on('mouseenter', function (actual, i) {
			
			//select a specific one with the filter function:
			//https://stackoverflow.com/questions/28390754/get-one-element-from-d3js-selection-by-index
			chart.selectAll('.value')
			.filter(function (d, x) { return i === x;})
			.attr("fill", (g) => ("#ED2939") )
			.transition()             // apply a transition
			.ease(d3.easeSin)           // control the speed of the transition
			.duration(200)           // apply it over 2000 milliseconds
			.attr('x', (a) => height-yScale(a.value) + 40)
			// .attr("transform", "translate(480,480)scale(23)rotate(180)")

			d3.select(this)
			  .transition()
			  .duration(300)
			  .attr('opacity', 0.9)
			  .attr('x', (a) => xScale(a.label) - 5)
			  .attr('width', xScale.bandwidth() + 10)

			const y = yScale(actual.value)

			const line = chart.append('line')
			  .attr('id', 'limit')
			  .attr('x1', 0)
			  .attr('y1', y-height)
			  .attr('x2', width)
			  .attr('y2', y-height) 
			  .attr('transform', 'scale('+config_main["font-scale"][0]+')'+',rotate(90)')

		  })
		  .on('mouseleave', function () {
			chart.selectAll('.value')
			  .attr('opacity', 1)
			  .attr("fill", "#000000" )
			  .transition()             // apply a transition
			.ease(d3.easeSin)           // control the speed of the transition
			.duration(400)           // apply it over 2000 milliseconds
			  .attr('x', (a) => height-yScale(a.value) + 30)
			

			d3.select(this)
			  .transition()
			  .duration(300)
			  .attr('opacity', 1)
			  .attr('x', (a) => xScale(a.label))
			  .attr('width', xScale.bandwidth())

			chart.selectAll('#limit').remove()
			chart.selectAll('.divergence').remove()
		  }); 
		
	
	}
	else if(typeOfChart == 'pie')
	{
		 width = viewBox_props[2];
		 height = viewBox_props[3];
		 
        const inner_radius = 0,
        outer_radius = Math.min(width, height) / 2;
        
		//const svgContainer = d3.select('#chartContainer'+DOMElement.id.slice(-1)   );
 
		let svgContainer = d3.select( '#chartContainer'+DOMElement.id.slice(-1)    ).append("svg:svg").data([sample]).attr("width", width).attr("height", height).append("svg:g").attr("transform", "translate(" + outer_radius + "," + outer_radius + ")");
		let pie = d3.pie().value(function(d){return d.value;});

		// declare an arc generator function
		let arc = d3.arc().outerRadius(outer_radius - 20).innerRadius(inner_radius);

		let arcOver = d3.arc()
						.innerRadius(inner_radius)
        				.outerRadius(outer_radius);
						
						
		// select paths, use arc generator to draw
		let arcs = svgContainer.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		
		let ease_time = 400;
		let ease_time_half = ease_time*0.5;
		

		arcs.append("svg:path")
			.attr("fill", function(d, i){
				return sample[i].color;
			})
			.attr("d", function (d) {
				//console.log(arc(d));
				return arc(d);
			})
			//arc borderr color:
			.style('stroke', config_main["css"][0]["font-color"])
			.on("mouseover", function(d, i) {
          
		            d3.select(this).transition()
			            .duration(ease_time_half)
			            .attr("d", arcOver)
								.ease(d3.easeSin);
						
					document.getElementById('mouseHoverChartButton').innerHTML = ( sample[i]["label"] + " (" + sample[i]["percentage"] + "%)" );
					document.getElementById('mouseHoverChartButton').style.backgroundColor = sample[i]["color"];
					document.getElementById('mouseHoverChartButton').style.opacity = "100";
					
						   
      })
      .on("mouseout", function(d) 
	  {
		  //gets boudning box of the parent, check radius, and only ease out if outside of radius.
		  
		  
		  //fix bounding box radius.
		  
							d3.select(this).transition()
								.duration(ease_time)
								.attr("d", arc)
								.ease(d3.easeSin);
					
			  document.getElementById('mouseHoverChartButton').style.opacity = "0";
			  
			
      }); 
	  
		// add the text
		
		arcs.append("svg:text").attr("fill", (g) => (config_main["css"][0]["font-color"]) )
		.style("font-family", config_main["css"][0]["font-family"])
		.attr("transform", function(d)
		    {
					d.innerRadius = inner_radius;
					d.outerRadius = outer_radius;
					let centroid = arc.centroid(d);
					let radius_offset = config_main["radius-offset"][0];
					centroid_x = centroid[0]*radius_offset;
					centroid_y = centroid[1]*radius_offset;
					
			return "translate(" + centroid[0]*radius_offset + "," + centroid[1]*radius_offset + ")" + 'scale('+config_main["font-scale"][0]+')' ;}).attr("text-anchor", "middle").text( function(d, i) 
			{
				return sample[i].value;
			}
				).on("mouseover", function(d, i) {
          
					//if(document.getElementById('mouseHoverChartButton').style.opacity == "0")
					{
						document.getElementById('mouseHoverChartButton').innerHTML = ( sample[i]["label"] + " (" + sample[i]["percentage"] + "%)" );
						document.getElementById('mouseHoverChartButton').style.backgroundColor = sample[i]["color"];
						document.getElementById('mouseHoverChartButton').style.opacity = "100";
						
						d3.select(this.parentNode).selectAll("*").transition()
							.duration(ease_time_half)
							.attr("d", arcOver)
								.ease(d3.easeSin);
					}
						   
      })
      .on("mouseout", function(d) 
	  {
						d3.select(this.parentNode).selectAll("*").transition()
							.duration(ease_time)
							.attr("d", arc)
								.ease(d3.easeSin);
			  document.getElementById('mouseHoverChartButton').style.opacity = "0";
			  
			  
      });
	  
			}
	
	
	//loop here to append the axes labels and their proprties
	
	for(let z = 0; z < Object.keys(config_main["axis_labels"]).length; z++)
	{
		let axis_label = svgContainer.selectAll('g').selectAll('*').append('text');
		
		Object.keys(config_main["axis_labels"][z]).forEach(function(key)
		{ 
			if(key != "text")
			{
				if(key == 'x')
				{
					axis_label.attr(key, centroid_y - parseFloat(config_main["axis_labels"][z][key]));
					//axis_label.attr(key, -(height / parseFloat(config_main["axis_labels"][z][key] ) - margin));
				}
				else if(key == 'y')
				{
					
					axis_label.attr(key, centroid_y - parseFloat(config_main["axis_labels"][z][key]));
					//axis_label.attr(key, margin / parseFloat(config_main["axis_labels"][z][key] ));
				}
				else
				{
					axis_label.attr(key,config_main["axis_labels"][z][key]);
				}
			}
		});
			
		//potential attributes...
		//axis_label.attr('class','label');
		//axis_label.attr('x', -(height / 2   - margin);
		//axis_label.attr('y', margin / 2.4);
		//axis_label.attr('transform', 'rotate(-90)');
		//axis_label.attr('text-anchor', 'middle');
		
		axis_label.text( config_main["axis_labels"][z]['text'] );
		z++;
	}
		
		/*svg
		  .append('text')
		  .attr('class', 'label')
		  .attr('x', -(height / 2) - margin)
		  .attr('y', margin / 2.4)
		  .attr('transform', 'rotate(-90)')
		  .attr('text-anchor', 'middle')
		  .text('(%)')

		svg.append('text')
		  .attr('class', 'label')
		  .attr('x', width / 2 + margin)
		  .attr('y', height + margin * 1.7)
		  .attr('text-anchor', 'middle')
		  .text(data['drilldowns'][0]['categories'][0]["field_name"] + ' data')
		  
		svg.append('text')
		  .attr('class', 'source')
		  .attr('x', width - margin / 2)
		  .attr('y', height + margin * 1.7)
		  .attr('text-anchor', 'start')
		  .text('Source: RSCB PDB Archive, 2018')*/
		  
		
	
	}
		
		
document.addEventListener("mousemove", mouse_chart_data_widget);
//$(document).bind('mousemove', function(e){
function mouse_chart_data_widget(e)
{
	document.getElementById('mouseHoverChartButton').style.left = e.pageX + 20 + 'px';
	document.getElementById('mouseHoverChartButton').style.top = e.pageY + 'px';
		
    /*$('#mouseHoverChartButton').css({
       left:  e.pageX + 20,
       top:   e.pageY
    });*/
}//);


function onChartChange(id)
{
	chart_name[id.slice(-1)] = document.getElementById("chart_select"+id.slice(-1)).value;
	// Store
	localStorage.setItem("chart_select"+id.slice(-1), chart_name[id.slice(-1)]);
	
	//the + id.slice(-1) is the dynamcially generated "index" of the created chart, for interal use and bookkeeping only.
	 
	while(document.getElementById("chartContainer" + id.slice(-1) ).children.length > 0)
	{ 
		document.getElementById("chartContainer" + id.slice(-1)).removeChild(document.getElementById("chartContainer" + id.slice(-1)).children[0]);           // Remove <ul>'s first child node (index 0)
	}
	
	while(document.getElementById("pChartDataColumn"+ id.slice(-1)).children.length > 0)
	{
		document.getElementById("pChartDataColumn"+ id.slice(-1)).removeChild(document.getElementById("pChartDataColumn"+ id.slice(-1)).children[0]);           // Remove <ul>'s first child node (index 0)
	}
	
	chartFactory(chart_name[id.slice(-1)],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+id.slice(-1)),config_main["HTMLNodes"][id.slice(-1)]["properties"] ,config_color[ config_main["HTMLNodes"][id.slice(-1)]["properties"]["color_palette"] ],config_main["HTMLNodes"][id.slice(-1)]["properties"]["viewBox"].split(" "));
}

function setChartChange(id)
{
	//chart_select0 
	if(document.getElementById(id) != null)
	{
		document.getElementById(id).value = chart_name[id.slice(-1)];
		localStorage.setItem(id, chart_name[id.slice(-1)]);
	}
}

document.addEventListener('DOMContentLoaded', function(e)
//window.onload = function () 
{
	request({url: "./json/config_color.json"})
    .then(data_color => {
		
		request({url: "./json/config_main.json"})
		.then(data => {
			loadChartData(JSON.parse(data), JSON.parse(data_color) );
		})
		.catch(error => {
			console.log(error);
		});
    })
    .catch(error => {
        console.log(error);
    });
});

function loadPageContent()
{
	request({url: "./json/config_color.json"})
    .then(data_color => {
		
		request({url: "./json/config_main.json"})
		.then(data => {
			loadChartData(JSON.parse(data), JSON.parse(data_color) );
		})
		.catch(error => {
			console.log(error);
		});
    })
    .catch(error => {
        console.log(error);
    });
};

/*Copyright © Jonathan Shamblen 2019, AGPL v3 License
  All rights reserved.
*/