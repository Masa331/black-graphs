var plot = function(dates, originalPrices, currentPrices) {
  trace1 = {
    x: dates, 
    y: originalPrices, 
    error_x: {
      color: '#1f77b4', 
      symmetric: true, 
      thickness: 2, 
      type: 'percent', 
      value: 10, 
      visible: false, 
      width: 4
    }, 
    fill: 'none', 
    line: {width: 1}, 
    marker: {color: 'rgb(17, 0, 255)'}, 
    mode: 'markers+lines', 
    name: 'Udaná původní cena', 
    type: 'scatter', 
    xsrc: 'masa331:0:987919', 
    ysrc: 'masa331:0:bdffc8'
  };
  trace2 = {
    x: dates, 
    y: currentPrices, 
    marker: {color: 'rgb(255, 0, 4)'}, 
    mode: 'markers+lines', 
    name: 'Skutečná cena', 
    type: 'scatter', 
    xsrc: 'masa331:0:987919', 
    ysrc: 'masa331:0:8f76fa'
  };
  data = [trace1, trace2];
  layout = {
    autosize: true, 
    legend: {
      x: 0, 
      y: 1.14, 
      orientation: 'h', 
      xanchor: 'left', 
      yanchor: 'auto'
    }, 
    title: 'Vývoj skutečné a udané původní ceny', 
    xaxis: {
      automargin: true, 
      autorange: true, 
      domain: [0, 1], 
      rangeselector: {visible: false}, 
      showgrid: false, 
      showline: false, 
      showspikes: false, 
      showticklabels: true, 
      side: 'bottom', 
      tickangle: 45, 
      tickfont: {family: 'Arial'}, 
      tickformat: '%-d.%-m.%Y', 
      tickmode: 'auto', 
      type: 'date', 
      zeroline: true
    }, 
    yaxis: {
      autorange: true, 
      domain: [0, 1], 
      separatethousands: true, 
      showgrid: false, 
      type: 'linear'
    }
  };

  $("#detailPicture").append('<div id="pricesChart"></div>');
  Plotly.newPlot('pricesChart', {
    data: data,
    layout: layout
  });
}

var url = window.location.href;
var client = elasticsearch.Client({
  hosts: 'https://search-datafestival2018v2-jawz32ieac6ilsury3lmmotnzy.eu-central-1.es.amazonaws.com'
});

var pricesPerDate;
client.search({
  index: 'alza',
  query: {
    match: {
      url: url
    }
  }
}).then(function (resp) {
  var pricesPerDate = resp.hits.hits.map(row => row['_source']);

  ary =
    [{date: "2018-09-01T00:00:00+00:00", currentPrice: 3694, originalPrice: 5294},
      {date: "2018-09-02T00:00:00+00:00", currentPrice: 3578, originalPrice: 5147},
      {date: "2018-09-03T00:00:00+00:00", currentPrice: 3819, originalPrice: 5051},
      {date: "2018-09-04T00:00:00+00:00", currentPrice: 4102, originalPrice: 5096},
      {date: "2018-09-05T00:00:00+00:00", currentPrice: 3859, originalPrice: 5201},
      {date: "2018-09-06T00:00:00+00:00", currentPrice: 4028, originalPrice: 5104},
      {date: "2018-09-07T00:00:00+00:00", currentPrice: 3665, originalPrice: 5044},
      {date: "2018-09-08T00:00:00+00:00", currentPrice: 3653, originalPrice: 5060},
      {date: "2018-09-09T00:00:00+00:00", currentPrice: 4019, originalPrice: 5254},
      {date: "2018-09-10T00:00:00+00:00", currentPrice: 3986, originalPrice: 5130},
      {date: "2018-09-11T00:00:00+00:00", currentPrice: 4110, originalPrice: 5364},
      {date: "2018-09-12T00:00:00+00:00", currentPrice: 3504, originalPrice: 5124},
      {date: "2018-09-13T00:00:00+00:00", currentPrice: 3887, originalPrice: 5448},
      {date: "2018-09-14T00:00:00+00:00", currentPrice: 4036, originalPrice: 5350},
      {date: "2018-09-15T00:00:00+00:00", currentPrice: 4071, originalPrice: 5133},
      {date: "2018-09-16T00:00:00+00:00", currentPrice: 3909, originalPrice: 5322},
      {date: "2018-09-17T00:00:00+00:00", currentPrice: 4242, originalPrice: 5122},
      {date: "2018-09-18T00:00:00+00:00", currentPrice: 3560, originalPrice: 5422},
      {date: "2018-09-19T00:00:00+00:00", currentPrice: 4097, originalPrice: 5084},
      {date: "2018-09-20T00:00:00+00:00", currentPrice: 3959, originalPrice: 5398},
      {date: "2018-09-21T00:00:00+00:00", currentPrice: 3594, originalPrice: 5013},
      {date: "2018-09-22T00:00:00+00:00", currentPrice: 3813, originalPrice: 5260},
      {date: "2018-09-23T00:00:00+00:00", currentPrice: 3609, originalPrice: 5132},
      {date: "2018-09-24T00:00:00+00:00", currentPrice: 3891, originalPrice: 5497},
      {date: "2018-09-25T00:00:00+00:00", currentPrice: 4059, originalPrice: 5119},
      {date: "2018-09-26T00:00:00+00:00", currentPrice: 3545, originalPrice: 5315},
      {date: "2018-09-27T00:00:00+00:00", currentPrice: 3903, originalPrice: 5430},
      {date: "2018-09-28T00:00:00+00:00", currentPrice: 3805, originalPrice: 5412},
      {date: "2018-09-29T00:00:00+00:00", currentPrice: 4201, originalPrice: 5050},
      {date: "2018-09-30T00:00:00+00:00", currentPrice: 3908, originalPrice: 5352}]


  ary.sort(function(a, b) {
    aDate = Date.parse(a['date']);
    bDate = Date.parse(b['date']);

    if (aDate > bDate) {
      return 1;
    } else {
      return -1;
    }
  });

  dates = ary.map(row => dateFormat(new Date(row['date']), "yyyy-mm-dd"));
  currentPrices = ary.map(row => row['currentPrice']);
  originalPrices = ary.map(row => row['originalPrice']);

  plot(dates, originalPrices, currentPrices);
}, function (err) {
  console.log("Something bad happened during data retrieving from Elastic");
  console.log(err.message);
});
