function dataLoaded(feedings) {
    // let minDuration, maxDuration = d3.extent(feedings, d => d.duration)

    writeText(feedings);
    feedingHistogram(feedings);

}

function writeText(feedings) {
    let nFeedings = feedings.length
    write('N Duration: ' + nFeedings, feedingTextContainer)

    let maxDuration = d3.max(feedings, d => d.duration)
    write('Max Duration: ' + maxDuration, feedingTextContainer)
    let minDuration = d3.min(feedings, d => d.duration)

    write('Min Duration: ' + minDuration, feedingTextContainer)

    let meanDuration = d3.mean(feedings, d => d.duration)
    write('Mean Duration: ' + meanDuration, feedingTextContainer)
}

function write(text, container) {
    container.append("div").text(text)
}

function feedingHistogram(feedings) {
    // from: https://www.d3-graph-gallery.com/graph/histogram_basic.html

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#histogramSvg")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var maxDuration = d3.max(feedings, d => d.duration)

    console.log(feedings);
    console.log(maxDuration);

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([0, maxDuration])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.duration; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(70)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(feedings);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);

    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

    svg.append("g")
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

}