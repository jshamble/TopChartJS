'use strict';

var params =
{
	textSize : 1.5
};

window.onload = function () 
{
	request({url: "./json/config.json"})
    .then(data => {
        config = JSON.parse(data);
		loadChartData();
    })
    .catch(error => {
        console.log(error);
    });
	
	/*
	getFileOrDirectoryFromServer("./json/config.json", function(file_and_dir_names) 
		{
			if (typeof file_and_dir_names !== 'undefined') 
			{
				console.log("An error occured, file could not be read in function createDataArrays(). Please Email the Developer about this issue");
			}
			else 
			{
				config = file_and_dir_names;
				loadChartData();
			}
		}); */
}

/*
async function getFileOrDirectoryFromServer(url, doneCallback)
{
   var promiseObj = new Promise(function(resolve, reject)
   {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
         if (xhr.status === 200){
            console.log("xhr done successfully");
            var resp = xhr.responseText;
            var respJson = JSON.parse(resp);
            doneCallback(respJson);
         } else {
            reject(xhr.status);
            console.log("xhr failed");
         }
      } else {
         console.log("xhr processing going on");
      }
   }
   console.log("request sent succesfully");
   });
   return promiseObj;
   //resolve promise vs.
}*/

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

function getRandIntRange(min, max) 
		{
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
		}

var map_DATA_to_JSON = new Map();

var colors =  [
"#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
"#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
"#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
"#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
"#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
"#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
"#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
"#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
"#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
"#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
"#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
"#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
"#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
"#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
"#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
"#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
"#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
"#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
"#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
"#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
"#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
"#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
"#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
"#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
"#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
"#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
"#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"]

var chart_name = {};

var last_known_entry_name = "";

var config = {};

//append chart types here as nescessary
var chart_type = ["pie","bar horizontal","bar vertical"];
	

function loadChartData()
{
	//for each html node
	for(let k = 0; k < config["HTMLNodes"].length; k++)
	{
		//for each child in the html node
		//let i = 0;.
		
		for(let i = 0; i < config["HTMLNodes"][k]["children"].length; i++)
		{
			
			//1)<div class="boxContentContainer + 'i'"> </div>
			
			var childChartNode = document.createElement('div');
			childChartNode.id = "boxContentContainer" + i;
			var gridContainer = document.createElement('div');
			gridContainer.id = "gridContainer" + i;
			
			var chartContainer = document.createElement('svg');
			chartContainer.id = "chartContainer" + i;
			chartContainer.viewBox =  config["HTMLNodes"][k]["children"]["viewBox"];
			
			var pieChartDataColumn = document.createElement('div');
			pieChartDataColumn.id = "pChartDataColumn" + i;
			
			var chart_select = document.createElement('div');
			
			//https://stackoverflow.com/questions/6318385/javascript-dynamic-onchange-event
			chart_select.onchange ="onChartChange(this.id)";
			
			chart_select.id = 'chart_select'+i;
			chart_select.className = 'chart_button_select'+i;
			
			
			var URL = config["HTMLNodes"][k]["children"][i]["properties"]["data_url"];
					 
			var split_URL = URL.split('/');
					
			last_known_entry_name = split_URL[split_URL.length-1];
					
			gridContainer.appendChild(chartContainer);
			gridContainer.appendChild(pieChartDataColumn);
					
			childChartNode.appendChild(gridContainer);
			childChartNode.appendChild(chart_select);
			
			$('.chart_button_select'+i).empty();
			$.each(chart_type, function(z, p) {
				$('.chart_button_select'+i).append($('<option></option>').val(p).html(p));
			});
				
			if(document.getElementById(config["HTMLNodes"][k]["DOM_name"]) != null)
			{
				document.getElementById(config["HTMLNodes"][k]["DOM_name"]).appendChild(childChartNode);
			}
			else if(document.getElementsByClassName(config["HTMLNodes"][k]["DOM_name"])[0] != null)
			{
				for(var j = 0; j < document.getElementsByClassName.length; j++)
				{
					document.getElementsByClassName(config["HTMLNodes"][k]["DOM_name"])[j].appendChild(childChartNode);	
				}
			}
			
				request({url: URL})
				.then(data => {
						if(localStorage.getItem("chart_select"+i) != null)
						{
							chart_name[i] = localStorage.getItem("chart_select"+i);
						}
						else
						{
							chart_name[i] = "pie";
						}
						
						setChartChange('chart_select'+i);
								
						if(last_known_entry_name == "resolution")
						{
							map_DATA_to_JSON["resolution"] = JSON.parse(data);//JSON.parse(file_and_dir_names);
							//chartFactory("bar horizontal",map_DATA_to_JSON[entry_name],document.getElementById("chartContainer"+i) );
							//chartFactory("bar vertical",map_DATA_to_JSON[entry_name],document.getElementById("chartContainer"+i) );
							chartFactory(chart_name[i],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+i));
									
						}
					
					
				})
				.catch(error => {
					console.log(error);
				});
							
			/*getFileOrDirectoryFromServer(URL, function(file_and_dir_names) 
			{
				if (typeof file_and_dir_names !== 'undefined') 
				{
					console.log("An error occured, file could not be read in function createDataArrays(). Please Email the Developer about this issue");
				}
				else 
				{			
					if(localStorage.getItem("chart_select"+i) != null)
					{
						chart_name[i] = localStorage.getItem("chart_select"+i);
					}
					else
					{
						chart_name[i] = "pie";
					}
					
					setChartChange('chart_select'+i);
							
					if(last_known_entry_name == "resolution")
					{
						map_DATA_to_JSON["resolution"] = file_and_dir_names;//JSON.parse(file_and_dir_names);
						//chartFactory("bar horizontal",map_DATA_to_JSON[entry_name],document.getElementById("chartContainer"+i) );
						//chartFactory("bar vertical",map_DATA_to_JSON[entry_name],document.getElementById("chartContainer"+i) );
						chartFactory(chart_name[i],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+i) );
								
					}
				}
			});*/
		}
		
		
	}
	
}

