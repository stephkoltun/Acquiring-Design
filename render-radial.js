function makeNetwork() {

	/* ------ SET UP VARIABLES AND DATA FUNCTIONS ------ */

	var margin = {top: 30, right: 20, bottom: 30, left: 50},
    	width = $(window).width() - margin.left - margin.right - 210,
    	height = 1900 - margin.top - margin.bottom,
    	padding = allObjectsDataset.length * 1.35;

	// Parse the date
	var format = d3.time.format("%Y"),
		mindate = format.parse("1880"),
		maxdate = format.parse("2020");


	// Set up scale functions
	var x = d3.time.scale()
			.range([0, width]) // value -> display
			.domain([mindate, maxdate]);

	var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, allObjectsDataset.length]);


	// Radial variables






	// DATA SORTED BY YEAR ACQUIRED
	var sortedByAcquired = allObjectsDataset.sort(function(a, b) {
		return d3.ascending(a.yearAcquired, b.yearAcquired);
	});
	

	var collectionByDept = {
		name : "Departments", 
		children : [
			{name: "35347493",
			deptName: "Drawings, Prints, and Graphic Design",
			children: []
			},

			{name : "35347497",
			deptName: "Product Design and Decorative Arts", 
			children: [],
			},

			{name : "35347501",
			deptName: "Textiles", 
			children: [],
			},

			{name : "35347503",
			deptName: "Wallcoverings", 
			children: [],
			}
      	]
    };






	for (i=0; i<sortedByAcquired.length; i++) {
		var dataDept = sortedByAcquired[i].department;

		// find corresponding department
		for (var j=0; j<collectionByDept.children.length; j++) {
			var collectionDept = collectionByDept.children[j].name;

			if (dataDept == collectionDept) {
				// copy object into collection object
				collectionByDept.children[j].children.push(sortedByAcquired[i]);

				// stop looking through collectionByDept
				break;
			}
		}

	}

	console.log(collectionByDept);
	


	var diameter = 760,
	    radius = diameter / 2,
	    innerRadius = radius - 120;

	var svg = d3.select("#graph")
		.append("svg")
			.attr("width", diameter)
			.attr("height", diameter)
			.append("g")
    		.attr("transform", "translate(" + radius + "," + radius + ")");




	var cluster = d3.layout.cluster()
		.size([360, innerRadius]);


	var diagonal = d3.svg.diagonal.radial()
	.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });


	var nodes = cluster.nodes(collectionByDept);
	var links = cluster.links(nodes);



	var link = svg.selectAll("pathlink")
		.data(links)
		.enter()
		.append("path")
		.attr("class","link")
		.attr("d", diagonal);

	var node = svg.selectAll("g.node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

	node.append("circle")
		.attr("r", 2)
		.attr("fill", "#ccc");

	node.append("svg:text")
            .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
            .text(function(d) { return d.yearAcquired; });
        

} // end of makeNetwork function