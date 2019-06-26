import * as d3 from 'd3';

export default class Mouse {

  static mouseover(d, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mouseover');
    const nodeIndex = d.index;
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


  static mouseout(d, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mouseout');
    const nodeIndex = d.index;
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        // line
        const selectLine = linkLine['_groups'][0][lineIndex];
        selectLine.setAttribute('class', 'lineColorDefault');
        // node
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColorDefault");
        nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColorDefault");
        // text
        nodeText['_groups'][0][nodeSource].setAttribute("class", "textSizeDefault");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "textSizeDefault");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColorDefault");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "textSizeDefault");
  }


  static mousedown(d, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mousedown');
    // at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");

    const nodeIndex = d.index;
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


  static touchStart(d, linkData, linkLine, nodeCircle, nodeText) {
    // at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeSp");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");

    const nodeIndex = d.index;
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
        nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor")
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


  static mouseup(d, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mouseup');
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeReturnFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineReturnFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextReturnFade");

    const nodeIndex = d.index;
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

        nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
        nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
      }
    }
    // selectNode
    nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
    // selectNodeText
    nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  }

  static reset(linkData, linkLine, nodeCircle, nodeText) {
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeReturnFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineReturnFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextReturnFade");

    console.log('reset')
  }


  static cursor(type, body, circle) {
    let grabTypeC;
    let grabTypeB;
    if (type === 'grabbing') {
      grabTypeC = "grabbing";
      grabTypeB = "grabbing";
    } else {
      grabTypeC = "grab";
      grabTypeB = "auto";
    }

    //grabbing
    circle.style("cursor", "-webkit-" + grabTypeC);
    circle.style("cursor", "-moz-" + grabTypeC);
    circle.style("cursor", grabTypeC);

    body.style("cursor", "-webkit-" + grabTypeB);
    body.style("cursor", "-moz-" + grabTypeB);
    body.style("cursor", grabTypeB);
  }

}