document.addEventListener('DOMContentLoaded', function () {
  var values = document.querySelector('#values');
  var inputs = values.querySelector('.inputs')
  var addButton = values.querySelector('#add-input');
  var chart = new PieChart(document.querySelector('#chart'));

  addButton.addEventListener('click', addInput);

  for (i = 0; i < 8; i ++) {
    addInput();
  }

  function addInput() {
    var div = document.createElement('div');
    var input = document.createElement('input');
    var color = document.createElement('input');
    var button = document.createElement('button');
    input.addEventListener('input', refreshChart);
    input.type = 'number';
    input.min = 0;
    color.addEventListener('change', refreshChart);
    color.type = 'color';
    button.addEventListener('click', removeInput);
    button.textContent = 'Remove';
    div.appendChild(input);
    div.appendChild(color);
    div.appendChild(button);
    inputs.appendChild(div);
  }

  function removeInput(e) {
    e.target.parentElement.remove();
    refreshChart();
  }

  function refreshChart() {
    var values = Array.from(inputs.querySelectorAll('input[type=number]'))
      .map(function (i) { return i.valueAsNumber || 0; });
    var colorElements = inputs.querySelectorAll('input[type=color]');
    if (values.length) {
      var colors = Array.from(colorElements)
        .map(function (i) { return i.value === '#000000' ? null : i.value });
      chart.setColors(colors);
    }
    chart.setValues(values);
    colorElements.forEach(function (input, index) {
      input.value = chart.colors[index];
    });
  }
});
