import * as d3 from 'd3';
import 'ion-sound';

import Mouse from './Mouse';
import Update from './Update'


export default class Network {
  constructor(flavorData, umamiData, isSp, svgID) {
    this.flavorData = flavorData;
    this.umamiData = umamiData;
    this.linkData = this.flavorData.links;
    this.nodeData = this.flavorData.nodes;

    this.width = 1000;
    this.height = 650;

    this.centerX = this.width / 2 + 30;
    this.centerY = this.height / 2 + 15;

    this.body = d3.select("body");
    this.svg = d3.select(svgID);
    this.scaleRatio = 1.0;
    this.zoomScale = {'scale': 1.0, 'X': 0, 'Y': 0};

    this.svg
        .attr("style", "outline: 1px solid #ff8e1e;")
        .attr("width", this.width / this.scaleRatio)
        .attr("height", this.height / this.scaleRatio)
        .attr("viewBox", "0 0 1000 650");


    this.link = '';
    this.node = '';
    this.label = '';
    this.simulation = d3.forceSimulation();

    this.legend = '';
    this.legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop",
      "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice",
      "fish/seafood", "plant derivative", "flower", "animal product"];

    this.legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
      "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
      "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];

    this.wallMargin = 7.5;


    this.mouseDown = 0;
    this.setIon();
    this.isSp = isSp;

    this.zoomGroup = this.svg.append("g");
    this.zoom_handler = d3.zoom()
        .scaleExtent([0.5, 2])
        // .translateExtent([
        //   [-this.width / 2, -this.height / 2], [this.width + this.width / 2, this.height + this.height / 2]
        // ])
        .on("zoom", this.zoom_actions.bind(this))
        .on("start", this.zoom_start.bind(this))
        .on("end", this.zoom_end.bind(this));

    //zoom initialises
    // this.initialTransform = d3.zoomIdentity
    //     .translate(this.width / 2, this.height / 2)
    //     .scale(0.25);

