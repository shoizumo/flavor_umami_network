import * as d3 from 'd3';
import Connection from "./Connection";

export default class Mouse {

  /*
  click event return 1st linked node list
    - noClickFade : normal click event
    - noClickNoFade1stLinked : when mouseover 2nd linked node, this event plays a role of click
   */

  static clickableFade(nodeIndex, NW) {
    Mouse.fadeCanMouseAction(NW.link, NW.node, NW.label);
    Mouse.colorNetwork(nodeIndex, NW,'nodeColor', 'lineColor', 'linkedNodeText', NW.dataType)
  }

  static noClickFade(nodeIndex, NW) {
    Mouse.fadeNoMouseAction(NW.link, NW.node, NW.label);
    return Mouse.colorNetwork(nodeIndex, NW,'nodeColor', 'lineColor', 'linkedNodeText', NW.dataType);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // for mouseover 1stLinked-1 : role of mouseover
  static noClickFade1stLinked(nodeIndex, NW) {
    Mouse.fadeNoMouseAction(NW.link, NW.node, NW.label);
    Mouse.colorNetwork(nodeIndex, NW,'nodeColor_1stLinked', 'lineColor_1stLinked','linkedNodeText_1stLinked', NW.dataType);
  }

  // for mouseover 1stLinked-2: role of click
  static noClickNoFade1stLinked(nodeIndex, NW) {
    return Mouse.colorNetwork(nodeIndex, NW,'nodeColor', 'lineColor', 'linkedNodeText', NW.dataType);
  }
  ///////////////////////////////////////////////////////////////////////////////////////


  static reset(NW) {
    const linkData = NW.linkData;
    const nodeData = NW.nodeData;
    const linkLine = NW.link;
    const nodeCircle = NW.node;
    const nodeText = NW.label;
    const dataType = NW.dataType;
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", null);
    d3.selectAll(nodeText)['_groups'][0].attr("class", null);
    Mouse.fillNode(nodeData, nodeCircle);
    Mouse.putGradientLineColor(linkData, linkLine, dataType);
    Connection.deleteDetail("detail" + NW.vizID + "1");
    Connection.deleteDetail("detail" + NW.vizID + "2");
  }

  static putGradientLineColor(linkData, linkLine, dataType){
    for (let i = 0, l = linkData.length; l > i; i++) {
      linkLine['_groups'][0][i].setAttribute("class", 'link' + dataType + String(i));
    }
  }

  static fillNode(nodeData, nodeCircle){
    for (let i = 0, l = nodeData.length; l > i; i++) {
      nodeCircle['_groups'][0][i].setAttribute("fill", Mouse.nodeColor()[nodeData[i].group_id]);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  static colorNetwork(nodeIndex, NW, nodeClass, lineClass, textClass, dataType){
    const linkData = NW.linkData;
    const nodeData = NW.nodeData;
    const linkLine = NW.link;
    const nodeCircle = NW.node;
    const nodeText = NW.label;

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
        const type = nodeClass === 'nodeColor_1stLinked' ? 'Vertical' : 'Horizontal';
        if (linkData[i].source.index === nodeIndex) {
          nodeCircle['_groups'][0][nodeTarget].setAttribute("class", nodeClass);
          nodeCircle['_groups'][0][nodeTarget].setAttribute("fill", 'url(#' + type + Mouse.nodeColor()[linkData[lineIndex].group_id_t] + ')');
        }else{
          nodeCircle['_groups'][0][nodeSource].setAttribute("class", nodeClass);
          nodeCircle['_groups'][0][nodeSource].setAttribute("fill", 'url(#' + type + Mouse.nodeColor()[linkData[lineIndex].group_id_s] + ')');
        }

        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", textClass);
        nodeText['_groups'][0][nodeTarget].setAttribute("class", textClass);
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", nodeClass);
    nodeCircle['_groups'][0][nodeIndex].setAttribute("fill", Mouse.nodeColor()[nodeData[nodeIndex].group_id]);
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "selectedNodeText");

    return nodeList;
  }


  static nodeColor() {
    return ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
      "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
      "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];
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
      //  manipulate both network(visArea is same, so can't distinguish network)
      networkMain.stopHighlightNode();
      networkMain.isClicked = 0;
      Mouse.reset(networkMain);
      Mouse.cursor(networkMain.vizMode === 'Single' ?'grab' : 'pointer', networkMain.body, networkMain.node);
      networkMain.stopHighlightNode();

      networkSub.stopHighlightNode();
      networkSub.isClicked = 0;
      Mouse.reset(networkSub);
      Mouse.cursor(networkSub.vizMode === 'Single' ?'grab' : 'pointer', networkSub.body, networkSub.node);
      networkSub.stopHighlightNode();

      return;
    }

    if (typeof AN.detectNodeIndex(obj.name) === "undefined") return;
    if (obj.mouseAction === 'mouseover') {
      // console.log('AN mouseover', obj);
      const index = AN.detectNodeIndex(obj.name);
      let M = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      Mouse.clickableFade(index, AN);
      AN.statrHighlightNode(AN.nodeData[index], '1st');

      Connection.displayDetail(obj.name, M.sameNodes, M.diffNodes, 'detailMain1');
      Connection.displayDetail(obj.name, S.sameNodes, S.diffNodes, 'detailSub1');

    }

    else if (obj.mouseAction === 'mouseover1stLinked') {
      // console.log('AN mouseover1stLinked', obj);
      Mouse.noClickFade1stLinked(AN.detectNodeIndex(obj.name1stLinked), AN);
      Mouse.noClickNoFade1stLinked(AN.detectNodeIndex(obj.name), AN);
      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name1stLinked)], '2nd');

