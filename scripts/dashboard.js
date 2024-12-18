const chartContainer = document.getElementById('market-chart');
const barChartContainer = document.getElementById('bar-chart');

const chart = LightweightCharts.createChart(chartContainer, {
  width: chartContainer.offsetWidth,
  height: 400,
  layout: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
  },
  grid: {
    vertLines: { color: '#e1e1e1' },
    horzLines: { color: '#e1e1e1' },
  },
  priceScale: {
    borderColor: '#cccccc',
  },
  timeScale: {
    borderColor: '#cccccc',
  },
});

const candlestickSeries = chart.addCandlestickSeries({
  upColor: 'green',
  downColor: 'red',
  borderUpColor: 'green',
  borderDownColor: 'red',
  wickUpColor: 'green',
  wickDownColor: 'red',
});

candlestickSeries.setData([
  { time: '2023-12-01', open: 40000, high: 41000, low: 39500, close: 40500 },
  { time: '2023-12-02', open: 40500, high: 41500, low: 40000, close: 41000 },
  { time: '2023-12-03', open: 41000, high: 42000, low: 40500, close: 41500 },
  { time: '2023-12-04', open: 41500, high: 43000, low: 41000, close: 42500 },
  { time: '2023-12-05', open: 42500, high: 44000, low: 42000, close: 43500 },
  { time: '2023-12-06', open: 43500, high: 45000, low: 43000, close: 44500 },
  { time: '2023-12-07', open: 44500, high: 46000, low: 44000, close: 45500 },
  { time: '2023-12-08', open: 45500, high: 47000, low: 45000, close: 46500 },
  { time: '2023-12-09', open: 46500, high: 48000, low: 46000, close: 47500 }
]);

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('drawing-bar-canvas').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [
        {
          label: 'Monthly Earnings',
          data: [1200, 190, 3020, 523, 200, 30, 4000, 2700],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 0, 130, 0.2)',
            'rgba(255, 223, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 0, 130, 1)',
            'rgba(255, 223, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