function chartFactory(typeOfChart,data,DOMElement)
{
		 /* const sample = [
		  {
			language: 'Rust',
			value: 78.9,
			color: '#000000'
		  },
		  {
			language: 'Kotlin',
			value: 75.1,
			color: '#00a2ee'
		  },
		  {
			language: 'Python',
			value: 68.0,
			color: '#fbcb39'
		  },
		  {
			language: 'TypeScript',
			value: 67.0,
			color: '#007bc8'
		  },
		  {
			language: 'Go',
			value: 65.6,
			color: '#65cedb'
		  },
		  {
			language: 'Swift',
			value: 65.1,
			color: '#ff6e52'
		  },
		  {
			language: 'JavaScript',
			value: 61.9,
			color: '#f9de3f'
		  },
		  {
			language: 'C#',
			value: 60.4,
			color: '#5d2f8e'
		  },
		  {
			language: 'F#',
			value: 59.6,
			color: '#008fc9'
		  },
		  {
			language: 'Clojure',
			value: 59.6,
			color: '#507dca'
		  }
		];*/
	
	if(typeOfChart == 'bar vertical')
	{
		console.log(data);
		
		//alert(data['drilldowns'][0]['categories'][0]["field_name"]);
	
		//load sample data:
		
		 const sample = [];
		 
		 var groups = data['drilldowns'][0]['categories'][0]['groups'];
		 var max_range = 0;
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			 var data_object = {};
			 data_object.x_axis = groups[i].label;
			 data_object.value = groups[i].population;
			 data_object.color = colors[getRandIntRange(0,colors.length-1)];
			 //data_object.color = colors[i % colors.length -1];
			 max_range = Math.max(max_range,groups[i].population);
			 sample.push(data_object);
			 //checek if smaple data matches object
		 }
		
    const svg = d3.select('svg');
    const svgContainer = d3.select('#barChart');
    
    const margin = 120;
    const width = 700 - 2 * margin;
    const height = 500 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.x_axis))
      .padding(0.3)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, max_range]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

	  
	  //
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
		  .attr('transform', 'scale('+params.textSize+')');

    chart.append('g')
      .call(d3.axisLeft(yScale))
		  .attr('transform', 'scale('+params.textSize+')');

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )
		  .attr('transform', 'scale('+params.textSize+')')

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')

	//decorator design pattern
	  
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.x_axis))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .attr("fill", (g) => (g.color) )
		  .attr('transform', 'scale('+params.textSize+')')
      .on('mouseenter', function (actual, i) {
        
		//d3.selectAll('.value')
        //  .attr('opacity', 0)
		
		d3.selectAll('.value')
		.filter(function (d, x) { return i === x;})
        .attr("fill", (g) => ("#ED2939") )
		.transition()             // apply a transition
        .ease(d3.easeSin)           // control the speed of the transition
        .duration(200)           // apply it over 2000 milliseconds
      .attr('y', (a) => (yScale(a.value) - 20* params.textSize)  )

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.8)
          .attr('x', (a) => xScale(a.x_axis) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
		  .attr('transform', 'scale('+params.textSize+')')

		  
		  /*
        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.x_axis) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })*/

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
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
          .attr('x', (a) => xScale(a.x_axis))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      });

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => (xScale(a.x_axis) + xScale.bandwidth() / 2))
      .attr('y', (a) => yScale(a.value) - 10)
      .attr('text-anchor', 'middle')
      .text((a) => a.value)
	  .attr('transform', 'scale('+params.textSize+')');
      //.text((a) => `${a.value}%`)
    
    svg
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
	  

	  /*
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(data['drilldowns'][0]['categories'][0]["field_name"] + ' data')*/

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: RSCB PDB Archive, 2018')
	  
	
	
	}
	else if(typeOfChart == 'bar horizontal')
	{
		console.log(data);
		
		 const sample = [];
		 
		 var groups = data['drilldowns'][0]['categories'][0]['groups'];
		 var max_range = 0;
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			 var data_object = {};
			 data_object.x_axis = groups[i].label;
			 data_object.value = groups[i].population;
			 data_object.color = colors[getRandIntRange(0,colors.length-1)];
			 //data_object.color = colors[i % colors.length -1];
			 max_range = Math.max(max_range,groups[i].population);
			 sample.push(data_object);
			 //checek if smaple data matches object
		 }
		 
		 //subtract the max of the data set of each value to properly reverse the axis
		 for(var i = 0; i < groups.length; i++)
		 {
			 sample[i].value = max_range - sample[i].value;
		 }
		
    const svg = d3.select('svg');
    const svgContainer = d3.select('#barChart');
    
    const margin = 120;
    const width = 500 - 2 * margin;
    const height = 700 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

	  
	//todo: two of them.
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.x_axis))
      .padding(0.3)
    
    const yScale = d3.scaleLinear()
      .range([height,0])
      .domain([max_range,0]);
	  

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisTop()
      .scale(yScale)

	//data swap:  
	  
	  /*
    chart.append('g')
      .attr('transform', `rotate(0)`)
      .call(d3.axisLeft(yScale));

    chart.append('g')
      .attr('transform', `translate(0,-0)`)
      .call(d3.axisTop(xScale));
	  */
	  
	//data swap:

	//this changes the scale of the text size
	//make a parameter for this
	
    chart.append('g')
      .attr('transform', `translate(0,-0)`)
      .attr('transform', `scale(` + params.textSize + `)`)
      .call(d3.axisLeft(xScale));
	  

	chart.append('g')
      .attr('transform', `rotate(0)`)
      .attr('transform', `scale(` + params.textSize + `)`)
      .call(d3.axisTop(yScale));

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )
      .attr('transform', `scale(` + params.textSize + `)`)
	  
	  const x_val = (a) => height-yScale(a.value) + 305;
	  const y_val = (a) => xScale(a.x_axis) + xScale.bandwidth() / 2 + 5;

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')
      .attr('transform', `scale(` + params.textSize + `)`)
	  
	   barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('y', (a) => xScale(a.x_axis) + xScale.bandwidth() / 2 + 5)
      .attr('x', (a) => height-yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => max_range - a.value)
      // .attr('transform', 'translate(${x_val}, ${y_val})')
      //.text((a) => `${a.value}%`)
	  
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.x_axis))
      .attr('y', (g) => yScale(g.value) - height)
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .attr('transform', 'rotate(90)')
      .attr("fill", (g) => (g.color) )
	        .on('mouseenter', function (actual, i) {
        
		//select a specific one with the filter function:
		//https://stackoverflow.com/questions/28390754/get-one-element-from-d3js-selection-by-index
		d3.selectAll('.value')
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
          .attr('x', (a) => xScale(a.x_axis) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y-height)
          .attr('x2', width)
          .attr('y2', y-height) 
		  .attr('transform', 'scale('+params.textSize+')'+',rotate(90)')

		  /*
        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.x_axis) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })*/

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
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
          .attr('x', (a) => xScale(a.x_axis))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      });

	  

    
	
	//yScale
	
    svg
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

	  /*
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(data['drilldowns'][0]['categories'][0]["field_name"] + ' data')*/

	  
	

    svg.append('text')
      .attr('class', 'source') 
      .attr('text-anchor', 'start')
      .text('Source: RSCB PDB Archive, 2018')
	
	
	}
	else if(typeOfChart == 'pie')
	{
		

		
		 const sample = [];
		 
		 var groups = data['drilldowns'][0]['categories'][0]['groups'];
		 var max_range = 0;
		 
		 
		 var total_sum =0;
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			 total_sum += groups[i].population;
		 }
		 
		 
		 var data_object = {};
		 var data_object_small_group = {};
		 
		 var percentCutoff = 1.0;
		 
		 for(var i = 0; i < groups.length; i++)
		 {
			 if(percentCutoff < Math.round(100.0*groups[i].population/total_sum))
			 {
				 data_object = {};
				 data_object.label = groups[i].label;
				 data_object.value = groups[i].population;
				 data_object.color = colors[getRandIntRange(0,colors.length-1)];
				 
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
				 //checek if smaple data matches object
			}
			else //group small objects together, push into queue (group), then push one object later. 
			{
				if(data_object_small_group.label == null )
				{
				  data_object_small_group.label = "Less Than " + percentCutoff + "% " + groups[i].label;
				}
				else
				{
				  data_object_small_group.label += "," + groups[i].label;
				}
				
				
				if(data_object_small_group.value == null )
				{
				 data_object_small_group.value = groups[i].population;
				}
				else
				{
				 data_object_small_group.value += groups[i].population;
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
		 
		 		 
var pie = new d3pie(DOMElement, {
	"header": {
		"title": {
			"text": "Sample Data RCSB PDB",
			"fontSize": 0,
			"font": "Roboto"
		},
		"subtitle": {
			"text": "This is sample data from rcsb pdb",
			"color": "#999999",
			"fontSize": 0,
			"font": "Roboto"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"text": "Source: RCSB PDB",
		"color": "#999999",
		"fontSize": 0,
		"font": "Roboto",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 600,
		"canvasWidth": 600,
		"pieOuterRadius": "80%"
	},
	
	/*"data": {
		"content": [
			{
				"label": "Data 1",
				"value": 8,
				"color": "#7e3838"
			},
			{
				"label": "Data 2",
				"value": 5,
				"color": "#7e6538"
			},
			{
				"label": "Data 3",
				"value": 2,
				"color": "#7c7e38"
			},
			{
				"label": "Data 4",
				"value": 3,
				"color": "#587e38"
			}
		]
	},*/
	
	"data": 
	{
		//label, value, color
		"content": sample
	},
	
	"labels": {
		"outer": {
			"format": "label-percentage",
			"pieDistance": 0
		},
		"inner": {
			"format": "value",
			
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"font": "Roboto"
		},
		"percentage": {
			"color": "#111111",
			"font": "Roboto",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#FFFFFF",
			"font": "Roboto",
			"fontSize": 15,
		},
		"lines": {
			"enabled": true,
			"color": "#cccccc"
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		},
		"load": {
			"speed": 300
		}
		/*"load": {
			"effect": "none"
		}*/
	},
	"callbacks": {
		onMouseoverSegment: function(info) {
			//console.log("mouseover:", info);
			
			$(mouseHoverChartButton).html( info["data"]["label"] + " (" + info["data"]["percentage"] + "%)" );
			
			$('#mouseHoverChartButton').css({
				"background-color": info["data"]["color"],
				"opacity": "100"
			});
		},
		onMouseoutSegment: function(info) {
			//console.log("mouseout:", info);
						
			$('#mouseHoverChartButton').css({
				"opacity": "0"
			});
		}
	}
});
	}
}

$(document).bind('mousemove', function(e){
    $('#mouseHoverChartButton').css({
       left:  e.pageX + 20,
       top:   e.pageY
    });
});


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
	
	chartFactory(chart_name[id.slice(-1)],map_DATA_to_JSON[last_known_entry_name],document.getElementById("chartContainer"+ id.slice(-1)) );
}

function setChartChange(id)
{
	//chart_select0 
	document.getElementById(id).value = chart_name[id.slice(-1)];
	localStorage.setItem(id, chart_name[id.slice(-1)]);
}

