import * as d3 from 'd3';
import Mouse from './Mouse';
import Update from './Update'
import Connection from "./Connection";

export default class Network {
  constructor(flavorData, umamiData, isSp, svgID, dataType, vizMode, vizID, nodeInfo) {
    this.isSp = isSp;
    this.flavorData = flavorData;
    this.umamiData = umamiData;

    this.dataType = dataType;
    this.vizMode = vizMode;
    this.vizID = vizID;

    this.linkData = dataType === 'Flavor' ? this.flavorData.links : this.umamiData.links;
    this.nodeData = dataType === 'Flavor' ? this.flavorData.nodes : this.umamiData.nodes;

    this.width = 1000 - 2;
    this.height = 650 - 2;

    this.centerX = this.width / 2 + 30;
    this.centerY = this.height / 2 + 15;

    this.body = d3.select("body");
    this.svg = d3.select(svgID);

    this.svg
        .attr("style", "outline: 1px solid #ff8e1e;")
        // .attr("width", this.width / this.scaleRatio)
        // .attr("height", this.height / this.scaleRatio)
        .attr("width", vizMode === 'Single' ? this.width : 0)
        .attr("height", vizMode === 'Single' ? this.height : 0)
        .attr("viewBox", "0 0 1000 650");


    this.link = '';
    this.node = '';
    this.label = '';
    this.simulation = d3.forceSimulation();

    this.nodeInfo = nodeInfo;
    this.clickedNodeIndex = -1;
    this.isClicked = 0;
    this.isDragging = 0;
    this.isMouseoutFirst = true;
    this.prevName2nd = '';

    this.mouseoutSetTimeout = '';
    this.mouseoutSetTimeoutDuration = 1000;


    this.legend = '';
    this.legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop",
      "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice",
      "fish/seafood", "plant derivative", "flower", "animal product"];

    this.legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
      "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
      "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];

    this.wallMargin = 7.5;


    // this.scaleRatio = 1.0;
    this.zoomScale = {'scale': 1.0, 'X': 0, 'Y': 0};
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


