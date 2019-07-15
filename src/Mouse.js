import * as d3 from 'd3';

export default class Mouse {

  static mouseover(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    // at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeSp");
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

  // static mouseover(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
  //   // console.log('mouseover');
  //   for (let i = 0, l = linkData.length; l > i; i++) {
  //     if (linkData[i].source.index === nodeIndex ||
  //         linkData[i].target.index === nodeIndex) {
  //
  //       const lineIndex = i;
  //       const nodeSource = linkData[lineIndex].source.index;
  //       const nodeTarget = linkData[lineIndex].target.index;
  //
  //       // line
  //       const selectLine = linkLine['_groups'][0][lineIndex];
  //       selectLine.setAttribute('class', 'lineColor');
  //       // node
  //       nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor");
  //       nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColor");
  //       // text
  //       nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
  //       nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
  //     }
  //   }
  //   // selectNode
  //   nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
  //   // selectNodeText
  //   nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  // }


  static mouseout(linkData, linkLine, nodeCircle, nodeText) {
    Mouse.reset(linkData, linkLine, nodeCircle, nodeText)
  }


  // static mouseout(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
  //   // console.log('mouseout');
  //   for (let i = 0, l = linkData.length; l > i; i++) {
  //     if (linkData[i].source.index === nodeIndex ||
  //         linkData[i].target.index === nodeIndex) {
  //
  //       const lineIndex = i;
  //       const nodeSource = linkData[lineIndex].source.index;
  //       const nodeTarget = linkData[lineIndex].target.index;
  //
  //       // line
  //       const selectLine = linkLine['_groups'][0][lineIndex];
  //       selectLine.setAttribute('class', 'lineColorDefault');
  //       // node
  //       nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColorDefault");
  //       nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColorDefault");
  //       // text
  //       nodeText['_groups'][0][nodeSource].setAttribute("class", "textSizeDefault");
  //       nodeText['_groups'][0][nodeTarget].setAttribute("class", "textSizeDefault");
  //     }
  //   }
  //   // selectNode
  //   nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColorDefault");
  //   // selectNodeText
  //   nodeText['_groups'][0][nodeIndex].setAttribute("class", "textSizeDefault");
  // }


  static mousedown(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mousedown');
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


  // static touchStart(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
  //   // at first, make all node & line fade
  //   d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeSp");
  //   d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
  //   d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");
  //
  //   for (let i = 0, l = linkData.length; l > i; i++) {
  //     if (linkData[i].source.index === nodeIndex ||
  //         linkData[i].target.index === nodeIndex) {
  //
  //       const lineIndex = i;
  //       const nodeSource = linkData[lineIndex].source.index;
  //       const nodeTarget = linkData[lineIndex].target.index;
  //
  //       // line
  //       const selectLine = linkLine['_groups'][0][lineIndex];
  //       selectLine.setAttribute('class', 'lineColor');
  //       // node
  //       nodeCircle['_groups'][0][nodeSource].setAttribute("class", "nodeColor");
  //       nodeCircle['_groups'][0][nodeTarget].setAttribute("class", "nodeColor");
  //       // text
  //       nodeText['_groups'][0][nodeSource].setAttribute("class", "linkedNodeText");
  //       nodeText['_groups'][0][nodeTarget].setAttribute("class", "linkedNodeText");
  //     }
  //   }
  //   // selectNode
  //   nodeCircle['_groups'][0][nodeIndex].setAttribute("class", "nodeColor");
  //   // selectNodeText
  //   nodeText['_groups'][0][nodeIndex].setAttribute("class", "linkedNodeText");
  // }


  static mouseup(nodeIndex, linkData, linkLine, nodeCircle, nodeText) {
    // console.log('mouseup');
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeReturnFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineReturnFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextReturnFade");

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

}