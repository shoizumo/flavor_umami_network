import * as d3 from 'd3';
import 'ion-sound';

import flavorData from './data/flavor_data';
import umamiData from './data/umami_data';

import Mouse from './Mouse';
import Update from './Update'


console.log(flavorData);
console.log(umamiData);

(() => {
  let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
      navigator.userAgent.indexOf('iPad') > 0) ||
      navigator.userAgent.indexOf('iPod') > 0 ||
      navigator.userAgent.indexOf('Android') > 0);

  console.log(isSp);


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

  const svg = d3.select("#myGraph");

  /* //Legend// */
  const legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop",
    "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice",
    "fish/seafood", "plant derivative", "flower", "animal product"];

  const legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
    "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
    "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];

  const legend = svg
      .selectAll('.legends')
      .data(legendName)
      .enter()
      .append('g')
      .attr("class", "legends")
      .attr("transform", function (d, i) {
        return "translate(20," + (i + 1) * 20 + ")"
      })
      .attr("width", 200)
      .attr("height", 20);

  // $(".legends").css({"cursor": ["pointer"]});
  d3.selectAll(".legends").style("cursor", "pointer");

  legend.append('circle') // 凡例の色付け四角
      .attr("cx", 5)
      .attr("cy", 5)
      .attr("r", 9)
      .attr("opacity", 0.6)
      .attr("class", "legendCircle")
      .attr("fill", function (d, i) {
        return color(i);
      });

  legend.append('text')  // 凡例の文言
      .attr("x", 20)
      .attr("y", 10)
      .attr("class", "legendText")
      .text(function (d) {
        return d;
      })
      // .attr("class", "textselected")
      .style("text-anchor", "start")
      .style("font-size", 15);


  /* //Setting// */
  const width = 1000;
  const height = 650;

  let nodes = flavorData.nodes;
  let links = flavorData.links;
  const body = d3.select("body");


  // set svg elements
  let link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("opacity", "0.5")
      .attr("stroke-width", function (d) {
        return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
      })
      .attr("stroke", function (d) {
        return color(d.group_id_s)
      });

  let node = svg
      .selectAll("circle")
      .filter(function () {
        return !this.classList.contains('legendCircle')
      })
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


  let label = svg
      .selectAll("text")
      .filter(function () {
        return !this.classList.contains('legendText')
      })
      .filter(function () {
        return !this.classList.contains('node_link')
      })
      .data(nodes)
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


  const centerX = width / 2 + 30;
  const centerY = height / 2 + 15;

  let simulation = d3.forceSimulation()
  //.force("center", d3.forceCenter([width / 2 - 50, height / 2 - 10]))
      .force("link",
          d3.forceLink()
              .distance(80)
              //     .distance(function(d) { return  Math.sqrt(d.weight) * 0.1 + d.weight * 0.5; })
              .strength(0.8)
              .iterations(1.0)
              .id(function (d) {
                return d.name;
              })
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
      .force("center", d3.forceCenter(centerX, centerY))
      .force("x", d3.forceX().strength(0.25).x(centerX))
      .force("y", d3.forceY().strength(0.35).y(centerY));

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);


  // tick for simulation
  const wallMargin = 7.5;

  function ticked() {
    link
        .attr("x1", function (d) {
          return Math.max(wallMargin, Math.min(width - wallMargin, d.source.x));
        })
        .attr("y1", function (d) {
          return Math.max(wallMargin, Math.min(height - wallMargin, d.source.y));
        })
        .attr("x2", function (d) {
          return Math.max(wallMargin, Math.min(width - wallMargin, d.target.x));
        })
        .attr("y2", function (d) {
          return Math.max(wallMargin, Math.min(height - wallMargin, d.target.y));
        });
    node
        .attr("cx", function (d) {
          return Math.max(wallMargin, Math.min(width - wallMargin, d.x));
        })
        .attr("cy", function (d) {
          return Math.max(wallMargin, Math.min(height - wallMargin, d.y));
        });

    label
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        });
  }


  // drag event
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    Mouse.mousedown(d, links, link, node, label);
    Mouse.cursor('grabbing', body, node);
    ion.sound.play("grabNode", {
      volume: 0.2 // turn down
    });
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;

    Mouse.mouseup(d, links, link, node, label);
    Mouse.cursor('grab', body, node);
    ion.sound.play("releaseNode", {
      volume: 0.5
    });
  }


  // Network dataを更新する
  ////////////////////////////////////////////////////////////////////////////////////////
  let prevNodePosition;
  const dataTypeSelector = document.getElementById('dataType');
  dataTypeSelector.onchange = function () {
    prevNodePosition = [];
    // 選択されているoption要素を取得する
    const selectedType = this.options[this.selectedIndex].value;

    if (selectedType === 'Flavor') {
      Update.flavorSimulation(simulation, centerX, centerY);
      nodes = flavorData.nodes;
      links = flavorData.links;
    } else if (selectedType === 'Umami') {
      Update.umamiSimulation(simulation, centerX, centerY);
      nodes = umamiData.nodes;
      links = umamiData.links;
    }


    simulation.stop();
    let resDeleteObj;
    let resAddObj;
    new Promise((resolve) => {
      setTimeout(function () {
        resolve(resDeleteObj = Update.deleteObj(link, node, label, links, nodes));
        console.log(1);
      }, 3000);
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve(
              resAddObj = Update.addObj(resDeleteObj.link, resDeleteObj.node, resDeleteObj.label,
                  nodes, links, color, dragstarted, dragging, dragended),
              link = resAddObj.link,
              node = resAddObj.node,
              label = resAddObj.label,
              console.log(2)
          )
        }, 1000);
      });
    }).then(() => {
      prevNodePosition = Update.storePreviousNodePosition(node, nodes, prevNodePosition);
      Update.simulation(links, nodes, simulation, ticked);
      console.log(3);
    }).then(() => {
      prevNodePosition = Update.storePreviousNodePosition(node, nodes, prevNodePosition);
      console.log(4);
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve(simulation.tick(30));
          console.log(5);
        }, 1000);
      });
    }).then(() => {
      setTimeout(Update.transitNodePosition(node, label, nodes, prevNodePosition), 0);
      setTimeout(Update.transitLinkPosition(link, links, prevNodePosition), 0);
      console.log(6);
    });

    setMouseAction();
    // update Title
    document.getElementById('h1').textContent = selectedType + ' Network';
  };

  ////////////////////////////////////////////////////////////////////////////////////////


  /* //Mouse action// */
  setMouseAction();

  function setMouseAction() {
    if (!isSp) {
      node.on("mouseover", function (d) {
        Mouse.mouseover(d, links, link, node, label);
        if (mouseDown === 0) {
          ion.sound.play("mouseover", {
            volume: 0.1 // turn down
          });
        }
      });

      node.on("mouseout", function (d) {
        Mouse.mouseout(d, links, link, node, label)
      });


      d3.select("body").on("mouseup", function () {
        Mouse.reset(links, link, node, label);
        Mouse.cursor('grab', body, node);

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
        Mouse.touchStart(d, links, link, node, label);
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
            // d3.selectAll("circle")
            //     .filter(function () {
            //       return !this.classList.contains('legendCircle')
            //     })
            //     .attr("class", "nodeReturnFade");
            // d3.selectAll("line").attr("class", "lineReturnFade");
            // circle.parent().children('text').attr("class", "nodeTextReturnFade");

            // 上の書き換え(動作未確認)
            node.attr("class", "nodeReturnFade");
            link.attr("class", "lineReturnFade");
            label.attr("class", "nodeTextReturnFade");
          }
        }
        touchmove = 0
      });
    }
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