    // gradient link color list for each link
    this.gradient = [];
  }



  ////////////////////////////////////////////////////////////////////////////////////////////
  // render
  render() {
    this.setLegend();
    this.setLink();
    this.setLinkGradientColor();
    this.setNode();
    this.setLabel();
    this.setSimulation();
    this.setMouseAction();
  }


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
        .attr("height", 20)
        .attr("fill", "#352622")
        .attr("font-family", 'Roboto');

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
        .style("text-anchor", "start")
        .style("font-size", 15);
  }


  setLink() {
    this.link = this.zoomGroup.append("g")
        .selectAll("line")
        .data(this.linkData)
        .enter()
        .append("line")
        .attr("opacity", "0.5")
        .attr("stroke-width", (d) => {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.01 + 0.01;
        })
        // .attr("stroke", (d) => {
        //   // return this.color(d.group_id_s)
        // })
        .attr("class", (d, i) => {
          return "link" + this.dataType + String(i);
        })
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
        // .attr("opacity", "0.6")
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

    if (this.dataType === 'Flavor') {
      this.node.attr("opacity", "0.6")
    } else {
      this.node.attr("opacity", (d) => {
        return d.umami === 1 ? "0.6" : "0.2";
      })
    }
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
        .attr("font-family", 'Roboto');

    if (this.dataType === 'Flavor') {
      this.label.attr("opacity", "1.0")
    } else {
      this.label.attr("opacity", (d) => {
        return d.umami === 1 ? "1.0" : "0.5";
      })
    }
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
    ).force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(this.centerX, this.centerY))
        .force("x", d3.forceX().strength(0.25).x(this.centerX))
        .force("y", d3.forceY().strength(0.35).y(this.centerY))
        .alphaMin(0.01);


    if (this.dataType === 'Umami') {
      Update.umamiSimulation(this.simulation, this.centerX, this.centerY);
      this.simulation.alpha([0.3])
    }else{
      this.simulation.alpha([0.7]);
    }

    this.simulation
        .nodes(this.nodeData)
        .on("tick", this.ticked.bind(this));

    this.simulation
        .force("link")
        .links(this.linkData);
  }


  setLinkGradientColor() {
    this.gradient = [];
    const gradientObj = this.svg.append("g").attr("class", "gradient" + this.vizID + this.dataType);
    // this.deleteClassElement("gradient" + this.vizID);

    for (let i = 0, l = this.linkData.length; l > i; i++) {
      this.gradient[i] = gradientObj
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient" + this.dataType + String(i))
          .attr("spreadMethod", "pad");
      // source color
      this.gradient[i].append("stop")
          .attr("offset", "0%")
          .attr("stop-color", () => {
            return this.color(this.linkData[i].group_id_s);
          })
          .attr("stop-opacity", 1);
      // target color
      this.gradient[i].append("stop")
          .attr("offset", "100%")
          .attr("stop-color", () => {
            return this.color(this.linkData[i].group_id_t);
          })
          .attr("stop-opacity", 1);
    }
  }


  gradientUnitVector(x, y) {
    // scale = 0.5
    const magnitude = Math.sqrt(x * x + y * y);
    const X = x / magnitude;
    const Y = y / magnitude;

    // const unitVector = {'X' : X / magnitude, 'Y' : Y / magnitude};
    return {'X': X * 0.5, 'Y': Y * 0.5};
  };


  ////////////////////////////////////////////////////////////////////////////////////////////
  // mouse action
  setMouseAction() {
    if (this.vizMode === 'Single') {
      this.setMouseActionSingle();
    }else{
      this.setMouseActionMulti();
    }
  }


  setMouseActionSingle() {
    this.node.on("mouseover", (d) => {
      if (this.isDragging === 0) {
       this.mouseover(d);
      }
    });


    this.node.on("mouseout", () => {
      if (this.isDragging === 0) {
        this.mouseoutSetTimeout = setTimeout(() => {
          this.mouseout();
        }, this.mouseoutSetTimeoutDuration);
      }
    });


    this.svg.on("mouseenter", () => {
      this.mouseenter();
    });

  }


  setMouseActionMulti() {
    this.node.on("mouseover", (d) => {

      if (this.isClicked === 0){
        this.mouseover(d);
      }
      else{
        if (d.index !== this.clickedNodeIndex) {
          this.mouseover2nd(this.clickedNodeIndex, d);
        }
      }

    });


    this.node.on("mouseout", (d) => {
      if (this.isClicked === 0) {
        this.mouseoutSetTimeout = setTimeout(() => {
          // console.log('reset', this.isClicked, 'this.isClicked === 0');
          this.mouseout();
          Connection.deleteDetail('detailMain1');
          Connection.deleteDetail('detailMain2');
          Connection.deleteDetail('detailSub1');
          Connection.deleteDetail('detailSub2');
        }, this.mouseoutSetTimeoutDuration);
      }
      // after clicked
      else {

        if (d.index !== this.clickedNodeIndex) {

          if (this.prevName2nd !== d.name) {
            this.isMouseoutFirst = true
          }

          if (!this.isMouseoutFirst) {
              this.mouseout();
              Connection.deleteDetail('detailMain2');
              Connection.deleteDetail('detailSub2');
              this.returnToPrevClickedNodeMouseover(this.clickedNodeIndex);
              this.isMouseoutFirst = true
          }

          else {
            this.isMouseoutFirst = false
          }
        }
      }
    });


    this.node.on("click", (d) => {
      this.mouseclick(d);
    });


    this.svg.on("mouseenter", () => {
      if (this.isClicked === 0) {
        this.mouseenter();
      }
    });

  }


  mouseover(d) {
    Mouse.fadeClickable(d.index, this.linkData, this.link, this.node, this.label);
    clearInterval(this.mouseoutSetTimeout);
    this.nodeInfo.name = d.name;
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseover';  // event trigger
  }

  mouseover2nd(oldIndex, newNode) {
    Mouse.fadeNoClick2nd(newNode.index, this.linkData, this.link, this.node, this.label);
    Mouse.noFadeNoClick2nd(oldIndex, this.linkData, this.link, this.node, this.label);
    clearInterval(this.mouseoutSetTimeout);
    this.prevName2nd = this.nodeInfo.name2nd;
    this.nodeInfo.name2nd = newNode.name;
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseover2nd';  // event trigger
  }

  mouseout() {
    this.nodeInfo.name2nd = '';
    Mouse.reset(this.linkData, this.link, this.node, this.label, this.dataType);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseout';  // event trigger
  }

  mouseenter() {
    Mouse.reset(this.linkData, this.link, this.node, this.label, this.dataType);
    Mouse.cursor(this.vizMode === 'Single' ? 'grab' : 'pointer', this.body, this.node);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseenter';  // event trigger
  }

  mouseclick(d) {
    Mouse.fadeNoClick(d.index, this.linkData, this.link, this.node, this.label);
    this.nodeInfo.name = d.name;
    this.nodeInfo.network = this.vizID;
    this.isClicked = 1;
    this.clickedNodeIndex = d.index;
    this.nodeInfo.mouseAction = 'click';  // event trigger
  }

  returnToPrevClickedNodeMouseover(prevIndex){
    Mouse.fadeNoClick(prevIndex, this.linkData, this.link, this.node, this.label);
    this.nodeInfo.mouseAction = 'mouseover';  // event trigger
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  //   /////////////////////////////////////////////////////////////
  //   // for SmartPhone
  //
  //   // if (this.isSp) {
  //   //   let touchColored = 0;
  //   //   let touchmove = 0;
  //   //   this.svg.on("touchmove", () => {
  //   //     touchmove = 1
  //   //   });
  //   //
  //   //   this.node.on("touchstart", (d) => {
  //   //     Mouse.touchStart(d.index, this.linkData, this.link, this.node, this.label);
  //   //   });
  //   //
  //   //   node.on("touchend", () => {
  //   //     touchColored = 0;
  //   //   });
  //   //
  //   //   this.svg.on("touchstart", () => {
  //   //     touchColored = 1;
  //   //   });
  //   //
  //   //   this.svg.on("touchend", () => {
  //   //     if (touchmove === 0) {
  //   //       if (touchColored === 1) {
  //   //         this.node.attr("class", "nodeReturnFade");
  //   //         this.link.attr("class", "lineReturnFade");
  //   //         this.label.attr("class", "nodeTextReturnFade");
  //   //       }
  //   //     }
  //   //     touchmove = 0
  //   //   });
  //   // }
  // }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // tick event
  ticked() {
    if (this.vizMode === 'Single' && this.zoomScale.scale <= 1) {
      this.tickBounceWall();
    } else {
      this.tickNoBounce();
    }
  }


  tickBounceWall() {
    const marginXright = this.wallMargin - this.zoomScale.X / this.zoomScale.scale;
    const marginYtop = this.wallMargin - this.zoomScale.Y / this.zoomScale.scale;

    const marginXleft = (this.width - this.zoomScale.X) / this.zoomScale.scale - this.wallMargin;
    const marginYbottom = (this.height - this.zoomScale.Y) / this.zoomScale.scale - this.wallMargin;

    this.link.attr("x1", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.source.x));
        })
        .attr("y1", (d) => {
          return Math.max(marginYtop, Math.min(marginYbottom, d.source.y));
        })
        .attr("x2", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.target.x));
        })
        .attr("y2", (d) => {
          return Math.max(marginYtop, Math.min(marginYbottom, d.target.y));
        })
        .attr("d", (d) => {

      const gradientVector = this.gradientUnitVector(d.target.x - d.source.x, d.target.y - d.source.y);
      // loop by index
      this.gradient[d.index]
          .attr("x1", 0.5 - gradientVector.X)
          .attr("y1", 0.5 - gradientVector.Y)
          .attr("x2", 0.5 + gradientVector.X)
          .attr("y2", 0.5 + gradientVector.Y);
    });

    this.node
        .attr("cx", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.x));
        })
        .attr("cy", (d) => {
          return Math.max(marginYtop, Math.min(marginYbottom, d.y));
        });

    this.label
        .attr("x", (d) => {
          return Math.max(marginXright, Math.min(marginXleft, d.x));
        })
        .attr("y", (d) => {
          return Math.max(marginYtop, Math.min(marginYbottom, d.y));
        });
  }



  tickNoBounce() {
    this.link
        .attr("x1", (d) => {
          return d.source.x;
        })
        .attr("y1", (d) => {
          return d.source.y;
        })
        .attr("x2", (d) => {
          return d.target.x;
        })
        .attr("y2", (d) => {
          return d.target.y;
        })
        .attr("d", (d) => {

      const gradientVector = this.gradientUnitVector(d.target.x - d.source.x, d.target.y - d.source.y);
      this.gradient[d.index]
          .attr("x1", 0.5 - gradientVector.X)
          .attr("y1", 0.5 - gradientVector.Y)
          .attr("x2", 0.5 + gradientVector.X)
          .attr("y2", 0.5 + gradientVector.Y);
    });

    this.node
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y;
        });

    this.label
        .attr("x", (d) => {
          return d.x;
        })
        .attr("y", (d) => {
          return d.y;
        });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // drag event
  dragstarted(d) {
    if (this.vizMode === 'Single') {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;

      Mouse.fadeNoClick(d.index, this.linkData, this.link, this.node, this.label);
      Mouse.cursor('grabbing', this.body, this.node);
    }
    this.isDragging = 1;
  }

  dragging(d) {
    if (this.vizMode === 'Single') {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
  }

  dragended(d) {
    if (this.vizMode === 'Single') {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;

      Mouse.reset(this.linkData, this.link, this.node, this.label, this.dataType);
      Mouse.fadeClickable(d.index, this.linkData, this.link, this.node, this.label);
      Mouse.cursor('grab', this.body, this.node);
    }
    this.isDragging = 0;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // zoom event
  zoom_actions() {
    this.zoomGroup.attr("transform", d3.event.transform);
    this.zoomScale = this.getScale();
  }

  zoom_start() {
    if (this.vizMode === 'Single') {
      this.simulation.alphaTarget(0.5).restart();
    }
  }

  zoom_end() {
    if (this.vizMode === 'Single') {
      this.simulation.alphaTarget(0);
    }
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
    return {scale, X, Y};
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // update network data
  update(selectedType) {
    let prevNodePosition = [];
    this.updateData(selectedType);
    this.simulation.stop();
    const updateObjTime = 500;
    const transitionTime = 3000;

    new Promise((resolve) => {
      this.updateDeletedObj(resolve, updateObjTime);

    }).then(() => {
      return this.upadteAddedObj(updateObjTime);

    }).then(() => {
      return this.upadtePositionData(prevNodePosition);

    }).then(() => {
      return this.transitPosition(selectedType, prevNodePosition, transitionTime);

    }).then(() => {
      return this.restartSimulation(transitionTime);

    }).then(() => {
      this.returnSimulationToDefault(transitionTime);
    });
  }


  updateData(selectedType) {
    this.dataType = selectedType;
    if (selectedType === 'Flavor') {
      Update.flavorSimulation(this.simulation, this.centerX, this.centerY);
      this.nodeData = this.flavorData.nodes;
      this.linkData = this.flavorData.links;
    } else if (selectedType === 'Umami') {
      Update.umamiSimulation(this.simulation, this.centerX, this.centerY);
      this.nodeData = this.umamiData.nodes;
      this.linkData = this.umamiData.links;
    }
    this.setLinkGradientColor();
  }


  updateDeletedObj(resolve, updateObjTime) {
    const resDeletedObj = Update.deleteObj(this.link, this.node, this.label, this.linkData, this.nodeData);
    setTimeout(() => {
      resolve(
          this.link = resDeletedObj.link,
          this.node = resDeletedObj.node,
          this.label = resDeletedObj.label,
          console.log(1)
      );
    }, updateObjTime);
  }


  upadteAddedObj(updateObjTime) {
    const resAddedObj = Update.addObj(this.link, this.node, this.label, this.nodeData, this.linkData,
        this.dataType, this.legendColor, this.dragstarted, this.dragging, this.dragended);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
            this.link = resAddedObj.link,
            this.node = resAddedObj.node,
            this.label = resAddedObj.label,
            console.log(2)
        )
      }, updateObjTime);
    });
  }


  upadtePositionData(prevNodePosition) {
    return new Promise((resolve) => {
      resolve(
          prevNodePosition = Update.storePreviousNodePosition(this.node, this.nodeData, prevNodePosition),
          Update.simulation(this.linkData, this.nodeData, this.simulation, this.ticked.bind(this)),
          console.log(3)
      )
    });
  }


  transitPosition(selectedType, prevNodePosition, transitionTime) {
    setTimeout(() => {
      Update.nodeLabelOpacity(selectedType, this.node, this.label, this.nodeData);
    }, 500);

    this.simulation.tick(30);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
            Update.transitNodePosition(this.node, this.label, this.nodeData, prevNodePosition, transitionTime),
            Update.transitLinkPosition(this.link, this.linkData, prevNodePosition, transitionTime),
            console.log(4)
        )
      }, 50);
    });
  }

  restartSimulation(transitionTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
            // this.simulation.alphaTarget(0.0).restart(),
            this.simulation.alphaTarget(0.3).restart(),
            this.deleteClassElement("gradient" + this.vizID + (this.dataType === 'Flavor' ? 'Umami' : 'Flavor')),
            console.log(5)
        )
      }, transitionTime);
    });
  }

  returnSimulationToDefault(transitionTime) {
      setTimeout(() => {
        this.simulation.alphaTarget(0.0);
        console.log(6);
      }, transitionTime);
  }



  ////////////////////////////////////////////////////////////////////////////////////////////
  // utility
  detectNodeIndex(nodeName) {
    for (let i = 0, l = this.nodeData.length; l > i; i++) {
      if (this.nodeData[i].name === nodeName) {
        return i;
      }
    }
  }

  detectNodeCategory(nodeName) {
    for (let i = 0, l = this.nodeData.length; l > i; i++) {
      if (this.nodeData[i].name === nodeName) {
        return this.nodeData[i].group_id;
      }
    }
  }

  setVizMode(vizMode) {
    this.vizMode = vizMode;
  }

  color(n) {
    return this.legendColor[n];
  };

  deleteContents() {
    this.svg.selectAll("*").remove();
  }

  deleteClassElement(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = elements.length - 1; i >= 0; i--) {
      let e = elements[i];
      if (e) {
        e.parentNode.removeChild(e);
      }
    }
  }

  /*
  ////////////////////////////////////////////////////////////////////////////////////////////

  Legend.putId2Legend(cell, legendName);
  // ノードを更新する場合は再度クラスを付与する必要あり
  Legend.putClass2Node(nodes, circle);


  let legendFilter = d3.selectAll(".cell");
  if (!isSp) {
    legendFilter.on("mouseover", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoverFilter(legendId, circle, cell, this.color);

    });

    legendFilter.on("click", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoverClick(legendId, circle, cell, this.color);

    });

    // legend filter(mouse out)
    legendFilter.on("mouseout", function () {
      const legendId = this.id.slice(9);
      Legend.mouseoutFilter(legendId, circle, cell);
    });
  }
*/
}