export default class Connection {

  // //detect whether selected node match or not, and if matched, move to selected node.
  // static goToMatchedNode(selectedName) {
  //   let selectNode = d3.selectAll("circle")["_groups"][0]
  //   for (let i = 0, l = dataSet.nodes.length; l > i; i++) {
  //     if (dataSet.nodes[i].id === selectedName) {
  //       selectNode = selectNode[i];
  //       let selectNodeX = selectNode.cx.animVal.value;
  //       let selectNodeY = selectNode.cy.animVal.value;
  //
  //       //move to selected node
  //       //translate(100,50):原点を100,50移動するという意味
  //       //let serchedTransform = d3.zoomIdentity
  //       //    .translate(-selectNodeX+width/2, -selectNodeY+height/2)
  //       //    .scale(1);
  //
  //       let scaleVal = 0.2;
  //       let serchedTransform = d3.zoomIdentity
  //           .translate(-selectNodeX * scaleVal + width / 2, -selectNodeY * scaleVal + height / 2)
  //           .scale(scaleVal);
  //
  //       svg.call(zoom_handler.transform, serchedTransform);
  //     }
  //   }
  // }


  static makeNodeList(nodeIndex, linkData) {

    let sameNodes = [];
    let diffNodes = [];

    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].target.index === nodeIndex) {
        if (linkData[i].source.group_id ===
            linkData[i].target.group_id) {
          sameNodes.push(linkData[i].source.name);
          //console.log(linkData[i].source.name)
        } else {
          diffNodes.push(linkData[i].source.name);
        }
      }
      if (linkData[i].source.index === nodeIndex) {
        if (linkData[i].source.group_id ===
            linkData[i].target.group_id) {
          sameNodes.push(linkData[i].target.name);
          //console.log(linkData[i].source.name)
        } else {
          diffNodes.push(linkData[i].target.name);
        }
      }
    }

    sameNodes = sameNodes.sort();
    diffNodes = diffNodes.sort();
    return {sameNodes: sameNodes, diffNodes: diffNodes}
  }


  static makeNodeList1stLinked(nodeIndex, linkData, clickedNodeCategory, baseNodes) {

    let sameNodes = [];
    let diffNodes = [];

    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].target.index === nodeIndex) {
        if (linkData[i].source.group_id ===
            clickedNodeCategory) {
          sameNodes.push(linkData[i].source.name);
        } else {
          diffNodes.push(linkData[i].source.name);
        }
      }
      if (linkData[i].source.index === nodeIndex) {
        if (linkData[i].target.group_id ===
            clickedNodeCategory) {
          sameNodes.push(linkData[i].target.name);
        } else {
          diffNodes.push(linkData[i].target.name);
        }
      }
    }

    sameNodes = Connection.existNodeCheck(sameNodes, baseNodes);
    diffNodes = Connection.existNodeCheck(diffNodes, baseNodes);

    sameNodes = sameNodes.sort();
    diffNodes = diffNodes.sort();
    return {sameNodes: sameNodes, diffNodes: diffNodes}
  }


  static existNodeCheck(nodeList, existNodeList) {
    for (let i = 0, l = nodeList.length; l > i; i++) {
      for (let j = 0, l = existNodeList.length; l > j; j++) {
        if (nodeList[i] === existNodeList[j]) {
          nodeList.splice(i, 1, "");  // replace to space(then delete in same time)
        }
      }
    }
    return nodeList.filter(e => e !== "");  // delete
  }


  static displayDetail(nodeName, sameNodes, diffNodes, areaID) {
    Connection.deleteDetail(areaID);

    const detailBox = document.getElementById(areaID);
    let elements = [];
    /* title */
    let titleText1, titleText2;
    if (areaID.slice(-1) === '1'){
      titleText1 = '1st selected ingredient ';
      titleText2 = 'is linked to';
    }else{
      titleText1 = '2nd selected ingredient ';
      titleText2 = 'is newly linked to'
    }
    elements.push('<p class="detailSelectedIntro">' + titleText1 + '</p>');
    elements.push('<p class="detailSelected"><span> "' + nodeName + '" </span>' + titleText2 + '</p>');

    let numCategory;
    /* same category */
    if (sameNodes.length === 0) {
      numCategory = '';
    } else if (sameNodes.length === 1) {
      numCategory = ' : 1 ingredient';
    } else {
      numCategory = ` : ${sameNodes.length} ingredients`
    }
    elements.push('<p class="detailTitle"><span>' + 'same category' + '</span>' + numCategory + '</p>');
    if (sameNodes.length === 0){
      elements.push('<p class="detailText">' + 'None' + '</p>');
    }
      for (let i = 0, l = sameNodes.length; l > i; i++) {
        elements.push('<p class="detailText">- ' + sameNodes[i] + '</p>');
      }

    /* different category */
    if (diffNodes.length === 0) {
      numCategory = '';
    } else if (diffNodes.length === 1) {
      numCategory = ' : 1 ingredient';
    } else {
      numCategory = ` : ${diffNodes.length} ingredients`
    }
    elements.push('<p class="detailTitle"><span>' + 'different category' + '</span>'  + numCategory + '</p>');
    if (diffNodes.length === 0){
      elements.push('<p class="detailText">' + 'None' + '</p>');
    }
    for (let i = 0, l = diffNodes.length; l > i; i++) {
      elements.push('<p class="detailText">- ' + diffNodes[i] + '</p>');
    }

    detailBox.insertAdjacentHTML('beforeEnd', elements.join(''));

  }


  static deleteDetail(areaID) {
    const detailBox = document.getElementById(areaID);
    detailBox.innerHTML = '';
    detailBox.scrollTop = 0;
  }

}