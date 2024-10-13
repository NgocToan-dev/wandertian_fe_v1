/**
 *
 * @param {*} data one of the data is an array of objects with keys: name, data ( one column )
 * @param {*} xaxis x-axis data
 * @param {*} yaxis y-axis data
 * @param {*} height height of the chart
 * @returns
 */
export const barChartBuilder = (type, data, xaxis, title) => {
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
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: title,
      align: 'left'
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [...xaxis],
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
