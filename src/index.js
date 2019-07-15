import Network from './Network';

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';
import * as d3 from "d3";
import Mouse from "./Mouse";


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

    // const index = N.detectNodeIndex(obj.name);
    // if (obj.mouseAction === 'mouseover') {
    //    Mouse.mouseover(index, N.linkData, N.link, N.node, N.label)
    // }else if (obj.mouseAction === 'mouseout') {
    //   Mouse.mouseout(index, N.linkData, N.link, N.node, N.label);
    // }else if (obj.mouseAction === 'mouseout') {
    //   console.log('click', obj.name);
    // }

    const index = N.detectNodeIndex(obj.name);
    if (obj.mouseAction === 'mouseover') {
       Mouse.mouseover(index, N.linkData, N.link, N.node, N.label)
    } else if (obj.mouseAction === 'mouseout') {
      Mouse.mouseout(N.linkData, N.link, N.node, N.label);
    }

    // else if (obj.mouseAction === 'mouseout') {
    //   Mouse.mouseout(index, N.linkData, N.link, N.node, N.label);
    // }else if (obj.mouseAction === 'mouseout') {
    //   console.log('click', obj.name);
    // }

  }
  watchMouseAction(nodeInfo, 'mouseAction', onChange);


  document.addEventListener("dblclick", function(){
    networkMain.svg
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("width", 500)
      .attr("height", 325);

    networkMain.setVizMode('Multi');


    networkSub = new Network(flavorData, umamiData, isSp, '#graphSub2', 'Umami', 'Multi', 'Sub', nodeInfo);
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
    networkMain.update(selectedType);
    networkMain.setMouseAction();
    document.getElementById('h1').textContent = selectedType + ' Network';
  };


})();

