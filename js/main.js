/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var isSp = navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
  console.log(isSp);
  d3.json("src/data/flavor_data.json", function (error, data1) {
    d3.json("src/data/umami_data.json", function (error, data2) {
      var flavorData = data1;
      var umamiData = data2; // console.log(flavorData);
      // console.log(umamiData);
      //make color function

      var color = function color(n) {
        return legendColor[n];
      };
      /* Checking if mouse button down or not? */
      // default : up


      var mouseDown = 0;

      document.body.onmousedown = function () {
        mouseDown = 1;
      };

      document.body.onmouseup = function () {
        mouseDown = 0;
      };
      /* //Legend// */


      var legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop", "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice", "fish/seafood", "plant derivative", "flower", "animal product"];
      var legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c", "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc", "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];
      var ordinal = d3.scale.ordinal().domain(legendName).range(legendColor);
      var svg = d3.select("#myGraph");
      svg.append("g").attr("class", "legendOrdinal").attr("transform", "translate(25,50)").style("font-size", "1.2em").style("fill", "#352622").style({
        "font-family": ["Helvetica Neue", "Arial", "sans-serif"]
      });
      var legendOrdinal = d3.legend.color().shape("path", d3.svg.symbol().type("circle").size(300)()).shapePadding(4).labelOffset(2.5) //.title("Ingredient Categories")
      .scale(ordinal);
      svg.select(".legendOrdinal").call(legendOrdinal); // attr of legend circle

      var cell = $(".cell");
      var legendPathDefo = cell.children("path");
      $(legendPathDefo).css({
        "opacity": ["0.6"],
        "stroke-width": ["2"],
        "stroke": ["white"]
      }); // set pointer cursor at legend

      $(".legendCells").css({
        "cursor": ["pointer"]
      });
      /* //Setting// */

      var width = 1200;
      var height = 900;
      var nodes = flavorData.nodes;
      var links = flavorData.links;
      var force = d3.layout.force().nodes(nodes).links(links).size([width - 50, height - 10]) //The center of gravity:[x/2, y/2]
      .linkDistance(100).linkStrength(0.8).gravity(0.20).charge(-300).friction(0.80).start();
      /* //Continually move// */
      //setInterval(function(){force.alpha(0.05);}, 125);
      //d3.timer(function(){
      //force.alpha(0.1);
      //});

      /* //Static Network// */
      // for picture
      //let keyDown = 0;

      var body = $("body");
      /*
      body.on("keydown", function(){
        if (keyDown===0){
          force.stop(); //force レイアウトの計算を終了
          node.each(function(d){ d.fixed = true });
          keyDown = 1
        }else{
          force.start(); //force レイアウトの計算を終了
          node.each(function(d){ d.fixed = false });
          keyDown = 0
        }
      });
      */

      /* //Drawing// */
      // default node opacity:0.6
      // default line opacity:0.5

      var link = d3.select("#myGraph").selectAll(".line").data(links).enter().append("line").attr("opacity", "0.5").attr("stroke-width", function (d) {
        return Math.sqrt(d.weight) * 0.1 + d.weight * 0.02;
      }).attr("stroke", function (d) {
        return color(d.group_id);
      });
      var node = d3.select("#myGraph").selectAll("circle").data(nodes).enter().append("g").call(force.drag);
      node.append("circle").attr("opacity", "0.6").attr("r", function (d) {
        return Math.sqrt(d.size) * 5 + 3;
      }).attr("fill", function (d) {
        return color(d.group_id);
      }).attr("stroke", "#fffcf9"); //.attr("stroke", function(d,i){return color(d.group_id)});

      node.append("text").attr("dx", "-0.5em").attr("dy", "0.7em").attr("font-size", ".7em").attr("font-weight", "300").text(function (d) {
        return d.name;
      }).attr("class", "nonDrag").attr("fill", "#352622").attr({
        "font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]
      }); // to enclose node in SVG

      var wallMargin = 7.5;
      force.on("tick", function () {
        link //.attr("x1", function(d){ return d.source.x;})
        //.attr("y1", function(d){ return d.source.y;})
        //.attr("x2", function(d){ return d.target.x;})
        //.attr("y2", function(d){ return d.target.y;})
        .attr("x1", function (d) {
          return Math.max(wallMargin, Math.min(width - wallMargin, d.source.x));
        }).attr("y1", function (d) {
          return Math.max(wallMargin, Math.min(height - wallMargin, d.source.y));
        }).attr("x2", function (d) {
          return Math.max(wallMargin, Math.min(width - wallMargin, d.target.x));
        }).attr("y2", function (d) {
          return Math.max(wallMargin, Math.min(height - wallMargin, d.target.y));
        });
        node //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); //because of appending "g"
        .attr("transform", function (d) {
          return "translate(" + Math.max(wallMargin, Math.min(width - wallMargin, d.x)) + "," + Math.max(wallMargin, Math.min(height - wallMargin, d.y)) + ")";
        }); //because of appending "g"
        //collision detection

        node.each(collide(0.5));
      });
      var dataTypeSelector = document.getElementById('dataType');

      dataTypeSelector.onchange = function () {
        // 選択されているoption要素を取得する
        var selectedType = this.options[this.selectedIndex].value;

        if (selectedType === 'Flavor') {
          force.linkDistance(100).gravity(0.20).charge(-300);
          nodes = flavorData.nodes;
          links = flavorData.links;
          update(selectedType);
        } else if (selectedType === 'Umami') {
          force.linkDistance(150).gravity(1.80).charge(-2500); // nodes = umamiData.nodes;

          links = umamiData.links;
          update(selectedType);
        }
      };

      var stopForceSetInterval;

      function update(selectedType) {
        var deleteLine = d3.selectAll("line"); // force.nodes(nodes).links(links);

        force.links(links);
        link = d3.select("#myGraph").selectAll(".line").data(links).enter().append("line");
        link.attr("opacity", "0.5").attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.02;
        }).attr("stroke", function (d) {
          return color(d.group_id);
        });
        deleteLine.remove();
        force.start();
        d3.selectAll("line").style("stroke-width", ""); // change line display order to back of node

        for (var i = links.length - 1; 0 <= i; i--) {
          var linkSVG = link[0][i];
          var firstSVG = linkSVG.parentNode.firstChild;

          if (firstSVG) {
            linkSVG.parentNode.insertBefore(linkSVG, firstSVG);
          }
        }

        clearInterval(stopForceSetInterval);
        stopForceSetInterval = setTimeout(function () {
          force.stop(); //force レイアウトの計算を終了
        }, 5000); // update Title

        document.getElementById('h1').textContent = selectedType + ' Network';
      }
      /* //Collision detection// */
      // to prevent from overrapping


      var radiusCallision = 15;

      function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function (d) {
          var rb = 2 * radiusCallision,
              nx1 = d.x - rb,
              nx2 = d.x + rb,
              ny1 = d.y - rb,
              ny2 = d.y + rb;
          quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && quad.point !== d) {
              var x = d.x - quad.point.x,
                  y = d.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y);

              if (l < rb) {
                l = (l - rb) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
              }
            }

            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          });
        };
      }

      var circle = $("circle");

      var Coloring =
      /*#__PURE__*/
      function () {
        function Coloring() {
          _classCallCheck(this, Coloring);
        }

        _createClass(Coloring, null, [{
          key: "mouseover",
          value: function mouseover(d) {
            var nodeIndex = d.index; // to get node index

            for (var i = 0, l = links.length; l > i; i++) {
              if (links[i].source.index === nodeIndex || links[i].target.index === nodeIndex) {
                var lineIndex = i; // index number
                //console.log(lineIndex)

                var selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number

                $(selectLine).attr("class", "lineColor"); // node color
                //console.log(links[lineIndex].source.index)
                //console.log(links[lineIndex].target.index)

                var nodeSource = links[lineIndex].source.index;
                var nodeTarget = links[lineIndex].target.index;
                var selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number

                var selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number

                $(selectNodeSource).attr("class", "nodeColor"); // node color

                $(selectNodeTarget).attr("class", "nodeColor"); // node color

                var selectNodeSource2 = circle.parent().children('text')[nodeSource]; // text which match source index number

                var selectNodeTarget2 = circle.parent().children('text')[nodeTarget]; // text which match target index number

                $(selectNodeSource2).attr("class", "linkedNodeText"); // node text color

                $(selectNodeTarget2).attr("class", "linkedNodeText"); // node text color
              }
            }

            var selectNode = d3.selectAll("circle")[0][nodeIndex];
            $(selectNode).attr("class", "nodeColor");
            var selectNodeText = circle.parent().children('text')[nodeIndex];
            $(selectNodeText).attr("class", "linkedNodeText");
          }
        }, {
          key: "mouseout",
          value: function mouseout(d) {
            var nodeIndex = d.index;

            for (var i = 0, l = links.length; l > i; i++) {
              if (links[i].source.index === nodeIndex || links[i].target.index === nodeIndex) {
                var lineIndex = i;
                var selectLine = d3.selectAll("line")[0][lineIndex];
                $(selectLine).attr("class", "lineColorDefault");
                var nodeSource = links[lineIndex].source.index;
                var nodeTarget = links[lineIndex].target.index;
                var selectNodeSource = d3.selectAll("circle")[0][nodeSource];
                var selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
                $(selectNodeSource).attr("class", "nodeColorDefault");
                $(selectNodeTarget).attr("class", "nodeColorDefault");
                var selectNodeSource2 = circle.parent().children('text')[nodeSource];
                var selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
                $(selectNodeSource2).attr("class", "textSizeDefault");
                $(selectNodeTarget2).attr("class", "textSizeDefault");
              }
            }

            var selectNode = d3.selectAll("circle")[0][nodeIndex];
            $(selectNode).attr("class", "nodeColorDefault");
            var selectNodeText = circle.parent().children('text')[nodeIndex];
            $(selectNodeText).attr("class", "textSizeDefault");
          }
        }, {
          key: "mousedown",
          value: function mousedown(d) {
            //at first, make all node & line fade
            d3.selectAll("circle").attr("class", "nodeColorFade");
            d3.selectAll("line").attr("class", "lineColorFade");
            circle.parent().children('text').attr("class", "nodeTextFade");
            var nodeIndex = d.index;

            for (var i = 0, l = links.length; l > i; i++) {
              if (links[i].source.index === nodeIndex || links[i].target.index === nodeIndex) {
                var lineIndex = i;
                var selectLine = d3.selectAll("line")[0][lineIndex];
                $(selectLine).attr("class", "lineColor");
                var nodeSource = links[lineIndex].source.index;
                var nodeTarget = links[lineIndex].target.index;
                var selectNodeSource = d3.selectAll("circle")[0][nodeSource];
                var selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
                $(selectNodeSource).attr("class", "nodeColor");
                $(selectNodeTarget).attr("class", "nodeColor");
                var selectNodeSource2 = circle.parent().children('text')[nodeSource];
                var selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
                $(selectNodeSource2).attr("class", "linkedNodeText");
                $(selectNodeTarget2).attr("class", "linkedNodeText");
              }
            }

            var selectNode = d3.selectAll("circle")[0][nodeIndex];
            $(selectNode).attr("class", "nodeColor");
            var selectNodeText = circle.parent().children('text')[nodeIndex];
            $(selectNodeText).attr("class", "linkedNodeText");
          }
        }, {
          key: "touchStart",
          value: function touchStart(d) {
            //at first, make all node & line fade
            d3.selectAll("circle").attr("class", "nodeColorFadeSp");
            d3.selectAll("line").attr("class", "lineColorFade");
            circle.parent().children('text').attr("class", "nodeTextFade");
            var nodeIndex = d.index;

            for (var i = 0, l = links.length; l > i; i++) {
              if (links[i].source.index === nodeIndex || links[i].target.index === nodeIndex) {
                var lineIndex = i;
                var selectLine = d3.selectAll("line")[0][lineIndex];
                $(selectLine).attr("class", "lineColor");
                var nodeSource = links[lineIndex].source.index;
                var nodeTarget = links[lineIndex].target.index;
                var selectNodeSource = d3.selectAll("circle")[0][nodeSource];
                var selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
                $(selectNodeSource).attr("class", "nodeColor");
                $(selectNodeTarget).attr("class", "nodeColor");
                var selectNodeSource2 = circle.parent().children('text')[nodeSource];
                var selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
                $(selectNodeSource2).attr("class", "linkedNodeText");
                $(selectNodeTarget2).attr("class", "linkedNodeText");
              }
            }

            var selectNode = d3.selectAll("circle")[0][nodeIndex];
            $(selectNode).attr("class", "nodeColor");
            var selectNodeText = circle.parent().children('text')[nodeIndex];
            $(selectNodeText).attr("class", "linkedNodeText");
          }
        }, {
          key: "mouseup",
          value: function mouseup(d) {
            d3.selectAll("circle").attr("class", "nodeReturnFade");
            d3.selectAll("line").attr("class", "lineReturnFade");
            circle.parent().children('text').attr("class", "nodeTextReturnFade");
            var nodeIndex = d.index;

            for (var i = 0, l = links.length; l > i; i++) {
              if (links[i].source.index === nodeIndex || links[i].target.index === nodeIndex) {
                var lineIndex = i;
                var selectLine = d3.selectAll("line")[0][lineIndex];
                $(selectLine).attr("class", "lineColor");
                var nodeSource = links[lineIndex].source.index;
                var nodeTarget = links[lineIndex].target.index;
                var selectNodeSource = d3.selectAll("circle")[0][nodeSource];
                var selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
                $(selectNodeSource).attr("class", "nodeColor");
                $(selectNodeTarget).attr("class", "nodeColor");
                var selectNodeSource2 = circle.parent().children('text')[nodeSource];
                var selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
                $(selectNodeSource2).attr("class", "linkedNodeText");
                $(selectNodeTarget2).attr("class", "linkedNodeText");
              }
            }

            var selectNode = d3.selectAll("circle")[0][nodeIndex];
            $(selectNode).attr("class", "nodeColor");
            var selectNodeText = circle.parent().children('text')[nodeIndex];
            $(selectNodeText).attr("class", "linkedNodeText");
          }
        }, {
          key: "cursor",
          value: function cursor(type) {
            var grabTypeC;
            var grabTypeB;

            if (type === 'grabbing') {
              grabTypeC = "grabbing";
              grabTypeB = "grabbing";
            } else {
              grabTypeC = "grab";
              grabTypeB = "auto";
            } //grabbing


            circle.css({
              "cursor": ["-webkit-" + grabTypeC]
            });
            circle.css({
              "cursor": ["-moz-" + grabTypeC]
            });
            circle.css({
              "cursor": [grabTypeC]
            });
            body.css({
              "cursor": ["-webkit-" + grabTypeB]
            });
            body.css({
              "cursor": ["-moz-" + grabTypeB]
            });
            body.css({
              "cursor": [grabTypeB]
            });
          }
        }]);

        return Coloring;
      }();
      /* //Mouse action// */


      if (!isSp) {
        node.on("mouseover", function (d) {
          Coloring.mouseover(d);

          if (mouseDown === 0) {
            ion.sound.play("mouseover", {
              volume: 0.1 // turn down

            });
          }
        });
        node.on("mouseout", function (d) {
          Coloring.mouseout(d);
        });
        node.on("mousedown", function (d) {
          Coloring.mousedown(d);
          Coloring.cursor('grabbing');
          ion.sound.play("grabNode", {
            volume: 0.2 // turn down

          });
        });
        node.on("mouseup", function () {
          ion.sound.play("releaseNode", {
            volume: 0.5
          });
        });
        body.on("mouseup", function (d) {
          Coloring.mouseup(d);
          Coloring.cursor('grab');
        });
      } /////////////////////////////////////////////////////////////
      // for SmartPhone


      if (isSp) {
        var touchColored = 0;
        var touchmove = 0;
        svg.on("touchmove", function () {
          touchmove = 1;
        });
        node.on("touchstart", function (d) {
          Coloring.touchStart(d);
        });
        node.on("touchend", function () {
          touchColored = 0;
        });
        svg.on("touchstart", function (d) {
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

          touchmove = 0;
        });
      } /////////////////////////////////////////////////////////////


      stopForceSetInterval = setTimeout(function () {
        force.stop(); //force レイアウトの計算を終了

        node.each(function (d) {//d.fixed = true
        });
      }, 10000);
      /* //make filter// */
      // legend filter(mouse over) to make node bigger

      var LegendFilter =
      /*#__PURE__*/
      function () {
        function LegendFilter() {
          _classCallCheck(this, LegendFilter);
        }

        _createClass(LegendFilter, null, [{
          key: "mouseoverFilter",
          value: function mouseoverFilter(legendId) {
            var legendText = cell.children("text")[legendId];
            $(legendText).animate({
              "font-size": ["1.15em"],
              "font-weight": ["700"]
            }, 100);
            var legendPath = cell.children("path")[legendId];
            $(legendPath).css({
              "stroke": [color(legendId)]
            });
            $(legendPath).animate({
              "stroke-width": ["5"]
            }, 100);
            var filteredCircle = circle.parent("." + legendId).children("circle");
            $(filteredCircle).attr("class", "filteredCircle"); //                  .attr("stroke", color(legendId));

            var filteredText = circle.parent("." + legendId).children("text");
            $(filteredText).attr("class", "filteredText");
          }
        }, {
          key: "mouseoutFilter",
          value: function mouseoutFilter(legendId) {
            var legendText = cell.children("text")[legendId];
            $(legendText).animate({
              "fill": ["#302833"],
              "font-size": ["1em"],
              "font-weight": ["400"]
            }, 100);
            var legendPath = cell.children("path")[legendId];
            $(legendPath).css({
              "stroke": ["white"]
            });
            $(legendPath).animate({
              "stroke-width": ["2"]
            }, 100);
            var filteredCircle = circle.parent("." + legendId).children("circle");
            $(filteredCircle).attr("class", "returnFilteredCircle");
            var filteredText = circle.parent("." + legendId).children("text");
            $(filteredText).attr("class", "returnFilteredText");
          }
        }, {
          key: "mouseoverClick",
          value: function mouseoverClick(legendId) {
            var legendText = cell.children("text")[legendId];
            $(legendText).animate({
              "font-size": ["1.15em"],
              "font-weight": ["700"]
            }, 100);
            var legendPath = cell.children("path")[legendId];
            $(legendPath).css({
              "stroke": [color(legendId)]
            });
            $(legendPath).animate({
              "stroke-width": ["5"]
            }, 100);
            var filteredCircle = circle.parent("." + legendId).children("circle");
            $(filteredCircle).attr("class", "filteredCircle");
            var filteredText = circle.parent("." + legendId).children("text");
            $(filteredText).attr("class", "filteredText");
          }
        }]);

        return LegendFilter;
      }(); // put id to each legend


      for (var i = 0, l = legendName.length; l > i; i++) {
        var legendId = cell[i];
        $(legendId).attr("id", "legend_No" + i);
      } // put class(=group_id) to each node


      var nodeGroup = circle.parent();

      for (var _i = 0, _l = nodeGroup.length; _l > _i; _i++) {
        var nodeG = nodeGroup[_i];
        $(nodeG).attr("class", nodes[_i].group_id); //          .attr("r", Math.sqrt(nodes[i].size)*3 + 5)
      }

      var legendFilter = d3.selectAll(".cell");

      if (!isSp) {
        legendFilter.on("mouseover", function () {
          var legendId = this.id.slice(9);
          LegendFilter.mouseoverFilter(legendId);
          ion.sound.play("mouseover", {
            volume: 0.1 // turn down

          });
        });
        legendFilter.on("click", function () {
          var legendId = this.id.slice(9);
          LegendFilter.mouseoverClick(legendId);
          ion.sound.play("legend");
        }); // legend filter(mouse out)

        legendFilter.on("mouseout", function () {
          var legendId = this.id.slice(9);
          LegendFilter.mouseoutFilter(legendId);
        });
      }
      /* //sound// */
      // sound setting


      ion.sound({
        sounds: [{
          name: "opening"
        }, {
          name: "mouseover"
        }, {
          name: "grabNode"
        }, {
          name: "releaseNode"
        }, {
          name: "legend"
        }],
        // main config
        path: "src/data/sound/",
        preload: true,
        multiplay: true,
        volume: 0.5
      }); //opening sound

      if (!isSp) {
        ion.sound.play("opening");
      }
    });
  });
})();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlzU3AiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwiY29uc29sZSIsImxvZyIsImQzIiwianNvbiIsImVycm9yIiwiZGF0YTEiLCJkYXRhMiIsImZsYXZvckRhdGEiLCJ1bWFtaURhdGEiLCJjb2xvciIsIm4iLCJsZWdlbmRDb2xvciIsIm1vdXNlRG93biIsImRvY3VtZW50IiwiYm9keSIsIm9ubW91c2Vkb3duIiwib25tb3VzZXVwIiwibGVnZW5kTmFtZSIsIm9yZGluYWwiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInN0eWxlIiwibGVnZW5kT3JkaW5hbCIsImxlZ2VuZCIsInNoYXBlIiwic3ltYm9sIiwidHlwZSIsInNpemUiLCJzaGFwZVBhZGRpbmciLCJsYWJlbE9mZnNldCIsImNhbGwiLCJjZWxsIiwiJCIsImxlZ2VuZFBhdGhEZWZvIiwiY2hpbGRyZW4iLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsIm5vZGVzIiwibGlua3MiLCJmb3JjZSIsImxheW91dCIsImxpbmtEaXN0YW5jZSIsImxpbmtTdHJlbmd0aCIsImdyYXZpdHkiLCJjaGFyZ2UiLCJmcmljdGlvbiIsInN0YXJ0IiwibGluayIsInNlbGVjdEFsbCIsImRhdGEiLCJlbnRlciIsImQiLCJNYXRoIiwic3FydCIsIndlaWdodCIsImdyb3VwX2lkIiwibm9kZSIsImRyYWciLCJ0ZXh0IiwibmFtZSIsIndhbGxNYXJnaW4iLCJvbiIsIm1heCIsIm1pbiIsInNvdXJjZSIsIngiLCJ5IiwidGFyZ2V0IiwiZWFjaCIsImNvbGxpZGUiLCJkYXRhVHlwZVNlbGVjdG9yIiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNoYW5nZSIsInNlbGVjdGVkVHlwZSIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidmFsdWUiLCJ1cGRhdGUiLCJzdG9wRm9yY2VTZXRJbnRlcnZhbCIsImRlbGV0ZUxpbmUiLCJyZW1vdmUiLCJpIiwibGVuZ3RoIiwibGlua1NWRyIsImZpcnN0U1ZHIiwicGFyZW50Tm9kZSIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJjbGVhckludGVydmFsIiwic2V0VGltZW91dCIsInN0b3AiLCJ0ZXh0Q29udGVudCIsInJhZGl1c0NhbGxpc2lvbiIsImFscGhhIiwicXVhZHRyZWUiLCJnZW9tIiwicmIiLCJueDEiLCJueDIiLCJueTEiLCJueTIiLCJ2aXNpdCIsInF1YWQiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInBvaW50IiwibCIsImNpcmNsZSIsIkNvbG9yaW5nIiwibm9kZUluZGV4IiwiaW5kZXgiLCJsaW5lSW5kZXgiLCJzZWxlY3RMaW5lIiwibm9kZVNvdXJjZSIsIm5vZGVUYXJnZXQiLCJzZWxlY3ROb2RlU291cmNlIiwic2VsZWN0Tm9kZVRhcmdldCIsInNlbGVjdE5vZGVTb3VyY2UyIiwicGFyZW50Iiwic2VsZWN0Tm9kZVRhcmdldDIiLCJzZWxlY3ROb2RlIiwic2VsZWN0Tm9kZVRleHQiLCJncmFiVHlwZUMiLCJncmFiVHlwZUIiLCJtb3VzZW92ZXIiLCJpb24iLCJzb3VuZCIsInBsYXkiLCJ2b2x1bWUiLCJtb3VzZW91dCIsIm1vdXNlZG93biIsImN1cnNvciIsIm1vdXNldXAiLCJ0b3VjaENvbG9yZWQiLCJ0b3VjaG1vdmUiLCJ0b3VjaFN0YXJ0IiwiTGVnZW5kRmlsdGVyIiwibGVnZW5kSWQiLCJsZWdlbmRUZXh0IiwiYW5pbWF0ZSIsImxlZ2VuZFBhdGgiLCJmaWx0ZXJlZENpcmNsZSIsImZpbHRlcmVkVGV4dCIsIm5vZGVHcm91cCIsIm5vZGVHIiwibGVnZW5kRmlsdGVyIiwiaWQiLCJzbGljZSIsIm1vdXNlb3ZlckZpbHRlciIsIm1vdXNlb3ZlckNsaWNrIiwibW91c2VvdXRGaWx0ZXIiLCJzb3VuZHMiLCJwYXRoIiwicHJlbG9hZCIsIm11bHRpcGxheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLENBQUMsWUFBTTtBQUNMLE1BQUlBLElBQUksR0FBS0MsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixJQUF3QyxDQUF4QyxJQUNURixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE1BQTVCLElBQXNDLENBRDlCLElBRVJGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsTUFBNUIsSUFBc0MsQ0FGOUIsSUFHUkYsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixTQUE1QixJQUF5QyxDQUg3QztBQUtBQyxTQUFPLENBQUNDLEdBQVIsQ0FBWUwsSUFBWjtBQUVBTSxJQUFFLENBQUNDLElBQUgsQ0FBUSwyQkFBUixFQUFxQyxVQUFVQyxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QjtBQUMzREgsTUFBRSxDQUFDQyxJQUFILENBQVEsMEJBQVIsRUFBb0MsVUFBVUMsS0FBVixFQUFpQkUsS0FBakIsRUFBd0I7QUFDMUQsVUFBSUMsVUFBVSxHQUFHRixLQUFqQjtBQUNBLFVBQUlHLFNBQVMsR0FBR0YsS0FBaEIsQ0FGMEQsQ0FJMUQ7QUFDQTtBQUVBOztBQUNBLFVBQUlHLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQVVDLENBQVYsRUFBYTtBQUN2QixlQUFPQyxXQUFXLENBQUNELENBQUQsQ0FBbEI7QUFDRCxPQUZEO0FBSUE7QUFDQTs7O0FBQ0EsVUFBSUUsU0FBUyxHQUFHLENBQWhCOztBQUNBQyxjQUFRLENBQUNDLElBQVQsQ0FBY0MsV0FBZCxHQUE0QixZQUFZO0FBQ3RDSCxpQkFBUyxHQUFHLENBQVo7QUFDRCxPQUZEOztBQUdBQyxjQUFRLENBQUNDLElBQVQsQ0FBY0UsU0FBZCxHQUEwQixZQUFZO0FBQ3BDSixpQkFBUyxHQUFHLENBQVo7QUFDRCxPQUZEO0FBSUE7OztBQUNBLFVBQUlLLFVBQVUsR0FBRyxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQTJCLFdBQTNCLEVBQXdDLGFBQXhDLEVBQ2Ysb0JBRGUsRUFDTyxNQURQLEVBQ2UsT0FEZixFQUN3QixnQkFEeEIsRUFDMEMsT0FEMUMsRUFFZixjQUZlLEVBRUMsa0JBRkQsRUFFcUIsUUFGckIsRUFFK0IsZ0JBRi9CLENBQWpCO0FBSUEsVUFBSU4sV0FBVyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFDaEIsU0FEZ0IsRUFDTCxTQURLLEVBQ00sU0FETixFQUNpQixTQURqQixFQUM0QixTQUQ1QixFQUVoQixTQUZnQixFQUVMLFNBRkssRUFFTSxTQUZOLEVBRWlCLFNBRmpCLENBQWxCO0FBSUEsVUFBSU8sT0FBTyxHQUFHaEIsRUFBRSxDQUFDaUIsS0FBSCxDQUFTRCxPQUFULEdBQ1RFLE1BRFMsQ0FDRkgsVUFERSxFQUVUSSxLQUZTLENBRUhWLFdBRkcsQ0FBZDtBQUtBLFVBQUlXLEdBQUcsR0FBR3BCLEVBQUUsQ0FBQ3FCLE1BQUgsQ0FBVSxVQUFWLENBQVY7QUFFQUQsU0FBRyxDQUFDRSxNQUFKLENBQVcsR0FBWCxFQUNLQyxJQURMLENBQ1UsT0FEVixFQUNtQixlQURuQixFQUVLQSxJQUZMLENBRVUsV0FGVixFQUV1QixrQkFGdkIsRUFHS0MsS0FITCxDQUdXLFdBSFgsRUFHd0IsT0FIeEIsRUFJS0EsS0FKTCxDQUlXLE1BSlgsRUFJbUIsU0FKbkIsRUFLS0EsS0FMTCxDQUtXO0FBQUMsdUJBQWUsQ0FBQyxnQkFBRCxFQUFtQixPQUFuQixFQUE0QixZQUE1QjtBQUFoQixPQUxYO0FBUUEsVUFBSUMsYUFBYSxHQUFHekIsRUFBRSxDQUFDMEIsTUFBSCxDQUFVbkIsS0FBVixHQUNmb0IsS0FEZSxDQUNULE1BRFMsRUFDRDNCLEVBQUUsQ0FBQ29CLEdBQUgsQ0FBT1EsTUFBUCxHQUFnQkMsSUFBaEIsQ0FBcUIsUUFBckIsRUFBK0JDLElBQS9CLENBQW9DLEdBQXBDLEdBREMsRUFFZkMsWUFGZSxDQUVGLENBRkUsRUFHZkMsV0FIZSxDQUdILEdBSEcsRUFJaEI7QUFKZ0IsT0FLZmYsS0FMZSxDQUtURCxPQUxTLENBQXBCO0FBT0FJLFNBQUcsQ0FBQ0MsTUFBSixDQUFXLGdCQUFYLEVBQ0tZLElBREwsQ0FDVVIsYUFEVixFQXJEMEQsQ0F3RDFEOztBQUNBLFVBQUlTLElBQUksR0FBR0MsQ0FBQyxDQUFDLE9BQUQsQ0FBWjtBQUNBLFVBQUlDLGNBQWMsR0FBR0YsSUFBSSxDQUFDRyxRQUFMLENBQWMsTUFBZCxDQUFyQjtBQUNBRixPQUFDLENBQUNDLGNBQUQsQ0FBRCxDQUFrQkUsR0FBbEIsQ0FBc0I7QUFDcEIsbUJBQVcsQ0FBQyxLQUFELENBRFM7QUFFcEIsd0JBQWdCLENBQUMsR0FBRCxDQUZJO0FBR3BCLGtCQUFVLENBQUMsT0FBRDtBQUhVLE9BQXRCLEVBM0QwRCxDQWlFMUQ7O0FBQ0FILE9BQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JHLEdBQWxCLENBQXNCO0FBQUMsa0JBQVUsQ0FBQyxTQUFEO0FBQVgsT0FBdEI7QUFFQTs7QUFDQSxVQUFJQyxLQUFLLEdBQUcsSUFBWjtBQUNBLFVBQUlDLE1BQU0sR0FBRyxHQUFiO0FBRUEsVUFBSUMsS0FBSyxHQUFHcEMsVUFBVSxDQUFDb0MsS0FBdkI7QUFDQSxVQUFJQyxLQUFLLEdBQUdyQyxVQUFVLENBQUNxQyxLQUF2QjtBQUdBLFVBQUlDLEtBQUssR0FBRzNDLEVBQUUsQ0FBQzRDLE1BQUgsQ0FBVUQsS0FBVixHQUNQRixLQURPLENBQ0RBLEtBREMsRUFFUEMsS0FGTyxDQUVEQSxLQUZDLEVBR1BaLElBSE8sQ0FHRixDQUFDUyxLQUFLLEdBQUcsRUFBVCxFQUFhQyxNQUFNLEdBQUcsRUFBdEIsQ0FIRSxFQUd5QjtBQUh6QixPQUlQSyxZQUpPLENBSU0sR0FKTixFQUtQQyxZQUxPLENBS00sR0FMTixFQU1QQyxPQU5PLENBTUMsSUFORCxFQU9QQyxNQVBPLENBT0EsQ0FBQyxHQVBELEVBUVBDLFFBUk8sQ0FRRSxJQVJGLEVBU1BDLEtBVE8sRUFBWjtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBOztBQUNBLFVBQUl0QyxJQUFJLEdBQUd1QixDQUFDLENBQUMsTUFBRCxDQUFaO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBZUE7QUFDQTtBQUNBOztBQUVBLFVBQUlnQixJQUFJLEdBQUduRCxFQUFFLENBQUNxQixNQUFILENBQVUsVUFBVixFQUNOK0IsU0FETSxDQUNJLE9BREosRUFFTkMsSUFGTSxDQUVEWCxLQUZDLEVBR05ZLEtBSE0sR0FJTmhDLE1BSk0sQ0FJQyxNQUpELEVBS05DLElBTE0sQ0FLRCxTQUxDLEVBS1UsS0FMVixFQU1OQSxJQU5NLENBTUQsY0FOQyxFQU1lLFVBQVVnQyxDQUFWLEVBQWE7QUFDakMsZUFBT0MsSUFBSSxDQUFDQyxJQUFMLENBQVVGLENBQUMsQ0FBQ0csTUFBWixJQUFzQixHQUF0QixHQUE0QkgsQ0FBQyxDQUFDRyxNQUFGLEdBQVcsSUFBOUM7QUFDRCxPQVJNLEVBU05uQyxJQVRNLENBU0QsUUFUQyxFQVNTLFVBQVVnQyxDQUFWLEVBQWE7QUFDM0IsZUFBT2hELEtBQUssQ0FBQ2dELENBQUMsQ0FBQ0ksUUFBSCxDQUFaO0FBQ0QsT0FYTSxDQUFYO0FBYUEsVUFBSUMsSUFBSSxHQUFHNUQsRUFBRSxDQUFDcUIsTUFBSCxDQUFVLFVBQVYsRUFDTitCLFNBRE0sQ0FDSSxRQURKLEVBRU5DLElBRk0sQ0FFRFosS0FGQyxFQUdOYSxLQUhNLEdBSU5oQyxNQUpNLENBSUMsR0FKRCxFQUtOVyxJQUxNLENBS0RVLEtBQUssQ0FBQ2tCLElBTEwsQ0FBWDtBQU9BRCxVQUFJLENBQUN0QyxNQUFMLENBQVksUUFBWixFQUNLQyxJQURMLENBQ1UsU0FEVixFQUNxQixLQURyQixFQUVLQSxJQUZMLENBRVUsR0FGVixFQUVlLFVBQVVnQyxDQUFWLEVBQWE7QUFDdEIsZUFBT0MsSUFBSSxDQUFDQyxJQUFMLENBQVVGLENBQUMsQ0FBQ3pCLElBQVosSUFBb0IsQ0FBcEIsR0FBd0IsQ0FBL0I7QUFDRCxPQUpMLEVBS0tQLElBTEwsQ0FLVSxNQUxWLEVBS2tCLFVBQVVnQyxDQUFWLEVBQWE7QUFDekIsZUFBT2hELEtBQUssQ0FBQ2dELENBQUMsQ0FBQ0ksUUFBSCxDQUFaO0FBQ0QsT0FQTCxFQVFLcEMsSUFSTCxDQVFVLFFBUlYsRUFRb0IsU0FScEIsRUExSTBELENBbUoxRDs7QUFFQXFDLFVBQUksQ0FBQ3RDLE1BQUwsQ0FBWSxNQUFaLEVBQ0tDLElBREwsQ0FDVSxJQURWLEVBQ2dCLFFBRGhCLEVBRUtBLElBRkwsQ0FFVSxJQUZWLEVBRWdCLE9BRmhCLEVBR0tBLElBSEwsQ0FHVSxXQUhWLEVBR3VCLE1BSHZCLEVBSUtBLElBSkwsQ0FJVSxhQUpWLEVBSXlCLEtBSnpCLEVBS0t1QyxJQUxMLENBS1UsVUFBVVAsQ0FBVixFQUFhO0FBQ2pCLGVBQU9BLENBQUMsQ0FBQ1EsSUFBVDtBQUNELE9BUEwsRUFRS3hDLElBUkwsQ0FRVSxPQVJWLEVBUW1CLFNBUm5CLEVBU0tBLElBVEwsQ0FTVSxNQVRWLEVBU2tCLFNBVGxCLEVBVUtBLElBVkwsQ0FVVTtBQUFDLHVCQUFlLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsZ0JBQXJCLEVBQXVDLE9BQXZDLEVBQWdELFlBQWhEO0FBQWhCLE9BVlYsRUFySjBELENBaUsxRDs7QUFDQSxVQUFJeUMsVUFBVSxHQUFHLEdBQWpCO0FBRUFyQixXQUFLLENBQUNzQixFQUFOLENBQVMsTUFBVCxFQUFpQixZQUFZO0FBQzNCZCxZQUFJLENBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFKSSxTQUtDNUIsSUFMTCxDQUtVLElBTFYsRUFLZ0IsVUFBVWdDLENBQVYsRUFBYTtBQUN2QixpQkFBT0MsSUFBSSxDQUFDVSxHQUFMLENBQVNGLFVBQVQsRUFBcUJSLElBQUksQ0FBQ1csR0FBTCxDQUFTNUIsS0FBSyxHQUFHeUIsVUFBakIsRUFBNkJULENBQUMsQ0FBQ2EsTUFBRixDQUFTQyxDQUF0QyxDQUFyQixDQUFQO0FBQ0QsU0FQTCxFQVFLOUMsSUFSTCxDQVFVLElBUlYsRUFRZ0IsVUFBVWdDLENBQVYsRUFBYTtBQUN2QixpQkFBT0MsSUFBSSxDQUFDVSxHQUFMLENBQVNGLFVBQVQsRUFBcUJSLElBQUksQ0FBQ1csR0FBTCxDQUFTM0IsTUFBTSxHQUFHd0IsVUFBbEIsRUFBOEJULENBQUMsQ0FBQ2EsTUFBRixDQUFTRSxDQUF2QyxDQUFyQixDQUFQO0FBQ0QsU0FWTCxFQVdLL0MsSUFYTCxDQVdVLElBWFYsRUFXZ0IsVUFBVWdDLENBQVYsRUFBYTtBQUN2QixpQkFBT0MsSUFBSSxDQUFDVSxHQUFMLENBQVNGLFVBQVQsRUFBcUJSLElBQUksQ0FBQ1csR0FBTCxDQUFTNUIsS0FBSyxHQUFHeUIsVUFBakIsRUFBNkJULENBQUMsQ0FBQ2dCLE1BQUYsQ0FBU0YsQ0FBdEMsQ0FBckIsQ0FBUDtBQUNELFNBYkwsRUFjSzlDLElBZEwsQ0FjVSxJQWRWLEVBY2dCLFVBQVVnQyxDQUFWLEVBQWE7QUFDdkIsaUJBQU9DLElBQUksQ0FBQ1UsR0FBTCxDQUFTRixVQUFULEVBQXFCUixJQUFJLENBQUNXLEdBQUwsQ0FBUzNCLE1BQU0sR0FBR3dCLFVBQWxCLEVBQThCVCxDQUFDLENBQUNnQixNQUFGLENBQVNELENBQXZDLENBQXJCLENBQVA7QUFDRCxTQWhCTDtBQWtCQVYsWUFBSSxDQUNKO0FBREksU0FFQ3JDLElBRkwsQ0FFVSxXQUZWLEVBRXVCLFVBQVVnQyxDQUFWLEVBQWE7QUFDOUIsaUJBQU8sZUFBZUMsSUFBSSxDQUFDVSxHQUFMLENBQVNGLFVBQVQsRUFBcUJSLElBQUksQ0FBQ1csR0FBTCxDQUFTNUIsS0FBSyxHQUFHeUIsVUFBakIsRUFBNkJULENBQUMsQ0FBQ2MsQ0FBL0IsQ0FBckIsQ0FBZixHQUNELEdBREMsR0FFRGIsSUFBSSxDQUFDVSxHQUFMLENBQVNGLFVBQVQsRUFBcUJSLElBQUksQ0FBQ1csR0FBTCxDQUFTM0IsTUFBTSxHQUFHd0IsVUFBbEIsRUFBOEJULENBQUMsQ0FBQ2UsQ0FBaEMsQ0FBckIsQ0FGQyxHQUdELEdBSE47QUFJRCxTQVBMLEVBbkIyQixDQTBCbkI7QUFFUjs7QUFDQVYsWUFBSSxDQUNDWSxJQURMLENBQ1VDLE9BQU8sQ0FBQyxHQUFELENBRGpCO0FBRUQsT0EvQkQ7QUFrQ0EsVUFBTUMsZ0JBQWdCLEdBQUcvRCxRQUFRLENBQUNnRSxjQUFULENBQXdCLFVBQXhCLENBQXpCOztBQUNBRCxzQkFBZ0IsQ0FBQ0UsUUFBakIsR0FBNEIsWUFBWTtBQUN0QztBQUNBLFlBQU1DLFlBQVksR0FBRyxLQUFLQyxPQUFMLENBQWEsS0FBS0MsYUFBbEIsRUFBaUNDLEtBQXREOztBQUVBLFlBQUlILFlBQVksS0FBSyxRQUFyQixFQUErQjtBQUM3QmxDLGVBQUssQ0FDQUUsWUFETCxDQUNrQixHQURsQixFQUVLRSxPQUZMLENBRWEsSUFGYixFQUdLQyxNQUhMLENBR1ksQ0FBQyxHQUhiO0FBSUFQLGVBQUssR0FBR3BDLFVBQVUsQ0FBQ29DLEtBQW5CO0FBQ0FDLGVBQUssR0FBR3JDLFVBQVUsQ0FBQ3FDLEtBQW5CO0FBQ0F1QyxnQkFBTSxDQUFDSixZQUFELENBQU47QUFDRCxTQVJELE1BUU8sSUFBSUEsWUFBWSxLQUFLLE9BQXJCLEVBQThCO0FBQ25DbEMsZUFBSyxDQUNBRSxZQURMLENBQ2tCLEdBRGxCLEVBRUtFLE9BRkwsQ0FFYSxJQUZiLEVBR0tDLE1BSEwsQ0FHWSxDQUFDLElBSGIsRUFEbUMsQ0FLbkM7O0FBQ0FOLGVBQUssR0FBR3BDLFNBQVMsQ0FBQ29DLEtBQWxCO0FBQ0F1QyxnQkFBTSxDQUFDSixZQUFELENBQU47QUFDRDtBQUNGLE9BckJEOztBQXdCQSxVQUFJSyxvQkFBSjs7QUFFQSxlQUFTRCxNQUFULENBQWdCSixZQUFoQixFQUE4QjtBQUU1QixZQUFJTSxVQUFVLEdBQUduRixFQUFFLENBQUNvRCxTQUFILENBQWEsTUFBYixDQUFqQixDQUY0QixDQUk1Qjs7QUFDQVQsYUFBSyxDQUFDRCxLQUFOLENBQVlBLEtBQVo7QUFHQVMsWUFBSSxHQUFHbkQsRUFBRSxDQUFDcUIsTUFBSCxDQUFVLFVBQVYsRUFDRitCLFNBREUsQ0FDUSxPQURSLEVBRUZDLElBRkUsQ0FFR1gsS0FGSCxFQUdGWSxLQUhFLEdBSUZoQyxNQUpFLENBSUssTUFKTCxDQUFQO0FBTUE2QixZQUFJLENBQUM1QixJQUFMLENBQVUsU0FBVixFQUFxQixLQUFyQixFQUNLQSxJQURMLENBQ1UsY0FEVixFQUMwQixVQUFVZ0MsQ0FBVixFQUFhO0FBQ2pDLGlCQUFPQyxJQUFJLENBQUNDLElBQUwsQ0FBVUYsQ0FBQyxDQUFDRyxNQUFaLElBQXNCLEdBQXRCLEdBQTRCSCxDQUFDLENBQUNHLE1BQUYsR0FBVyxJQUE5QztBQUNELFNBSEwsRUFJS25DLElBSkwsQ0FJVSxRQUpWLEVBSW9CLFVBQVVnQyxDQUFWLEVBQWE7QUFDM0IsaUJBQU9oRCxLQUFLLENBQUNnRCxDQUFDLENBQUNJLFFBQUgsQ0FBWjtBQUNELFNBTkw7QUFRQXdCLGtCQUFVLENBQUNDLE1BQVg7QUFFQXpDLGFBQUssQ0FBQ08sS0FBTjtBQUNBbEQsVUFBRSxDQUFDb0QsU0FBSCxDQUFhLE1BQWIsRUFBcUI1QixLQUFyQixDQUEyQixjQUEzQixFQUEyQyxFQUEzQyxFQXpCNEIsQ0E0QjVCOztBQUNBLGFBQUssSUFBSTZELENBQUMsR0FBRzNDLEtBQUssQ0FBQzRDLE1BQU4sR0FBZSxDQUE1QixFQUErQixLQUFLRCxDQUFwQyxFQUF1Q0EsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxjQUFNRSxPQUFPLEdBQUdwQyxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFrQyxDQUFSLENBQWhCO0FBQ0EsY0FBTUcsUUFBUSxHQUFHRCxPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLFVBQXBDOztBQUNBLGNBQUlGLFFBQUosRUFBYztBQUNaRCxtQkFBTyxDQUFDRSxVQUFSLENBQW1CRSxZQUFuQixDQUFnQ0osT0FBaEMsRUFBeUNDLFFBQXpDO0FBQ0Q7QUFDRjs7QUFFREkscUJBQWEsQ0FBQ1Ysb0JBQUQsQ0FBYjtBQUNBQSw0QkFBb0IsR0FBR1csVUFBVSxDQUFDLFlBQU07QUFDdENsRCxlQUFLLENBQUNtRCxJQUFOLEdBRHNDLENBQ3hCO0FBQ2YsU0FGZ0MsRUFFOUIsSUFGOEIsQ0FBakMsQ0F0QzRCLENBMEM1Qjs7QUFDQW5GLGdCQUFRLENBQUNnRSxjQUFULENBQXdCLElBQXhCLEVBQThCb0IsV0FBOUIsR0FBNENsQixZQUFZLEdBQUcsVUFBM0Q7QUFDRDtBQUdEO0FBQ0E7OztBQUNBLFVBQUltQixlQUFlLEdBQUcsRUFBdEI7O0FBRUEsZUFBU3ZCLE9BQVQsQ0FBaUJ3QixLQUFqQixFQUF3QjtBQUN0QixZQUFJQyxRQUFRLEdBQUdsRyxFQUFFLENBQUNtRyxJQUFILENBQVFELFFBQVIsQ0FBaUJ6RCxLQUFqQixDQUFmO0FBQ0EsZUFBTyxVQUFVYyxDQUFWLEVBQWE7QUFDbEIsY0FBSTZDLEVBQUUsR0FBRyxJQUFJSixlQUFiO0FBQUEsY0FDSUssR0FBRyxHQUFHOUMsQ0FBQyxDQUFDYyxDQUFGLEdBQU0rQixFQURoQjtBQUFBLGNBRUlFLEdBQUcsR0FBRy9DLENBQUMsQ0FBQ2MsQ0FBRixHQUFNK0IsRUFGaEI7QUFBQSxjQUdJRyxHQUFHLEdBQUdoRCxDQUFDLENBQUNlLENBQUYsR0FBTThCLEVBSGhCO0FBQUEsY0FJSUksR0FBRyxHQUFHakQsQ0FBQyxDQUFDZSxDQUFGLEdBQU04QixFQUpoQjtBQUtBRixrQkFBUSxDQUFDTyxLQUFULENBQWUsVUFBVUMsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0JDLEVBQXBCLEVBQXdCQyxFQUF4QixFQUE0QkMsRUFBNUIsRUFBZ0M7QUFDN0MsZ0JBQUlKLElBQUksQ0FBQ0ssS0FBTCxJQUFlTCxJQUFJLENBQUNLLEtBQUwsS0FBZXhELENBQWxDLEVBQXNDO0FBQ3BDLGtCQUFJYyxDQUFDLEdBQUdkLENBQUMsQ0FBQ2MsQ0FBRixHQUFNcUMsSUFBSSxDQUFDSyxLQUFMLENBQVcxQyxDQUF6QjtBQUFBLGtCQUNJQyxDQUFDLEdBQUdmLENBQUMsQ0FBQ2UsQ0FBRixHQUFNb0MsSUFBSSxDQUFDSyxLQUFMLENBQVd6QyxDQUR6QjtBQUFBLGtCQUVJMEMsQ0FBQyxHQUFHeEQsSUFBSSxDQUFDQyxJQUFMLENBQVVZLENBQUMsR0FBR0EsQ0FBSixHQUFRQyxDQUFDLEdBQUdBLENBQXRCLENBRlI7O0FBR0Esa0JBQUkwQyxDQUFDLEdBQUdaLEVBQVIsRUFBWTtBQUNWWSxpQkFBQyxHQUFHLENBQUNBLENBQUMsR0FBR1osRUFBTCxJQUFXWSxDQUFYLEdBQWVmLEtBQW5CO0FBQ0ExQyxpQkFBQyxDQUFDYyxDQUFGLElBQU9BLENBQUMsSUFBSTJDLENBQVo7QUFDQXpELGlCQUFDLENBQUNlLENBQUYsSUFBT0EsQ0FBQyxJQUFJMEMsQ0FBWjtBQUNBTixvQkFBSSxDQUFDSyxLQUFMLENBQVcxQyxDQUFYLElBQWdCQSxDQUFoQjtBQUNBcUMsb0JBQUksQ0FBQ0ssS0FBTCxDQUFXekMsQ0FBWCxJQUFnQkEsQ0FBaEI7QUFDRDtBQUNGOztBQUNELG1CQUFPcUMsRUFBRSxHQUFHTCxHQUFMLElBQ0FPLEVBQUUsR0FBR1IsR0FETCxJQUVBTyxFQUFFLEdBQUdKLEdBRkwsSUFHQU0sRUFBRSxHQUFHUCxHQUhaO0FBSUQsV0FqQkQ7QUFrQkQsU0F4QkQ7QUF5QkQ7O0FBR0QsVUFBSVUsTUFBTSxHQUFHOUUsQ0FBQyxDQUFDLFFBQUQsQ0FBZDs7QUFsVDBELFVBb1RwRCtFLFFBcFRvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG9DQXFUdkMzRCxDQXJUdUMsRUFxVHBDO0FBQ2xCLGdCQUFJNEQsU0FBUyxHQUFHNUQsQ0FBQyxDQUFDNkQsS0FBbEIsQ0FEa0IsQ0FDTzs7QUFDekIsaUJBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFSLEVBQVcyQixDQUFDLEdBQUd0RSxLQUFLLENBQUM0QyxNQUExQixFQUFrQzBCLENBQUMsR0FBRzNCLENBQXRDLEVBQXlDQSxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLGtCQUFJM0MsS0FBSyxDQUFDMkMsQ0FBRCxDQUFMLENBQVNqQixNQUFULENBQWdCZ0QsS0FBaEIsS0FBMEJELFNBQTFCLElBQ0F6RSxLQUFLLENBQUMyQyxDQUFELENBQUwsQ0FBU2QsTUFBVCxDQUFnQjZDLEtBQWhCLEtBQTBCRCxTQUQ5QixFQUN5QztBQUV2QyxvQkFBSUUsU0FBUyxHQUFHaEMsQ0FBaEIsQ0FGdUMsQ0FFbkI7QUFDcEI7O0FBRUEsb0JBQUlpQyxVQUFVLEdBQUd0SCxFQUFFLENBQUNvRCxTQUFILENBQWEsTUFBYixFQUFxQixDQUFyQixFQUF3QmlFLFNBQXhCLENBQWpCLENBTHVDLENBS2M7O0FBQ3JEbEYsaUJBQUMsQ0FBQ21GLFVBQUQsQ0FBRCxDQUFjL0YsSUFBZCxDQUFtQixPQUFuQixFQUE0QixXQUE1QixFQU51QyxDQU1JO0FBRTNDO0FBQ0E7O0FBRUEsb0JBQUlnRyxVQUFVLEdBQUc3RSxLQUFLLENBQUMyRSxTQUFELENBQUwsQ0FBaUJqRCxNQUFqQixDQUF3QmdELEtBQXpDO0FBQ0Esb0JBQUlJLFVBQVUsR0FBRzlFLEtBQUssQ0FBQzJFLFNBQUQsQ0FBTCxDQUFpQjlDLE1BQWpCLENBQXdCNkMsS0FBekM7QUFFQSxvQkFBSUssZ0JBQWdCLEdBQUd6SCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQm1FLFVBQTFCLENBQXZCLENBZHVDLENBY3VCOztBQUM5RCxvQkFBSUcsZ0JBQWdCLEdBQUcxSCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQm9FLFVBQTFCLENBQXZCLENBZnVDLENBZXVCOztBQUM5RHJGLGlCQUFDLENBQUNzRixnQkFBRCxDQUFELENBQW9CbEcsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsV0FBbEMsRUFoQnVDLENBZ0JVOztBQUNqRFksaUJBQUMsQ0FBQ3VGLGdCQUFELENBQUQsQ0FBb0JuRyxJQUFwQixDQUF5QixPQUF6QixFQUFrQyxXQUFsQyxFQWpCdUMsQ0FpQlU7O0FBRWpELG9CQUFJb0csaUJBQWlCLEdBQUdWLE1BQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDa0YsVUFBakMsQ0FBeEIsQ0FuQnVDLENBbUJnQzs7QUFDdkUsb0JBQUlNLGlCQUFpQixHQUFHWixNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ21GLFVBQWpDLENBQXhCLENBcEJ1QyxDQW9CZ0M7O0FBQ3ZFckYsaUJBQUMsQ0FBQ3dGLGlCQUFELENBQUQsQ0FBcUJwRyxJQUFyQixDQUEwQixPQUExQixFQUFtQyxnQkFBbkMsRUFyQnVDLENBcUJnQjs7QUFDdkRZLGlCQUFDLENBQUMwRixpQkFBRCxDQUFELENBQXFCdEcsSUFBckIsQ0FBMEIsT0FBMUIsRUFBbUMsZ0JBQW5DLEVBdEJ1QyxDQXNCZ0I7QUFDeEQ7QUFDRjs7QUFDRCxnQkFBSXVHLFVBQVUsR0FBRzlILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCLENBQXZCLEVBQTBCK0QsU0FBMUIsQ0FBakI7QUFDQWhGLGFBQUMsQ0FBQzJGLFVBQUQsQ0FBRCxDQUFjdkcsSUFBZCxDQUFtQixPQUFuQixFQUE0QixXQUE1QjtBQUNBLGdCQUFJd0csY0FBYyxHQUFHZCxNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQzhFLFNBQWpDLENBQXJCO0FBQ0FoRixhQUFDLENBQUM0RixjQUFELENBQUQsQ0FBa0J4RyxJQUFsQixDQUF1QixPQUF2QixFQUFnQyxnQkFBaEM7QUFDRDtBQXRWdUQ7QUFBQTtBQUFBLG1DQXlWeENnQyxDQXpWd0MsRUF5VnJDO0FBQ2pCLGdCQUFJNEQsU0FBUyxHQUFHNUQsQ0FBQyxDQUFDNkQsS0FBbEI7O0FBQ0EsaUJBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFSLEVBQVcyQixDQUFDLEdBQUd0RSxLQUFLLENBQUM0QyxNQUExQixFQUFrQzBCLENBQUMsR0FBRzNCLENBQXRDLEVBQXlDQSxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLGtCQUFJM0MsS0FBSyxDQUFDMkMsQ0FBRCxDQUFMLENBQVNqQixNQUFULENBQWdCZ0QsS0FBaEIsS0FBMEJELFNBQTFCLElBQ0F6RSxLQUFLLENBQUMyQyxDQUFELENBQUwsQ0FBU2QsTUFBVCxDQUFnQjZDLEtBQWhCLEtBQTBCRCxTQUQ5QixFQUN5QztBQUV2QyxvQkFBSUUsU0FBUyxHQUFHaEMsQ0FBaEI7QUFFQSxvQkFBSWlDLFVBQVUsR0FBR3RILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxNQUFiLEVBQXFCLENBQXJCLEVBQXdCaUUsU0FBeEIsQ0FBakI7QUFDQWxGLGlCQUFDLENBQUNtRixVQUFELENBQUQsQ0FBYy9GLElBQWQsQ0FBbUIsT0FBbkIsRUFBNEIsa0JBQTVCO0FBRUEsb0JBQUlnRyxVQUFVLEdBQUc3RSxLQUFLLENBQUMyRSxTQUFELENBQUwsQ0FBaUJqRCxNQUFqQixDQUF3QmdELEtBQXpDO0FBQ0Esb0JBQUlJLFVBQVUsR0FBRzlFLEtBQUssQ0FBQzJFLFNBQUQsQ0FBTCxDQUFpQjlDLE1BQWpCLENBQXdCNkMsS0FBekM7QUFFQSxvQkFBSUssZ0JBQWdCLEdBQUd6SCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQm1FLFVBQTFCLENBQXZCO0FBQ0Esb0JBQUlHLGdCQUFnQixHQUFHMUgsRUFBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUIsQ0FBdkIsRUFBMEJvRSxVQUExQixDQUF2QjtBQUNBckYsaUJBQUMsQ0FBQ3NGLGdCQUFELENBQUQsQ0FBb0JsRyxJQUFwQixDQUF5QixPQUF6QixFQUFrQyxrQkFBbEM7QUFDQVksaUJBQUMsQ0FBQ3VGLGdCQUFELENBQUQsQ0FBb0JuRyxJQUFwQixDQUF5QixPQUF6QixFQUFrQyxrQkFBbEM7QUFFQSxvQkFBSW9HLGlCQUFpQixHQUFHVixNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ2tGLFVBQWpDLENBQXhCO0FBQ0Esb0JBQUlNLGlCQUFpQixHQUFHWixNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ21GLFVBQWpDLENBQXhCO0FBQ0FyRixpQkFBQyxDQUFDd0YsaUJBQUQsQ0FBRCxDQUFxQnBHLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGlCQUFuQztBQUNBWSxpQkFBQyxDQUFDMEYsaUJBQUQsQ0FBRCxDQUFxQnRHLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGlCQUFuQztBQUNEO0FBQ0Y7O0FBQ0QsZ0JBQUl1RyxVQUFVLEdBQUc5SCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQitELFNBQTFCLENBQWpCO0FBQ0FoRixhQUFDLENBQUMyRixVQUFELENBQUQsQ0FBY3ZHLElBQWQsQ0FBbUIsT0FBbkIsRUFBNEIsa0JBQTVCO0FBQ0EsZ0JBQUl3RyxjQUFjLEdBQUdkLE1BQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDOEUsU0FBakMsQ0FBckI7QUFDQWhGLGFBQUMsQ0FBQzRGLGNBQUQsQ0FBRCxDQUFrQnhHLElBQWxCLENBQXVCLE9BQXZCLEVBQWdDLGlCQUFoQztBQUNEO0FBdFh1RDtBQUFBO0FBQUEsb0NBeVh2Q2dDLENBelh1QyxFQXlYcEM7QUFDbEI7QUFDQXZELGNBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCN0IsSUFBdkIsQ0FBNEIsT0FBNUIsRUFBcUMsZUFBckM7QUFDQXZCLGNBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxNQUFiLEVBQXFCN0IsSUFBckIsQ0FBMEIsT0FBMUIsRUFBbUMsZUFBbkM7QUFDQTBGLGtCQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ2QsSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsY0FBL0M7QUFHQSxnQkFBSTRGLFNBQVMsR0FBRzVELENBQUMsQ0FBQzZELEtBQWxCOztBQUNBLGlCQUFLLElBQUkvQixDQUFDLEdBQUcsQ0FBUixFQUFXMkIsQ0FBQyxHQUFHdEUsS0FBSyxDQUFDNEMsTUFBMUIsRUFBa0MwQixDQUFDLEdBQUczQixDQUF0QyxFQUF5Q0EsQ0FBQyxFQUExQyxFQUE4QztBQUM1QyxrQkFBSTNDLEtBQUssQ0FBQzJDLENBQUQsQ0FBTCxDQUFTakIsTUFBVCxDQUFnQmdELEtBQWhCLEtBQTBCRCxTQUExQixJQUNBekUsS0FBSyxDQUFDMkMsQ0FBRCxDQUFMLENBQVNkLE1BQVQsQ0FBZ0I2QyxLQUFoQixLQUEwQkQsU0FEOUIsRUFDeUM7QUFFdkMsb0JBQUlFLFNBQVMsR0FBR2hDLENBQWhCO0FBQ0Esb0JBQUlpQyxVQUFVLEdBQUd0SCxFQUFFLENBQUNvRCxTQUFILENBQWEsTUFBYixFQUFxQixDQUFyQixFQUF3QmlFLFNBQXhCLENBQWpCO0FBQ0FsRixpQkFBQyxDQUFDbUYsVUFBRCxDQUFELENBQWMvRixJQUFkLENBQW1CLE9BQW5CLEVBQTRCLFdBQTVCO0FBRUEsb0JBQUlnRyxVQUFVLEdBQUc3RSxLQUFLLENBQUMyRSxTQUFELENBQUwsQ0FBaUJqRCxNQUFqQixDQUF3QmdELEtBQXpDO0FBQ0Esb0JBQUlJLFVBQVUsR0FBRzlFLEtBQUssQ0FBQzJFLFNBQUQsQ0FBTCxDQUFpQjlDLE1BQWpCLENBQXdCNkMsS0FBekM7QUFFQSxvQkFBSUssZ0JBQWdCLEdBQUd6SCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQm1FLFVBQTFCLENBQXZCO0FBQ0Esb0JBQUlHLGdCQUFnQixHQUFHMUgsRUFBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUIsQ0FBdkIsRUFBMEJvRSxVQUExQixDQUF2QjtBQUNBckYsaUJBQUMsQ0FBQ3NGLGdCQUFELENBQUQsQ0FBb0JsRyxJQUFwQixDQUF5QixPQUF6QixFQUFrQyxXQUFsQztBQUNBWSxpQkFBQyxDQUFDdUYsZ0JBQUQsQ0FBRCxDQUFvQm5HLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFdBQWxDO0FBRUEsb0JBQUlvRyxpQkFBaUIsR0FBR1YsTUFBTSxDQUFDVyxNQUFQLEdBQWdCdkYsUUFBaEIsQ0FBeUIsTUFBekIsRUFBaUNrRixVQUFqQyxDQUF4QjtBQUNBLG9CQUFJTSxpQkFBaUIsR0FBR1osTUFBTSxDQUFDVyxNQUFQLEdBQWdCdkYsUUFBaEIsQ0FBeUIsTUFBekIsRUFBaUNtRixVQUFqQyxDQUF4QjtBQUNBckYsaUJBQUMsQ0FBQ3dGLGlCQUFELENBQUQsQ0FBcUJwRyxJQUFyQixDQUEwQixPQUExQixFQUFtQyxnQkFBbkM7QUFDQVksaUJBQUMsQ0FBQzBGLGlCQUFELENBQUQsQ0FBcUJ0RyxJQUFyQixDQUEwQixPQUExQixFQUFtQyxnQkFBbkM7QUFFRDtBQUNGOztBQUNELGdCQUFJdUcsVUFBVSxHQUFHOUgsRUFBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUIsQ0FBdkIsRUFBMEIrRCxTQUExQixDQUFqQjtBQUNBaEYsYUFBQyxDQUFDMkYsVUFBRCxDQUFELENBQWN2RyxJQUFkLENBQW1CLE9BQW5CLEVBQTRCLFdBQTVCO0FBQ0EsZ0JBQUl3RyxjQUFjLEdBQUdkLE1BQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDOEUsU0FBakMsQ0FBckI7QUFDQWhGLGFBQUMsQ0FBQzRGLGNBQUQsQ0FBRCxDQUFrQnhHLElBQWxCLENBQXVCLE9BQXZCLEVBQWdDLGdCQUFoQztBQUNEO0FBNVp1RDtBQUFBO0FBQUEscUNBOFp0Q2dDLENBOVpzQyxFQThabkM7QUFDbkI7QUFDQXZELGNBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCN0IsSUFBdkIsQ0FBNEIsT0FBNUIsRUFBcUMsaUJBQXJDO0FBQ0F2QixjQUFFLENBQUNvRCxTQUFILENBQWEsTUFBYixFQUFxQjdCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGVBQW5DO0FBQ0EwRixrQkFBTSxDQUFDVyxNQUFQLEdBQWdCdkYsUUFBaEIsQ0FBeUIsTUFBekIsRUFBaUNkLElBQWpDLENBQXNDLE9BQXRDLEVBQStDLGNBQS9DO0FBR0EsZ0JBQUk0RixTQUFTLEdBQUc1RCxDQUFDLENBQUM2RCxLQUFsQjs7QUFDQSxpQkFBSyxJQUFJL0IsQ0FBQyxHQUFHLENBQVIsRUFBVzJCLENBQUMsR0FBR3RFLEtBQUssQ0FBQzRDLE1BQTFCLEVBQWtDMEIsQ0FBQyxHQUFHM0IsQ0FBdEMsRUFBeUNBLENBQUMsRUFBMUMsRUFBOEM7QUFDNUMsa0JBQUkzQyxLQUFLLENBQUMyQyxDQUFELENBQUwsQ0FBU2pCLE1BQVQsQ0FBZ0JnRCxLQUFoQixLQUEwQkQsU0FBMUIsSUFDQXpFLEtBQUssQ0FBQzJDLENBQUQsQ0FBTCxDQUFTZCxNQUFULENBQWdCNkMsS0FBaEIsS0FBMEJELFNBRDlCLEVBQ3lDO0FBRXZDLG9CQUFJRSxTQUFTLEdBQUdoQyxDQUFoQjtBQUNBLG9CQUFJaUMsVUFBVSxHQUFHdEgsRUFBRSxDQUFDb0QsU0FBSCxDQUFhLE1BQWIsRUFBcUIsQ0FBckIsRUFBd0JpRSxTQUF4QixDQUFqQjtBQUNBbEYsaUJBQUMsQ0FBQ21GLFVBQUQsQ0FBRCxDQUFjL0YsSUFBZCxDQUFtQixPQUFuQixFQUE0QixXQUE1QjtBQUVBLG9CQUFJZ0csVUFBVSxHQUFHN0UsS0FBSyxDQUFDMkUsU0FBRCxDQUFMLENBQWlCakQsTUFBakIsQ0FBd0JnRCxLQUF6QztBQUNBLG9CQUFJSSxVQUFVLEdBQUc5RSxLQUFLLENBQUMyRSxTQUFELENBQUwsQ0FBaUI5QyxNQUFqQixDQUF3QjZDLEtBQXpDO0FBRUEsb0JBQUlLLGdCQUFnQixHQUFHekgsRUFBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUIsQ0FBdkIsRUFBMEJtRSxVQUExQixDQUF2QjtBQUNBLG9CQUFJRyxnQkFBZ0IsR0FBRzFILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCLENBQXZCLEVBQTBCb0UsVUFBMUIsQ0FBdkI7QUFDQXJGLGlCQUFDLENBQUNzRixnQkFBRCxDQUFELENBQW9CbEcsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsV0FBbEM7QUFDQVksaUJBQUMsQ0FBQ3VGLGdCQUFELENBQUQsQ0FBb0JuRyxJQUFwQixDQUF5QixPQUF6QixFQUFrQyxXQUFsQztBQUVBLG9CQUFJb0csaUJBQWlCLEdBQUdWLE1BQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDa0YsVUFBakMsQ0FBeEI7QUFDQSxvQkFBSU0saUJBQWlCLEdBQUdaLE1BQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDbUYsVUFBakMsQ0FBeEI7QUFDQXJGLGlCQUFDLENBQUN3RixpQkFBRCxDQUFELENBQXFCcEcsSUFBckIsQ0FBMEIsT0FBMUIsRUFBbUMsZ0JBQW5DO0FBQ0FZLGlCQUFDLENBQUMwRixpQkFBRCxDQUFELENBQXFCdEcsSUFBckIsQ0FBMEIsT0FBMUIsRUFBbUMsZ0JBQW5DO0FBRUQ7QUFDRjs7QUFDRCxnQkFBSXVHLFVBQVUsR0FBRzlILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCLENBQXZCLEVBQTBCK0QsU0FBMUIsQ0FBakI7QUFDQWhGLGFBQUMsQ0FBQzJGLFVBQUQsQ0FBRCxDQUFjdkcsSUFBZCxDQUFtQixPQUFuQixFQUE0QixXQUE1QjtBQUNBLGdCQUFJd0csY0FBYyxHQUFHZCxNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQzhFLFNBQWpDLENBQXJCO0FBQ0FoRixhQUFDLENBQUM0RixjQUFELENBQUQsQ0FBa0J4RyxJQUFsQixDQUF1QixPQUF2QixFQUFnQyxnQkFBaEM7QUFDRDtBQWpjdUQ7QUFBQTtBQUFBLGtDQW1jekNnQyxDQW5jeUMsRUFtY3RDO0FBQ2hCdkQsY0FBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUI3QixJQUF2QixDQUE0QixPQUE1QixFQUFxQyxnQkFBckM7QUFDQXZCLGNBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxNQUFiLEVBQXFCN0IsSUFBckIsQ0FBMEIsT0FBMUIsRUFBbUMsZ0JBQW5DO0FBQ0EwRixrQkFBTSxDQUFDVyxNQUFQLEdBQWdCdkYsUUFBaEIsQ0FBeUIsTUFBekIsRUFBaUNkLElBQWpDLENBQXNDLE9BQXRDLEVBQStDLG9CQUEvQztBQUVBLGdCQUFJNEYsU0FBUyxHQUFHNUQsQ0FBQyxDQUFDNkQsS0FBbEI7O0FBQ0EsaUJBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFSLEVBQVcyQixDQUFDLEdBQUd0RSxLQUFLLENBQUM0QyxNQUExQixFQUFrQzBCLENBQUMsR0FBRzNCLENBQXRDLEVBQXlDQSxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLGtCQUFJM0MsS0FBSyxDQUFDMkMsQ0FBRCxDQUFMLENBQVNqQixNQUFULENBQWdCZ0QsS0FBaEIsS0FBMEJELFNBQTFCLElBQ0F6RSxLQUFLLENBQUMyQyxDQUFELENBQUwsQ0FBU2QsTUFBVCxDQUFnQjZDLEtBQWhCLEtBQTBCRCxTQUQ5QixFQUN5QztBQUV2QyxvQkFBSUUsU0FBUyxHQUFHaEMsQ0FBaEI7QUFFQSxvQkFBSWlDLFVBQVUsR0FBR3RILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxNQUFiLEVBQXFCLENBQXJCLEVBQXdCaUUsU0FBeEIsQ0FBakI7QUFDQWxGLGlCQUFDLENBQUNtRixVQUFELENBQUQsQ0FBYy9GLElBQWQsQ0FBbUIsT0FBbkIsRUFBNEIsV0FBNUI7QUFFQSxvQkFBSWdHLFVBQVUsR0FBRzdFLEtBQUssQ0FBQzJFLFNBQUQsQ0FBTCxDQUFpQmpELE1BQWpCLENBQXdCZ0QsS0FBekM7QUFDQSxvQkFBSUksVUFBVSxHQUFHOUUsS0FBSyxDQUFDMkUsU0FBRCxDQUFMLENBQWlCOUMsTUFBakIsQ0FBd0I2QyxLQUF6QztBQUVBLG9CQUFJSyxnQkFBZ0IsR0FBR3pILEVBQUUsQ0FBQ29ELFNBQUgsQ0FBYSxRQUFiLEVBQXVCLENBQXZCLEVBQTBCbUUsVUFBMUIsQ0FBdkI7QUFDQSxvQkFBSUcsZ0JBQWdCLEdBQUcxSCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQm9FLFVBQTFCLENBQXZCO0FBQ0FyRixpQkFBQyxDQUFDc0YsZ0JBQUQsQ0FBRCxDQUFvQmxHLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLFdBQWxDO0FBQ0FZLGlCQUFDLENBQUN1RixnQkFBRCxDQUFELENBQW9CbkcsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsV0FBbEM7QUFFQSxvQkFBSW9HLGlCQUFpQixHQUFHVixNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ2tGLFVBQWpDLENBQXhCO0FBQ0Esb0JBQUlNLGlCQUFpQixHQUFHWixNQUFNLENBQUNXLE1BQVAsR0FBZ0J2RixRQUFoQixDQUF5QixNQUF6QixFQUFpQ21GLFVBQWpDLENBQXhCO0FBQ0FyRixpQkFBQyxDQUFDd0YsaUJBQUQsQ0FBRCxDQUFxQnBHLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGdCQUFuQztBQUNBWSxpQkFBQyxDQUFDMEYsaUJBQUQsQ0FBRCxDQUFxQnRHLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGdCQUFuQztBQUVEO0FBQ0Y7O0FBQ0QsZ0JBQUl1RyxVQUFVLEdBQUc5SCxFQUFFLENBQUNvRCxTQUFILENBQWEsUUFBYixFQUF1QixDQUF2QixFQUEwQitELFNBQTFCLENBQWpCO0FBQ0FoRixhQUFDLENBQUMyRixVQUFELENBQUQsQ0FBY3ZHLElBQWQsQ0FBbUIsT0FBbkIsRUFBNEIsV0FBNUI7QUFDQSxnQkFBSXdHLGNBQWMsR0FBR2QsTUFBTSxDQUFDVyxNQUFQLEdBQWdCdkYsUUFBaEIsQ0FBeUIsTUFBekIsRUFBaUM4RSxTQUFqQyxDQUFyQjtBQUNBaEYsYUFBQyxDQUFDNEYsY0FBRCxDQUFELENBQWtCeEcsSUFBbEIsQ0FBdUIsT0FBdkIsRUFBZ0MsZ0JBQWhDO0FBQ0Q7QUFyZXVEO0FBQUE7QUFBQSxpQ0F1ZTFDTSxJQXZlMEMsRUF1ZXBDO0FBQ2xCLGdCQUFJbUcsU0FBSjtBQUNBLGdCQUFJQyxTQUFKOztBQUNBLGdCQUFJcEcsSUFBSSxLQUFLLFVBQWIsRUFBeUI7QUFDdkJtRyx1QkFBUyxHQUFHLFVBQVo7QUFDQUMsdUJBQVMsR0FBRyxVQUFaO0FBQ0QsYUFIRCxNQUdPO0FBQ0xELHVCQUFTLEdBQUcsTUFBWjtBQUNBQyx1QkFBUyxHQUFHLE1BQVo7QUFDRCxhQVRpQixDQVdsQjs7O0FBQ0FoQixrQkFBTSxDQUFDM0UsR0FBUCxDQUFXO0FBQUMsd0JBQVUsQ0FBQyxhQUFhMEYsU0FBZDtBQUFYLGFBQVg7QUFDQWYsa0JBQU0sQ0FBQzNFLEdBQVAsQ0FBVztBQUFDLHdCQUFVLENBQUMsVUFBVTBGLFNBQVg7QUFBWCxhQUFYO0FBQ0FmLGtCQUFNLENBQUMzRSxHQUFQLENBQVc7QUFBQyx3QkFBVSxDQUFDMEYsU0FBRDtBQUFYLGFBQVg7QUFFQXBILGdCQUFJLENBQUMwQixHQUFMLENBQVM7QUFBQyx3QkFBVSxDQUFDLGFBQWEyRixTQUFkO0FBQVgsYUFBVDtBQUNBckgsZ0JBQUksQ0FBQzBCLEdBQUwsQ0FBUztBQUFDLHdCQUFVLENBQUMsVUFBVTJGLFNBQVg7QUFBWCxhQUFUO0FBQ0FySCxnQkFBSSxDQUFDMEIsR0FBTCxDQUFTO0FBQUMsd0JBQVUsQ0FBQzJGLFNBQUQ7QUFBWCxhQUFUO0FBQ0Q7QUExZnVEOztBQUFBO0FBQUE7QUE2ZjFEOzs7QUFDQSxVQUFJLENBQUN2SSxJQUFMLEVBQVc7QUFDVGtFLFlBQUksQ0FBQ0ssRUFBTCxDQUFRLFdBQVIsRUFBcUIsVUFBVVYsQ0FBVixFQUFhO0FBQ2hDMkQsa0JBQVEsQ0FBQ2dCLFNBQVQsQ0FBbUIzRSxDQUFuQjs7QUFDQSxjQUFJN0MsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ25CeUgsZUFBRyxDQUFDQyxLQUFKLENBQVVDLElBQVYsQ0FBZSxXQUFmLEVBQTRCO0FBQzFCQyxvQkFBTSxFQUFFLEdBRGtCLENBQ2Q7O0FBRGMsYUFBNUI7QUFHRDtBQUNGLFNBUEQ7QUFTQTFFLFlBQUksQ0FBQ0ssRUFBTCxDQUFRLFVBQVIsRUFBb0IsVUFBVVYsQ0FBVixFQUFhO0FBQy9CMkQsa0JBQVEsQ0FBQ3FCLFFBQVQsQ0FBa0JoRixDQUFsQjtBQUNELFNBRkQ7QUFJQUssWUFBSSxDQUFDSyxFQUFMLENBQVEsV0FBUixFQUFxQixVQUFVVixDQUFWLEVBQWE7QUFDaEMyRCxrQkFBUSxDQUFDc0IsU0FBVCxDQUFtQmpGLENBQW5CO0FBQ0EyRCxrQkFBUSxDQUFDdUIsTUFBVCxDQUFnQixVQUFoQjtBQUNBTixhQUFHLENBQUNDLEtBQUosQ0FBVUMsSUFBVixDQUFlLFVBQWYsRUFBMkI7QUFDekJDLGtCQUFNLEVBQUUsR0FEaUIsQ0FDYjs7QUFEYSxXQUEzQjtBQUdELFNBTkQ7QUFRQTFFLFlBQUksQ0FBQ0ssRUFBTCxDQUFRLFNBQVIsRUFBbUIsWUFBWTtBQUM3QmtFLGFBQUcsQ0FBQ0MsS0FBSixDQUFVQyxJQUFWLENBQWUsYUFBZixFQUE4QjtBQUM1QkMsa0JBQU0sRUFBRTtBQURvQixXQUE5QjtBQUdELFNBSkQ7QUFNQTFILFlBQUksQ0FBQ3FELEVBQUwsQ0FBUSxTQUFSLEVBQW1CLFVBQVVWLENBQVYsRUFBYTtBQUM5QjJELGtCQUFRLENBQUN3QixPQUFULENBQWlCbkYsQ0FBakI7QUFDQTJELGtCQUFRLENBQUN1QixNQUFULENBQWdCLE1BQWhCO0FBQ0QsU0FIRDtBQUlELE9BOWhCeUQsQ0FnaUIxRDtBQUNBOzs7QUFFQSxVQUFJL0ksSUFBSixFQUFVO0FBQ1IsWUFBSWlKLFlBQVksR0FBRyxDQUFuQjtBQUNBLFlBQUlDLFNBQVMsR0FBRyxDQUFoQjtBQUNBeEgsV0FBRyxDQUFDNkMsRUFBSixDQUFPLFdBQVAsRUFBb0IsWUFBWTtBQUM5QjJFLG1CQUFTLEdBQUcsQ0FBWjtBQUNELFNBRkQ7QUFJQWhGLFlBQUksQ0FBQ0ssRUFBTCxDQUFRLFlBQVIsRUFBc0IsVUFBVVYsQ0FBVixFQUFhO0FBQ2pDMkQsa0JBQVEsQ0FBQzJCLFVBQVQsQ0FBb0J0RixDQUFwQjtBQUNELFNBRkQ7QUFJQUssWUFBSSxDQUFDSyxFQUFMLENBQVEsVUFBUixFQUFvQixZQUFZO0FBQzlCMEUsc0JBQVksR0FBRyxDQUFmO0FBQ0QsU0FGRDtBQUlBdkgsV0FBRyxDQUFDNkMsRUFBSixDQUFPLFlBQVAsRUFBcUIsVUFBVVYsQ0FBVixFQUFhO0FBQ2hDb0Ysc0JBQVksR0FBRyxDQUFmO0FBQ0QsU0FGRDtBQUlBdkgsV0FBRyxDQUFDNkMsRUFBSixDQUFPLFVBQVAsRUFBbUIsWUFBWTtBQUM3QixjQUFJMkUsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ25CLGdCQUFJRCxZQUFZLEtBQUssQ0FBckIsRUFBd0I7QUFDdEIzSSxnQkFBRSxDQUFDb0QsU0FBSCxDQUFhLFFBQWIsRUFBdUI3QixJQUF2QixDQUE0QixPQUE1QixFQUFxQyxnQkFBckM7QUFDQXZCLGdCQUFFLENBQUNvRCxTQUFILENBQWEsTUFBYixFQUFxQjdCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGdCQUFuQztBQUNBMEYsb0JBQU0sQ0FBQ1csTUFBUCxHQUFnQnZGLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDZCxJQUFqQyxDQUFzQyxPQUF0QyxFQUErQyxvQkFBL0M7QUFDRDtBQUNGOztBQUNEcUgsbUJBQVMsR0FBRyxDQUFaO0FBQ0QsU0FURDtBQVVELE9BaGtCeUQsQ0Fra0IxRDs7O0FBRUExRCwwQkFBb0IsR0FBR1csVUFBVSxDQUFDLFlBQU07QUFDdENsRCxhQUFLLENBQUNtRCxJQUFOLEdBRHNDLENBQ3hCOztBQUNkbEMsWUFBSSxDQUFDWSxJQUFMLENBQVUsVUFBVWpCLENBQVYsRUFBYSxDQUNyQjtBQUNELFNBRkQ7QUFHRCxPQUxnQyxFQUs5QixLQUw4QixDQUFqQztBQVFBO0FBRUE7O0FBOWtCMEQsVUEra0JwRHVGLFlBL2tCb0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwwQ0FnbEJqQ0MsUUFobEJpQyxFQWdsQnZCO0FBQy9CLGdCQUFJQyxVQUFVLEdBQUc5RyxJQUFJLENBQUNHLFFBQUwsQ0FBYyxNQUFkLEVBQXNCMEcsUUFBdEIsQ0FBakI7QUFDQTVHLGFBQUMsQ0FBQzZHLFVBQUQsQ0FBRCxDQUFjQyxPQUFkLENBQXNCO0FBQ2hCLDJCQUFhLENBQUMsUUFBRCxDQURHO0FBRWhCLDZCQUFlLENBQUMsS0FBRDtBQUZDLGFBQXRCLEVBSUksR0FKSjtBQU1BLGdCQUFJQyxVQUFVLEdBQUdoSCxJQUFJLENBQUNHLFFBQUwsQ0FBYyxNQUFkLEVBQXNCMEcsUUFBdEIsQ0FBakI7QUFDQTVHLGFBQUMsQ0FBQytHLFVBQUQsQ0FBRCxDQUFjNUcsR0FBZCxDQUFrQjtBQUFDLHdCQUFVLENBQUMvQixLQUFLLENBQUN3SSxRQUFELENBQU47QUFBWCxhQUFsQjtBQUNBNUcsYUFBQyxDQUFDK0csVUFBRCxDQUFELENBQWNELE9BQWQsQ0FBc0I7QUFBQyw4QkFBZ0IsQ0FBQyxHQUFEO0FBQWpCLGFBQXRCLEVBQStDLEdBQS9DO0FBRUEsZ0JBQUlFLGNBQWMsR0FBR2xDLE1BQU0sQ0FBQ1csTUFBUCxDQUFjLE1BQU1tQixRQUFwQixFQUE4QjFHLFFBQTlCLENBQXVDLFFBQXZDLENBQXJCO0FBQ0FGLGFBQUMsQ0FBQ2dILGNBQUQsQ0FBRCxDQUFrQjVILElBQWxCLENBQXVCLE9BQXZCLEVBQWdDLGdCQUFoQyxFQWIrQixDQWMvQjs7QUFFQSxnQkFBSTZILFlBQVksR0FBR25DLE1BQU0sQ0FBQ1csTUFBUCxDQUFjLE1BQU1tQixRQUFwQixFQUE4QjFHLFFBQTlCLENBQXVDLE1BQXZDLENBQW5CO0FBQ0FGLGFBQUMsQ0FBQ2lILFlBQUQsQ0FBRCxDQUFnQjdILElBQWhCLENBQXFCLE9BQXJCLEVBQThCLGNBQTlCO0FBQ0Q7QUFsbUJ1RDtBQUFBO0FBQUEseUNBb21CbEN3SCxRQXBtQmtDLEVBb21CeEI7QUFDOUIsZ0JBQUlDLFVBQVUsR0FBRzlHLElBQUksQ0FBQ0csUUFBTCxDQUFjLE1BQWQsRUFBc0IwRyxRQUF0QixDQUFqQjtBQUNBNUcsYUFBQyxDQUFDNkcsVUFBRCxDQUFELENBQWNDLE9BQWQsQ0FBc0I7QUFDaEIsc0JBQVEsQ0FBQyxTQUFELENBRFE7QUFFaEIsMkJBQWEsQ0FBQyxLQUFELENBRkc7QUFHaEIsNkJBQWUsQ0FBQyxLQUFEO0FBSEMsYUFBdEIsRUFLSSxHQUxKO0FBT0EsZ0JBQUlDLFVBQVUsR0FBR2hILElBQUksQ0FBQ0csUUFBTCxDQUFjLE1BQWQsRUFBc0IwRyxRQUF0QixDQUFqQjtBQUNBNUcsYUFBQyxDQUFDK0csVUFBRCxDQUFELENBQWM1RyxHQUFkLENBQWtCO0FBQUMsd0JBQVUsQ0FBQyxPQUFEO0FBQVgsYUFBbEI7QUFDQUgsYUFBQyxDQUFDK0csVUFBRCxDQUFELENBQWNELE9BQWQsQ0FBc0I7QUFBQyw4QkFBZ0IsQ0FBQyxHQUFEO0FBQWpCLGFBQXRCLEVBQStDLEdBQS9DO0FBRUEsZ0JBQUlFLGNBQWMsR0FBR2xDLE1BQU0sQ0FBQ1csTUFBUCxDQUFjLE1BQU1tQixRQUFwQixFQUE4QjFHLFFBQTlCLENBQXVDLFFBQXZDLENBQXJCO0FBQ0FGLGFBQUMsQ0FBQ2dILGNBQUQsQ0FBRCxDQUFrQjVILElBQWxCLENBQXVCLE9BQXZCLEVBQWdDLHNCQUFoQztBQUVBLGdCQUFJNkgsWUFBWSxHQUFHbkMsTUFBTSxDQUFDVyxNQUFQLENBQWMsTUFBTW1CLFFBQXBCLEVBQThCMUcsUUFBOUIsQ0FBdUMsTUFBdkMsQ0FBbkI7QUFDQUYsYUFBQyxDQUFDaUgsWUFBRCxDQUFELENBQWdCN0gsSUFBaEIsQ0FBcUIsT0FBckIsRUFBOEIsb0JBQTlCO0FBQ0Q7QUF0bkJ1RDtBQUFBO0FBQUEseUNBd25CbEN3SCxRQXhuQmtDLEVBd25CeEI7QUFDOUIsZ0JBQUlDLFVBQVUsR0FBRzlHLElBQUksQ0FBQ0csUUFBTCxDQUFjLE1BQWQsRUFBc0IwRyxRQUF0QixDQUFqQjtBQUNBNUcsYUFBQyxDQUFDNkcsVUFBRCxDQUFELENBQWNDLE9BQWQsQ0FBc0I7QUFDaEIsMkJBQWEsQ0FBQyxRQUFELENBREc7QUFFaEIsNkJBQWUsQ0FBQyxLQUFEO0FBRkMsYUFBdEIsRUFJSSxHQUpKO0FBTUEsZ0JBQUlDLFVBQVUsR0FBR2hILElBQUksQ0FBQ0csUUFBTCxDQUFjLE1BQWQsRUFBc0IwRyxRQUF0QixDQUFqQjtBQUNBNUcsYUFBQyxDQUFDK0csVUFBRCxDQUFELENBQWM1RyxHQUFkLENBQWtCO0FBQUMsd0JBQVUsQ0FBQy9CLEtBQUssQ0FBQ3dJLFFBQUQsQ0FBTjtBQUFYLGFBQWxCO0FBQ0E1RyxhQUFDLENBQUMrRyxVQUFELENBQUQsQ0FBY0QsT0FBZCxDQUFzQjtBQUFDLDhCQUFnQixDQUFDLEdBQUQ7QUFBakIsYUFBdEIsRUFBK0MsR0FBL0M7QUFFQSxnQkFBSUUsY0FBYyxHQUFHbEMsTUFBTSxDQUFDVyxNQUFQLENBQWMsTUFBTW1CLFFBQXBCLEVBQThCMUcsUUFBOUIsQ0FBdUMsUUFBdkMsQ0FBckI7QUFDQUYsYUFBQyxDQUFDZ0gsY0FBRCxDQUFELENBQWtCNUgsSUFBbEIsQ0FBdUIsT0FBdkIsRUFBZ0MsZ0JBQWhDO0FBRUEsZ0JBQUk2SCxZQUFZLEdBQUduQyxNQUFNLENBQUNXLE1BQVAsQ0FBYyxNQUFNbUIsUUFBcEIsRUFBOEIxRyxRQUE5QixDQUF1QyxNQUF2QyxDQUFuQjtBQUNBRixhQUFDLENBQUNpSCxZQUFELENBQUQsQ0FBZ0I3SCxJQUFoQixDQUFxQixPQUFyQixFQUE4QixjQUE5QjtBQUNEO0FBem9CdUQ7O0FBQUE7QUFBQSxXQTZvQjFEOzs7QUFDQSxXQUFLLElBQUk4RCxDQUFDLEdBQUcsQ0FBUixFQUFXMkIsQ0FBQyxHQUFHakcsVUFBVSxDQUFDdUUsTUFBL0IsRUFBdUMwQixDQUFDLEdBQUczQixDQUEzQyxFQUE4Q0EsQ0FBQyxFQUEvQyxFQUFtRDtBQUNqRCxZQUFJMEQsUUFBUSxHQUFHN0csSUFBSSxDQUFDbUQsQ0FBRCxDQUFuQjtBQUNBbEQsU0FBQyxDQUFDNEcsUUFBRCxDQUFELENBQVl4SCxJQUFaLENBQWlCLElBQWpCLEVBQXVCLGNBQWM4RCxDQUFyQztBQUNELE9BanBCeUQsQ0FvcEIxRDs7O0FBQ0EsVUFBSWdFLFNBQVMsR0FBR3BDLE1BQU0sQ0FBQ1csTUFBUCxFQUFoQjs7QUFFQSxXQUFLLElBQUl2QyxFQUFDLEdBQUcsQ0FBUixFQUFXMkIsRUFBQyxHQUFHcUMsU0FBUyxDQUFDL0QsTUFBOUIsRUFBc0MwQixFQUFDLEdBQUczQixFQUExQyxFQUE2Q0EsRUFBQyxFQUE5QyxFQUFrRDtBQUNoRCxZQUFJaUUsS0FBSyxHQUFHRCxTQUFTLENBQUNoRSxFQUFELENBQXJCO0FBQ0FsRCxTQUFDLENBQUNtSCxLQUFELENBQUQsQ0FBUy9ILElBQVQsQ0FBYyxPQUFkLEVBQXVCa0IsS0FBSyxDQUFDNEMsRUFBRCxDQUFMLENBQVMxQixRQUFoQyxFQUZnRCxDQUdoRDtBQUNEOztBQUVELFVBQUk0RixZQUFZLEdBQUd2SixFQUFFLENBQUNvRCxTQUFILENBQWEsT0FBYixDQUFuQjs7QUFDQSxVQUFJLENBQUMxRCxJQUFMLEVBQVc7QUFDVDZKLG9CQUFZLENBQUN0RixFQUFiLENBQWdCLFdBQWhCLEVBQTZCLFlBQVk7QUFDdkMsY0FBSThFLFFBQVEsR0FBRyxLQUFLUyxFQUFMLENBQVFDLEtBQVIsQ0FBYyxDQUFkLENBQWY7QUFDQVgsc0JBQVksQ0FBQ1ksZUFBYixDQUE2QlgsUUFBN0I7QUFFQVosYUFBRyxDQUFDQyxLQUFKLENBQVVDLElBQVYsQ0FBZSxXQUFmLEVBQTRCO0FBQzFCQyxrQkFBTSxFQUFFLEdBRGtCLENBQ2Q7O0FBRGMsV0FBNUI7QUFHRCxTQVBEO0FBU0FpQixvQkFBWSxDQUFDdEYsRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFZO0FBQ25DLGNBQUk4RSxRQUFRLEdBQUcsS0FBS1MsRUFBTCxDQUFRQyxLQUFSLENBQWMsQ0FBZCxDQUFmO0FBQ0FYLHNCQUFZLENBQUNhLGNBQWIsQ0FBNEJaLFFBQTVCO0FBRUFaLGFBQUcsQ0FBQ0MsS0FBSixDQUFVQyxJQUFWLENBQWUsUUFBZjtBQUNELFNBTEQsRUFWUyxDQWlCVDs7QUFDQWtCLG9CQUFZLENBQUN0RixFQUFiLENBQWdCLFVBQWhCLEVBQTRCLFlBQVk7QUFDdEMsY0FBSThFLFFBQVEsR0FBRyxLQUFLUyxFQUFMLENBQVFDLEtBQVIsQ0FBYyxDQUFkLENBQWY7QUFDQVgsc0JBQVksQ0FBQ2MsY0FBYixDQUE0QmIsUUFBNUI7QUFDRCxTQUhEO0FBSUQ7QUFHRDtBQUNBOzs7QUFDQVosU0FBRyxDQUFDQyxLQUFKLENBQVU7QUFDUnlCLGNBQU0sRUFBRSxDQUFDO0FBQUM5RixjQUFJLEVBQUU7QUFBUCxTQUFELEVBQ047QUFBQ0EsY0FBSSxFQUFFO0FBQVAsU0FETSxFQUVOO0FBQUNBLGNBQUksRUFBRTtBQUFQLFNBRk0sRUFHTjtBQUFDQSxjQUFJLEVBQUU7QUFBUCxTQUhNLEVBSU47QUFBQ0EsY0FBSSxFQUFFO0FBQVAsU0FKTSxDQURBO0FBT1I7QUFDQStGLFlBQUksRUFBRSxpQkFSRTtBQVNSQyxlQUFPLEVBQUUsSUFURDtBQVVSQyxpQkFBUyxFQUFFLElBVkg7QUFXUjFCLGNBQU0sRUFBRTtBQVhBLE9BQVYsRUF6ckIwRCxDQXVzQjFEOztBQUNBLFVBQUksQ0FBQzVJLElBQUwsRUFBVztBQUNUeUksV0FBRyxDQUFDQyxLQUFKLENBQVVDLElBQVYsQ0FBZSxTQUFmO0FBQ0Q7QUFHRixLQTdzQkQ7QUE4c0JELEdBL3NCRDtBQWl0QkQsQ0F6dEJELEkiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiKCgpID0+IHtcbiAgbGV0IGlzU3AgPSAoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignaVBob25lJykgPiAwIHx8XG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKSA+IDApIHx8XG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQb2QnKSA+IDAgfHxcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpID4gMCk7XG5cbiAgY29uc29sZS5sb2coaXNTcClcblxuICBkMy5qc29uKFwic3JjL2RhdGEvZmxhdm9yX2RhdGEuanNvblwiLCBmdW5jdGlvbiAoZXJyb3IsIGRhdGExKSB7XG4gICAgZDMuanNvbihcInNyYy9kYXRhL3VtYW1pX2RhdGEuanNvblwiLCBmdW5jdGlvbiAoZXJyb3IsIGRhdGEyKSB7XG4gICAgICBsZXQgZmxhdm9yRGF0YSA9IGRhdGExO1xuICAgICAgbGV0IHVtYW1pRGF0YSA9IGRhdGEyO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhmbGF2b3JEYXRhKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHVtYW1pRGF0YSk7XG5cbiAgICAgIC8vbWFrZSBjb2xvciBmdW5jdGlvblxuICAgICAgbGV0IGNvbG9yID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIGxlZ2VuZENvbG9yW25dO1xuICAgICAgfTtcblxuICAgICAgLyogQ2hlY2tpbmcgaWYgbW91c2UgYnV0dG9uIGRvd24gb3Igbm90PyAqL1xuICAgICAgLy8gZGVmYXVsdCA6IHVwXG4gICAgICBsZXQgbW91c2VEb3duID0gMDtcbiAgICAgIGRvY3VtZW50LmJvZHkub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vdXNlRG93biA9IDE7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYm9keS5vbm1vdXNldXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vdXNlRG93biA9IDA7XG4gICAgICB9O1xuXG4gICAgICAvKiAvL0xlZ2VuZC8vICovXG4gICAgICBsZXQgbGVnZW5kTmFtZSA9IFtcInBsYW50XCIsIFwiZnJ1aXRcIiwgXCJtZWF0XCIsIFwidmVnZXRhYmxlXCIsIFwiY2VyZWFsL2Nyb3BcIixcbiAgICAgICAgXCJhbGNvaG9saWMgYmV2ZXJhZ2VcIiwgXCJoZXJiXCIsIFwiZGFpcnlcIiwgXCJudXQvc2VlZC9wdWxzZVwiLCBcInNwaWNlXCIsXG4gICAgICAgIFwiZmlzaC9zZWFmb29kXCIsIFwicGxhbnQgZGVyaXZhdGl2ZVwiLCBcImZsb3dlclwiLCBcImFuaW1hbCBwcm9kdWN0XCJdO1xuXG4gICAgICBsZXQgbGVnZW5kQ29sb3IgPSBbXCIjMGZmZjBmXCIsIFwiI2ZjNzgzZlwiLCBcIiNmZjRjNGNcIiwgXCIjM2NiMzdhXCIsIFwiI2U4YzU5Y1wiLFxuICAgICAgICBcIiNlNzM1NTJcIiwgXCIjYWQ1ZDg4XCIsIFwiI2RiODMwZFwiLCBcIiM5NjVkMjFcIiwgXCIjMDBhZmNjXCIsXG4gICAgICAgIFwiIzQzNGRhMlwiLCBcIiNiM2U1MDBcIiwgXCIjZmYwMGFlXCIsIFwiI2ZmN2ZiZlwiXTtcblxuICAgICAgbGV0IG9yZGluYWwgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgICAuZG9tYWluKGxlZ2VuZE5hbWUpXG4gICAgICAgICAgLnJhbmdlKGxlZ2VuZENvbG9yKTtcblxuXG4gICAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KFwiI215R3JhcGhcIik7XG5cbiAgICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZE9yZGluYWxcIilcbiAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgyNSw1MClcIilcbiAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjJlbVwiKVxuICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjMzUyNjIyXCIpXG4gICAgICAgICAgLnN0eWxlKHtcImZvbnQtZmFtaWx5XCI6IFtcIkhlbHZldGljYSBOZXVlXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCJdfSk7XG5cblxuICAgICAgbGV0IGxlZ2VuZE9yZGluYWwgPSBkMy5sZWdlbmQuY29sb3IoKVxuICAgICAgICAgIC5zaGFwZShcInBhdGhcIiwgZDMuc3ZnLnN5bWJvbCgpLnR5cGUoXCJjaXJjbGVcIikuc2l6ZSgzMDApKCkpXG4gICAgICAgICAgLnNoYXBlUGFkZGluZyg0KVxuICAgICAgICAgIC5sYWJlbE9mZnNldCgyLjUpXG4gICAgICAgICAgLy8udGl0bGUoXCJJbmdyZWRpZW50IENhdGVnb3JpZXNcIilcbiAgICAgICAgICAuc2NhbGUob3JkaW5hbCk7XG5cbiAgICAgIHN2Zy5zZWxlY3QoXCIubGVnZW5kT3JkaW5hbFwiKVxuICAgICAgICAgIC5jYWxsKGxlZ2VuZE9yZGluYWwpO1xuXG4gICAgICAvLyBhdHRyIG9mIGxlZ2VuZCBjaXJjbGVcbiAgICAgIGxldCBjZWxsID0gJChcIi5jZWxsXCIpO1xuICAgICAgbGV0IGxlZ2VuZFBhdGhEZWZvID0gY2VsbC5jaGlsZHJlbihcInBhdGhcIik7XG4gICAgICAkKGxlZ2VuZFBhdGhEZWZvKS5jc3Moe1xuICAgICAgICBcIm9wYWNpdHlcIjogW1wiMC42XCJdLFxuICAgICAgICBcInN0cm9rZS13aWR0aFwiOiBbXCIyXCJdLFxuICAgICAgICBcInN0cm9rZVwiOiBbXCJ3aGl0ZVwiXVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldCBwb2ludGVyIGN1cnNvciBhdCBsZWdlbmRcbiAgICAgICQoXCIubGVnZW5kQ2VsbHNcIikuY3NzKHtcImN1cnNvclwiOiBbXCJwb2ludGVyXCJdfSk7XG5cbiAgICAgIC8qIC8vU2V0dGluZy8vICovXG4gICAgICBsZXQgd2lkdGggPSAxMjAwO1xuICAgICAgbGV0IGhlaWdodCA9IDkwMDtcblxuICAgICAgbGV0IG5vZGVzID0gZmxhdm9yRGF0YS5ub2RlcztcbiAgICAgIGxldCBsaW5rcyA9IGZsYXZvckRhdGEubGlua3M7XG5cblxuICAgICAgbGV0IGZvcmNlID0gZDMubGF5b3V0LmZvcmNlKClcbiAgICAgICAgICAubm9kZXMobm9kZXMpXG4gICAgICAgICAgLmxpbmtzKGxpbmtzKVxuICAgICAgICAgIC5zaXplKFt3aWR0aCAtIDUwLCBoZWlnaHQgLSAxMF0pIC8vVGhlIGNlbnRlciBvZiBncmF2aXR5Olt4LzIsIHkvMl1cbiAgICAgICAgICAubGlua0Rpc3RhbmNlKDEwMClcbiAgICAgICAgICAubGlua1N0cmVuZ3RoKDAuOClcbiAgICAgICAgICAuZ3Jhdml0eSgwLjIwKVxuICAgICAgICAgIC5jaGFyZ2UoLTMwMClcbiAgICAgICAgICAuZnJpY3Rpb24oMC44MClcbiAgICAgICAgICAuc3RhcnQoKTtcblxuXG4gICAgICAvKiAvL0NvbnRpbnVhbGx5IG1vdmUvLyAqL1xuICAgICAgLy9zZXRJbnRlcnZhbChmdW5jdGlvbigpe2ZvcmNlLmFscGhhKDAuMDUpO30sIDEyNSk7XG4gICAgICAvL2QzLnRpbWVyKGZ1bmN0aW9uKCl7XG4gICAgICAvL2ZvcmNlLmFscGhhKDAuMSk7XG4gICAgICAvL30pO1xuXG4gICAgICAvKiAvL1N0YXRpYyBOZXR3b3JrLy8gKi9cbiAgICAgIC8vIGZvciBwaWN0dXJlXG5cbiAgICAgIC8vbGV0IGtleURvd24gPSAwO1xuICAgICAgbGV0IGJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICAgIC8qXG4gICAgICBib2R5Lm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoa2V5RG93bj09PTApe1xuICAgICAgICAgIGZvcmNlLnN0b3AoKTsgLy9mb3JjZSDjg6zjgqTjgqLjgqbjg4jjga7oqIjnrpfjgpLntYLkuoZcbiAgICAgICAgICBub2RlLmVhY2goZnVuY3Rpb24oZCl7IGQuZml4ZWQgPSB0cnVlIH0pO1xuICAgICAgICAgIGtleURvd24gPSAxXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGZvcmNlLnN0YXJ0KCk7IC8vZm9yY2Ug44Os44Kk44Ki44Km44OI44Gu6KiI566X44KS57WC5LqGXG4gICAgICAgICAgbm9kZS5lYWNoKGZ1bmN0aW9uKGQpeyBkLmZpeGVkID0gZmFsc2UgfSk7XG4gICAgICAgICAga2V5RG93biA9IDBcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAqL1xuXG5cbiAgICAgIC8qIC8vRHJhd2luZy8vICovXG4gICAgICAvLyBkZWZhdWx0IG5vZGUgb3BhY2l0eTowLjZcbiAgICAgIC8vIGRlZmF1bHQgbGluZSBvcGFjaXR5OjAuNVxuXG4gICAgICBsZXQgbGluayA9IGQzLnNlbGVjdChcIiNteUdyYXBoXCIpXG4gICAgICAgICAgLnNlbGVjdEFsbChcIi5saW5lXCIpXG4gICAgICAgICAgLmRhdGEobGlua3MpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCBcIjAuNVwiKVxuICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGQud2VpZ2h0KSAqIDAuMSArIGQud2VpZ2h0ICogMC4wMlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvcihkLmdyb3VwX2lkKVxuICAgICAgICAgIH0pO1xuXG4gICAgICBsZXQgbm9kZSA9IGQzLnNlbGVjdChcIiNteUdyYXBoXCIpXG4gICAgICAgICAgLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgICAgICAgIC5kYXRhKG5vZGVzKVxuICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuY2FsbChmb3JjZS5kcmFnKTtcblxuICAgICAgbm9kZS5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAuYXR0cihcIm9wYWNpdHlcIiwgXCIwLjZcIilcbiAgICAgICAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoZC5zaXplKSAqIDUgKyAzO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IoZC5ncm91cF9pZClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiI2ZmZmNmOVwiKTtcbiAgICAgIC8vLmF0dHIoXCJzdHJva2VcIiwgZnVuY3Rpb24oZCxpKXtyZXR1cm4gY29sb3IoZC5ncm91cF9pZCl9KTtcblxuICAgICAgbm9kZS5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgICAgLmF0dHIoXCJkeFwiLCBcIi0wLjVlbVwiKVxuICAgICAgICAgIC5hdHRyKFwiZHlcIiwgXCIwLjdlbVwiKVxuICAgICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiLjdlbVwiKVxuICAgICAgICAgIC5hdHRyKFwiZm9udC13ZWlnaHRcIiwgXCIzMDBcIilcbiAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub25EcmFnXCIpXG4gICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiIzM1MjYyMlwiKVxuICAgICAgICAgIC5hdHRyKHtcImZvbnQtZmFtaWx5XCI6IFtcIkZ1dHVyYVwiLCBcIk51bml0b1wiLCBcIkhlbHZldGljYSBOZXVlXCIsIFwiQXJpYWxcIiwgXCJzYW5zLXNlcmlmXCJdfSk7XG5cbiAgICAgIC8vIHRvIGVuY2xvc2Ugbm9kZSBpbiBTVkdcbiAgICAgIGxldCB3YWxsTWFyZ2luID0gNy41O1xuXG4gICAgICBmb3JjZS5vbihcInRpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsaW5rXG4gICAgICAgIC8vLmF0dHIoXCJ4MVwiLCBmdW5jdGlvbihkKXsgcmV0dXJuIGQuc291cmNlLng7fSlcbiAgICAgICAgLy8uYXR0cihcInkxXCIsIGZ1bmN0aW9uKGQpeyByZXR1cm4gZC5zb3VyY2UueTt9KVxuICAgICAgICAvLy5hdHRyKFwieDJcIiwgZnVuY3Rpb24oZCl7IHJldHVybiBkLnRhcmdldC54O30pXG4gICAgICAgIC8vLmF0dHIoXCJ5MlwiLCBmdW5jdGlvbihkKXsgcmV0dXJuIGQudGFyZ2V0Lnk7fSlcbiAgICAgICAgICAgIC5hdHRyKFwieDFcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHdhbGxNYXJnaW4sIE1hdGgubWluKHdpZHRoIC0gd2FsbE1hcmdpbiwgZC5zb3VyY2UueCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHdhbGxNYXJnaW4sIE1hdGgubWluKGhlaWdodCAtIHdhbGxNYXJnaW4sIGQuc291cmNlLnkpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcIngyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCh3YWxsTWFyZ2luLCBNYXRoLm1pbih3aWR0aCAtIHdhbGxNYXJnaW4sIGQudGFyZ2V0LngpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcInkyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCh3YWxsTWFyZ2luLCBNYXRoLm1pbihoZWlnaHQgLSB3YWxsTWFyZ2luLCBkLnRhcmdldC55KSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBub2RlXG4gICAgICAgIC8vLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBkLnggKyBcIixcIiArIGQueSArIFwiKVwiOyB9KTsgLy9iZWNhdXNlIG9mIGFwcGVuZGluZyBcImdcIlxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgTWF0aC5tYXgod2FsbE1hcmdpbiwgTWF0aC5taW4od2lkdGggLSB3YWxsTWFyZ2luLCBkLngpKVxuICAgICAgICAgICAgICAgICAgKyBcIixcIlxuICAgICAgICAgICAgICAgICAgKyBNYXRoLm1heCh3YWxsTWFyZ2luLCBNYXRoLm1pbihoZWlnaHQgLSB3YWxsTWFyZ2luLCBkLnkpKVxuICAgICAgICAgICAgICAgICAgKyBcIilcIjtcbiAgICAgICAgICAgIH0pOyAvL2JlY2F1c2Ugb2YgYXBwZW5kaW5nIFwiZ1wiXG5cbiAgICAgICAgLy9jb2xsaXNpb24gZGV0ZWN0aW9uXG4gICAgICAgIG5vZGVcbiAgICAgICAgICAgIC5lYWNoKGNvbGxpZGUoMC41KSk7XG4gICAgICB9KTtcblxuXG4gICAgICBjb25zdCBkYXRhVHlwZVNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFUeXBlJyk7XG4gICAgICBkYXRhVHlwZVNlbGVjdG9yLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDpgbjmip7jgZXjgozjgabjgYTjgotvcHRpb27opoHntKDjgpLlj5blvpfjgZnjgotcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUeXBlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkVHlwZSA9PT0gJ0ZsYXZvcicpIHtcbiAgICAgICAgICBmb3JjZVxuICAgICAgICAgICAgICAubGlua0Rpc3RhbmNlKDEwMClcbiAgICAgICAgICAgICAgLmdyYXZpdHkoMC4yMClcbiAgICAgICAgICAgICAgLmNoYXJnZSgtMzAwKTtcbiAgICAgICAgICBub2RlcyA9IGZsYXZvckRhdGEubm9kZXM7XG4gICAgICAgICAgbGlua3MgPSBmbGF2b3JEYXRhLmxpbmtzO1xuICAgICAgICAgIHVwZGF0ZShzZWxlY3RlZFR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRUeXBlID09PSAnVW1hbWknKSB7XG4gICAgICAgICAgZm9yY2VcbiAgICAgICAgICAgICAgLmxpbmtEaXN0YW5jZSgxNTApXG4gICAgICAgICAgICAgIC5ncmF2aXR5KDEuODApXG4gICAgICAgICAgICAgIC5jaGFyZ2UoLTI1MDApO1xuICAgICAgICAgIC8vIG5vZGVzID0gdW1hbWlEYXRhLm5vZGVzO1xuICAgICAgICAgIGxpbmtzID0gdW1hbWlEYXRhLmxpbmtzO1xuICAgICAgICAgIHVwZGF0ZShzZWxlY3RlZFR5cGUpXG4gICAgICAgIH1cbiAgICAgIH07XG5cblxuICAgICAgbGV0IHN0b3BGb3JjZVNldEludGVydmFsO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGUoc2VsZWN0ZWRUeXBlKSB7XG5cbiAgICAgICAgbGV0IGRlbGV0ZUxpbmUgPSBkMy5zZWxlY3RBbGwoXCJsaW5lXCIpO1xuXG4gICAgICAgIC8vIGZvcmNlLm5vZGVzKG5vZGVzKS5saW5rcyhsaW5rcyk7XG4gICAgICAgIGZvcmNlLmxpbmtzKGxpbmtzKTtcblxuXG4gICAgICAgIGxpbmsgPSBkMy5zZWxlY3QoXCIjbXlHcmFwaFwiKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcIi5saW5lXCIpXG4gICAgICAgICAgICAuZGF0YShsaW5rcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwibGluZVwiKTtcblxuICAgICAgICBsaW5rLmF0dHIoXCJvcGFjaXR5XCIsIFwiMC41XCIpXG4gICAgICAgICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGQud2VpZ2h0KSAqIDAuMSArIGQud2VpZ2h0ICogMC4wMjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29sb3IoZC5ncm91cF9pZClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRlbGV0ZUxpbmUucmVtb3ZlKCk7XG5cbiAgICAgICAgZm9yY2Uuc3RhcnQoKTtcbiAgICAgICAgZDMuc2VsZWN0QWxsKFwibGluZVwiKS5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBcIlwiKTtcblxuXG4gICAgICAgIC8vIGNoYW5nZSBsaW5lIGRpc3BsYXkgb3JkZXIgdG8gYmFjayBvZiBub2RlXG4gICAgICAgIGZvciAobGV0IGkgPSBsaW5rcy5sZW5ndGggLSAxOyAwIDw9IGk7IGktLSkge1xuICAgICAgICAgIGNvbnN0IGxpbmtTVkcgPSBsaW5rWzBdW2ldO1xuICAgICAgICAgIGNvbnN0IGZpcnN0U1ZHID0gbGlua1NWRy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgaWYgKGZpcnN0U1ZHKSB7XG4gICAgICAgICAgICBsaW5rU1ZHLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtTVkcsIGZpcnN0U1ZHKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckludGVydmFsKHN0b3BGb3JjZVNldEludGVydmFsKTtcbiAgICAgICAgc3RvcEZvcmNlU2V0SW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmb3JjZS5zdG9wKCk7IC8vZm9yY2Ug44Os44Kk44Ki44Km44OI44Gu6KiI566X44KS57WC5LqGXG4gICAgICAgIH0sIDUwMDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBUaXRsZVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaDEnKS50ZXh0Q29udGVudCA9IHNlbGVjdGVkVHlwZSArICcgTmV0d29yaydcbiAgICAgIH1cblxuXG4gICAgICAvKiAvL0NvbGxpc2lvbiBkZXRlY3Rpb24vLyAqL1xuICAgICAgLy8gdG8gcHJldmVudCBmcm9tIG92ZXJyYXBwaW5nXG4gICAgICBsZXQgcmFkaXVzQ2FsbGlzaW9uID0gMTU7XG5cbiAgICAgIGZ1bmN0aW9uIGNvbGxpZGUoYWxwaGEpIHtcbiAgICAgICAgbGV0IHF1YWR0cmVlID0gZDMuZ2VvbS5xdWFkdHJlZShub2Rlcyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIGxldCByYiA9IDIgKiByYWRpdXNDYWxsaXNpb24sXG4gICAgICAgICAgICAgIG54MSA9IGQueCAtIHJiLFxuICAgICAgICAgICAgICBueDIgPSBkLnggKyByYixcbiAgICAgICAgICAgICAgbnkxID0gZC55IC0gcmIsXG4gICAgICAgICAgICAgIG55MiA9IGQueSArIHJiO1xuICAgICAgICAgIHF1YWR0cmVlLnZpc2l0KGZ1bmN0aW9uIChxdWFkLCB4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICAgICAgaWYgKHF1YWQucG9pbnQgJiYgKHF1YWQucG9pbnQgIT09IGQpKSB7XG4gICAgICAgICAgICAgIGxldCB4ID0gZC54IC0gcXVhZC5wb2ludC54LFxuICAgICAgICAgICAgICAgICAgeSA9IGQueSAtIHF1YWQucG9pbnQueSxcbiAgICAgICAgICAgICAgICAgIGwgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgICAgICAgICAgIGlmIChsIDwgcmIpIHtcbiAgICAgICAgICAgICAgICBsID0gKGwgLSByYikgLyBsICogYWxwaGE7XG4gICAgICAgICAgICAgICAgZC54IC09IHggKj0gbDtcbiAgICAgICAgICAgICAgICBkLnkgLT0geSAqPSBsO1xuICAgICAgICAgICAgICAgIHF1YWQucG9pbnQueCArPSB4O1xuICAgICAgICAgICAgICAgIHF1YWQucG9pbnQueSArPSB5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geDEgPiBueDJcbiAgICAgICAgICAgICAgICB8fCB4MiA8IG54MVxuICAgICAgICAgICAgICAgIHx8IHkxID4gbnkyXG4gICAgICAgICAgICAgICAgfHwgeTIgPCBueTE7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cblxuICAgICAgbGV0IGNpcmNsZSA9ICQoXCJjaXJjbGVcIik7XG5cbiAgICAgIGNsYXNzIENvbG9yaW5nIHtcbiAgICAgICAgc3RhdGljIG1vdXNlb3ZlcihkKSB7XG4gICAgICAgICAgbGV0IG5vZGVJbmRleCA9IGQuaW5kZXg7IC8vIHRvIGdldCBub2RlIGluZGV4XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5rcy5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5rc1tpXS5zb3VyY2UuaW5kZXggPT09IG5vZGVJbmRleCB8fFxuICAgICAgICAgICAgICAgIGxpbmtzW2ldLnRhcmdldC5pbmRleCA9PT0gbm9kZUluZGV4KSB7XG5cbiAgICAgICAgICAgICAgbGV0IGxpbmVJbmRleCA9IGk7ICAvLyBpbmRleCBudW1iZXJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsaW5lSW5kZXgpXG5cbiAgICAgICAgICAgICAgbGV0IHNlbGVjdExpbmUgPSBkMy5zZWxlY3RBbGwoXCJsaW5lXCIpWzBdW2xpbmVJbmRleF07IC8vbm9kZSB3aGljaCBtYXRjaCBpbmRleCBudW1iZXJcbiAgICAgICAgICAgICAgJChzZWxlY3RMaW5lKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lQ29sb3JcIik7ICAvLyBub2RlIGNvbG9yXG5cbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsaW5rc1tsaW5lSW5kZXhdLnNvdXJjZS5pbmRleClcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsaW5rc1tsaW5lSW5kZXhdLnRhcmdldC5pbmRleClcblxuICAgICAgICAgICAgICBsZXQgbm9kZVNvdXJjZSA9IGxpbmtzW2xpbmVJbmRleF0uc291cmNlLmluZGV4O1xuICAgICAgICAgICAgICBsZXQgbm9kZVRhcmdldCA9IGxpbmtzW2xpbmVJbmRleF0udGFyZ2V0LmluZGV4O1xuXG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlU291cmNlID0gZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpWzBdW25vZGVTb3VyY2VdOyAvL25vZGUgd2hpY2ggbWF0Y2ggc291cmNlIGluZGV4IG51bWJlclxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVRhcmdldCA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlVGFyZ2V0XTsgLy9ub2RlIHdoaWNoIG1hdGNoIHRhcmdldCBpbmRleCBudW1iZXJcbiAgICAgICAgICAgICAgJChzZWxlY3ROb2RlU291cmNlKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JcIik7ICAvLyBub2RlIGNvbG9yXG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVRhcmdldCkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpOyAgLy8gbm9kZSBjb2xvclxuXG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlU291cmNlMiA9IGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpW25vZGVTb3VyY2VdOyAgLy8gdGV4dCB3aGljaCBtYXRjaCBzb3VyY2UgaW5kZXggbnVtYmVyXG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlVGFyZ2V0MiA9IGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpW25vZGVUYXJnZXRdOyAgLy8gdGV4dCB3aGljaCBtYXRjaCB0YXJnZXQgaW5kZXggbnVtYmVyXG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZTIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtlZE5vZGVUZXh0XCIpOyAgLy8gbm9kZSB0ZXh0IGNvbG9yXG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVRhcmdldDIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtlZE5vZGVUZXh0XCIpOyAgLy8gbm9kZSB0ZXh0IGNvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBzZWxlY3ROb2RlID0gZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpWzBdW25vZGVJbmRleF07XG4gICAgICAgICAgJChzZWxlY3ROb2RlKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JcIik7XG4gICAgICAgICAgbGV0IHNlbGVjdE5vZGVUZXh0ID0gY2lyY2xlLnBhcmVudCgpLmNoaWxkcmVuKCd0ZXh0Jylbbm9kZUluZGV4XTtcbiAgICAgICAgICAkKHNlbGVjdE5vZGVUZXh0KS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rZWROb2RlVGV4dFwiKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIG1vdXNlb3V0KGQpIHtcbiAgICAgICAgICBsZXQgbm9kZUluZGV4ID0gZC5pbmRleDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmtzLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmtzW2ldLnNvdXJjZS5pbmRleCA9PT0gbm9kZUluZGV4IHx8XG4gICAgICAgICAgICAgICAgbGlua3NbaV0udGFyZ2V0LmluZGV4ID09PSBub2RlSW5kZXgpIHtcblxuICAgICAgICAgICAgICBsZXQgbGluZUluZGV4ID0gaTtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0TGluZSA9IGQzLnNlbGVjdEFsbChcImxpbmVcIilbMF1bbGluZUluZGV4XTtcbiAgICAgICAgICAgICAgJChzZWxlY3RMaW5lKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lQ29sb3JEZWZhdWx0XCIpO1xuXG4gICAgICAgICAgICAgIGxldCBub2RlU291cmNlID0gbGlua3NbbGluZUluZGV4XS5zb3VyY2UuaW5kZXg7XG4gICAgICAgICAgICAgIGxldCBub2RlVGFyZ2V0ID0gbGlua3NbbGluZUluZGV4XS50YXJnZXQuaW5kZXg7XG5cbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVTb3VyY2UgPSBkMy5zZWxlY3RBbGwoXCJjaXJjbGVcIilbMF1bbm9kZVNvdXJjZV07XG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlVGFyZ2V0ID0gZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpWzBdW25vZGVUYXJnZXRdO1xuICAgICAgICAgICAgICAkKHNlbGVjdE5vZGVTb3VyY2UpLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVDb2xvckRlZmF1bHRcIik7XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVRhcmdldCkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yRGVmYXVsdFwiKTtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVNvdXJjZTIgPSBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKVtub2RlU291cmNlXTtcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVUYXJnZXQyID0gY2lyY2xlLnBhcmVudCgpLmNoaWxkcmVuKCd0ZXh0Jylbbm9kZVRhcmdldF07XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZTIpLmF0dHIoXCJjbGFzc1wiLCBcInRleHRTaXplRGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgJChzZWxlY3ROb2RlVGFyZ2V0MikuYXR0cihcImNsYXNzXCIsIFwidGV4dFNpemVEZWZhdWx0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlSW5kZXhdO1xuICAgICAgICAgICQoc2VsZWN0Tm9kZSkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yRGVmYXVsdFwiKTtcbiAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVRleHQgPSBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKVtub2RlSW5kZXhdO1xuICAgICAgICAgICQoc2VsZWN0Tm9kZVRleHQpLmF0dHIoXCJjbGFzc1wiLCBcInRleHRTaXplRGVmYXVsdFwiKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIG1vdXNlZG93bihkKSB7XG4gICAgICAgICAgLy9hdCBmaXJzdCwgbWFrZSBhbGwgbm9kZSAmIGxpbmUgZmFkZVxuICAgICAgICAgIGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JGYWRlXCIpO1xuICAgICAgICAgIGQzLnNlbGVjdEFsbChcImxpbmVcIikuYXR0cihcImNsYXNzXCIsIFwibGluZUNvbG9yRmFkZVwiKTtcbiAgICAgICAgICBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlVGV4dEZhZGVcIik7XG5cblxuICAgICAgICAgIGxldCBub2RlSW5kZXggPSBkLmluZGV4O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGlua3MubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobGlua3NbaV0uc291cmNlLmluZGV4ID09PSBub2RlSW5kZXggfHxcbiAgICAgICAgICAgICAgICBsaW5rc1tpXS50YXJnZXQuaW5kZXggPT09IG5vZGVJbmRleCkge1xuXG4gICAgICAgICAgICAgIGxldCBsaW5lSW5kZXggPSBpO1xuICAgICAgICAgICAgICBsZXQgc2VsZWN0TGluZSA9IGQzLnNlbGVjdEFsbChcImxpbmVcIilbMF1bbGluZUluZGV4XTtcbiAgICAgICAgICAgICAgJChzZWxlY3RMaW5lKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lQ29sb3JcIik7XG5cbiAgICAgICAgICAgICAgbGV0IG5vZGVTb3VyY2UgPSBsaW5rc1tsaW5lSW5kZXhdLnNvdXJjZS5pbmRleDtcbiAgICAgICAgICAgICAgbGV0IG5vZGVUYXJnZXQgPSBsaW5rc1tsaW5lSW5kZXhdLnRhcmdldC5pbmRleDtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVNvdXJjZSA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlU291cmNlXTtcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVUYXJnZXQgPSBkMy5zZWxlY3RBbGwoXCJjaXJjbGVcIilbMF1bbm9kZVRhcmdldF07XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZSkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpO1xuICAgICAgICAgICAgICAkKHNlbGVjdE5vZGVUYXJnZXQpLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVDb2xvclwiKTtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVNvdXJjZTIgPSBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKVtub2RlU291cmNlXTtcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVUYXJnZXQyID0gY2lyY2xlLnBhcmVudCgpLmNoaWxkcmVuKCd0ZXh0Jylbbm9kZVRhcmdldF07XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZTIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtlZE5vZGVUZXh0XCIpO1xuICAgICAgICAgICAgICAkKHNlbGVjdE5vZGVUYXJnZXQyKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rZWROb2RlVGV4dFwiKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlSW5kZXhdO1xuICAgICAgICAgICQoc2VsZWN0Tm9kZSkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpO1xuICAgICAgICAgIGxldCBzZWxlY3ROb2RlVGV4dCA9IGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpW25vZGVJbmRleF07XG4gICAgICAgICAgJChzZWxlY3ROb2RlVGV4dCkuYXR0cihcImNsYXNzXCIsIFwibGlua2VkTm9kZVRleHRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgdG91Y2hTdGFydChkKSB7XG4gICAgICAgICAgLy9hdCBmaXJzdCwgbWFrZSBhbGwgbm9kZSAmIGxpbmUgZmFkZVxuICAgICAgICAgIGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JGYWRlU3BcIik7XG4gICAgICAgICAgZDMuc2VsZWN0QWxsKFwibGluZVwiKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lQ29sb3JGYWRlXCIpO1xuICAgICAgICAgIGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVUZXh0RmFkZVwiKTtcblxuXG4gICAgICAgICAgbGV0IG5vZGVJbmRleCA9IGQuaW5kZXg7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5rcy5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5rc1tpXS5zb3VyY2UuaW5kZXggPT09IG5vZGVJbmRleCB8fFxuICAgICAgICAgICAgICAgIGxpbmtzW2ldLnRhcmdldC5pbmRleCA9PT0gbm9kZUluZGV4KSB7XG5cbiAgICAgICAgICAgICAgbGV0IGxpbmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgIGxldCBzZWxlY3RMaW5lID0gZDMuc2VsZWN0QWxsKFwibGluZVwiKVswXVtsaW5lSW5kZXhdO1xuICAgICAgICAgICAgICAkKHNlbGVjdExpbmUpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmVDb2xvclwiKTtcblxuICAgICAgICAgICAgICBsZXQgbm9kZVNvdXJjZSA9IGxpbmtzW2xpbmVJbmRleF0uc291cmNlLmluZGV4O1xuICAgICAgICAgICAgICBsZXQgbm9kZVRhcmdldCA9IGxpbmtzW2xpbmVJbmRleF0udGFyZ2V0LmluZGV4O1xuXG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlU291cmNlID0gZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpWzBdW25vZGVTb3VyY2VdO1xuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVRhcmdldCA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlVGFyZ2V0XTtcbiAgICAgICAgICAgICAgJChzZWxlY3ROb2RlU291cmNlKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JcIik7XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVRhcmdldCkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpO1xuXG4gICAgICAgICAgICAgIGxldCBzZWxlY3ROb2RlU291cmNlMiA9IGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpW25vZGVTb3VyY2VdO1xuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVRhcmdldDIgPSBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKVtub2RlVGFyZ2V0XTtcbiAgICAgICAgICAgICAgJChzZWxlY3ROb2RlU291cmNlMikuYXR0cihcImNsYXNzXCIsIFwibGlua2VkTm9kZVRleHRcIik7XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVRhcmdldDIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtlZE5vZGVUZXh0XCIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBzZWxlY3ROb2RlID0gZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpWzBdW25vZGVJbmRleF07XG4gICAgICAgICAgJChzZWxlY3ROb2RlKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlQ29sb3JcIik7XG4gICAgICAgICAgbGV0IHNlbGVjdE5vZGVUZXh0ID0gY2lyY2xlLnBhcmVudCgpLmNoaWxkcmVuKCd0ZXh0Jylbbm9kZUluZGV4XTtcbiAgICAgICAgICAkKHNlbGVjdE5vZGVUZXh0KS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rZWROb2RlVGV4dFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBtb3VzZXVwKGQpIHtcbiAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJjaXJjbGVcIikuYXR0cihcImNsYXNzXCIsIFwibm9kZVJldHVybkZhZGVcIik7XG4gICAgICAgICAgZDMuc2VsZWN0QWxsKFwibGluZVwiKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lUmV0dXJuRmFkZVwiKTtcbiAgICAgICAgICBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlVGV4dFJldHVybkZhZGVcIik7XG5cbiAgICAgICAgICBsZXQgbm9kZUluZGV4ID0gZC5pbmRleDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmtzLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmtzW2ldLnNvdXJjZS5pbmRleCA9PT0gbm9kZUluZGV4IHx8XG4gICAgICAgICAgICAgICAgbGlua3NbaV0udGFyZ2V0LmluZGV4ID09PSBub2RlSW5kZXgpIHtcblxuICAgICAgICAgICAgICBsZXQgbGluZUluZGV4ID0gaTtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0TGluZSA9IGQzLnNlbGVjdEFsbChcImxpbmVcIilbMF1bbGluZUluZGV4XTtcbiAgICAgICAgICAgICAgJChzZWxlY3RMaW5lKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lQ29sb3JcIik7XG5cbiAgICAgICAgICAgICAgbGV0IG5vZGVTb3VyY2UgPSBsaW5rc1tsaW5lSW5kZXhdLnNvdXJjZS5pbmRleDtcbiAgICAgICAgICAgICAgbGV0IG5vZGVUYXJnZXQgPSBsaW5rc1tsaW5lSW5kZXhdLnRhcmdldC5pbmRleDtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVNvdXJjZSA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlU291cmNlXTtcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVUYXJnZXQgPSBkMy5zZWxlY3RBbGwoXCJjaXJjbGVcIilbMF1bbm9kZVRhcmdldF07XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZSkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpO1xuICAgICAgICAgICAgICAkKHNlbGVjdE5vZGVUYXJnZXQpLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVDb2xvclwiKTtcblxuICAgICAgICAgICAgICBsZXQgc2VsZWN0Tm9kZVNvdXJjZTIgPSBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKVtub2RlU291cmNlXTtcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdE5vZGVUYXJnZXQyID0gY2lyY2xlLnBhcmVudCgpLmNoaWxkcmVuKCd0ZXh0Jylbbm9kZVRhcmdldF07XG4gICAgICAgICAgICAgICQoc2VsZWN0Tm9kZVNvdXJjZTIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtlZE5vZGVUZXh0XCIpO1xuICAgICAgICAgICAgICAkKHNlbGVjdE5vZGVUYXJnZXQyKS5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rZWROb2RlVGV4dFwiKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc2VsZWN0Tm9kZSA9IGQzLnNlbGVjdEFsbChcImNpcmNsZVwiKVswXVtub2RlSW5kZXhdO1xuICAgICAgICAgICQoc2VsZWN0Tm9kZSkuYXR0cihcImNsYXNzXCIsIFwibm9kZUNvbG9yXCIpO1xuICAgICAgICAgIGxldCBzZWxlY3ROb2RlVGV4dCA9IGNpcmNsZS5wYXJlbnQoKS5jaGlsZHJlbigndGV4dCcpW25vZGVJbmRleF07XG4gICAgICAgICAgJChzZWxlY3ROb2RlVGV4dCkuYXR0cihcImNsYXNzXCIsIFwibGlua2VkTm9kZVRleHRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY3Vyc29yKHR5cGUpIHtcbiAgICAgICAgICBsZXQgZ3JhYlR5cGVDO1xuICAgICAgICAgIGxldCBncmFiVHlwZUI7XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdncmFiYmluZycpIHtcbiAgICAgICAgICAgIGdyYWJUeXBlQyA9IFwiZ3JhYmJpbmdcIjtcbiAgICAgICAgICAgIGdyYWJUeXBlQiA9IFwiZ3JhYmJpbmdcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JhYlR5cGVDID0gXCJncmFiXCI7XG4gICAgICAgICAgICBncmFiVHlwZUIgPSBcImF1dG9cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL2dyYWJiaW5nXG4gICAgICAgICAgY2lyY2xlLmNzcyh7XCJjdXJzb3JcIjogW1wiLXdlYmtpdC1cIiArIGdyYWJUeXBlQ119KTtcbiAgICAgICAgICBjaXJjbGUuY3NzKHtcImN1cnNvclwiOiBbXCItbW96LVwiICsgZ3JhYlR5cGVDXX0pO1xuICAgICAgICAgIGNpcmNsZS5jc3Moe1wiY3Vyc29yXCI6IFtncmFiVHlwZUNdfSk7XG5cbiAgICAgICAgICBib2R5LmNzcyh7XCJjdXJzb3JcIjogW1wiLXdlYmtpdC1cIiArIGdyYWJUeXBlQl19KTtcbiAgICAgICAgICBib2R5LmNzcyh7XCJjdXJzb3JcIjogW1wiLW1vei1cIiArIGdyYWJUeXBlQl19KTtcbiAgICAgICAgICBib2R5LmNzcyh7XCJjdXJzb3JcIjogW2dyYWJUeXBlQl19KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiAvL01vdXNlIGFjdGlvbi8vICovXG4gICAgICBpZiAoIWlzU3ApIHtcbiAgICAgICAgbm9kZS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIENvbG9yaW5nLm1vdXNlb3ZlcihkKTtcbiAgICAgICAgICBpZiAobW91c2VEb3duID09PSAwKSB7XG4gICAgICAgICAgICBpb24uc291bmQucGxheShcIm1vdXNlb3ZlclwiLCB7XG4gICAgICAgICAgICAgIHZvbHVtZTogMC4xIC8vIHR1cm4gZG93blxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICBDb2xvcmluZy5tb3VzZW91dChkKVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgQ29sb3JpbmcubW91c2Vkb3duKGQpO1xuICAgICAgICAgIENvbG9yaW5nLmN1cnNvcignZ3JhYmJpbmcnKTtcbiAgICAgICAgICBpb24uc291bmQucGxheShcImdyYWJOb2RlXCIsIHtcbiAgICAgICAgICAgIHZvbHVtZTogMC4yIC8vIHR1cm4gZG93blxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBub2RlLm9uKFwibW91c2V1cFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaW9uLnNvdW5kLnBsYXkoXCJyZWxlYXNlTm9kZVwiLCB7XG4gICAgICAgICAgICB2b2x1bWU6IDAuNVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBib2R5Lm9uKFwibW91c2V1cFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIENvbG9yaW5nLm1vdXNldXAoZCk7XG4gICAgICAgICAgQ29sb3JpbmcuY3Vyc29yKCdncmFiJylcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgIC8vIGZvciBTbWFydFBob25lXG5cbiAgICAgIGlmIChpc1NwKSB7XG4gICAgICAgIGxldCB0b3VjaENvbG9yZWQgPSAwO1xuICAgICAgICBsZXQgdG91Y2htb3ZlID0gMDtcbiAgICAgICAgc3ZnLm9uKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0b3VjaG1vdmUgPSAxXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgQ29sb3JpbmcudG91Y2hTdGFydChkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZS5vbihcInRvdWNoZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0b3VjaENvbG9yZWQgPSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdmcub24oXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgdG91Y2hDb2xvcmVkID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3ZnLm9uKFwidG91Y2hlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0b3VjaG1vdmUgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0b3VjaENvbG9yZWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVSZXR1cm5GYWRlXCIpO1xuICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJsaW5lXCIpLmF0dHIoXCJjbGFzc1wiLCBcImxpbmVSZXR1cm5GYWRlXCIpO1xuICAgICAgICAgICAgICBjaXJjbGUucGFyZW50KCkuY2hpbGRyZW4oJ3RleHQnKS5hdHRyKFwiY2xhc3NcIiwgXCJub2RlVGV4dFJldHVybkZhZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRvdWNobW92ZSA9IDBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgc3RvcEZvcmNlU2V0SW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZm9yY2Uuc3RvcCgpOyAvL2ZvcmNlIOODrOOCpOOCouOCpuODiOOBruioiOeul+OCkue1guS6hlxuICAgICAgICBub2RlLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAvL2QuZml4ZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LCAxMDAwMCk7XG5cblxuICAgICAgLyogLy9tYWtlIGZpbHRlci8vICovXG5cbiAgICAgIC8vIGxlZ2VuZCBmaWx0ZXIobW91c2Ugb3ZlcikgdG8gbWFrZSBub2RlIGJpZ2dlclxuICAgICAgY2xhc3MgTGVnZW5kRmlsdGVyIHtcbiAgICAgICAgc3RhdGljIG1vdXNlb3ZlckZpbHRlcihsZWdlbmRJZCkge1xuICAgICAgICAgIGxldCBsZWdlbmRUZXh0ID0gY2VsbC5jaGlsZHJlbihcInRleHRcIilbbGVnZW5kSWRdO1xuICAgICAgICAgICQobGVnZW5kVGV4dCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogW1wiMS4xNWVtXCJdLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogW1wiNzAwXCJdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIDEwMCk7XG5cbiAgICAgICAgICBsZXQgbGVnZW5kUGF0aCA9IGNlbGwuY2hpbGRyZW4oXCJwYXRoXCIpW2xlZ2VuZElkXTtcbiAgICAgICAgICAkKGxlZ2VuZFBhdGgpLmNzcyh7XCJzdHJva2VcIjogW2NvbG9yKGxlZ2VuZElkKV19KTtcbiAgICAgICAgICAkKGxlZ2VuZFBhdGgpLmFuaW1hdGUoe1wic3Ryb2tlLXdpZHRoXCI6IFtcIjVcIl19LCAxMDApO1xuXG4gICAgICAgICAgbGV0IGZpbHRlcmVkQ2lyY2xlID0gY2lyY2xlLnBhcmVudChcIi5cIiArIGxlZ2VuZElkKS5jaGlsZHJlbihcImNpcmNsZVwiKTtcbiAgICAgICAgICAkKGZpbHRlcmVkQ2lyY2xlKS5hdHRyKFwiY2xhc3NcIiwgXCJmaWx0ZXJlZENpcmNsZVwiKTtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIGNvbG9yKGxlZ2VuZElkKSk7XG5cbiAgICAgICAgICBsZXQgZmlsdGVyZWRUZXh0ID0gY2lyY2xlLnBhcmVudChcIi5cIiArIGxlZ2VuZElkKS5jaGlsZHJlbihcInRleHRcIik7XG4gICAgICAgICAgJChmaWx0ZXJlZFRleHQpLmF0dHIoXCJjbGFzc1wiLCBcImZpbHRlcmVkVGV4dFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBtb3VzZW91dEZpbHRlcihsZWdlbmRJZCkge1xuICAgICAgICAgIGxldCBsZWdlbmRUZXh0ID0gY2VsbC5jaGlsZHJlbihcInRleHRcIilbbGVnZW5kSWRdO1xuICAgICAgICAgICQobGVnZW5kVGV4dCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgXCJmaWxsXCI6IFtcIiMzMDI4MzNcIl0sXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogW1wiMWVtXCJdLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogW1wiNDAwXCJdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIDEwMCk7XG5cbiAgICAgICAgICBsZXQgbGVnZW5kUGF0aCA9IGNlbGwuY2hpbGRyZW4oXCJwYXRoXCIpW2xlZ2VuZElkXTtcbiAgICAgICAgICAkKGxlZ2VuZFBhdGgpLmNzcyh7XCJzdHJva2VcIjogW1wid2hpdGVcIl19KTtcbiAgICAgICAgICAkKGxlZ2VuZFBhdGgpLmFuaW1hdGUoe1wic3Ryb2tlLXdpZHRoXCI6IFtcIjJcIl19LCAxMDApO1xuXG4gICAgICAgICAgbGV0IGZpbHRlcmVkQ2lyY2xlID0gY2lyY2xlLnBhcmVudChcIi5cIiArIGxlZ2VuZElkKS5jaGlsZHJlbihcImNpcmNsZVwiKTtcbiAgICAgICAgICAkKGZpbHRlcmVkQ2lyY2xlKS5hdHRyKFwiY2xhc3NcIiwgXCJyZXR1cm5GaWx0ZXJlZENpcmNsZVwiKTtcblxuICAgICAgICAgIGxldCBmaWx0ZXJlZFRleHQgPSBjaXJjbGUucGFyZW50KFwiLlwiICsgbGVnZW5kSWQpLmNoaWxkcmVuKFwidGV4dFwiKTtcbiAgICAgICAgICAkKGZpbHRlcmVkVGV4dCkuYXR0cihcImNsYXNzXCIsIFwicmV0dXJuRmlsdGVyZWRUZXh0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIG1vdXNlb3ZlckNsaWNrKGxlZ2VuZElkKSB7XG4gICAgICAgICAgbGV0IGxlZ2VuZFRleHQgPSBjZWxsLmNoaWxkcmVuKFwidGV4dFwiKVtsZWdlbmRJZF07XG4gICAgICAgICAgJChsZWdlbmRUZXh0KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBbXCIxLjE1ZW1cIl0sXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBbXCI3MDBcIl1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgMTAwKTtcblxuICAgICAgICAgIGxldCBsZWdlbmRQYXRoID0gY2VsbC5jaGlsZHJlbihcInBhdGhcIilbbGVnZW5kSWRdO1xuICAgICAgICAgICQobGVnZW5kUGF0aCkuY3NzKHtcInN0cm9rZVwiOiBbY29sb3IobGVnZW5kSWQpXX0pO1xuICAgICAgICAgICQobGVnZW5kUGF0aCkuYW5pbWF0ZSh7XCJzdHJva2Utd2lkdGhcIjogW1wiNVwiXX0sIDEwMCk7XG5cbiAgICAgICAgICBsZXQgZmlsdGVyZWRDaXJjbGUgPSBjaXJjbGUucGFyZW50KFwiLlwiICsgbGVnZW5kSWQpLmNoaWxkcmVuKFwiY2lyY2xlXCIpO1xuICAgICAgICAgICQoZmlsdGVyZWRDaXJjbGUpLmF0dHIoXCJjbGFzc1wiLCBcImZpbHRlcmVkQ2lyY2xlXCIpO1xuXG4gICAgICAgICAgbGV0IGZpbHRlcmVkVGV4dCA9IGNpcmNsZS5wYXJlbnQoXCIuXCIgKyBsZWdlbmRJZCkuY2hpbGRyZW4oXCJ0ZXh0XCIpO1xuICAgICAgICAgICQoZmlsdGVyZWRUZXh0KS5hdHRyKFwiY2xhc3NcIiwgXCJmaWx0ZXJlZFRleHRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBwdXQgaWQgdG8gZWFjaCBsZWdlbmRcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGVnZW5kTmFtZS5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgbGV0IGxlZ2VuZElkID0gY2VsbFtpXTtcbiAgICAgICAgJChsZWdlbmRJZCkuYXR0cihcImlkXCIsIFwibGVnZW5kX05vXCIgKyBpKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBwdXQgY2xhc3MoPWdyb3VwX2lkKSB0byBlYWNoIG5vZGVcbiAgICAgIGxldCBub2RlR3JvdXAgPSBjaXJjbGUucGFyZW50KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbm9kZUdyb3VwLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgICBsZXQgbm9kZUcgPSBub2RlR3JvdXBbaV07XG4gICAgICAgICQobm9kZUcpLmF0dHIoXCJjbGFzc1wiLCBub2Rlc1tpXS5ncm91cF9pZCk7XG4gICAgICAgIC8vICAgICAgICAgIC5hdHRyKFwiclwiLCBNYXRoLnNxcnQobm9kZXNbaV0uc2l6ZSkqMyArIDUpXG4gICAgICB9XG5cbiAgICAgIGxldCBsZWdlbmRGaWx0ZXIgPSBkMy5zZWxlY3RBbGwoXCIuY2VsbFwiKTtcbiAgICAgIGlmICghaXNTcCkge1xuICAgICAgICBsZWdlbmRGaWx0ZXIub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBsZWdlbmRJZCA9IHRoaXMuaWQuc2xpY2UoOSk7XG4gICAgICAgICAgTGVnZW5kRmlsdGVyLm1vdXNlb3ZlckZpbHRlcihsZWdlbmRJZCk7XG5cbiAgICAgICAgICBpb24uc291bmQucGxheShcIm1vdXNlb3ZlclwiLCB7XG4gICAgICAgICAgICB2b2x1bWU6IDAuMSAvLyB0dXJuIGRvd25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGVnZW5kRmlsdGVyLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBsZWdlbmRJZCA9IHRoaXMuaWQuc2xpY2UoOSk7XG4gICAgICAgICAgTGVnZW5kRmlsdGVyLm1vdXNlb3ZlckNsaWNrKGxlZ2VuZElkKTtcblxuICAgICAgICAgIGlvbi5zb3VuZC5wbGF5KFwibGVnZW5kXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsZWdlbmQgZmlsdGVyKG1vdXNlIG91dClcbiAgICAgICAgbGVnZW5kRmlsdGVyLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBsZWdlbmRJZCA9IHRoaXMuaWQuc2xpY2UoOSk7XG4gICAgICAgICAgTGVnZW5kRmlsdGVyLm1vdXNlb3V0RmlsdGVyKGxlZ2VuZElkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgLyogLy9zb3VuZC8vICovXG4gICAgICAvLyBzb3VuZCBzZXR0aW5nXG4gICAgICBpb24uc291bmQoe1xuICAgICAgICBzb3VuZHM6IFt7bmFtZTogXCJvcGVuaW5nXCJ9LFxuICAgICAgICAgIHtuYW1lOiBcIm1vdXNlb3ZlclwifSxcbiAgICAgICAgICB7bmFtZTogXCJncmFiTm9kZVwifSxcbiAgICAgICAgICB7bmFtZTogXCJyZWxlYXNlTm9kZVwifSxcbiAgICAgICAgICB7bmFtZTogXCJsZWdlbmRcIn1dLFxuXG4gICAgICAgIC8vIG1haW4gY29uZmlnXG4gICAgICAgIHBhdGg6IFwic3JjL2RhdGEvc291bmQvXCIsXG4gICAgICAgIHByZWxvYWQ6IHRydWUsXG4gICAgICAgIG11bHRpcGxheTogdHJ1ZSxcbiAgICAgICAgdm9sdW1lOiAwLjVcbiAgICAgIH0pO1xuXG4gICAgICAvL29wZW5pbmcgc291bmRcbiAgICAgIGlmICghaXNTcCkge1xuICAgICAgICBpb24uc291bmQucGxheShcIm9wZW5pbmdcIik7XG4gICAgICB9XG5cblxuICAgIH0pO1xuICB9KTtcblxufSkoKTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==