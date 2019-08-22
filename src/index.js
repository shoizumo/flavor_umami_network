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
  let isPC = !((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);
  console.log(isPC);


  /*
  // name: node name
  // network: network object is being manipulated
  // mouseAction: mouseAction which is event trigger
  */
  let nodeInfo = {'name': '', 'name1stLinked': '', 'network': '', 'mouseAction': ''};
  let networkMain, networkSub;

  /* Base Network */
  networkMain = new Network(flavorData, umamiData, isPC, '#graphMain', 'Flavor', 'Single', 'Main', nodeInfo);
  networkMain.render();


  //////////////////////////////////////////////////////////////////////////////////////////
  // Update
  /* update data */
  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.options.selectedIndex = 0;
  dataTypeSelector.onchange = function () {
    // reset color for PC/Mobile
    networkMain.mouseenterReset();

    const selectedType = this.options[this.selectedIndex].value;
    networkMain.update(selectedType);
    networkMain.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };


  /* update mode(PC only) */
  const vizModeSelector = document.getElementById('vizMode');
  // link from FG -> compare mode, default -> default mode
  if (location.href.slice(-1) !== '?'){
    vizModeSelector.options.selectedIndex = 0;
  } else{
    vizModeSelector.options.selectedIndex = 1;
    compareMode();
  }


  vizModeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;

    if (selectedType === 'Compare') {
      compareMode();
    }
    // 'Default'
    else {
      defaultMode();
    }
  };


  /* PC, Mobile setting*/
  if (!isPC) {
    vizModeSelector.style.display = 'none';
    document.getElementById('detailMobile').style.display = 'grid';

    // modal window
    document.getElementById('modalContent').style.maxWidth = '1000px';
    document.getElementById('modalContent').style.maxHeight = '1200px';
  }


  function compareMode() {
    const dataType = networkMain.dataType === 'Flavor' ? 'Umami' : 'Flavor';
    networkSub = new Network(flavorData, umamiData, isPC, '#graphSub', dataType, 'Multi', 'Sub', nodeInfo);
    networkSub.render();

    Update.multiMode(networkMain, networkSub, 500);
    Mouse.watchMouseAction(nodeInfo, 'mouseAction', networkMain, networkSub);


    document.getElementById('h2Main').textContent = networkMain.dataType;
    document.getElementById('h2Sub').textContent = networkSub.dataType;

    dataTypeSelector.style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    document.getElementById('h2Container').style.display = 'block';
  }

  function defaultMode() {
    Update.singleMode(networkMain, networkSub, 500);
    Connection.deleteDetail('detailMain1');
    Connection.deleteDetail('detailMain2');
    Connection.deleteDetail('detailSub1');
    Connection.deleteDetail('detailSub2');

    dataTypeSelector.style.display = 'inline';
    document.getElementById('h1').style.display = 'block';
    document.getElementById('h2Container').style.display = 'none';
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  // Modal
  const about = document.getElementById('about');
  const modal = document.getElementById('modal');
  const close = document.getElementById('modalClose');

  about.addEventListener('click', function () {
    modal.style.display = 'block';
    document.getElementById('modalContent').scrollTop = 0;
  });

  close.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

})();

