import d3 from "d3";
import $ from "jquery";

export default class Hist {
  constructor(dataArray, scoreArray, type, infoBordObj, histCanvas) {
    this.data = dataArray;
    this.scoreData = scoreArray;
    this.type = type;

    this.infoBord = infoBordObj;

    // this.canvas = new HistCanvas();
    this.canvas = histCanvas;
    this.highlightedBarList = [];

    this.canvas.histArea.addEventListener('mousemove', this.onHistRanking.bind(this), false);
    this.canvas.histArea.addEventListener('mouseout', this.outHistRanking.bind(this), false);
    this.canvas.histArea.addEventListener('click', this.clickHistRanking.bind(this), false);

    this.isHistDisplay = false;
    this.canvas.drawSetInterval = '';

    this.isOnClickHist = false;

    this.highlightBarOnHistIndex = -1;
    this.soundMouseOver = histCanvas.soundMouseOverObj;
  }


  get max() {
    return this.scoreData[0].score;
  }

  get min() {
    return this.scoreData[this.scoreData.length - 1].score;
  }

  resetHighlightedBarList() {
    this.highlightedBarList = [];
  }





    class Color {
    static mouseover(d) {
      let nodeIndex = d.index; // to get node index
      for (let i = 0, l = links.length; l > i; i++) {
        if (links[i].source.index === nodeIndex ||
            links[i].target.index === nodeIndex) {

          let lineIndex = i;  // index number
          //console.log(lineIndex)

          let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
          $(selectLine).attr("class", "lineColor");  // node color

          //console.log(links[lineIndex].source.index)
          //console.log(links[lineIndex].target.index)

          let nodeSource = links[lineIndex].source.index;
          let nodeTarget = links[lineIndex].target.index;

          let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
          let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number
          $(selectNodeSource).attr("class", "nodeColor");  // node color
          $(selectNodeTarget).attr("class", "nodeColor");  // node color

          let selectNodeSource2 = circle.parent().children('text')[nodeSource];  // text which match source index number
          let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];  // text which match target index number
          $(selectNodeSource2).attr("class", "linkedNodeText");  // node text color
          $(selectNodeTarget2).attr("class", "linkedNodeText");  // node text color
        }
      }
      let selectNode = d3.selectAll("circle")[0][nodeIndex];
      $(selectNode).attr("class", "nodeColor");
      let selectNodeText = circle.parent().children('text')[nodeIndex];
      $(selectNodeText).attr("class", "linkedNodeText");
    }


    static mouseout(d) {
      let nodeIndex = d.index;
      for (let i = 0, l = links.length; l > i; i++) {
        if (links[i].source.index === nodeIndex ||
            links[i].target.index === nodeIndex) {

          let lineIndex = i;

          let selectLine = d3.selectAll("line")[0][lineIndex];
          $(selectLine).attr("class", "lineColorDefault");

          let nodeSource = links[lineIndex].source.index;
          let nodeTarget = links[lineIndex].target.index;

          let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
          let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
          $(selectNodeSource).attr("class", "nodeColorDefault");
          $(selectNodeTarget).attr("class", "nodeColorDefault");

          let selectNodeSource2 = circle.parent().children('text')[nodeSource];
          let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
          $(selectNodeSource2).attr("class", "textSizeDefault");
          $(selectNodeTarget2).attr("class", "textSizeDefault");
        }
      }
      let selectNode = d3.selectAll("circle")[0][nodeIndex];
      $(selectNode).attr("class", "nodeColorDefault");
      let selectNodeText = circle.parent().children('text')[nodeIndex];
      $(selectNodeText).attr("class", "textSizeDefault");
    }


    static mousedown(d) {
      //at first, make all node & line fade
      d3.selectAll("circle").attr("class", "nodeColorFade");
      d3.selectAll("line").attr("class", "lineColorFade");
      circle.parent().children('text').attr("class", "nodeTextFade");


      let nodeIndex = d.index;
      for (let i = 0, l = links.length; l > i; i++) {
        if (links[i].source.index === nodeIndex ||
            links[i].target.index === nodeIndex) {

          let lineIndex = i;
          let selectLine = d3.selectAll("line")[0][lineIndex];
          $(selectLine).attr("class", "lineColor");

          let nodeSource = links[lineIndex].source.index;
          let nodeTarget = links[lineIndex].target.index;

          let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
          let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
          $(selectNodeSource).attr("class", "nodeColor");
          $(selectNodeTarget).attr("class", "nodeColor");

          let selectNodeSource2 = circle.parent().children('text')[nodeSource];
          let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
          $(selectNodeSource2).attr("class", "linkedNodeText");
          $(selectNodeTarget2).attr("class", "linkedNodeText");

        }
      }
      let selectNode = d3.selectAll("circle")[0][nodeIndex];
      $(selectNode).attr("class", "nodeColor");
      let selectNodeText = circle.parent().children('text')[nodeIndex];
      $(selectNodeText).attr("class", "linkedNodeText");
    }

    static touchStart(d) {
      //at first, make all node & line fade
      d3.selectAll("circle").attr("class", "nodeColorFadeSp");
      d3.selectAll("line").attr("class", "lineColorFade");
      circle.parent().children('text').attr("class", "nodeTextFade");


      let nodeIndex = d.index;
      for (let i = 0, l = links.length; l > i; i++) {
        if (links[i].source.index === nodeIndex ||
            links[i].target.index === nodeIndex) {

          let lineIndex = i;
          let selectLine = d3.selectAll("line")[0][lineIndex];
          $(selectLine).attr("class", "lineColor");

          let nodeSource = links[lineIndex].source.index;
          let nodeTarget = links[lineIndex].target.index;

          let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
          let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
          $(selectNodeSource).attr("class", "nodeColor");
          $(selectNodeTarget).attr("class", "nodeColor");

          let selectNodeSource2 = circle.parent().children('text')[nodeSource];
          let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
          $(selectNodeSource2).attr("class", "linkedNodeText");
          $(selectNodeTarget2).attr("class", "linkedNodeText");

        }
      }
      let selectNode = d3.selectAll("circle")[0][nodeIndex];
      $(selectNode).attr("class", "nodeColor");
      let selectNodeText = circle.parent().children('text')[nodeIndex];
      $(selectNodeText).attr("class", "linkedNodeText");
    }

    static mouseup(d) {
      d3.selectAll("circle").attr("class", "nodeReturnFade");
      d3.selectAll("line").attr("class", "lineReturnFade");
      circle.parent().children('text').attr("class", "nodeTextReturnFade");

      let nodeIndex = d.index;
      for (let i = 0, l = links.length; l > i; i++) {
        if (links[i].source.index === nodeIndex ||
            links[i].target.index === nodeIndex) {

          let lineIndex = i;

          let selectLine = d3.selectAll("line")[0][lineIndex];
          $(selectLine).attr("class", "lineColor");

          let nodeSource = links[lineIndex].source.index;
          let nodeTarget = links[lineIndex].target.index;

          let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
          let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
          $(selectNodeSource).attr("class", "nodeColor");
          $(selectNodeTarget).attr("class", "nodeColor");

          let selectNodeSource2 = circle.parent().children('text')[nodeSource];
          let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
          $(selectNodeSource2).attr("class", "linkedNodeText");
          $(selectNodeTarget2).attr("class", "linkedNodeText");

        }
      }
      let selectNode = d3.selectAll("circle")[0][nodeIndex];
      $(selectNode).attr("class", "nodeColor");
      let selectNodeText = circle.parent().children('text')[nodeIndex];
      $(selectNodeText).attr("class", "linkedNodeText");
    }

    static cursor(type) {
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

}