export default class SvgStyle {

  static horizontalStripe(svg, color) {
    const SVGpattern = svg
        .append("pattern")
        .attr("id", "Horizontal" + color)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 3)
        .attr("height", 5.4)
        .attr("viewBox", "0 0 10 18")
        .attr("patternUnits", "userSpaceOnUse");

    const SVGpatternG = SVGpattern
        .append("g")
        .attr("id", "chevron" + color);

    SVGpatternG.append("path")
        .attr("d", "M0 0l5 3v5l-5 -3z")
        .attr("fill", color);

    SVGpatternG.append("path")
        .attr("d", "M10 0l-5 3v5l5 -3")
        .attr("fill", color);

    SVGpattern.append("use")
        .attr("x", 0)
        .attr("y", 9)
        .attr("xlink:href", "#chevron" + color);
  }


  static verticalStripe(svg, color) {
    const SVGpattern = svg
        .append("pattern")
        .attr("id", "Vertical" + color)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 8)
        .attr("height", 8)
        .attr("patternUnits", "userSpaceOnUse")

    SVGpattern.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 4)
        .attr("height", 4)
        .attr("fill", color);

    SVGpattern.append("rect")
        .attr("x", 4)
        .attr("y", 4)
        .attr("width", 4)
        .attr("height", 4)
        .attr("fill", color);
  }


  static gradientUnitVector(x, y) {
    // scale = 0.5
    const magnitude = Math.sqrt(x * x + y * y);
    const X = x / magnitude;
    const Y = y / magnitude;

    // const unitVector = {'X' : X / magnitude, 'Y' : Y / magnitude};
    return {'X': X * 0.5, 'Y': Y * 0.5};
  };

}
