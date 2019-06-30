import * as d3 from 'd3';

export default class Update {

  static rerender(svg, simulation, linkData, nodeData, ticked, dragstarted, dragging, dragended, color) {
    let deleteObjList = Update.getDeletObj();

    simulation.alphaTarget(0.7).restart();
    simulation
        .nodes(nodeData)
        .on("tick", ticked);
    simulation.force("link")
        .links(linkData);

    let link = Update.link(svg, linkData, color);
    let node = Update.node(svg, nodeData, color, dragstarted, dragging, dragended);
    let label = Update.label(svg, nodeData);


    Update.deleteObj(deleteObjList);

    // force.start();
    d3.selectAll("line").style("stroke-width", "");


    // change line display order to back of node
    for (let i = linkData.length - 1; 0 <= i; i--) {
      const linkSVG = link['_groups'][0][i];
      const firstSVG = linkSVG.parentNode.firstChild;
      if (firstSVG) {
        linkSVG.parentNode.insertBefore(linkSVG, firstSVG);
      }
    }

    // setTimeout(() => {
    //   simulation.alphaTarget(0); //force レイアウトの計算を終了
    // }, 5000);
    return [simulation, link, node, label]
  }


  static link(svg, linkData, color) {
    let link = svg
        .selectAll(".line")
        .data(linkData)
        .enter()
        .append("line");

    link.attr("opacity", "0.5")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
        })
        .attr("stroke", function (d) {
          return color(d.group_id_s)
        });
    return link;
  }


  static node(svg, nodeData, color, dragstarted, dragging, dragended) {
    let node = svg
        .selectAll(".circle")
        .filter(function () {
          return !this.classList.contains('legendCircle')
        })
        .data(nodeData)
        .enter()
        .append("circle");

    node.attr("opacity", "0.6")
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
            .on("end", dragended));
    return node;
  }


  static label(svg, nodeData) {
    let label = svg
        .selectAll(".text")
        .filter(function () {
          return !this.classList.contains('legendText')
        })
        .filter(function () {
          return !this.classList.contains('node_link')
        })
        .data(nodeData)
        .enter()
        .append("text")
        .text(function (d) {
          return d.name;
        });

    label
        .attr("font-size", ".7em")
        .attr("font-weight", "300")
        .attr("class", "nonDrag")
        .attr("fill", "#352622")
        .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]});
    return label;
  }


  static getDeletObj() {
    let deleteLine = d3.selectAll("line");
    let deleteNode = d3.selectAll("circle")
        .filter(function () {
          return !this.classList.contains('legendCircle')
        });
    let deleteLabel = d3.selectAll("text")
        .filter(function () {
          return !this.classList.contains('legendText')
        })
        .filter(function () {
          return !this.classList.contains('node_link')
        });

    return [deleteLine, deleteNode, deleteLabel]
  }


  static deleteObj(objList) {
    // list, node, label
    objList[0].remove();
    objList[1].remove();
    objList[2].remove();
  }


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