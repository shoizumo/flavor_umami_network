import Network from './Network';

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';


(() => {

  // mobile check
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);
  console.log(isSp);


  const network = new Network(flavorData, umamiData, isSp);

  network.setLegend();
  network.setLink();
  network.setNode();
  network.setLabel();
  network.setSimulation();

  network.setMouseAction();

  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;
    network.update(selectedType);
    network.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };

})();

