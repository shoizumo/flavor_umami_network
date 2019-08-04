import * as d3 from 'd3';
import Mouse from './Mouse';
import Update from './Update'
import Connection from "./Connection";
import SvgStyle from "./SvgStyle";

export default class Network {
  constructor(flavorData, umamiData, isPC, svgID, dataType, vizMode, vizID, nodeInfo) {
    this.isPC = isPC;
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
    this.vizArea = d3.select("#visGrid");

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
    this.isClicked = 0;  // "Both":0->mouseenter(), 1->mouseclick()
    this.isNodeClick = 0;  // "Mobile":0->click except for node, 1->click
    this.isDragging = 0;
    this.isMouseoutFirst = true;
    this.prev1stLinkedMouseoverNodeName = '';
    this.linked1stNodeList = [];


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
        .scaleExtent([0.5, this.isPC ? 2 : 5])
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
    this.isGradientUpdateList = [];

    this.highlightNode = '';
    this.highlightNodeIndex = '';
    this.highlightNodeLinked = '';
    this.highlightNodeLinkedIndex = '';

  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // render
  render() {
    this.setLegend();
    this.setLinkGradientColor();
    this.setLink();
    this.setSvgPattern();
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
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.01 + 0.3;
        })
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
        .attr("r", (d) => {
          return Math.sqrt(d.size) * 3.5 + 5;
        })
        .attr("fill", (d) => {
          // return this.color(d.group_id);
          return 'url(#' + 'Horizontal' + this.color(d.group_id) + ')';

        })
        .attr("stroke", "#fffcf9")
        .attr("stroke-width", "1.0");

