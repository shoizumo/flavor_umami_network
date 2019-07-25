import * as d3 from "d3";

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';

import Network from './Network';
import Mouse from "./Mouse";
import Update from "./Update";
import Connection from "./Connection";


(() => {

  /* initial svg setting */
  d3.selectAll('.graph')
      .attr("width", 0)
      .attr("height", 0);

  /* mobile check */
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);
  console.log(isSp);

  /*
  // name: node name
  // network: network object is being manipulated
  // mouseAction: mouseAction which is event trigger
  */
  let nodeInfo = {'name': '', 'name2nd': '', 'network': '', 'mouseAction': ''};
  let networkMain, networkSub;

  /* Base Network */
  networkMain = new Network(flavorData, umamiData, isSp, '#graphMain', 'Flavor', 'Single', 'Main', nodeInfo);
  networkMain.render();


  //////////////////////////////////////////////////////////////////////////////////////////
  // Update
  /* update data */
  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;
    networkMain.update(selectedType);
    networkMain.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };

  /* update mode */
  const vizModeSelector = document.getElementById('vizMode');
  vizModeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;

    if (selectedType === 'Compare') {
      const dataType = networkMain.dataType === 'Flavor' ? 'Umami' : 'Flavor';
      networkSub = new Network(flavorData, umamiData, isSp, '#graphSub', dataType, 'Multi', 'Sub', nodeInfo);
      networkSub.render();

      Update.multiMode(networkMain, networkSub, 500);
      Mouse.watchMouseAction(nodeInfo, 'mouseAction', networkMain, networkSub);


      document.getElementById('h2Main').textContent = networkMain.dataType;
      document.getElementById('h2Sub').textContent = networkSub.dataType;

      dataTypeSelector.style.display = 'none';
      document.getElementById('h1').style.display = 'none';
      document.getElementById('h2Container').style.display = 'block';
    }
    // 'Default'
    else{
      Update.singleMode(networkMain, networkSub, 500);
      Connection.deleteDetail('detailMain1');
      Connection.deleteDetail('detailMain2');
      Connection.deleteDetail('detailSub1');
      Connection.deleteDetail('detailSub2');

      dataTypeSelector.style.display = 'inline';
      document.getElementById('h1').style.display = 'block';
      document.getElementById('h2Container').style.display = 'none';
    }

  };

})();

