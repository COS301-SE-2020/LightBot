function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}

const dashboardPanelChart = {
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#fff',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
    },
    legend: {
      position: 'bottom',
      fillStyle: '#FFF',
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'rgba(255,255,255,0.4)',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: 'rgba(255,255,255,0.1)',
            zeroLineColor: 'transparent',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            color: 'rgba(255,255,255,0.1)',
          },
          ticks: {
            padding: 10,
            fontColor: 'rgba(255,255,255,0.4)',
            fontStyle: 'bold',
          },
        },
      ],
    },
  },
}

const dashboardAllProductsChart = {
  data: (canvas) => {
    var ctx = canvas.getContext('2d')
    var chartColor = '#FFFFFF'
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
    gradientStroke.addColorStop(0, '#18ce0f')
    gradientStroke.addColorStop(1, chartColor)
    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50)
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)')
    gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4))
    return {
      labels: [
        '10min,',
        '20min',
        '30min',
        '40min',
        '50min',
        '60min',
        '70min',
        '80min',
      ],
      datasets: [
        {
          label: 'Number of cars:',
          borderColor: '#18ce0f',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#18ce0f',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [80, 100, 90, 95, 70, 65, 50, 40],
        },
      ],
    }
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
    responsive: 1,
    scales: {
      yAxes: [
        {
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
      ],
      xAxes: [
        {
          display: 0,
          ticks: {
            display: false,
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  },
}

module.exports = {
  dashboardPanelChart, // Chart for Dashboard view - Will be rendered in panel
  dashboardAllProductsChart, // Chart for Dashboard view - All products Card
}
