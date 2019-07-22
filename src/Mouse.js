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


  static fadeNoClick(nodeIndex, linkData, linkLine, nodeCircle, nodeText,
                     isFade = true,
                     nodeColorClass = 'nodeColor', lineColorClass = 'lineColor') {

    if (isFade){
      // make node non-drag
      d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeNonDrag");
      d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
      d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");
    }

    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        selectLine.setAttribute('class', lineColorClass);
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", nodeColorClass);
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", nodeColorClass);
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", nodeColorClass);
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  }

  static fadeNoClick2nd(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    Mouse.fadeNoClick(nodeIndex, linkData, linkLine, nodeCircle, nodeText,
        true, 'nodeColor_2nd',  'lineColor_2nd');
  }

  static noFadeNoClick2nd(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {

    Mouse.fadeNoClick(nodeIndex, linkData, linkLine, nodeCircle, nodeText,
        false, 'nodeColor', 'lineColor');
  }


  static reset(linkData, linkLine, nodeCircle, nodeText) {
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", null);
    d3.selectAll(linkLine)['_groups'][0].attr("class", null);
    d3.selectAll(nodeText)['_groups'][0].attr("class", null);
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
        Mouse.manipulateAnotherNetwork(oldValue, obj, networkMain, networkSub);
      },
      configurable: true
    });
  }

  static manipulateAnotherNetwork(oldVal, obj, networkMain, networkSub) {
    if (networkMain.vizMode === 'Single') return;

    // set another network
    let AN;
    if(obj.network === 'Main'){
      AN = networkSub;
    }else{
      AN = networkMain;
    }

    if (obj.mouseAction === 'mouseenter') {
      Mouse.reset(AN.linkData, AN.link, AN.node, AN.label);
      Mouse.cursor(AN.vizMode === 'Single' ?'grab' : 'pointer', AN.body, AN.node);
      return;
    }

    const index = AN.detectNodeIndex(obj.name);
    if (obj.mouseAction === 'mouseover') {
      Mouse.fadeClickable(index, AN.linkData, AN.link, AN.node, AN.label);

      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);

      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub');

    }


    else if (obj.mouseAction === 'mouseout') {
      Mouse.reset(AN.linkData, AN.link, AN.node, AN.label);
    }


    else if (obj.mouseAction === 'click') {
      AN.clickedNodeIndex = AN.detectNodeIndex(obj.name);
      Mouse.fadeNoClick(AN.clickedNodeIndex, AN.linkData, AN.link, AN.node, AN.label);
      AN.isClicked = 1;
    }


    else if (obj.mouseAction === 'mouseover2nd') {
      Mouse.fadeNoClick2nd(AN.detectNodeIndex(obj.name2nd), AN.linkData, AN.link, AN.node, AN.label);
      Mouse.noFadeNoClick2nd(AN.clickedNodeIndex, AN.linkData, AN.link, AN.node, AN.label);
    }

  }

}