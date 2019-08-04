export default class SvgStyle {

  static horizontalStripe(svg, color) {
    svg.append("defs")
        .append("pattern")
        .attr("id", "Horizontal" + color)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 4)
        .attr("patternUnits", "userSpaceOnUse")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 2)
        .attr("fill", color);
  }


  static verticalStripe(svg, color) {
    svg.append("defs")
        .append("pattern")
        .attr("id", "Vertical" + color)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 4)
        .attr("height", 20)
        .attr("patternUnits", "userSpaceOnUse")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", 20)
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