    if (this.isPC) {
      this.node.call(d3.drag()
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragging.bind(this))
            .on("end", this.dragended.bind(this)));
    }

    if (this.dataType === 'Flavor') {
      this.node.attr("opacity", "0.6")
    } else {
      this.node.attr("opacity", (d) => {
        return d.umami === 1 ? "0.6" : "0.2";
      })
    }

    /* highlight node */
    this.highlightNode = this.zoomGroup.append("g")
        .append("circle")
        .attr("class", "highlightNode");

    this.highlightNodeLinked = this.zoomGroup.append("g")
        .append("circle")
        .attr("class", "highlightNode");
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
      this.label.attr("opacity", "0.8")
    } else {
      this.label.attr("opacity", (d) => {
        return d.umami === 1 ? "0.8" : "0.5";
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
              return Math.sqrt(d.size) * 3.5 + 5;
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
    } else {
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
    this.isGradientUpdateList = [];
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

      if (this.linkData[i].group_id_s !== this.linkData[i].group_id_t) {
        this.isGradientUpdateList.push(true);
      } else {
        this.isGradientUpdateList.push(false);
      }

    }
  }


  setSvgPattern() {
    if (this.vizID === 'Main') {
      for (let i = 0, l = this.legendColor.length; l > i; i++) {
        SvgStyle.horizontalStripe(this.svg, this.legendColor[i]);
        SvgStyle.verticalStripe(this.svg, this.legendColor[i]);
      }
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // highlight node
  statrHighlightNode(d, type) {
    if(type === '1st'){
      this.highlightNodeIndex = d.index;
    }else{
      this.highlightNodeLinkedIndex = d.index;
    }
    this.updateHighlightNodeStyle(Math.sqrt(d.size) * 3.5 + 10, this.color(d.group_id), type);
    const node = this.node['_groups'][0][d.index];
    this.updateHighlightNodePosition(node.cx.baseVal.value, node.cy.baseVal.value, type);
  }

  stopHighlightNode() {
    this.highlightNodeIndex = '';
    this.highlightNodeLinkedIndex = '';
    this.updateHighlightNodeStyle(0, '#ffffff', '1st');
    this.updateHighlightNodeStyle(0, '#ffffff', '2nd');
  }

  updateHighlightNodeStyle(r, color, type){
    let node;
    if (type === '1st'){
      node = this.highlightNode;
    } else{
      node = this.highlightNodeLinked;
    }
    node.attr("r", () => {
          return r;
        })
        .attr("stroke", color)
  }

  updateHighlightNodePosition(x, y, type) {
    let node;
    if (type === '1st'){
      node = this.highlightNode;
    } else{
      node = this.highlightNodeLinked;
    }
    node.attr("cx", () => {
          return x;
        })
        .attr("cy", () => {
          return y;
        });

    node.attr("transform-origin",  String(x) + " " + String(y))
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  // mouse action
  setMouseAction() {
    if (!this.isPC){
      this.setMouseActionMobile();
      return;
    }
    if (this.vizMode === 'Single') {
      this.setMouseActionSingle();
    } else {
      this.setMouseActionMulti();
    }
  }


  setMouseActionMobile() {
    // click node
    this.node.on("click", (d) => {
      this.isNodeClick = 1;
      if (this.isClicked === 0) {
        this.tap(d);
      } else {
        // if click clicked node, do nothing
        if (d.index !== this.clickedNodeIndex) {
          // if click 1st linked node, color 1st linked node
          if (this.linked1stNodeList.indexOf(d.index) >= 0) {
            this.tap1stLinked(this.clickedNodeIndex, d);
          }
          // if click 1st linked node, color 1st linked node
          else {
            this.tap2ndLinked(d);
          }
        }
      }
    });

    // click except for node
    this.svg.on("click", () => {
      if (this.isNodeClick === 0) {
        this.mouseenter();
        Connection.deleteDetail('detailMobile1');
        Connection.deleteDetail('detailMobile2');
      }
      this.isNodeClick = 0;
    });
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

      if (this.isClicked === 0) {
        this.mouseover(d);
        console.log('mouseover', this.nodeInfo);
        console.log('');
      } else {
        // if mouseover clicked node, do nothing
        if (d.index !== this.clickedNodeIndex) {

          // if mouseover 1st linked node, color 1st linked node
          if (this.linked1stNodeList.indexOf(d.index) >= 0){
            // if (this.nodeInfo.name1stLinked !== d.name) {
              // console.log('1st', this.linked1stNodeList);
              this.mouseover1stLinked(this.clickedNodeIndex, d);
              console.log('mouseover1stLinked', this.nodeInfo);
              console.log('');
            // }
          }
          // if mouseover 1st linked node, color 1st linked node
          else {
            // console.log('2nd', this.linked1stNodeList);
            this.mouseover2ndLinked(d);
            console.log('mouseover2ndLinked', this.nodeInfo);
            console.log('');
          }
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

        // if mouseout from clicked node, do nothing
        if (d.index !== this.clickedNodeIndex) {

          // if mouseout from another 1st linked node, don't return to default
          if (this.prev1stLinkedMouseoverNodeName !== d.name) {
            this.isMouseoutFirst = true
          }

          // if mouseout from 1st linked linked node again, return to default
          if (!this.isMouseoutFirst) {
            // this.mouseout();
            Connection.deleteDetail('detailMain2');
            Connection.deleteDetail('detailSub2');
            this.returnToPrevClickedNodeMouseover(this.clickedNodeIndex);
            this.isMouseoutFirst = true
          } else {
            this.isMouseoutFirst = false
          }
        }
      }
    });

    this.node.on("click", (d) => {
      this.mouseclick(d);
    });


    this.vizArea.on("mouseenter", () => {
      console.log('mouseenter');
      this.mouseenter();
    });


  }

  /* mouse event detail */
  mouseover(d) {
    this.statrHighlightNode(d, '1st');
    Mouse.clickableFade(d.index, this.linkData, this.link, this.node, this.label, this.dataType);
    clearInterval(this.mouseoutSetTimeout);
    this.nodeInfo.name = d.name;
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseover';  // event trigger
  }

  mouseover1stLinked(oldIndex, newNode) {
    this.linked1st(oldIndex, newNode);
    clearInterval(this.mouseoutSetTimeout);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseover1stLinked';  // event trigger
  }

  mouseover2ndLinked(d){
    this.linked2nd(d);
    clearInterval(this.mouseoutSetTimeout);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseover2ndLinked';  // event trigger
  }

  mouseout() {
    this.stopHighlightNode();
    this.nodeInfo.name1stLinked = '';
    Mouse.reset(this.linkData, this.link, this.node, this.label, this.dataType);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseout';  // event trigger
  }

  mouseenter() {
    this.stopHighlightNode();
    this.isClicked = 0;
    this.nodeInfo.name1stLinked = '';
    Mouse.reset(this.linkData, this.link, this.node, this.label, this.dataType);
    Mouse.cursor(this.vizMode === 'Single' ? 'grab' : 'pointer', this.body, this.node);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'mouseenter';  // event trigger
  }

  mouseclick(d) {
    this.clickTap(d);
    this.nodeInfo.network = this.vizID;
    this.nodeInfo.mouseAction = 'click';  // event trigger
  }

  returnToPrevClickedNodeMouseover(prevIndex) {
    this.stopHighlightNode();
    this.nodeInfo.mouseAction = 'mouseout';  // event trigger
    this.statrHighlightNode(this.nodeData[prevIndex],'1st');

    console.log('mouseover', 'returnToPrevClickedNodeMouseover');
    Mouse.noClickFade(prevIndex, this.linkData, this.link, this.node, this.label, this.dataType);
    this.nodeInfo.mouseAction = 'mouseover';  // event trigger
  }

  tap(d){
    /* color */
    this.clickTap(d);

    /* detail */
    let M = Connection.makeNodeList(this.detectNodeIndex(d.name), this.linkData);
    Connection.displayDetail(d.name, M.sameNodes, M.diffNodes, 'detailMobile1');
  }

  tap1stLinked(oldIndex, newNode) {
    /* color */
    this.linked1st(oldIndex, newNode);

    /* detail */
    let M1 = Connection.makeNodeList(this.detectNodeIndex(this.nodeInfo.name), this.linkData);
    const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes);

    const nodeCategory = this.detectNodeCategory(this.nodeInfo.name);
    let M2 = Connection.makeNodeList1stLinked(this.detectNodeIndex(this.nodeInfo.name1stLinked), this.linkData, nodeCategory, MainBaseNodes);
    Connection.displayDetail(this.nodeInfo.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMobile2');
  }

  tap2ndLinked(d){
    /* color */
    // last mouseover node -> click node
    this.linked2nd(d);

    /* detail */
    let M1 = Connection.makeNodeList(this.detectNodeIndex(this.nodeInfo.name), this.linkData);
    const MainBaseNodes = M1.sameNodes.concat(M1.diffNodes);

    const nodeCategory = this.detectNodeCategory(this.nodeInfo.name);
    let M2 = Connection.makeNodeList1stLinked(this.detectNodeIndex(this.nodeInfo.name1stLinked), this.linkData, nodeCategory, MainBaseNodes);

    Connection.displayDetail(this.nodeInfo.name, M1.sameNodes, M1.diffNodes, 'detailMobile1');
    Connection.displayDetail(this.nodeInfo.name1stLinked, M2.sameNodes, M2.diffNodes, 'detailMobile2');
  }

  clickTap(d){
    this.statrHighlightNode(d,'1st');
    this.isClicked = 1;
    this.linked1stNodeList = [];
    this.linked1stNodeList = Mouse.noClickFade(d.index, this.linkData, this.link, this.node, this.label, this.dataType);
    this.nodeInfo.name = d.name;
    this.clickedNodeIndex = d.index;
  }

  linked1st(oldIndex, newNode) {
    this.statrHighlightNode(newNode,'2nd');
    Mouse.noClickFade1stLinked(newNode.index, this.linkData, this.link, this.node, this.label, this.dataType);
    Mouse.noClickNoFade1stLinked(oldIndex, this.linkData, this.link, this.node, this.label, this.dataType);
    this.prev1stLinkedMouseoverNodeName = this.nodeInfo.name1stLinked;
    this.nodeInfo.name1stLinked = newNode.name;
  }

  linked2nd(d){
    // last mouseover node -> click node
    this.nodeInfo.name = this.nodeInfo.name1stLinked;
    const clickedNodeIndex = this.detectNodeIndex(this.nodeInfo.name);
    this.clickedNodeIndex = clickedNodeIndex;

    this.mouseout();  // delete nodeInfo.name1stLinked

    // new mouseover node -> mouseover 1st node
    this.nodeInfo.name1stLinked = d.name;

    Mouse.noClickFade1stLinked(d.index, this.linkData, this.link, this.node, this.label, this.dataType);
    this.linked1stNodeList = Mouse.noClickNoFade1stLinked(clickedNodeIndex, this.linkData, this.link, this.node, this.label, this.dataType);

    this.statrHighlightNode(this.nodeData[clickedNodeIndex],'1st');
    this.statrHighlightNode(d,'2nd');
  }

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
    const marginXRight = this.wallMargin - this.zoomScale.X / this.zoomScale.scale;
    const marginYTop = this.wallMargin - this.zoomScale.Y / this.zoomScale.scale;

    const marginXLeft = (this.width - this.zoomScale.X) / this.zoomScale.scale - this.wallMargin;
    const marginYBottom = (this.height - this.zoomScale.Y) / this.zoomScale.scale - this.wallMargin;

    this.link.attr("x1", (d) => {
      return Math.max(marginXRight, Math.min(marginXLeft, d.source.x));
    })
        .attr("y1", (d) => {
          return Math.max(marginYTop, Math.min(marginYBottom, d.source.y));
        })
        .attr("x2", (d) => {
          return Math.max(marginXRight, Math.min(marginXLeft, d.target.x));
        })
        .attr("y2", (d) => {
          return Math.max(marginYTop, Math.min(marginYBottom, d.target.y));
        })
        .attr("d", (d) => {


          if (this.isGradientUpdateList[d.index]) {
            this.updateGradient(d);
          }

        });

    this.node
        .attr("cx", (d) => {
          return Math.max(marginXRight, Math.min(marginXLeft, d.x));
        })
        .attr("cy", (d) => {
          return Math.max(marginYTop, Math.min(marginYBottom, d.y));
        });

    if (this.highlightNodeIndex !== ''){
      const node = this.node['_groups'][0][this.highlightNodeIndex];
      this.updateHighlightNodePosition(node.cx.baseVal.value, node.cy.baseVal.value, '1st');
    }
    if (this.highlightNodeLinkedIndex !== ''){
      const node = this.node['_groups'][0][this.highlightNodeLinkedIndex];
      this.updateHighlightNodePosition(node.cx.baseVal.value, node.cy.baseVal.value, '2nd');
    }

    this.label
        .attr("x", (d) => {
          return Math.max(marginXRight, Math.min(marginXLeft, d.x));
        })
        .attr("y", (d) => {
          return Math.max(marginYTop, Math.min(marginYBottom, d.y));
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

          if (this.isGradientUpdateList[d.index]) {
            this.updateGradient(d);
          }
        });

    this.node
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y;
        });

    if (this.highlightNodeIndex !== ''){
      const node = this.node['_groups'][0][this.highlightNodeIndex];
      this.updateHighlightNodePosition(node.cx.baseVal.value, node.cy.baseVal.value, '1st');
    }
    if (this.highlightNodeLinkedIndex !== ''){
      const node = this.node['_groups'][0][this.highlightNodeLinkedIndex];
      this.updateHighlightNodePosition(node.cx.baseVal.value, node.cy.baseVal.value, '2nd');
    }

    this.label
        .attr("x", (d) => {
          return d.x;
        })
        .attr("y", (d) => {
          return d.y;
        });
  }


  updateGradient(d) {
    const gradientVector = SvgStyle.gradientUnitVector(d.target.x - d.source.x, d.target.y - d.source.y);
    // loop by index
    this.gradient[d.index]
        .attr("x1", 0.5 - gradientVector.X)
        .attr("y1", 0.5 - gradientVector.Y)
        .attr("x2", 0.5 + gradientVector.X)
        .attr("y2", 0.5 + gradientVector.Y);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // drag event
  dragstarted(d) {
    if (this.vizMode === 'Single') {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;

      Mouse.noClickFade(d.index, this.linkData, this.link, this.node, this.label, this.dataType);
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
      Mouse.clickableFade(d.index, this.linkData, this.link, this.node, this.label, this.dataType);
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
    const updateObjTime = 500;
    const transitionTime = 3000;
    this.updateData(selectedType);

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
    }).catch((error) => {
      console.log(error);
    });
  }


  // update method
  updateData(selectedType) {
    this.dataType = selectedType;
    this.simulation.stop();
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
          // console.log(1)
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
            // console.log(2)
        )
      }, updateObjTime);
    });
  }


  upadtePositionData(prevNodePosition) {
    return new Promise((resolve) => {
      resolve(
          prevNodePosition = Update.storePreviousNodePosition(this.node, this.nodeData, prevNodePosition),
          Update.simulation(this.linkData, this.nodeData, this.simulation, this.ticked.bind(this)),
          // console.log(3)
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
            // console.log(4)
        )
      }, 50);
    });
  }

  restartSimulation(transitionTime) {
    // update gradient
    for (let i = 0, l = this.linkData.length; l > i; i++) {
      this.updateGradient(this.linkData[i])
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
            this.simulation.alphaTarget(0.3).restart(),
            this.deleteClassElement("gradient" + this.vizID + (this.dataType === 'Flavor' ? 'Umami' : 'Flavor')),
            // console.log(5)
        )
      }, transitionTime);
    });
  }

  returnSimulationToDefault(transitionTime) {
    setTimeout(() => {
      this.simulation.alphaTarget(0.0);
      // console.log(6);
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

}