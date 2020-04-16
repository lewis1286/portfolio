overlap = 16;
height = 1000;
width = 1000;

function createSVG(data) {
    const svg = d3.select("#plot")
        .attr("viewBox", [0, 0, width, height]);

    const serie = svg.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", (d, i) => `translate(0,${y(i) + 1})`);

    serie.append("path")
        .attr("fill", "#fff")
        .attr("d", area);

    serie.append("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("d", line);

    svg.append("g")
        .append("text")
        .text("Sierra Marie")
        .attr("transform", `translate(${width * 3 / 12}, 80)`)
        .attr("font-size", "150%")

    svg.append("g")
        .append("text")
        .text("Known Feedings")
        .attr("transform", `translate(${width * 2 / 12}, ${height - 50})`)
        .attr("font-size", "150%")
    // svg.append("g")
    //     .call(xAxis);

    // return svg.node();

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

    margin = {top: 250, right: 50, bottom: 130, left: 50}

    x = d3.scaleLinear()
        .domain([0, data[0].length - 1])
        .range([margin.left, width - margin.right])

    y = d3.scalePoint()
        .domain(data.map((d, i) => i))
        .range([margin.top, height - margin.bottom])

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