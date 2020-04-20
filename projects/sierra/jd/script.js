overlap = 10;
svgHeight = 1000 * 2.2;
svgWidth = 1000 * 1.75;
plotYShift = -70;
margin = {top: 420, right: 50, bottom: 130, left: 50};

function createSVG(data) {
    const svg = d3.select("#plot")
        .attr("viewBox", [0, 0, svgWidth, svgHeight]);

    const serie = svg.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr(
            "transform", (d, i) => `translate(0,${plotYShift + y(i) + 1})`
        );

    serie.append("path")
        .attr("fill", "black")
        .attr("d", area);

    serie.append("path")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("d", line)
        .attr("stroke-width", 3)

    svg.append("g")
        .append("text")
        .text("SIERRA MARIE")
        .attr("transform", `translate(${svgWidth * 0.5 / 12}, 180)`)
        .attr("font-size", "350%")
        .attr("fill", "white")

    svg.append("g")
        .append("text")
        .text("KNOWN FEEDINGS")
        .attr(
            "transform", `translate(${svgWidth * .3 / 12}, ${svgHeight - 30})`
        )
        .attr("font-size", "280%")
        .attr("text-align" , "left")
        .attr("fill", "white")
    // svg.append("g")
    //     .call(xAxis);

    // w: 1.75, h: 2.5

}


function makeChart() {
    d3.text("../data/jd_feedings.csv").then(
        function (data) {
            console.log(" my data: ")
            data = d3.csvParseRows(data, d3.autoType);
            console.log(data);
            // may need to convert to floats here
            chartMain(data);
        }
    )
}

function chartMain(data) {


    x = d3.scaleLinear()
        .domain([0, data[0].length - 1])
        .range([margin.left, svgWidth - margin.right])

    y = d3.scalePoint()
        .domain(data.map((d, i) => i))
        .range([margin.top, svgHeight - margin.bottom])

    z = d3.scaleLinear()
        .domain([
            d3.min(data, d => d3.min(d)),
            d3.max(data, d => d3.max(d))
        ])
        .range([0, -overlap * y.step()])


    area = d3.area()
        .defined(d => !isNaN(d))
        .x((d, i) => x(i))
        .y0(0)
        .y1(z)

    line = area.lineY1()

    createSVG(data)
}