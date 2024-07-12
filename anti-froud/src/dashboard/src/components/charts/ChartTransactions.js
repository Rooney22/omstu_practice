import ReactDOM from 'react-dom';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useDeepCompareMemo } from 'use-deep-compare';
import { Row, Col, Statistic, Table } from 'antd';

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

const commonOptions = {
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        padding: 0,
        minRotation: 0,
      }
    },
    y: { 
      beginAtZero: true, // Set to true if you want the y-axis to start from zero
      suggestedMax: 20000, // Adjust the maximum value based on your data
      
    },
  },
};

const useDrilldownCallback = ({
  datasets,
  labels,
  onDrilldownRequested,
  pivotConfig,
}) => {
  return React.useCallback(
    (elements) => {
      if (elements.length <= 0) return;
      const { datasetIndex, index } = elements[0];
      const { yValues } = datasets[datasetIndex];
      const xValues = [labels[index]];

      if (typeof onDrilldownRequested === 'function') {
        onDrilldownRequested(
          {
            xValues,
            yValues,
          },
          pivotConfig
        );
      }
    },
    [datasets, labels, onDrilldownRequested]
  );
};


const LineChartRenderer = ({
  resultSet,
  pivotConfig,
  onDrilldownRequested,
}) => {
  const datasets = useDeepCompareMemo(
    () =>
      resultSet.series(pivotConfig).map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        yValues: [s.key],
        borderColor: COLORS_SERIES[index],
        pointRadius: 1,
        tension: 0.1,
        pointHoverRadius: 5,
        borderWidth: 2,
        tickWidth: 1,
        fill: false,
      })),
    [resultSet, pivotConfig]
  );
  const data = {
    labels: resultSet.categories(pivotConfig).map((c) => c.x),
    datasets,
  };
  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    pivotConfig,
    onDrilldownRequested,
  });
  return (
    <Line
      type="line"
      data={data}
      options={commonOptions}
      getElementAtEvent={getElementAtEvent}
    />
  );
};


const cubejsApi = cubejs(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA1Mjg4MzcsImV4cCI6MTcyMDYxNTIzN30.R57wAhAbaeVq8sqEL_P-yRcplGbBy2k2TVAJCwtpEec',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
  );

const renderChart = ({ resultSet, error, pivotConfig, onDrilldownRequested }) => {

  console.log(resultSet)
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return <Spin />;
  }

  return (
  <LineChartRenderer
    resultSet={resultSet}
    pivotConfig={pivotConfig}
    onDrilldownRequested={onDrilldownRequested}
  />
);

};

const ChartTrasactions = () => {
  return (
    <QueryRenderer
      query={{
  "order": {
    "transactions.transaction_date": "asc"
  },
  "timeDimensions": [
    {
      "dimension": "transactions.transaction_date",
      "granularity": "day"
    }
  ],
  "measures": [
    "transactions.count"
  ]
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'line',
        pivotConfig: {
  "x": [
    "transactions.transaction_date.day"
  ],
  "y": [
    "measures"
  ],
  "fillMissingDates": true,
  "joinDateRange": false
}
      })}
    />
  );
};

export default ChartTrasactions;