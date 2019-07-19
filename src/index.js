import * as d3 from "d3";

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';

import Network from './Network';
import Mouse from "./Mouse";
import Connection from "./Connection";


(() => {

  // initial svg setting
  d3.selectAll('.graph')
      .attr("width", 0)
      .attr("height", 0);

  // mobile check
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);
  console.log(isSp);

  // name: node name
  // network: network object is being manipulated
  // network: mouseAction which is event trigger
  let nodeInfo = {'name': '', 'network': '', 'mouseAction': ''};


  let networkMain, networkSub;

  // Base graph
  networkMain = new Network(flavorData, umamiData, isSp, '#graphMain', 'Flavor', 'Single', 'Main', nodeInfo);
  networkMain.setLegend();
  networkMain.render();
  networkMain.setMouseAction();


  function watchMouseAction(obj, propName, func) {
    let value = obj[propName];
    Object.defineProperty(obj, propName, {
      get: () => value,
      set: newValue => {
        const oldValue = value;
        value = newValue;
        func(oldValue, obj);
      },
      configurable: true
    });
  }

  watchMouseAction(nodeInfo, 'mouseAction', onChange);
  function onChange(oldVal, obj) {
    if (networkMain.vizMode === 'Single') return;
    let N;
    if(obj.network === 'Main'){
      N = networkSub;
    }else{
      N = networkMain;
    }

    if (obj.mouseAction === 'mouseenter') {
      Mouse.reset(N.linkData, N.link, N.node, N.label);
      Mouse.cursor(N.vizMode === 'Single' ?'grab' : 'pointer', N.body, N.node);
      return;
    }

    const index = N.detectNodeIndex(obj.name);
    if (obj.mouseAction === 'mouseover') {
      Mouse.mouseover(index, N.linkData, N.link, N.node, N.label);

      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      console.log(M);
      console.log(S);

      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub');


    } else if (obj.mouseAction === 'mouseout') {
      Mouse.mouseout(N.linkData, N.link, N.node, N.label);
    }
  }


  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 78) {// N
      networkMain.svg
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("width", networkMain.width / 2 - 1)
          .attr("height", networkMain.height / 2 - 1);

      networkMain.setVizMode('Multi');


      const dataType = networkMain.dataType === 'Flavor' ? 'Umami' : 'Flavor';
      networkSub = new Network(flavorData, umamiData, isSp, '#graphSub', dataType, 'Multi', 'Sub', nodeInfo);
      networkSub.setLegend();
      networkSub.render();
      networkSub.setMouseAction();

      networkSub.svg
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("width", networkMain.width / 2 - 1)
          .attr("height", networkMain.height / 2 - 1);


      document.getElementById("visGrid").style.display = 'grid';
      setTimeout(() => {
        document.getElementById("detailMain").style.display = 'block';
        document.getElementById("detailSub").style.display = 'block';
      }, 500);
    }

    if (event.keyCode === 68) {
      networkMain.svg
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("width", networkMain.width)
          .attr("height", networkMain.height);

      networkSub.svg
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("width", 0)
          .attr("height", 0);

      setTimeout(() => {
        networkSub.deleteContents();
        networkSub.svg.attr("style", "outline: 0px;");
        document.getElementById("detailMain").style.display = 'none';
        document.getElementById("detailSub").style.display = 'none';
      }, 500);

    }

  }, false);




  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    const selectedType = this.options[this.selectedIndex].value;
    networkMain.update(selectedType);
    networkMain.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };


})();

