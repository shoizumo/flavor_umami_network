import * as d3 from 'd3';
import Mouse from "./Mouse";

export default class Update {
  ///////////////////////////////////////////////////////////////////////////////////////
  /* Update Data */
  static deleteObj(linkLine, nodeCircle, nodeText, linkData, nodeData) {
    return {
      link: Update.deleteLinkData(linkLine, linkData),
      node: Update.deleteNodeData(nodeCircle, nodeData),
      label: Update.deleteLabelData(nodeText, nodeData)
    }
  }


  static addObj(linkLine, nodeCircle, nodeText, nodeData, linkData, dataType, color, dragstarted, dragging, dragended) {
    return {
      link: Update.addLinkData(linkLine, linkData, dataType),
      node: Update.addNodeData(nodeCircle, nodeData, color, dragstarted, dragging, dragended),
      label: Update.addLabelData(nodeText)
    }
  }


  static deleteLinkData (linkLine, linkData) {
    linkLine = linkLine.data(linkData, (d) => {
      return d.name;
    });
    linkLine
        .exit()
        // .transition()
        // .duration(1000)
        // .ease(d3.easeLinear)
        // .attr("opacity", 0.0)
        .remove();

    return linkLine;
  }


  static addLinkData (linkLine, linkData, dataType) {
    let linkLineEnter = linkLine
        .enter()
        .append("line")
        // .attr("opacity", 0.0)
        .attr("stroke-width",  (d) => {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.01 + 0.01;
        })
        .attr("class", (d, i) => {
          return "link" + dataType + String(i);
        });
        // .attr("class", "link");
        // .attr("stroke",  (d) => {
        //   return color[d.group_id_s]
        // });

    linkLine = linkLineEnter.merge(linkLine);
    linkLine
        // .transition()
        // .duration(1000)
        // .ease(d3.easeLinear)
        .attr("opacity", 0.5);


    // change line display order to back of node
    for (let i = linkData.length - 1; 0 <= i; i--) {
      const linkSVG = linkLine['_groups'][0][i];
      const firstSVG = linkSVG.parentNode.firstChild;
      if (firstSVG) {
        linkSVG.parentNode.insertBefore(linkSVG, firstSVG);
      }
    }


    return linkLine;
  }


  static deleteNodeData (nodeCircle, nodeData) {
    nodeCircle = nodeCircle.data(nodeData,  (d) => {
      return d.name;
    });
    nodeCircle
        .exit()
        // .transition()
        // .duration(1000)
        // .ease(d3.easeLinear)
        // .attr("opacity", 0.0)
        .remove();

    return nodeCircle;
  }


   static addNodeData (nodeCircle, nodeData, color, dragstarted, dragging, dragended) {
    nodeCircle = nodeCircle
        .enter()
        .append("circle")
        // .attr("opacity", "0.0")
        .attr("r",  (d) => {
          return Math.sqrt(d.size) * 4 + 2.5;
        })
        .attr("fill",  (d) => {
          return color[d.group_id]
        })
        .attr("stroke", "#fffcf9")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragging)
            .on("end", dragended))
        .merge(nodeCircle);

    // nodeCircle
        // .transition()
        // .duration(1000)
        // .ease(d3.easeLinear)
        // .attr("opacity", 0.6);

    return nodeCircle;
  }


  static deleteLabelData (nodeText, nodeData) {
    nodeText = nodeText.data(nodeData,  (d) => {
      return d.name;
    });
    nodeText
        .exit()
        // .transition()
        // .duration(1000)
        // .ease(d3.easeLinear)
        // .attr("opacity", 0.0)
        .remove();

    return nodeText;
  }


  static addLabelData(nodeText) {
    nodeText = nodeText.enter().append("text").merge(nodeText)
        .text((d) => {
          return d.name;
        });

    nodeText
        // .attr("opacity", 1.0)
        .attr("font-size", ".7em")
        .attr("font-weight", "300")
        .attr("class", "nonDrag")
        .attr("fill", "#352622")
        .attr("font-family", 'Roboto');

     // nodeText.transition()
     //    .duration(1000)
     //    .ease(d3.easeLinear)
     //    .style("opacity", 0.6);

    return nodeText;
  }


  static nodeLabelOpacity(selectedType, nodeCircle, nodeText, nodeData) {
    if (selectedType === 'Umami') {
      for (let i = 0, l = nodeData.length; l > i; i++) {
        nodeCircle['_groups'][0][i].setAttribute("opacity", nodeData[i].umami === 1 ? "0.6" : "0.2");
        nodeText['_groups'][0][i].setAttribute("opacity", nodeData[i].umami === 1 ? "1.0" : "0.5");
      }
    } else {
      nodeCircle.attr("opacity", 0.6);
      nodeText.attr("opacity", 1.0);
    }
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


  static transitNodePosition (nodeCircle, nodeText, nodeData, prevNodePosition, durationTime) {
    const t = d3.transition().duration(durationTime);
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


  static transitLinkPosition (linkLine, linkData, prevNodePosition, durationTime) {
    const t = d3.transition().duration(durationTime);

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
            d3.forceLink().distance(250)
                .id( (d) => {
                  return d.name;
                }))
        .force("charge", d3.forceManyBody().strength(-2000))
        .force("x", d3.forceX().strength(1.5).x(centerX))
        .force("y", d3.forceY().strength(2.0).y(centerY));
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  /* Update Mode */
  // multi mode
  static multiMode(networkMain, networkSub, duration){
    Update.multiModeNetwork(networkMain, duration);
    Update.multiModeNetwork(networkSub, duration);
    Update.multiModeGrid(duration);
    networkMain.setMouseAction();
    Mouse.cursor(networkMain.vizMode === 'Single' ? 'grab' : 'pointer', networkMain.body, networkMain.node);
    Mouse.cursor(networkSub.vizMode === 'Single' ? 'grab' : 'pointer', networkSub.body, networkSub.node);
  }


  static multiModeNetwork(network, duration){
    network.svg
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attr("width", network.width / 2 - 1)
          .attr("height", network.height / 2 - 1);

      network.setVizMode('Multi');
  }


  static multiModeGrid(duration) {
    // document.getElementById("visGrid").style.display = 'grid';
    setTimeout(() => {
      document.getElementById("detailMain").style.display = 'grid';
      document.getElementById("detailSub").style.display = 'grid';
    }, duration);
  }


  // single mode
  static singleMode(networkMain, networkSub, duration) {
    Update.singleModeNetwork(networkMain, duration);
    Update.singleModeNetwork(networkSub, duration);
    Update.deleteNetwork(networkSub, duration);
    Update.singleModeGrid();
    networkMain.setMouseAction();
    Mouse.cursor(networkMain.vizMode === 'Single' ? 'grab' : 'pointer', networkMain.body, networkMain.node);
    Mouse.cursor(networkSub.vizMode === 'Single' ? 'grab' : 'pointer', networkSub.body, networkSub.node);
  }


  static singleModeNetwork(network, duration) {
    network.setVizMode('Single');
    network.svg
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("width", network.vizID === 'Main' ? network.width : 0)
        .attr("height", network.vizID === 'Main' ? network.height : 0);
  }


  static deleteNetwork(network, duration) {
    setTimeout(() => {
      network.deleteContents();
      network.svg.attr("style", "outline: 0px;");
    }, duration);
  }


  static singleModeGrid() {
      document.getElementById("detailMain").style.display = 'none';
      document.getElementById("detailSub").style.display = 'none';
  }


}