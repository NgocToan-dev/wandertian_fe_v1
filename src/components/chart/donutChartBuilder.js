export const donutChartBuilder = (type, data, title) => {
  const series = data.map((item) => {
    return {
      name: item.name,
      data: item.data,
    };
  });
  const options = {
    chart: {
      type: type,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
            },
            value: {
              show: true,
              fontSize: "16px",
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: "Total",
              color: "#373d3f",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    title: {
      text: title,
      align: "left",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
  };

  return {
    series,
    options,
  };
};
