import * as d3 from 'd3';
import $ from "jquery";

export default class Network {

  static mouseover(d, linkData, linkLine, nodeCircle, nodeText) {
    let linkData_ = linkData;
    let linkLine_ = linkLine;
    let nodeCircle_ = nodeCircle;
    let nodeText_ = nodeText;
    const nodeIndex = d.index; // to get node index
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;  // index number
        //console.log(lineIndex)

        const selectLine = linkLine['_groups'][0][lineIndex]; //node which match index number
        $(selectLine).attr("class", "lineColor");  // node color

        //console.log(linkData[lineIndex].source.index)
        //console.log(linkData[lineIndex].target.index)

        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        const selectNodeSource = nodeCircle['_groups'][0][nodeSource]; //node which match source index number
        const selectNodeTarget = nodeCircle['_groups'][0][nodeTarget]; //node which match target index number
        $(selectNodeSource).attr("class", "nodeColor");  // node color
        $(selectNodeTarget).attr("class", "nodeColor");  // node color

        const selectNodeSource2 = nodeText[nodeSource];  // text which match source index number
        const selectNodeTarget2 = nodeText[nodeTarget];  // text which match target index number
        $(selectNodeSource2).attr("class", "linkedNodeText");  // node text color
        $(selectNodeTarget2).attr("class", "linkedNodeText");  // node text color
      }
    }
    const selectNode = nodeCircle['_groups'][0][nodeIndex];
    $(selectNode).attr("class", "nodeColor");
    const selectNodeText = nodeText[nodeIndex];
    $(selectNodeText).attr("class", "linkedNodeText");
  }


  static mouseout(d, linkData, linkLine, nodeCircle, nodeText) {
    const nodeIndex = d.index;
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;

        const selectLine = linkLine['_groups'][0][lineIndex];
        $(selectLine).attr("class", "lineColorDefault");

        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        const selectNodeSource = nodeCircle['_groups'][0][nodeSource];
        const selectNodeTarget = nodeCircle['_groups'][0][nodeTarget];
        $(selectNodeSource).attr("class", "nodeColorDefault");
        $(selectNodeTarget).attr("class", "nodeColorDefault");

        const selectNodeSource2 = nodeText[nodeSource];
        const selectNodeTarget2 = nodeText[nodeTarget];
        $(selectNodeSource2).attr("class", "textSizeDefault");
        $(selectNodeTarget2).attr("class", "textSizeDefault");
      }
    }
    const selectNode = nodeCircle['_groups'][0][nodeIndex];
    $(selectNode).attr("class", "nodeColorDefault");
    const selectNodeText = nodeText[nodeIndex];
    $(selectNodeText).attr("class", "textSizeDefault");
  }


  static mousedown(d, linkData, linkLine, nodeCircle, nodeText) {
    //at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");
    // nodeText.attr("class", "nodeTextFade");

    const nodeIndex = d.index;
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const selectLine = linkLine['_groups'][0][lineIndex];
        $(selectLine).attr("class", "lineColor");

        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        const selectNodeSource = nodeCircle['_groups'][0][nodeSource];
        const selectNodeTarget = nodeCircle['_groups'][0][nodeTarget];
        $(selectNodeSource).attr("class", "nodeColor");
        $(selectNodeTarget).attr("class", "nodeColor");

        const selectNodeSource2 = nodeText['_groups'][0][nodeSource];
        const selectNodeTarget2 = nodeText['_groups'][0][nodeTarget];
        $(selectNodeSource2).attr("class", "linkedNodeText");
        $(selectNodeTarget2).attr("class", "linkedNodeText");

      }
    }
    const selectNode = nodeCircle['_groups'][0][nodeIndex];
    $(selectNode).attr("class", "nodeColor");
    const selectNodeText = nodeText['_groups'][0][nodeIndex];
    $(selectNodeText).attr("class", "linkedNodeText");
  }


  static touchStart(d, linkData, linkLine, nodeCircle, nodeText) {
    //at first, make all node & line fade
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeColorFadeSp");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineColorFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextFade");


    const nodeIndex = d.index;
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;
        const selectLine = linkLine['_groups'][0][lineIndex];
        $(selectLine).attr("class", "lineColor");

        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        const selectNodeSource = nodeCircle['_groups'][0][nodeSource];
        const selectNodeTarget = nodeCircle['_groups'][0][nodeTarget];
        $(selectNodeSource).attr("class", "nodeColor");
        $(selectNodeTarget).attr("class", "nodeColor");

        const selectNodeSource2 = nodeText['_groups'][0][nodeSource];
        const selectNodeTarget2 = nodeText['_groups'][0][nodeTarget];
        $(selectNodeSource2).attr("class", "linkedNodeText");
        $(selectNodeTarget2).attr("class", "linkedNodeText");

      }
    }
    const selectNode = nodeCircle['_groups'][0][nodeIndex];
    $(selectNode).attr("class", "nodeColor");
    const selectNodeText = nodeText['_groups'][0][nodeIndex];
    $(selectNodeText).attr("class", "linkedNodeText");
  }


  static mouseup(d, linkData, linkLine, nodeCircle, nodeText) {
    d3.selectAll(nodeCircle)['_groups'][0].attr("class", "nodeReturnFade");
    d3.selectAll(linkLine)['_groups'][0].attr("class", "lineReturnFade");
    d3.selectAll(nodeText)['_groups'][0].attr("class", "nodeTextReturnFade");

    const nodeIndex = d.index;
    for (let i = 0, l = linkData.length; l > i; i++) {
      if (linkData[i].source.index === nodeIndex ||
          linkData[i].target.index === nodeIndex) {

        const lineIndex = i;

        const selectLine = linkLine['_groups'][0][lineIndex];
        $(selectLine).attr("class", "lineColor");

        const nodeSource = linkData[lineIndex].source.index;
        const nodeTarget = linkData[lineIndex].target.index;

        const selectNodeSource = nodeCircle['_groups'][0][nodeSource];
        const selectNodeTarget = nodeCircle['_groups'][0][nodeTarget];
        $(selectNodeSource).attr("class", "nodeColor");
        $(selectNodeTarget).attr("class", "nodeColor");

        const selectNodeSource2 = nodeText['_groups'][0][nodeSource];
        const selectNodeTarget2 = nodeText['_groups'][0][nodeTarget];
        $(selectNodeSource2).attr("class", "linkedNodeText");
        $(selectNodeTarget2).attr("class", "linkedNodeText");

      }
    }
    const selectNode = nodeCircle['_groups'][0][nodeIndex];
    $(selectNode).attr("class", "nodeColor");
    const selectNodeText = nodeText['_groups'][0][nodeIndex];
    $(selectNodeText).attr("class", "linkedNodeText");
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
    circle.css({"cursor": ["-webkit-" + grabTypeC]});
    circle.css({"cursor": ["-moz-" + grabTypeC]});
    circle.css({"cursor": [grabTypeC]});

    body.css({"cursor": ["-webkit-" + grabTypeB]});
    body.css({"cursor": ["-moz-" + grabTypeB]});
    body.css({"cursor": [grabTypeB]});
  }

}