import $ from "jquery";

// legend filter(mouse over) to make node bigger
export default class Legend {
  static mouseoverFilter(legendId, circle, cell, colorFunc) {
    const legendText = cell.children("text")[legendId];
    $(legendText).animate({
          "font-size": ["1.15em"],
          "font-weight": ["700"]
        },
        100);

    const legendPath = cell.children("path")[legendId];
    $(legendPath).css({"stroke": [colorFunc(legendId)]});
    $(legendPath).animate({"stroke-width": ["5"]}, 100);

    const filteredCircle = circle.parent("." + legendId).children("circle");
    $(filteredCircle).attr("class", "filteredCircle");
    //                  .attr("stroke", color(legendId));

    const filteredText = circle.parent("." + legendId).children("text");
    $(filteredText).attr("class", "filteredText");
  }

  static mouseoutFilter(legendId, circle, cell) {
    const legendText = cell.children("text")[legendId];
    $(legendText).animate({
          "fill": ["#302833"],
          "font-size": ["1em"],
          "font-weight": ["400"]
        },
        100);

    const legendPath = cell.children("path")[legendId];
    $(legendPath).css({"stroke": ["white"]});
    $(legendPath).animate({"stroke-width": ["2"]}, 100);

    const filteredCircle = circle.parent("." + legendId).children("circle");
    $(filteredCircle).attr("class", "returnFilteredCircle");

    const filteredText = circle.parent("." + legendId).children("text");
    $(filteredText).attr("class", "returnFilteredText");
  }

  static mouseoverClick(legendId, circle, cell, colorFunc) {
    const legendText = cell.children("text")[legendId];
    $(legendText).animate({
          "font-size": ["1.15em"],
          "font-weight": ["700"]
        },
        100);

    const legendPath = cell.children("path")[legendId];
    $(legendPath).css({"stroke": [colorFunc(legendId)]});
    $(legendPath).animate({"stroke-width": ["5"]}, 100);

    const filteredCircle = circle.parent("." + legendId).children("circle");
    $(filteredCircle).attr("class", "filteredCircle");

    const filteredText = circle.parent("." + legendId).children("text");
    $(filteredText).attr("class", "filteredText");
  }


  static putId2Legend(cell, legendName) {
    for (let i = 0, l = legendName.length; l > i; i++) {
      let legendId = cell[i];
      $(legendId).attr("id", "legend_No" + i);
    }
  }


  // This function has to be called when nodes are displayed
  static putClass2Node(nodes, circle) {
    const nodeGroup = circle.parent();

    for (let i = 0, l = nodeGroup.length; l > i; i++) {
      let nodeG = nodeGroup[i];
      $(nodeG).attr("class", nodes[i].group_id);
    }
  }

}