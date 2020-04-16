function makeSlider(day) {
    var sliderStep = d3.sliderLeft()
        .min(0)
        .max(150)
        .width(300)
        .ticks(5)
        .step(1)
        .default(day)

    var gStep = d3.select('div#slider-step')
        .append('svg')
        .attr('width', 500)
        .attr('height', 200)
        .append('g')
        .attr('transform', 'translate(50,30)');

    gStep.call(sliderStep);
    return sliderStep
}

function parseData(feedings) {
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
    // var parseTime = d3.timeParse('%H:%M');
    feedings.map(function (d) {
        d.start = parseDate(d.start);
        d.end = parseDate(d.end);
        d.duration = +d.duration;
        d.days_old = +d.days_old;
        d.weeks_old = +d.weeks_old;
        // d.sunrise = parseDate(d.date + d.sunrise); // note makes year 1900
        // d.sunset = parseTime(d.sunset);
    })
    return feedings;
}

function chartMeta() {
    var margin = {top: 10, right: 10, bottom: 30, left: 10}
    var width = 600 - margin.left - margin.right
    var height = 200 - margin.top - margin.bottom

    chartContainer.select("#xAxis")
        .style("transform",
            `translate(${margin.left}px,${height - margin.bottom}px)`
        )

    // make svg responsive

    mainPlot.attr("viewBox", [0, 0, width, height])

    return {margin, width, height}

}

function showData(config, feedings, day) {

    let {margin, width, height} = config

    dayContainer.text('Day: ' + day);
    let todays_feedings = feedings.filter(d => d.days_old === day);
    // collect midnight on each side of the day for domain
    let midnightLeft = d3.timeDay.floor(todays_feedings[0]['start'])
    let midnightRight = d3.timeDay.ceil(todays_feedings[0]['start'])

    var xScale = d3.scaleTime()
        .domain([midnightLeft, midnightRight])
        .range([0, width]);

    let axisX = d3.axisBottom(xScale)
        // .ticks(d3.timeHour(), 4)
        // timeFormat("%I %p")
        .ticks(5)
    chartContainer.select("#xAxis").call(axisX)

    let join = body.selectAll("rect")
        .data(todays_feedings)

    let new_elements = join.enter()
        .append("rect")
        .attr("height", 60)
        .attr("y", .2)
        .attr("x", (d) => xScale(d.start))
        .attr("width", (d) => xScale(d.end) - xScale(d.start))
        .attr("fill", "#53534b")

    join.merge(new_elements)
        .transition()
        .attr("height", 60)
        .attr("y", .2)
        .attr("x", (d) => xScale(d.start))
        .attr("width", (d) => xScale(d.end) - xScale(d.start))
        .attr("fill", "#53534b")

    join.exit().remove()

}

    // var xAxis = d3.svg.axis()
    //     .scale(xScale)
    //     .ticks(d3.time.hours,24)
    //     //makes the xAxis ticks a little longer than the xMinorAxis ticks
    //     .tickSize(10)
    //     .orient("bottom");

    // var xMinorAxis = d3.svg.axis()
    //     .scale(xScale)
    //     .ticks(d3.time.hours,12)
    //     .orient("bottom");

    // var yAxis = d3.svg.axis()
    //     .scale(yScale)
    //     .orient("left");

    // var svg = d3.select("body").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //         .attr(
    //             "transform", "translate(" + margin.left + "," + margin.top + ")"
    //         );

    // //The format in the CSV, which d3 will read
    // var parseDate = d3.time.format("%Y-%m-%d %X");


    // take in a day from the user (slider)
    // filter data for this day and +/- 3 days around it
    // plot rects for each of the 7 days
    //   each day will get slightly different center, opacity, height
    // update text at top for which week we are talking about


