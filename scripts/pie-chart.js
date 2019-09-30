window.PieChart = (function () {
  function constructor(element) {
    element.classList.add('chart', 'pie-chart');
    if (!element.id) {
      element.id = 'pie-chart-' + Number(new Date());
    }
    this.element = element;
    this.values = [];
    this.colors = [];
    setStyles(this);
  }

  constructor.prototype.setValues = function (values) {
    var currentAngle = 0;
    var sections = [];
    var sum = values.length ?
      values.reduce(function (a, b) { return a + b; })
      : 0;
    values.forEach(function (value, index) {
      var section = {value: value / sum * 100, from: currentAngle};
      currentAngle += 360 * section.value / 100;
      section.to = currentAngle;
      sections.push(section);
    });
    this.values = sections;
    this.refresh();
  };

  constructor.prototype.setColors = function (colors) {
    this.colors = colors.map(function (c) {
      return c || getRandomColor();
    });
  };

  constructor.prototype.refresh = function () {
    var chart = this;
    var stops = [];
    var stopFormat = '{color} {from}deg, {color} {to}deg';
    setStyles(chart);
    chart.values.forEach(function (section, index) {
      if (section.value > 0) {
        stops.push(stopFormat.replace(/\{color\}/g, 'var(--c' + index + ')').replace('{from}', section.from.toFixed(5)).replace('{to}', section.to.toFixed(5)));
      }
    });
    chart.element.style.backgroundImage = 'conic-gradient(' + stops.join(',') + ')';
  };

  function setStyles(chart) {
    var style = chart.styles || document.createElement('style');
    var elementId = '#' + chart.element.id;
    var colors = chart.colors || [];
    colors = chart.values.map(function (_value, index) {
      return colors[index] || getRandomColor();
    });
    style.textContent = elementId + '{' +
      chart.colors.map(function (color, index) {
        return '--c' + index + ': ' + color + ';';
      }).join('') +
      '}';
    chart.styles = style;
    document.head.appendChild(style);
  }

  function setRandomColors(chart) {
    chart.colors = (chart.values || []).map(getRandomColor);
  }

  function getRandomColor() {
    return '#' + [
      getRandomInt(150, 255).toString(16),
      getRandomInt(150, 255).toString(16),
      getRandomInt(150, 255).toString(16)
    ].join('');
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return constructor;
})();