      let M1 = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S1 = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes).concat(obj.name);
      const SubBaseNodes = S1.sameNodes.concat(S1.diffNodes).concat(obj.name);

      const nodeCategory = networkMain.detectNodeCategory(obj.name);
      let M2 = Connection.makeNodeList1stLinked(networkMain.detectNodeIndex(obj.name1stLinked), networkMain.linkData, nodeCategory, MainBaseNodes);
      let S2 = Connection.makeNodeList1stLinked(networkSub.detectNodeIndex(obj.name1stLinked), networkSub.linkData, nodeCategory, SubBaseNodes);

      Connection.displayDetail(obj.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMain2');
      Connection.displayDetail(obj.name1stLinked, S2.sameNodes, S2.diffNodes, 'detailSub2');
    }

    else if (obj.mouseAction === 'mouseover2ndLinked') {
      // console.log('AN mouseover2ndLinked', obj);
      Mouse.reset(AN);
      Mouse.noClickFade1stLinked(AN.detectNodeIndex(obj.name1stLinked), AN);
      AN.linked1stNodeList = Mouse.noClickNoFade1stLinked(AN.detectNodeIndex(obj.name), AN);

      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name)], '1st');
      AN.statrHighlightNode(AN.nodeData[AN.detectNodeIndex(obj.name1stLinked)], '2nd');

      let M1 = Connection.makeNodeList(networkMain.detectNodeIndex(obj.name), networkMain.linkData);
      let S1 = Connection.makeNodeList(networkSub.detectNodeIndex(obj.name), networkSub.linkData);
      const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes).concat(obj.name);
      const SubBaseNodes = S1.sameNodes.concat(S1.diffNodes).concat(obj.name);

      const nodeCategory = networkMain.detectNodeCategory(obj.name);
      let M2 = Connection.makeNodeList1stLinked(networkMain.detectNodeIndex(obj.name1stLinked), networkMain.linkData, nodeCategory, MainBaseNodes);
      let S2 = Connection.makeNodeList1stLinked(networkSub.detectNodeIndex(obj.name1stLinked), networkSub.linkData, nodeCategory, SubBaseNodes);

      Connection.displayDetail(obj.name, M1.sameNodes, M1.diffNodes, 'detailMain1');
      Connection.displayDetail(obj.name, S1.sameNodes, S1.diffNodes, 'detailSub1');
      Connection.displayDetail(obj.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMain2');
      Connection.displayDetail(obj.name1stLinked, S2.sameNodes, S2.diffNodes, 'detailSub2');
    }

    else if (obj.mouseAction === 'mouseout') {
      Mouse.reset(AN);
      AN.stopHighlightNode();
    }


    else if (obj.mouseAction === 'click') {
      AN.clickedNodeIndex = AN.detectNodeIndex(obj.name);
      Mouse.noClickFade(AN.clickedNodeIndex, AN);
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