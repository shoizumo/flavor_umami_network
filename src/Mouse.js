import * as d3 from 'd3';
import Connection from "./Connection";

export default class Mouse {

  /*
  click event return 1st linked node list
    - noClickFade : normal click event
    - noClickNoFade1stLinked : when mouseover 2nd linked node, this event plays a role of click
   */

  static clickableFade(nodeIndex, linkData, linkLine, nodeCircle, nodeText, dataType) {
    Mouse.fadeCanMouseAction(linkLine, nodeCircle, nodeText);
    Mouse.colorNetwork(nodeIndex, linkData, linkLine, nodeCircle, nodeText, 'nodeColor', 'lineColor', 'linkedNodeText', dataType)
  }

  static noClickFade(nodeIndex, linkData, linkLine, nodeCircle, nodeText, dataType) {
    Mouse.fadeNoMouseAction(linkLine, nodeCircle, nodeText);
    return Mouse.colorNetwork(nodeIndex, linkData, linkLine, nodeCircle, nodeText, 'nodeColor', 'lineColor', 'linkedNodeText',dataType);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // for mouseover 1stLinked-1 : role of mouseover
  static noClickFade1stLinked(nodeIndex, linkData, linkLine, nodeCircle, nodeText, dataType) {
    Mouse.fadeNoMouseAction(linkLine, nodeCircle, nodeText);
    Mouse.colorNetwork(nodeIndex, linkData, linkLine, nodeCircle, nodeText, 'nodeColor_1stLinked', 'lineColor_1stLinked','linkedNodeText_1stLinked', dataType);
  }

  // for mouseover 1stLinked-2: role of click
  static noClickNoFade1stLinked(nodeIndex, linkData, linkLine, nodeCircle, nodeText, dataType) {
    return Mouse.colorNetwork(nodeIndex, linkData, linkLine, nodeCircle, nodeText, 'nodeColor', 'lineColor', 'linkedNodeText', dataType);
  }
  ///////////////////////////////////////////////////////////////////////////////////////


  static reset(linkData, linkLine, nodeCircle, nodeText, dataType) {
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", null);
    d3.selectAll(nodeText)['_groups'][0].attr("class", null);
    Mouse.putGradientLineColor(linkData, linkLine, dataType);
  }

  static putGradientLineColor(linkData, linkLine, dataType){
    for (let i = 0, l = linkData.length; l > i; i++) {
      linkLine['_groups'][0][i].setAttribute("class", 'link' + dataType + String(i));
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  static colorNetwork(nodeIndex, linkData, linkLine, nodeCircle, nodeText, nodeClass, lineClass, textClass, dataType){
    let nodeList = [];
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;
        nodeList.push(nodeSource, nodeTarget);

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        // selectLine.setAttribute('class', lineClass);
        selectLine.setAttribute("class", 'link' + dataType + String(i));
        selectLine.classList.add(lineClass);
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", nodeClass);
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", nodeClass);
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", textClass);
        nodeText['_groups'][0][nodeTarget].setAttribute("class", textClass);
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "selectedNode");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "selectedNodeText");

    return nodeList;
  }


  static fadeNoMouseAction(linkLine, nodeCircle, nodeText){
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeNonDrag");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");
  }


  static fadeCanMouseAction(linkLine, nodeCircle, nodeText){
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");
  }
  ///////////////////////////////////////////////////////////////////////////////////////


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


  static watchMouseAction(obj, watchPropName, networkMain, networkSub) {
    let value = obj[watchPropName];
    Object.defineProperty(obj, watchPropName, {
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
      Mouse.reset(AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      Mouse.cursor(AN.vizMode === 'Single' ?'grab' : 'pointer', AN.body, AN.node);
      AN.stopHighlightNode();
      return;
    }

    if (typeof AN.detectNodeIndex(obj.name) === "undefined") return;
    if (obj.mouseAction === 'mouseover') {
      console.log('AN mouseover', obj);
      const index = AN.detectNodeIndex(obj.name);
      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      Mouse.clickableFade(index, AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      AN.statrHighlightNode(AN.nodeData[index], '1st');

      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain1');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub1');

    }

    else if (obj.mouseAction === 'mouseover1stLinked') {
      console.log('AN mouseover1stLinked', obj);
      Mouse.noClickFade1stLinked(AN.detectNodeIndex(obj.name1stLinked), AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      Mouse.noClickNoFade1stLinked(AN.detectNodeIndex(obj.name), AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name1stLinked)], '2nd');

      let M1 = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S1 = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes);
      const SubBaseNodes = S1.sameNodes.concat(S1.diffNodes);

      const nodeCategory = networkMain.detectNodeCategory(obj.name);
      let M2 = Connection.makeNodeList1stLinked(networkMain.detectNodeIndex(obj.name1stLinked), networkMain.linkData, nodeCategory, MainBaseNodes);
      let S2 = Connection.makeNodeList1stLinked(networkSub.detectNodeIndex(obj.name1stLinked), networkSub.linkData, nodeCategory, SubBaseNodes);

      Connection.displayDetail(obj.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMain2');
      Connection.displayDetail(obj.name1stLinked, S2.sameNodes, S2.diffNodes, 'detailSub2');
    }

    else if (obj.mouseAction === 'mouseover2ndLinked') {
      console.log('AN mouseover2ndLinked', obj);
      Mouse.reset(AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      Mouse.noClickFade1stLinked(AN.detectNodeIndex(obj.name1stLinked), AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      AN.linked1stNodeList = Mouse.noClickNoFade1stLinked(AN.detectNodeIndex(obj.name), AN.linkData, AN.link, AN.node, AN.label, AN.dataType);

      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name)], '1st');
      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name1stLinked)], '2nd');

      let M1 = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S1 = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes);
      const SubBaseNodes = S1.sameNodes.concat(S1.diffNodes);

      const nodeCategory = networkMain.detectNodeCategory(obj.name);
      let M2 = Connection.makeNodeList1stLinked(networkMain.detectNodeIndex(obj.name1stLinked), networkMain.linkData, nodeCategory, MainBaseNodes);
      let S2 = Connection.makeNodeList1stLinked(networkSub.detectNodeIndex(obj.name1stLinked), networkSub.linkData, nodeCategory, SubBaseNodes);

      Connection.displayDetail(obj.name, M1.sameNodes, M1.diffNodes, 'detailMain1');
      Connection.displayDetail(obj.name, S1.sameNodes, S1.diffNodes, 'detailSub1');
      Connection.displayDetail(obj.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMain2');
      Connection.displayDetail(obj.name1stLinked, S2.sameNodes, S2.diffNodes, 'detailSub2');
    }

    else if (obj.mouseAction === 'mouseout') {
      Mouse.reset(AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      AN.stopHighlightNode();
    }


    else if (obj.mouseAction === 'click') {
      AN.clickedNodeIndex = AN.detectNodeIndex(obj.name);
      Mouse.noClickFade(AN.clickedNodeIndex, AN.linkData, AN.link, AN.node, AN.label, AN.dataType);
      AN.isClicked = 1;
      AN.statrHighlightNode(AN.nodeData[AN.clickedNodeIndex], '1st');

      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);

      Connection.deleteDetail('detailMain2');
      Connection.deleteDetail('detailSub2');
      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain1');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub1');

    }

  }

}