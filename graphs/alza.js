var trace1 = {
    x: ['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04', '2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08', '2018-09-09', '2018-09-10', '2018-09-11', '2018-09-12', '2018-09-13', '2018-09-14', '2018-09-15', '2018-09-16', '2018-09-17', '2018-09-18', '2018-09-19', '2018-09-20', '2018-09-21', '2018-09-22', '2018-09-23', '2018-09-24', '2018-09-25', '2018-09-26', '2018-09-27', '2018-09-28', '2018-09-29', '2018-09-30'],
    y: [4214, 3899, 3829, 4038, 3702, 4239, 4124, 3963, 3779, 3572, 3506, 3825, 4085, 4101, 3929, 3755, 4186, 4148, 3689, 4034, 3757, 3555, 3685, 3577, 3509, 3742, 4217, 3598, 4161, 3714],
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
    mode: 'markers+lines',
    type: 'scatter',
    xsrc: 'masa331:0:987919',
    ysrc: 'masa331:0:bdffc8'
};
var data = [trace1];
var layout = {
    autosize: true,
    xaxis: {
          automargin: true,
          autorange: true,
          domain: [0, 1],
          fixedrange: false,
          range: ['2018-08-30 05:57:54.5645', '2018-10-01 18:02:05.4355'],
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
          title: 'Datum',
          titlefont: {size: 14},
          type: 'date',
          zeroline: true
        },
    yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [3454.42430704, 4290.57569296],
          showgrid: false,
          title: 'Cena',
          titlefont: {size: 14},
          type: 'linear'
        }
};

$(".pricesInner").append('<div id="pricesChart" style="height: 300px;"></div>');
Plotly.newPlot('pricesChart', {
  data: data,
  layout: layout
});
