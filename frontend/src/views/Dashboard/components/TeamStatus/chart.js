import palette from 'theme/palette';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 10,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  data: {
    datasets: [{
      categoryPercentage: 0.5,
      barPercentage: 0.5,
      barThickness: 25,
      maxBarThickness: 15,
      minBarLength: 2,
      data: [10, 20, 30, 40, 50, 60, 70]
    }]
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  }
};
