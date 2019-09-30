# CSS Pie Chart

Create a pie chart using CSS [conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient) background.

``` JS
// Create chart
var chart = new window.PieChart(htmlElement);

// Set values
chart.setValues([4, 5, 6]);

// Set colors
chart.setColors(['red', 'yellow', '#02f']);
```

Set size changing CSS variable `--size`:
``` CSS
.chart-pie {
  --size: 100px;
}
```
or through JavaScript:
``` JS
chart.element.style.setProperty('--size', '100px');
```
