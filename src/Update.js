import * as d3 from 'd3';

export default class Update {

  static linkData (linkLine, linkData, color) {
    const t = d3.transition().duration(5000);
    linkLine = linkLine.data(linkData, function (d) {
      return d.name;
    });
    linkLine.exit().remove();
    linkLine = linkLine.enter().append("line")
        .attr("opacity", "0.5")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
        })
        .attr("stroke", function (d) {
          return color(d.group_id_s)
        })
        .merge(linkLine);

    return linkLine;
  }


  static nodeData (nodeCircle, nodeData, color, dragstarted, dragging, dragended) {
    const t = d3.transition().duration(5000);
    nodeCircle = nodeCircle.data(nodeData, function (d) {
      return d.name;
    });
    nodeCircle.exit().transition(t).attr("r", 0).remove();
    nodeCircle = nodeCircle.enter().append("circle")
        .attr("opacity", "0.6")
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

    return nodeCircle;
  }

  static labelData (nodeText, nodeData) {
    const t = d3.transition().duration(5000);
    nodeText = nodeText.data(nodeData, function (d) {
      return d.name;
    });
    nodeText.exit().transition(t).remove();
    nodeText = nodeText.enter().append("text").merge(nodeText)
        .text(function (d) {
          return d.name;
        });

    nodeText
      .attr("font-size", ".7em")
      .attr("font-weight", "300")
      .attr("class", "nonDrag")
      .attr("fill", "#352622")
      .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]});

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
    for (let i = 0, l = prevNodePosition.length; l > i; i++) {
      nodePositionIndex[prevNodePosition[i]['name']] = i;
    }

    for (let i = 0, l = linkData.length; l > i; i++) {
      const sourceName = linkLine['_groups'][0][i]['__data__']['source']['name'];
      const targetName = linkLine['_groups'][0][i]['__data__']['target']['name'];

      linkLine['_groups'][0][i].setAttribute("x1", prevNodePosition[nodePositionIndex[sourceName]]['x']);
      linkLine['_groups'][0][i].setAttribute("y1", prevNodePosition[nodePositionIndex[sourceName]]['y']);
      linkLine['_groups'][0][i].setAttribute("x2", prevNodePosition[nodePositionIndex[targetName]]['x']);
      linkLine['_groups'][0][i].setAttribute("y2", prevNodePosition[nodePositionIndex[targetName]]['y']);
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