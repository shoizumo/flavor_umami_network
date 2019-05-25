let isSp = ((navigator.userAgent.indexOf('iPhone') > 0 ||
    navigator.userAgent.indexOf('iPad') > 0) ||
    navigator.userAgent.indexOf('iPod') > 0 ||
    navigator.userAgent.indexOf('Android') > 0);

console.log(isSp)

d3.json("js/flavor_data.json", function (error, data1) {
  d3.json("js/umami_data.json", function (error, data2) {
    let flavorData = data1;
    let umamiData = data2;

    // console.log(flavorData);
    // console.log(umamiData);

    //make color function
    let color = function (n) {
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
    let legendName = ["plant", "fruit", "meat", "vegetable", "cereal/crop",
      "alcoholic beverage", "herb", "dairy", "nut/seed/pulse", "spice",
      "fish/seafood", "plant derivative", "flower", "animal product"];

    let legendColor = ["#0fff0f", "#fc783f", "#ff4c4c", "#3cb37a", "#e8c59c",
      "#e73552", "#ad5d88", "#db830d", "#965d21", "#00afcc",
      "#434da2", "#b3e500", "#ff00ae", "#ff7fbf"];

    let ordinal = d3.scale.ordinal()
        .domain(legendName)
        .range(legendColor);


    let svg = d3.select("#myGraph");

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(25,50)")
        .style("font-size", "1.2em")
        .style("fill", "#352622")
        .style({"font-family": ["Helvetica Neue", "Arial", "sans-serif"]});


    let legendOrdinal = d3.legend.color()
        .shape("path", d3.svg.symbol().type("circle").size(300)())
        .shapePadding(4)
        .labelOffset(2.5)
        //.title("Ingredient Categories")
        .scale(ordinal);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);

    // attr of legend circle
    let cell = $(".cell");
    let legendPathDefo = cell.children("path");
    $(legendPathDefo).css({
      "opacity": ["0.6"],
      "stroke-width": ["2"],
      "stroke": ["white"]
    });

    // set pointer cursor at legend
    $(".legendCells").css({"cursor": ["pointer"]});

    /* //Setting// */
    let width = 1200;
    let height = 900;

    let nodes = flavorData.nodes;
    let links = flavorData.links;


    let force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width - 50, height - 10]) //The center of gravity:[x/2, y/2]
        .linkDistance(100)
        .linkStrength(0.8)
        .gravity(0.20)
        .charge(-300)
        .friction(0.80)
        .start();


    /* //Continually move// */
    //setInterval(function(){force.alpha(0.05);}, 125);
    //d3.timer(function(){
    //force.alpha(0.1);
    //});

    /* //Static Network// */
    // for picture

    //let keyDown = 0;
    let body = $("body");
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

    let link = d3.select("#myGraph")
        .selectAll(".line")
        .data(links)
        .enter()
        .append("line")
        .attr("opacity", "0.5")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.weight) * 0.1 + d.weight * 0.02
        })
        .attr("stroke", function (d) {
          return color(d.group_id)
        });

    let node = d3.select("#myGraph")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("g")
        .call(force.drag);

    node.append("circle")
        .attr("opacity", "0.6")
        .attr("r", function (d) {
          return Math.sqrt(d.size) * 5 + 3;
        })
        .attr("fill", function (d) {
          return color(d.group_id)
        })
        .attr("stroke", "#fffcf9");
    //.attr("stroke", function(d,i){return color(d.group_id)});

    node.append("text")
        .attr("dx", "-0.5em")
        .attr("dy", "0.7em")
        .attr("font-size", ".7em")
        .attr("font-weight", "300")
        .text(function (d) {
          return d.name;
        })
        .attr("class", "nonDrag")
        .attr("fill", "#352622")
        .attr({"font-family": ["Futura", "Nunito", "Helvetica Neue", "Arial", "sans-serif"]});

    // to enclose node in SVG
    let wallMargin = 7.5;

    force.on("tick", function () {
      link
      //.attr("x1", function(d){ return d.source.x;})
      //.attr("y1", function(d){ return d.source.y;})
      //.attr("x2", function(d){ return d.target.x;})
      //.attr("y2", function(d){ return d.target.y;})
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
      //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); //because of appending "g"
          .attr("transform", function (d) {
            return "translate(" + Math.max(wallMargin, Math.min(width - wallMargin, d.x))
                + ","
                + Math.max(wallMargin, Math.min(height - wallMargin, d.y))
                + ")";
          }); //because of appending "g"

      //collision detection
      node
          .each(collide(0.5));
    });


    const dataTypeSelector = document.getElementById('dataType');
    dataTypeSelector.onchange = function () {
      // 選択されているoption要素を取得する
      const selectedType = this.options[this.selectedIndex].value;

      if (selectedType === 'Flavor') {
        nodes = flavorData.nodes;
        links = flavorData.links;
        update(selectedType)
      }else if(selectedType === 'Umami') {
        nodes = umamiData.nodes;
        links = umamiData.links;
        update(selectedType)
      }
    };


    let stopForceSetInterval;
    function update(selectedType) {

      let deleteLine = d3.selectAll("line");

      // force.nodes(nodes).links(links);
      force.links(links);


      link = d3.select("#myGraph")
        .selectAll(".line")
        .data(links)
        .enter()
        .append("line");

      link.attr("opacity", "0.5")
          .attr("stroke-width", function (d) {
            return Math.sqrt(d.weight) * 0.1 + d.weight * 0.02;
          })
          .attr("stroke", function (d) {
            return color(d.group_id)
          });

      deleteLine.remove();

      force.start();
      d3.selectAll("line").style("stroke-width", "");


      // change line display order to back of node
      for (let i = links.length - 1; 0 <= i; i--) {
        const linkSVG = link[0][i];
        const firstSVG = linkSVG.parentNode.firstChild;
        if (firstSVG) {
          linkSVG.parentNode.insertBefore(linkSVG, firstSVG);
        }
      }

      clearInterval(stopForceSetInterval);
      stopForceSetInterval = setTimeout(() => {
        force.stop(); //force レイアウトの計算を終了
      }, 5000);

      // update Title
      document.getElementById('h1').textContent = selectedType + ' Network'
    }


    /* //Collision detection// */
    // to prevent from overrapping
    let radiusCallision = 15;

    function collide(alpha) {
      let quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        let rb = 2 * radiusCallision,
            nx1 = d.x - rb,
            nx2 = d.x + rb,
            ny1 = d.y - rb,
            ny2 = d.y + rb;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            let x = d.x - quad.point.x,
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
          return x1 > nx2
              || x2 < nx1
              || y1 > ny2
              || y2 < ny1;
        });
      };
    }


    let circle = $("circle");

    class Coloring {
      static mouseover(d) {
        let nodeIndex = d.index; // to get node index
        for (let i = 0, l = links.length; l > i; i++) {
          if (links[i].source.index === nodeIndex ||
              links[i].target.index === nodeIndex) {

            let lineIndex = i;  // index number
            //console.log(lineIndex)

            let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
            $(selectLine).attr("class", "lineColor");  // node color

            //console.log(links[lineIndex].source.index)
            //console.log(links[lineIndex].target.index)

            let nodeSource = links[lineIndex].source.index;
            let nodeTarget = links[lineIndex].target.index;

            let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
            let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number
            $(selectNodeSource).attr("class", "nodeColor");  // node color
            $(selectNodeTarget).attr("class", "nodeColor");  // node color

            let selectNodeSource2 = circle.parent().children('text')[nodeSource];  // text which match source index number
            let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];  // text which match target index number
            $(selectNodeSource2).attr("class", "linkedNodeText");  // node text color
            $(selectNodeTarget2).attr("class", "linkedNodeText");  // node text color
          }
        }
        let selectNode = d3.selectAll("circle")[0][nodeIndex];
        $(selectNode).attr("class", "nodeColor");
        let selectNodeText = circle.parent().children('text')[nodeIndex];
        $(selectNodeText).attr("class", "linkedNodeText");
      }


      static mouseout(d) {
        let nodeIndex = d.index;
        for (let i = 0, l = links.length; l > i; i++) {
          if (links[i].source.index === nodeIndex ||
              links[i].target.index === nodeIndex) {

            let lineIndex = i;

            let selectLine = d3.selectAll("line")[0][lineIndex];
            $(selectLine).attr("class", "lineColorDefault");

            let nodeSource = links[lineIndex].source.index;
            let nodeTarget = links[lineIndex].target.index;

            let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
            let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
            $(selectNodeSource).attr("class", "nodeColorDefault");
            $(selectNodeTarget).attr("class", "nodeColorDefault");

            let selectNodeSource2 = circle.parent().children('text')[nodeSource];
            let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
            $(selectNodeSource2).attr("class", "textSizeDefault");
            $(selectNodeTarget2).attr("class", "textSizeDefault");
          }
        }
        let selectNode = d3.selectAll("circle")[0][nodeIndex];
        $(selectNode).attr("class", "nodeColorDefault");
        let selectNodeText = circle.parent().children('text')[nodeIndex];
        $(selectNodeText).attr("class", "textSizeDefault");
      }


      static mousedown(d) {
        //at first, make all node & line fade
        d3.selectAll("circle").attr("class", "nodeColorFade");
        d3.selectAll("line").attr("class", "lineColorFade");
        circle.parent().children('text').attr("class", "nodeTextFade");


        let nodeIndex = d.index;
        for (let i = 0, l = links.length; l > i; i++) {
          if (links[i].source.index === nodeIndex ||
              links[i].target.index === nodeIndex) {

            let lineIndex = i;
            let selectLine = d3.selectAll("line")[0][lineIndex];
            $(selectLine).attr("class", "lineColor");

            let nodeSource = links[lineIndex].source.index;
            let nodeTarget = links[lineIndex].target.index;

            let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
            let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
            $(selectNodeSource).attr("class", "nodeColor");
            $(selectNodeTarget).attr("class", "nodeColor");

            let selectNodeSource2 = circle.parent().children('text')[nodeSource];
            let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
            $(selectNodeSource2).attr("class", "linkedNodeText");
            $(selectNodeTarget2).attr("class", "linkedNodeText");

          }
        }
        let selectNode = d3.selectAll("circle")[0][nodeIndex];
        $(selectNode).attr("class", "nodeColor");
        let selectNodeText = circle.parent().children('text')[nodeIndex];
        $(selectNodeText).attr("class", "linkedNodeText");
      }

      static touchStart(d) {
        //at first, make all node & line fade
        d3.selectAll("circle").attr("class", "nodeColorFadeSp");
        d3.selectAll("line").attr("class", "lineColorFade");
        circle.parent().children('text').attr("class", "nodeTextFade");


        let nodeIndex = d.index;
        for (let i = 0, l = links.length; l > i; i++) {
          if (links[i].source.index === nodeIndex ||
              links[i].target.index === nodeIndex) {

            let lineIndex = i;
            let selectLine = d3.selectAll("line")[0][lineIndex];
            $(selectLine).attr("class", "lineColor");

            let nodeSource = links[lineIndex].source.index;
            let nodeTarget = links[lineIndex].target.index;

            let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
            let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
            $(selectNodeSource).attr("class", "nodeColor");
            $(selectNodeTarget).attr("class", "nodeColor");

            let selectNodeSource2 = circle.parent().children('text')[nodeSource];
            let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
            $(selectNodeSource2).attr("class", "linkedNodeText");
            $(selectNodeTarget2).attr("class", "linkedNodeText");

          }
        }
        let selectNode = d3.selectAll("circle")[0][nodeIndex];
        $(selectNode).attr("class", "nodeColor");
        let selectNodeText = circle.parent().children('text')[nodeIndex];
        $(selectNodeText).attr("class", "linkedNodeText");
      }

      static mouseup(d) {
        d3.selectAll("circle").attr("class", "nodeReturnFade");
        d3.selectAll("line").attr("class", "lineReturnFade");
        circle.parent().children('text').attr("class", "nodeTextReturnFade");

        let nodeIndex = d.index;
        for (let i = 0, l = links.length; l > i; i++) {
          if (links[i].source.index === nodeIndex ||
              links[i].target.index === nodeIndex) {

            let lineIndex = i;

            let selectLine = d3.selectAll("line")[0][lineIndex];
            $(selectLine).attr("class", "lineColor");

            let nodeSource = links[lineIndex].source.index;
            let nodeTarget = links[lineIndex].target.index;

            let selectNodeSource = d3.selectAll("circle")[0][nodeSource];
            let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget];
            $(selectNodeSource).attr("class", "nodeColor");
            $(selectNodeTarget).attr("class", "nodeColor");

            let selectNodeSource2 = circle.parent().children('text')[nodeSource];
            let selectNodeTarget2 = circle.parent().children('text')[nodeTarget];
            $(selectNodeSource2).attr("class", "linkedNodeText");
            $(selectNodeTarget2).attr("class", "linkedNodeText");

          }
        }
        let selectNode = d3.selectAll("circle")[0][nodeIndex];
        $(selectNode).attr("class", "nodeColor");
        let selectNodeText = circle.parent().children('text')[nodeIndex];
        $(selectNodeText).attr("class", "linkedNodeText");
      }

      static cursor(type) {
        let grabTypeC;
        let grabTypeB;
        if (type === 'grabbing') {
          grabTypeC = "grabbing";
          grabTypeB = "grabbing";
        } else {
          grabTypeC = "grab";
          grabTypeB = "auto";
        }

        //grabbing
        circle.css({"cursor": ["-webkit-" + grabTypeC]});
        circle.css({"cursor": ["-moz-" + grabTypeC]});
        circle.css({"cursor": [grabTypeC]});

        body.css({"cursor": ["-webkit-" + grabTypeB]});
        body.css({"cursor": ["-moz-" + grabTypeB]});
        body.css({"cursor": [grabTypeB]});
      }
    }

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
        Coloring.mouseout(d)
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
        Coloring.cursor('grab')
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
        touchmove = 0
      });
    }

    /////////////////////////////////////////////////////////////

    stopForceSetInterval = setTimeout(() => {
      force.stop(); //force レイアウトの計算を終了
      node.each(function (d) {
        //d.fixed = true
      })
    }, 10000);


    /* //make filter// */

    // legend filter(mouse over) to make node bigger
    class LegendFilter {
      static mouseoverFilter(legendId) {
        let legendText = cell.children("text")[legendId];
        $(legendText).animate({
              "font-size": ["1.15em"],
              "font-weight": ["700"]
            },
            100);

        let legendPath = cell.children("path")[legendId];
        $(legendPath).css({"stroke": [color(legendId)]});
        $(legendPath).animate({"stroke-width": ["5"]}, 100);

        let filteredCircle = circle.parent("." + legendId).children("circle");
        $(filteredCircle).attr("class", "filteredCircle");
        //                  .attr("stroke", color(legendId));

        let filteredText = circle.parent("." + legendId).children("text");
        $(filteredText).attr("class", "filteredText");
      }

      static mouseoutFilter(legendId) {
        let legendText = cell.children("text")[legendId];
        $(legendText).animate({
              "fill": ["#302833"],
              "font-size": ["1em"],
              "font-weight": ["400"]
            },
            100);

        let legendPath = cell.children("path")[legendId];
        $(legendPath).css({"stroke": ["white"]});
        $(legendPath).animate({"stroke-width": ["2"]}, 100);

        let filteredCircle = circle.parent("." + legendId).children("circle");
        $(filteredCircle).attr("class", "returnFilteredCircle");

        let filteredText = circle.parent("." + legendId).children("text");
        $(filteredText).attr("class", "returnFilteredText");
      }

      static mouseoverClick(legendId) {
        let legendText = cell.children("text")[legendId];
        $(legendText).animate({
              "font-size": ["1.15em"],
              "font-weight": ["700"]
            },
            100);

        let legendPath = cell.children("path")[legendId];
        $(legendPath).css({"stroke": [color(legendId)]});
        $(legendPath).animate({"stroke-width": ["5"]}, 100);

        let filteredCircle = circle.parent("." + legendId).children("circle");
        $(filteredCircle).attr("class", "filteredCircle");

        let filteredText = circle.parent("." + legendId).children("text");
        $(filteredText).attr("class", "filteredText");
      }
    }


    // put id to each legend
    for (let i = 0, l = legendName.length; l > i; i++) {
      let legendId = cell[i];
      $(legendId).attr("id", "legend_No" + i);
    }


    // put class(=group_id) to each node
    let nodeGroup = circle.parent();

    for (let i = 0, l = nodeGroup.length; l > i; i++) {
      let nodeG = nodeGroup[i];
      $(nodeG).attr("class", nodes[i].group_id);
      //          .attr("r", Math.sqrt(nodes[i].size)*3 + 5)
    }

    let legendFilter = d3.selectAll(".cell");
    if (!isSp) {
      legendFilter.on("mouseover", function () {
        let legendId = this.id.slice(9);
        LegendFilter.mouseoverFilter(legendId);

        ion.sound.play("mouseover", {
          volume: 0.1 // turn down
        });
      });

      legendFilter.on("click", function () {
        let legendId = this.id.slice(9);
        LegendFilter.mouseoverClick(legendId);

        ion.sound.play("legend");
      });

      // legend filter(mouse out)
      legendFilter.on("mouseout", function () {
        let legendId = this.id.slice(9);
        LegendFilter.mouseoutFilter(legendId);
      });
    }


    /* //sound// */
    // sound setting
    ion.sound({
      sounds: [{name: "opening"},
        {name: "mouseover"},
        {name: "grabNode"},
        {name: "releaseNode"},
        {name: "legend"}],

      // main config
      path: "js/sound/",
      preload: true,
      multiplay: true,
      volume: 0.5
    });

    //opening sound
    if (!isSp) {
      ion.sound.play("opening");
    }


  });
});