    this.svg.call(this.zoom_handler);
    // this.svg.call(this.zoom_handler.transform, this.initialTransform);

  }


  zoom_actions() {
    this.zoomGroup.attr("transform", d3.event.transform);
    this.zoomScale = this.getScale();
  }

  zoom_start() {
    this.simulation.alphaTarget(0.3).restart();
  }

  zoom_end() {
    this.simulation.alphaTarget(0);
  }


  getScale() {
    let scale, X, Y;
    let scale_ = this.zoomGroup.attr('transform');
    if (scale_ === "none") {
      scale = 1.0;
    } else {
      let values = scale_.split("scale(")[1];
      scale = values.split(")")[0];

      let values_ = scale_.split("(")[1];
      values_ = values_.split(")")[0];
      values_ = values_.split(",");
      X = values_[0];
      Y = values_[1];

    }

    if (scale > 1){
      return {'scale': 1.0, 'X': 0, 'Y': 0};
    }
    return {scale, X, Y};
  }



  setIon() {
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
  }


  color(n) {
    return this.legendColor[n];
  };


  setLegend() {
    this.legend = this.svg
        .selectAll('.legends')
        .data(this.legendName)
        .enter()
        .append('g')
        .attr("class", "legends")
        .attr("transform", (d, i) => {
          return "translate(20," + (i + 1) * 20 + ")"
        })
        .attr("width", 200)
        .attr("height", 20);

    // $(".legends").css({"cursor": ["pointer"]});
    d3.selectAll(".legends").style("cursor", "pointer");

    this.legend.append('circle') // 凡例の色付け四角
        .attr("cx", 5)
        .attr("cy", 5)
        .attr("r", 9)
        .attr("opacity", 0.6)
        .attr("class", "legendCircle")
        .attr("fill", (d, i) => {
          return this.color(i);
        });

    this.legend.append('text')  // 凡例の文言
        .attr("x", 20)
        .attr("y", 10)
        .attr("class", "legendText")
        .text((d) => {
          return d;
        })
        // .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 15);
  }


  render(){
    this.setLink();
    this.setNode();
    this.setLabel();
    this.setSimulation();
  }


  setLink() {
    this.link = this.zoomGroup.append("g")
        .selectAll("line")
        .data(this.linkData)
        .enter()
        .append("line")
        .attr("opacity", "0.5")
        .attr("stroke-width", (d) => {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.015;
        })
        .attr("stroke", (d) => {
          return this.color(d.group_id_s)
        });
  }


  setNode() {
    this.node = this.zoomGroup.append("g")
        .selectAll("circle")
        .filter(function () {
          return !this.classList.contains('legendCircle')
        })
        .data(this.nodeData)
        .enter()
        .append("circle")
        .attr("opacity", "0.6")
        .attr("r", (d) => {
          return Math.sqrt(d.size) * 4 + 2.5;
        })
        .attr("fill", (d) => {
          return this.color(d.group_id)
        })
        .attr("stroke", "#fffcf9")
        .call(d3.drag()
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragging.bind(this))
            .on("end", this.dragended.bind(this)));
  }


  setLabel() {
    this.label = this.zoomGroup.append("g")
        .selectAll("text")
        .filter(function () {
          return !this.classList.contains('legendText')
        })
        .filter(function () {
          return !this.classList.contains('node_link')
        })
        .data(this.nodeData)
        .enter()
        .append("text")
        .text((d) => {
          return d.name;
        });

    this.label
        .attr("font-size", ".7em")
        .attr("font-weight", "300")
        .attr("class", "nonDrag")
        .attr("fill", "#352622")
        .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]});
  }


  setSimulation() {
    this.simulation.force("link",
        d3.forceLink()
            .distance(80)
            //     .distance(function(d) { return  Math.sqrt(d.weight) * 0.1 + d.weight * 0.5; })
            .strength(0.8)
            .iterations(1.0)
            .id((d) => {
              return d.name;
            })
    ).force("collide",
        d3.forceCollide()
            .radius((d) => {
              return Math.sqrt(d.size) * 4 + 2.5;
            })
            .strength(0.7)
            .iterations(1.0)
    )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(this.centerX, this.centerY))
        .force("x", d3.forceX().strength(0.25).x(this.centerX))
        .force("y", d3.forceY().strength(0.35).y(this.centerY));

    this.simulation
        .nodes(this.nodeData)
        .on("tick", this.ticked.bind(this));

    this.simulation
        .force("link")
        .links(this.linkData);

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////
  ticked() {
    const marginXright = this.wallMargin - this.zoomScale.X / this.zoomScale.scale;
    const marginYup = this.wallMargin - this.zoomScale.Y / this.zoomScale.scale;

    const marginXleft = (this.width - this.zoomScale.X) / this.zoomScale.scale  - this.wallMargin;
    const marginYdown = (this.height - this.zoomScale.Y) / this.zoomScale.scale  - this.wallMargin;

    this.link
        .attr("x1", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.source.x));
        })
        .attr("y1", (d) => {
          return Math.max(marginYup, Math.min(marginYdown, d.source.y));
        })
        .attr("x2", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.target.x));
        })
        .attr("y2", (d) => {
          return Math.max(marginYup, Math.min(marginYdown, d.target.y));
        });
    this.node
        .attr("cx", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.x));
        })
        .attr("cy", (d) => {
          return Math.max(marginYup, Math.min(marginYdown, d.y));
        });

    this.label
        .attr("x", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.x));
        })
        .attr("y", (d) => {
          return Math.max(marginYup, Math.min(marginYdown, d.y));
        });
  }


  // drag event
  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    Mouse.mousedown(d, this.linkData, this.link, this.node, this.label);
    Mouse.cursor('grabbing', this.body, this.node);
    ion.sound.play("grabNode", {
      volume: 0.2 // turn down
    });
    this.mouseDown = 1;
  }

  dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;

    Mouse.mouseup(d, this.linkData, this.link, this.node, this.label);
    Mouse.cursor('grab', this.body, this.node);
    ion.sound.play("releaseNode", {
      volume: 0.5
    });
    this.mouseDown = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////


  update(selectedType) {
    let prevNodePosition = [];
    if (selectedType === 'Flavor') {
      Update.flavorSimulation(this.simulation, this.centerX, this.centerY);
      this.nodeData = this.flavorData.nodes;
      this.linkData = this.flavorData.links;
    } else if (selectedType === 'Umami') {
      Update.umamiSimulation(this.simulation, this.centerX, this.centerY);
      this.nodeData = this.umamiData.nodes;
      this.linkData = this.umamiData.links;
    }


    this.simulation.stop();
    let resDeleteObj;
    let resAddObj;
    new Promise((resolve) => {

      resDeleteObj = Update.deleteObj(this.link, this.node, this.label, this.linkData, this.nodeData);
      setTimeout(() => {
        resolve(
            this.link = resDeleteObj.link,
            this.node = resDeleteObj.node,
            this.label = resDeleteObj.label,
            console.log(1)
        );
      }, 500);

    }).then(() => {

      resAddObj = Update.addObj(this.link, this.node, this.label, this.nodeData, this.linkData, this.legendColor, this.dragstarted, this.dragging, this.dragended);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
              this.link = resAddObj.link,
              this.node = resAddObj.node,
              this.label = resAddObj.label,
              console.log(2)
          )
        }, 500);
      });

    }).then(() => {

      prevNodePosition = Update.storePreviousNodePosition(this.node, this.nodeData, prevNodePosition);
      Update.simulation(this.linkData, this.nodeData, this.simulation, this.ticked.bind(this));
      console.log(3);

    }).then(() => {

      this.simulation.tick(30);
      const t = 3000;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
              Update.transitNodePosition(this.node, this.label, this.nodeData, prevNodePosition, t),
              Update.transitLinkPosition(this.link, this.linkData, prevNodePosition, t),
              console.log(4)
          )
        }, 50);
      });

    });
  }


  setMouseAction() {
    if (!this.isSp) {
      this.node.on("mouseover", (d) => {
        Mouse.mouseover(d, this.linkData, this.link, this.node, this.label);
        if (this.mouseDown === 0) {
          ion.sound.play("mouseover", {
            volume: 0.1 // turn down
          });
        }
      });

      this.node.on("mouseout", (d) => {
        Mouse.mouseout(d, this.linkData, this.link, this.node, this.label)
      });


      // d3.select("body").on("mouseup", () => {
      //   console.log('mouseup')
      //   Mouse.reset(this.linkData, this.link, this.node, this.label);
      //   Mouse.cursor('grab', this.body, this.node);
      //
      // });

      this.svg.on("mouseenter", () => {
        Mouse.reset(this.linkData, this.link, this.node, this.label);
        Mouse.cursor('grab', this.body, this.node);
      });
    }

    /////////////////////////////////////////////////////////////
    // for SmartPhone

    // if (this.isSp) {
    //   let touchColored = 0;
    //   let touchmove = 0;
    //   this.svg.on("touchmove", () => {
    //     touchmove = 1
    //   });
    //
    //   this.node.on("touchstart", (d) => {
    //     Mouse.touchStart(d, this.linkData, this.link, this.node, this.label);
    //   });
    //
    //   node.on("touchend", () => {
    //     touchColored = 0;
    //   });
    //
    //   this.svg.on("touchstart", () => {
    //     touchColored = 1;
    //   });
    //
    //   this.svg.on("touchend", () => {
    //     if (touchmove === 0) {
    //       if (touchColored === 1) {
    //         this.node.attr("class", "nodeReturnFade");
    //         this.link.attr("class", "lineReturnFade");
    //         this.label.attr("class", "nodeTextReturnFade");
    //       }
    //     }
    //     touchmove = 0
    //   });
    // }
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
      Legend.mouseoverFilter(legendId, circle, cell, this.color);

      ion.sound.play("mouseover", {
        volume: 0.1 // turn down
      });
    });

    legendFilter.on("click", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoverClick(legendId, circle, cell, this.color);

      ion.sound.play("legend");
    });

    // legend filter(mouse out)
    legendFilter.on("mouseout", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoutFilter(legendId, circle, cell);
    });
  }
*/
}