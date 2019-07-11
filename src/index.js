import Network from './Network';

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';
import * as d3 from "d3";


(() => {

  // initial svg setting
  d3.select('.graph')
      .attr("width", 0)
      .attr("height", 0);

  // mobile check
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);
  console.log(isSp);


  // Base graph
  const network = new Network(flavorData, umamiData, isSp, '#graphMain', 'Flavor', 'Main');
  network.setLegend();
  network.render();
  network.setMouseAction();


  // const networkSub = new Network(flavorData, umamiData, isSp, '#graphSub2', 'Umami', 'Sub');
  // networkSub.setLegend();
  // networkSub.render();
  // networkSub.setMouseAction();


  document.addEventListener("dblclick", function(){
    network.svg
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("width", 500)
      .attr("height", 325);


    const networkSub = new Network(flavorData, umamiData, isSp, '#graphSub2', 'Umami', 'Sub');
    networkSub.setLegend();
    networkSub.render();
    networkSub.setMouseAction();

    networkSub.svg
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("width", 500)
        .attr("height", 325);

  }, false);



  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;
    network.update(selectedType);
    network.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };


})();

