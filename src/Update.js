import * as d3 from 'd3';

export default class Update {

  static deleteObj(linkLine, nodeCircle, nodeText, linkData, nodeData) {
    return {
      link: Update.deleteLinkData(linkLine, linkData),
      node: Update.deleteNodeData(nodeCircle, nodeData),
      label: Update.deleteLabelData(nodeText, nodeData)
    }
  }


  static addObj(linkLine, nodeCircle, nodeText, nodeData, linkData, color, dragstarted, dragging, dragended) {
    return {
      link: Update.addLinkData(linkLine, linkData, color),
      node: Update.addNodeData(nodeCircle, nodeData, color, dragstarted, dragging, dragended),
      label: Update.addLabelData(nodeText)
    }
  }



  static deleteLinkData (linkLine, linkData) {
    linkLine = linkLine.data(linkData, function (d) {
      return d.name;
    });
    linkLine.exit()
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", 0.0)
        .remove();

    return linkLine;
  }


  static addLinkData (linkLine, linkData, color) {
    // linkLine = linkLine.enter().append("line")
    //     .attr("opacity", "0.0")
    //     .attr("stroke-width", function (d) {
    //       return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
    //     })
    //     .attr("stroke", function (d) {
    //       return color(d.group_id_s)
    //     })
    //     .merge(linkLine);
    //
    // linkLine.transition()
    //     .duration(5000)
    //     .ease(d3.easeLinear)
    //     .style("opacity", 0.6);

    let linkLineEnter = linkLine.enter().append("line")
        .attr("opacity", "0.0")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
        })
        .attr("stroke", function (d) {
          return color(d.group_id_s)
        });

    linkLine = linkLineEnter.merge(linkLine);
    linkLine.transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", 0.6);

    return linkLine;
  }


  static deleteNodeData (nodeCircle, nodeData) {
    nodeCircle = nodeCircle.data(nodeData, function (d) {
      return d.name;
    });
    nodeCircle.exit()
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", 0.0)
        .remove();

    return nodeCircle;
  }


   static addNodeData (nodeCircle, nodeData, color, dragstarted, dragging, dragended) {
    nodeCircle = nodeCircle.enter().append("circle")
        .attr("opacity", "0.0")
        .attr("r", function (d) {
          return Math.sqrt(d.size) * 4 + 2.5;
        })
        .attr("fill", function (d) {
          return color(d.group_id)
        })
        .attr("stroke", "#fffcf9")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragging)
            .on("end", dragended))
        .merge(nodeCircle);

    nodeCircle.transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", "0.6");

    return nodeCircle;
  }


  static deleteLabelData (nodeText, nodeData) {
    nodeText = nodeText.data(nodeData, function (d) {
      return d.name;
    });
    nodeText.exit()
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", 0.0)
        .remove();

    return nodeText;
  }


  static addLabelData(nodeText) {
    nodeText = nodeText.enter().append("text").merge(nodeText)
        .text(function (d) {
          return d.name;
        });

    nodeText
        .attr("opacity", "0.0")
        .attr("font-size", ".7em")
        .attr("font-weight", "300")
        .attr("class", "nonDrag")
        .attr("fill", "#352622")
        .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]})

     nodeText.transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .style("opacity", 0.6);

    return nodeText;
  }


  static storePreviousNodePosition(nodeCircle, nodeData, prevNodePosition) {
    // get previous node position
    for (let i = 0, l = nodeData.length; l > i; i++) {
      prevNodePosition.push({
        'name': nodeCircle['_groups'][0][i]['__data__']['name'],
        'x': nodeCircle['_groups'][0][i]['cx']['baseVal']['value'],
        'y': nodeCircle['_groups'][0][i]['cy']['baseVal']['value']
      })
    }

    return prevNodePosition;
  }

  static simulation(linkData, nodeData, simulation, ticked) {
    simulation
        .nodes(nodeData)
        .on("tick", ticked);
    simulation.force("link")
        .links(linkData);
    simulation.stop();
  }


  static transitNodePosition (nodeCircle, nodeText, nodeData, prevNodePosition) {
    const t = d3.transition().duration(5000);
    for (let i = 0, l = nodeData.length; l > i; i++) {
      // new node -> new position, existing node -> previous position
      if (prevNodePosition[i]['x'] === 0) {
        prevNodePosition[i]['x'] = nodeCircle['_groups'][0][i]['__data__']['x'];
        prevNodePosition[i]['y'] = nodeCircle['_groups'][0][i]['__data__']['y'];
      }
      // node
      nodeCircle['_groups'][0][i].setAttribute("cx", prevNodePosition[i]['x']);
      nodeCircle['_groups'][0][i].setAttribute("cy", prevNodePosition[i]['y']);
      // label
      nodeText['_groups'][0][i].setAttribute("x", prevNodePosition[i]['x']);
      nodeText['_groups'][0][i].setAttribute("y", prevNodePosition[i]['y']);
    }

    nodeCircle.transition(t)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeText.transition(t)
        .attr("x", d => d.x)
        .attr("y", d => d.y);
  };


  static transitLinkPosition (linkLine, linkData, prevNodePosition) {
    const t = d3.transition().duration(5000);

    let nodePositionIndex = {};
    for (let i1 = 0, l1 = prevNodePosition.length; l1 > i1; i1++) {
      nodePositionIndex[prevNodePosition[i1]['name']] = i1;
    }

    for (let i2 = 0, l2 = linkData.length; l2 > i2; i2++) {
      const sourceName = linkLine['_groups'][0][i2]['__data__']['source']['name'];
      const targetName = linkLine['_groups'][0][i2]['__data__']['target']['name'];

      linkLine['_groups'][0][i2].setAttribute("x1", prevNodePosition[nodePositionIndex[sourceName]]['x']);
      linkLine['_groups'][0][i2].setAttribute("y1", prevNodePosition[nodePositionIndex[sourceName]]['y']);
      linkLine['_groups'][0][i2].setAttribute("x2", prevNodePosition[nodePositionIndex[targetName]]['x']);
      linkLine['_groups'][0][i2].setAttribute("y2", prevNodePosition[nodePositionIndex[targetName]]['y']);
    }

    linkLine.transition(t)
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
  };


  static flavorSimulation(simulation, centerX, centerY) {
    simulation
        .force("link", d3.forceLink().distance(80))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("x", d3.forceX().strength(0.25).x(centerX))
        .force("y", d3.forceY().strength(0.35).y(centerY));
  }


  static umamiSimulation(simulation, centerX, centerY) {
    simulation
        .force("link",
            d3.forceLink().distance(200)
                .id(function (d) {
                  return d.name;
                }))
        .force("charge", d3.forceManyBody().strength(-2000))
        .force("x", d3.forceX().strength(1.5).x(centerX))
        .force("y", d3.forceY().strength(2.25).y(centerY));
  }

}