import $ from 'jquery';
import * as d3 from 'd3';
// import 'd3-svg-legend/d3-legend';
import 'ion-sound';

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';

import Network from './Network';
import Legend from './Legend'


console.log(flavorData);
console.log(umamiData);

(() => {
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);

  console.log(isSp)


  //make color function
  const color = function (n) {
    return legendColor[n];
  };

  /* Checking if mouse button down or not? */
  // default : up
  let mouseDown = 0;
  document.body.onmousedown = function () {
    mouseDown = 1;
  };
  document.body.onmouseup = function () {
    mouseDown = 0;
  };

  /* //Legend// */
  const legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop",
    "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice",
    "fish/seafood", "plant derivative", "flower", "animal product"];

  const legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
    "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
    "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];

  // const ordinal = d3.scale.ordinal()
  //     .domain(legendName)
  //     .range(legendColor);


  const svg = d3.select("#myGraph");

  svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(25,50)")
      .style("font-size", "1.2em")
      .style("fill", "#352622")
      .style({"font-family": ["Helvetica Neue", "Arial", "sans-serif"]});


  // const legendOrdinal = d3.legend.color()
  //     .shape("path", d3.svg.symbol().type("circle").size(300)())
  //     .shapePadding(4)
  //     .labelOffset(2.5)
  //     //.title("Ingredient Categories")
  //     .scale(ordinal);

  // svg.select(".legendOrdinal")
  //     .call(legendOrdinal);

  // attr of legend circle
  const cell = $(".cell");
  const legendPathDefo = cell.children("path");
  $(legendPathDefo).css({
    "opacity": ["0.6"],
    "stroke-width": ["2"],
    "stroke": ["white"]
  });

  // set pointer cursor at legend
  $(".legendCells").css({"cursor": ["pointer"]});

  /* //Setting// */
  const width = 1000;
  const height = 650;

  let nodes = flavorData.nodes;
  let links = flavorData.links;
  const body = $("body");


  // set svg elements
  let link = d3.select("#myGraph")
    .selectAll("line")
    .data(links)
      .enter()
      .append("line")
      .attr("opacity", "0.5")
      .attr("stroke-width", function (d) {
        return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
      })
      .attr("stroke", function (d) {
        return color(d.group_id)
      });

  let node = d3.select("#myGraph")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
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
          .on("end", dragended));


  let labels = d3.select("#myGraph")
      .selectAll("text").data(nodes).enter().append("text")
      .text(function(d){return d.name;});

  labels
      .attr("font-size", ".7em")
      .attr("font-weight", "300")
      .attr("class", "nonDrag")
      .attr("fill", "#352622")
      .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]});


  const Xcenter = width / 2 + 30;
  const Ycenter = height / 2 + 15;

  let simulation = d3.forceSimulation()
  //.force("center", d3.forceCenter([width / 2 - 50, height / 2 - 10]))
      .force("link",
          d3.forceLink()
              .distance(80)
          //     .distance(function(d) { return  Math.sqrt(d.weight) * 0.1 + d.weight * 0.5; })
              .strength(0.8)
              .iterations(1.0)
      )
      .force("collide",
          d3.forceCollide()
              .radius(function (d) {
                return Math.sqrt(d.size) * 4 + 2.5;
              })
              .strength(0.7)
              .iterations(1.0)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(Xcenter, Ycenter))
      .force("x", d3.forceX().strength(0.25).x(Xcenter))
      .force("y", d3.forceY().strength(0.35).y(Ycenter));

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links)
      .id(function (d) {
        return d.index;
      });


  // tick for simulation
  const wallMargin = 7.5;
  function ticked() {
    link
        .attr("x1", function(d) { return Math.max(wallMargin, Math.min(width  - wallMargin, d.source.x)); })
        .attr("y1", function(d) { return Math.max(wallMargin, Math.min(height - wallMargin, d.source.y)); })
        .attr("x2", function(d) { return Math.max(wallMargin, Math.min(width  - wallMargin, d.target.x)); })
        .attr("y2", function(d) { return Math.max(wallMargin, Math.min(height - wallMargin, d.target.y)); });
    node
        .attr("cx", function(d) { return Math.max(wallMargin, Math.min(width  - wallMargin, d.x)); })
        .attr("cy", function(d) { return Math.max(wallMargin, Math.min(height - wallMargin, d.y)); });

    labels
        .attr("x", function(d){return d.x;})
        .attr("y", function(d){return d.y;});
  }


  // drag event
  function dragstarted(d) {
    if(!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    Network.mousedown(d, links, circle, labels);
    Network.cursor('grabbing', body, circle);
    ion.sound.play("grabNode", {
      volume: 0.2 // turn down
    });
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if(!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;

    Network.mouseup(d, links, circle, labels);
    Network.cursor('grab', body, circle)
    ion.sound.play("releaseNode", {
      volume: 0.5
    });
  }


  // Network dataを更新する
  ////////////////////////////////////////////////////////////////////////////////////////
  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    // 選択されているoption要素を取得する
    const selectedType = this.options[this.selectedIndex].value;

    if (selectedType === 'Flavor') {
      // force
      //     .linkDistance(100)
      //     .gravity(0.20)
      //     .charge(-300);


      simulation
          .force("link", d3.forceLink().distance(80))
          .force("charge", d3.forceManyBody().strength(-300))
          .force("x", d3.forceX().strength(0.25).x(Xcenter))
          .force("y", d3.forceY().strength(0.35).y(Ycenter));


      nodes = flavorData.nodes;
      links = flavorData.links;
      update(selectedType)


    } else if (selectedType === 'Umami') {
      // force
      //     .linkDistance(150)
      //     .gravity(1.80)
      //     .charge(-2500);


      simulation
          .force("link", d3.forceLink().distance(250))
          .force("charge", d3.forceManyBody().strength(-2000))
          .force("x", d3.forceX().strength(2.0).x(Xcenter))
          .force("y", d3.forceY().strength(3.0).y(Ycenter));


      // nodes = umamiData.nodes;
      links = umamiData.links;
      update(selectedType)


    }
  };


  function update(selectedType) {
    let deleteLine = d3.selectAll("line");
    simulation.alphaTarget(0.7).restart();

    // force.nodes(nodes).links(links);
    simulation.force("link")
      .links(links)
      .id(function (d) {
        return d.index;
      });


    link = d3.select("#myGraph")
        .selectAll(".line")
        .data(links)
        .enter()
        .append("line");

    link.attr("opacity", "0.5")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
        })
        .attr("stroke", function (d) {
          return color(d.group_id)
        });

    deleteLine.remove();

    // force.start();
    d3.selectAll("line").style("stroke-width", "");


    // change line display order to back of node
    for (let i = links.length - 1; 0 <= i; i--) {
      const linkSVG = link['_groups'][0][i];
      const firstSVG = linkSVG.parentNode.firstChild;
      if (firstSVG) {
        linkSVG.parentNode.insertBefore(linkSVG, firstSVG);
      }
    }

    setTimeout(() => {
      simulation.alphaTarget(0); //force レイアウトの計算を終了
    }, 5000);

    // update Title
    document.getElementById('h1').textContent = selectedType + ' Network'
  }
  ////////////////////////////////////////////////////////////////////////////////////////


  /* //Mouse action// */
  const circle = $("circle");
  if (!isSp) {
    node.on("mouseover", function (d) {
      Network.mouseover(d, links, circle);
      if (mouseDown === 0) {
        ion.sound.play("mouseover", {
          volume: 0.1 // turn down
        });
      }
    });

    node.on("mouseout", function (d) {
      Network.mouseout(d, links, circle)
    });


    body.on("mouseup", function (d) {
      Network.mouseup(d, links, circle, labels);
      Network.cursor('grab', body, circle)

      console.log('mouseup body')

    });
  }

  /////////////////////////////////////////////////////////////
  // for SmartPhone

  if (isSp) {
    let touchColored = 0;
    let touchmove = 0;
    svg.on("touchmove", function () {
      touchmove = 1
    });

    node.on("touchstart", function (d) {
      Network.touchStart(d, links, circle);
    });

    node.on("touchend", function () {
      touchColored = 0;
    });

    svg.on("touchstart", function () {
      touchColored = 1;
    });

    svg.on("touchend", function () {
      if (touchmove === 0) {
        if (touchColored === 1) {
          d3.selectAll("circle").attr("class", "nodeReturnFade");
          d3.selectAll("line").attr("class", "lineReturnFade");
          circle.parent().children('text').attr("class", "nodeTextReturnFade");
        }
      }
      touchmove = 0
    });
  }

  /*
  /////////////////////////////////////////////////////////////

  Legend.putId2Legend(cell, legendName);
  // ノードを更新する場合は再度クラスを付与する必要あり
  Legend.putClass2Node(nodes, circle);


  let legendFilter = d3.selectAll(".cell");
  if (!isSp) {
    legendFilter.on("mouseover", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoverFilter(legendId, circle, cell, color);

      ion.sound.play("mouseover", {
        volume: 0.1 // turn down
      });
    });

    legendFilter.on("click", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoverClick(legendId, circle, cell, color);

      ion.sound.play("legend");
    });

    // legend filter(mouse out)
    legendFilter.on("mouseout", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoutFilter(legendId, circle, cell);
    });
  }
*/

  /* //sound// */
  // sound setting
  ion.sound({
    sounds: [{name: "opening"},
      {name: "mouseover"},
      {name: "grabNode"},
      {name: "releaseNode"},
      {name: "legend"}],

    // main config
    path: "src/data/sound/",
    preload: true,
    multiplay: true,
    volume: 0.5
  });

  //opening sound
  if (!isSp) {
    ion.sound.play("opening");
  }

})();

