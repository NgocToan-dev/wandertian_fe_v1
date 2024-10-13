/**
 *
 * @param {*} data one of the data is an array of objects with keys: name, data ( one column )
 * @param {*} xaxis x-axis data
 * @param {*} yaxis y-axis data
 * @param {*} height height of the chart
 * @returns
 */
export const lineChartBuilder = (type, data, xaxis, title) => {
  const series = data.map((item) => {
    return {
      name: item.name,
      data: item.data,
    };
  });
  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: title,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
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
