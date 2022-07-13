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
  const style = {
    font: { family: theme.fontFamily },
    color: theme.sub,
  };
  const ticks = {
    precision: 0,
    autoSkip: true,
    autoSkipPadding: 20,
    ...style,
  };
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animations: {
      color: { duration: 0.25 },
    },
    scales: {
      x: {
        axis: 'x',
        ticks,
        grid: { color: theme.subAlt },
      },
      wpm: {
        axis: 'y',
        title: {
          display: true,
          text: 'Words per Minute',
          ...style,
        },
        beginAtZero: true,
        min: 0,
        ticks,
        grid: { color: theme.subAlt },
      },
      error: {
        axis: 'y',
        position: 'right',
        title: {
          display: true,
          text: 'Errors',
          ...style,
        },
        beginAtZero: true,
        max: Math.max(...errorCount) + 1,
        ticks,
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: {
        padding: 10,
        titleFont: { family: theme.fontFamily },
        bodyFont: { family: theme.fontFamily },
        backgroundColor: theme.sub,
        titleColor: theme.text,
        bodyColor: theme.text,
        cornerRadius: 8,
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
