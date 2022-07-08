import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Tooltip,
  TooltipLabelStyle,
  TooltipItem,
} from 'chart.js';
import { ChartOptions } from 'chart.js';
import { useTheme } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Styled from './Chart.styles';

function Chart() {
  const theme = useTheme();
  const { stats, elapsedTime } = useAppSelector(({ typingTest }) => typingTest);
  const { raw, wpm, errorCount } = stats;
  const labels = Array(stats.raw.length).fill(0).map((_, i) => i + 1);
  if (stats.raw.length > elapsedTime) {
    labels[stats.raw.length - 1] = elapsedTime;
  }
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        axis: 'x',
        display: true,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
          color: theme.sub,
        },
      },
      wpm: {
        axis: 'y',
        display: true,
        title: {
          display: true,
          text: 'Words per Minute',
          color: theme.sub,
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
          color: theme.sub,
        },
        grid: {
          display: true,
        },
      },
      error: {
        axis: 'y',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Errors',
          color: theme.sub,
        },
        beginAtZero: true,
        max: Math.max(...errorCount) + 1,
        ticks: {
          precision: 0,
          autoSkip: true,
          autoSkipPadding: 20,
          color: theme.sub,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          labelColor: (tooltipItem: TooltipItem<'line'>) => {
            const { borderColor } = tooltipItem.dataset;
            return {
              backgroundColor: borderColor,
              borderColor,
              borderRadius: 6,
            } as TooltipLabelStyle;
          },
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'raw',
        fill: true,
        data: raw.map((r) => Math.floor(r)),
        borderColor: theme.sub,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        lineTension: 0.3,
        yAxisID: 'wpm',
        order: 3,
        pointRadius: 2,
      },
      {
        type: 'line' as const,
        label: 'wpm',
        fill: true,
        data: wpm.map((w) => Math.floor(w)),
        borderColor: theme.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        lineTension: 0.3,
        yAxisID: 'wpm',
        order: 2,
        pointRadius: 2,
      },
      {
        type: 'scatter' as const,
        label: 'errors',
        data: errorCount.map((e) => (e) ? e : null),
        borderColor: theme.colorfulError,
        pointBackgroundColor: theme.colorfulError,
        borderWidth: 2,
        yAxisID: 'error',
        order: 1,
        pointStyle: 'crossRot',
      },
    ],
  };

  return (
    <Styled.Chart type="line" options={options} data={data} />
  );
}

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Tooltip,
);

export default Chart;
