let formula = document.querySelector("#formula");
let evalButton = document.querySelector("#evalFormula");
let lengthOptions = document.querySelector("#lengthOptions");

let i = 16;

while(i <= 1024) {
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  lengthOptions.appendChild(opt);
  i = i << 1;
}

let formulaFunc = (n) => n;

const updateFormula = () => {
  let f = new Function('n', `return ${formula.value.trim()};`);
  formulaFunc = f;
  makeChart();
}


evalButton.addEventListener('click', updateFormula);
lengthOptions.addEventListener('change', updateFormula);

//setInterval(updateCounter, time_value);



// d3 code
let w = 800, h = 600;
let xScale;


function makeChart() {
  
  const length = lengthOptions.value;
  const initial = Array.from({length: length}, (v, i) => i);

  const dataset = initial.map(formulaFunc);
  const charts = d3.select("#graph");

  charts.selectAll("*").remove();

  let yMax = Math.ceil(d3.max(dataset));
  let yMin = Math.ceil(d3.min(dataset));
  console.log(yMax)
  let yScale = d3.scaleLinear()
                      .domain([yMin, yMax])
                      .range([h - 40, 20]);

  let xScale = d3.scaleLinear()
                      .domain([0, dataset.length])
                      .range([40, w - 40]);

  let xAxis = d3.axisBottom(xScale);

  let yAxis = d3.axisLeft(yScale);

  let chart = charts.append("svg")
              .attr('width', w)
              .attr('height', h);
      
  let line = d3.line()
                  .x((d,i) => xScale(i))
                  .y(d => yScale(d))
                .curve(d3.curveStepAfter);

  //Bind data and create one path per GeoJSON feature
  chart.append("path")
      .datum(dataset)
      .attr("d", line)
      .style('stroke', 'black')
      .style('stroke-width', '2px')
      .style('fill', 'none');

  //chart.selectAll("circle")
  //    .data(dataset)
  //    .enter()
  //    .append("circle")
  //    .attr('id', d => d)
  //    .attr('cx', (d,i) => xScale(i))
  //    .attr('cy', d => yScale(d))
  //    .attr('r', 3);

  chart.append('g')
       .call(xAxis)
       .attr('transform', `translate(0, ${h-40})`);

  chart.append('g')
       .call(yAxis)
       .attr('transform', `translate(40, 0)`);

  //chart.append('text')
  //    .classed('yaxis-label', true)
  //    .attr('y', 20)
  //    .attr('x', -h/2 + 20)
  //    .text('Value');

  //chart.append('line')
  //    .classed('vline', true)
  //    .classed('hidden', true)
  //    .attr('id', 'value-line')
  //    .attr('y1', 20)
  //    .attr('y2', h - 40);
}
 
makeChart();
