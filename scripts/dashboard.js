const chartContainer = document.getElementById('market-chart');

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
{ time: '2023-12-04', open: 41500, high: 39000, low: 38000, close: 38000 },
{ time: '2023-12-05', open: 38000, high: 38000, low: 32000, close: 35000 },
]);
