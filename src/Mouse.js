import * as d3 from 'd3';
import Connection from "./Connection";

export default class Mouse {

  static fadeClickable(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    // at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");

    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        selectLine.setAttribute('class', 'lineColor');
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor");
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColor");
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  }


  static fadeNoClick(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    // make node non-drag
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeNonDrag");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");

    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        selectLine.setAttribute('class', 'lineColor');
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor");
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColor");
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  }


  static noFadeNoClick(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        selectLine.setAttribute('class', 'lineColor');
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor");
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColor");
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  }


  // static mouseup(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
  //    Mouse.reset(linkData, linkLine, nodeCircle, nodeText);
  //    Mouse.fadeClickable(nodeIndex, linkData, linkLine, nodeCircle, nodeText);
  // }


  static reset(linkData, linkLine, nodeCircle, nodeText) {
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeReturnFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineReturnFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextReturnFade");
  }


  static cursor(type, body, circle) {
    let grabTypeCircle;
    let grabTypeBody;
    if (type === 'grabbing') {
      grabTypeCircle = "grabbing";
      grabTypeBody = "grabbing";
    } else if (type === 'grab') {
      grabTypeCircle = "grab";
      grabTypeBody = "auto";
    }else if (type === 'pointer') {
      grabTypeCircle = "pointer";
      grabTypeBody = "auto";
    }

    //grabbing
    circle.style("cursor", "-webkit-" + grabTypeCircle);
    circle.style("cursor", "-moz-" + grabTypeCircle);
    circle.style("cursor", grabTypeCircle);

    body.style("cursor", "-webkit-" + grabTypeBody);
    body.style("cursor", "-moz-" + grabTypeBody);
    body.style("cursor", grabTypeBody);
  }


  static watchMouseAction(obj, propName, networkMain, networkSub) {
    let value = obj[propName];
    Object.defineProperty(obj, propName, {
      get: () => value,
      set: newValue => {
        const oldValue = value;
        value = newValue;
        Mouse.onChange(oldValue, obj, networkMain, networkSub);
      },
      configurable: true
    });
  }

  static onChange(oldVal, obj, networkMain, networkSub) {
    if (networkMain.vizMode === 'Single') return;
    // console.log(oldVal, obj);
    let anotherNetwork;
    if(obj.network === 'Main'){
      anotherNetwork = networkSub;
    }else{
      anotherNetwork = networkMain;
    }
    // console.log(anotherNetwork.vizMode,
    //     anotherNetwork.dataType === 'Flavor' ? 'U' : 'F', obj.mouseAction);

    if (obj.mouseAction === 'mouseenter') {
      Mouse.reset(anotherNetwork.linkData, anotherNetwork.link, anotherNetwork.node, anotherNetwork.label);
      Mouse.cursor(anotherNetwork.vizMode === 'Single' ?'grab' : 'pointer', anotherNetwork.body, anotherNetwork.node);
      return;
    }

    const index = anotherNetwork.detectNodeIndex(obj.name);
    if (obj.mouseAction === 'mouseover') {
      Mouse.fadeClickable(index, anotherNetwork.linkData, anotherNetwork.link, anotherNetwork.node, anotherNetwork.label);

      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);

      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub');


    }

    else if (obj.mouseAction === 'mouseout') {
      Mouse.reset(anotherNetwork.linkData, anotherNetwork.link, anotherNetwork.node, anotherNetwork.label);
    }

    else if (obj.mouseAction === 'click') {
      anotherNetwork.clickedNodeIndex = networkSub.detectNodeIndex(obj.name);
    }
  }

}