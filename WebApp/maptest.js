
d3.json("GeoData/shenzhen.geojson").then((geoData) => {
  let svg = d3.select("body").append("svg").attr('id', 'myMap');
  var projection = d3.geoMercator().fitSize([1000, 500], geoData);
  console.log(geoData);

  let szMap = svg.selectAll("path")
                 .data(geoData.features)
                 .enter()
                 .append("path")
                 .attr('d', d3.geoPath(projection))
                 .attr('class', 'sz-broader')
                 .attr('stroke', 'pink')
                 .attr('fill', 'rgb(103, 95, 196)')
                 .attr('fill-opacity', 1).on('mouseover', function(d) {
                      console.log(d.properties);
                      d3.select('h1').text(d.properties.name );
                    });

 let drawName = svg.selectAll('.borderLabel')
               .data(geoData.features)
               .enter().append('text').each( function(d) {
                 d3.select(this)
                   .attr("transform", d => {
                   return "translate(" + d3.geoPath(projection).centroid(d)+ ")" ;
                 })
                 .attr("fill", "black")
                 .style("text-anchor", "end")
                 .text(function(d) { return d.properties.name });
               });

})
