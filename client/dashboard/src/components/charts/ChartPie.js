import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Spin } from 'antd';
// Define colors for the pie chart
const COLORS_SERIES = [
  '#5b8ff9',
  '#5ad8a6',
  '#5e7092',
  '#f6bd18',
  '#6f5efa',
  '#6ec8ec',
  '#945fb9',
  '#ff9845',
  '#299796',
  '#fe99c3',
];

// Common options for the chart
const commonOptions = {
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
      display: true,
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        padding: 12,
        minRotation: 0,
      },
    },
  },
};

// Custom hook for handling drilldown interactions
const useDrilldownCallback = ({
  datasets,
  labels,
  onDrilldownRequested,
  pivotConfig,
}) => {
  return React.useCallback(
    (elements) => {
      if (elements.length <= 0) return;
      const { index } = elements[0];
      const xValues = [labels[index]];

      if (typeof onDrilldownRequested === 'function') {
        onDrilldownRequested({
          xValues,
        });
      }
    },
    [labels, onDrilldownRequested]
  );
};

// Component for rendering the pie chart
const PieChartRenderer = ({ resultSet, pivotConfig, onDrilldownRequested }) => {
  const data = {
    labels: ['Dangerous', 'Potentially Dangerous', 'Suspicious', 'Normal'],
    datasets: [
      {
        label: 'Fraud Probability',
        data: [0, 0, 0, 0],
        backgroundColor: COLORS_SERIES,
        hoverBackgroundColor: COLORS_SERIES,
      },
    ],
  };

  resultSet.series(pivotConfig).forEach((s) => {
    s.series.forEach((r) => {
      const value = r.x;
      if (value >= 0.8) {
        data.datasets[0].data[0] += r.value;
      } else if (value >= 0.7) {
        data.datasets[0].data[1] += r.value;
      } else if (value >= 0.5) {
        data.datasets[0].data[2] += r.value;
      } else {
        data.datasets[0].data[3] += r.value;
      }
    });
  });

  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    pivotConfig,
    onDrilldownRequested,
  });

  return (
    <Pie
      type="pie"
      data={data}
      options={commonOptions}
      getElementAtEvent={getElementAtEvent}
    />
  );
};

const renderChart = ({ resultSet, error, pivotConfig, onDrilldownRequested }) => {
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return <Spin />;
  }

  return (
    <PieChartRenderer
      resultSet={resultSet}
      pivotConfig={pivotConfig}
      onDrilldownRequested={onDrilldownRequested}
    />
  );

};

// Initialize the Cube.js API
const cubejsApi = cubejs(
  process.env.REACT_APP_CUBEJS_KEY,
  { apiUrl: process.env.REACT_APP_API_URL }
);

// Component that renders the pie chart using Cube.js
const ChartPie = () => {
  return (
    <QueryRenderer
      query={{
        dimensions: ['table_view.fraud_probability'],
        measures: ['table_view.count'],
        limit: 1000,
      }}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) =>
        renderChart({
          ...props,
          chartType: 'pie',
          pivotConfig: {
            x: ['table_view.fraud_probability'],
            y: ['measures'],
            fillMissingDates: true,
            joinDateRange: false,
            limit: 1000,
          },
        })
      }
    />
  );
};

export default ChartPie;
