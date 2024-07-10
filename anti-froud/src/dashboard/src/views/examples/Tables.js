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
const PALE_COLORS_SERIES = [
  '#d7e3fd',
  '#daf5e9',
  '#d6dbe4',
  '#fdeecd',
  '#dad8fe',
  '#dbf1fa',
  '#e4d7ed',
  '#ffe5d2',
  '#cce5e4',
  '#ffe6f0',
];

const formatTableData = (columns, data) => {
  function flatten(columns = []) {
    return columns.reduce((memo, column) => {
      if (column.children) {
        return [...memo, ...flatten(column.children)];
      }

      return [...memo, column];
    }, []);
  }

  const typeByIndex = flatten(columns).reduce((memo, column) => {
    return { ...memo, [column.dataIndex]: column };
  }, {});

  function formatValue(value, { type, format } = {}) {
    if (value == undefined) {
      return value;
    }

    if (type === 'boolean') {
      if (typeof value === 'boolean') {
        return value.toString();
      } else if (typeof value === 'number') {
        return Boolean(value).toString();
      }

      return value;
    }

    if (type === 'number' && format === 'percent') {
      return [parseFloat(value).toFixed(2), '%'].join('');
    }

    return value.toString();
  }

  function format(row) {
    return Object.fromEntries(
      Object.entries(row).map(([dataIndex, value]) => {
        return [dataIndex, formatValue(value, typeByIndex[dataIndex])];
      })
    );
  }

  return data.map(format);
};

const TableRenderer = ({ resultSet, pivotConfig }) => {
  const [tableColumns, dataSource] = useDeepCompareMemo(() => {
    const columns = resultSet.tableColumns(pivotConfig);
    return [
      columns,
      formatTableData(columns, resultSet.tablePivot(pivotConfig)),
    ];
  }, [resultSet, pivotConfig]);
  return (
    <Table pagination={false} columns={tableColumns} dataSource={dataSource} />
  );
};


const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA1Mjg4MzcsImV4cCI6MTcyMDYxNTIzN30.R57wAhAbaeVq8sqEL_P-yRcplGbBy2k2TVAJCwtpEec',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

const renderChart = ({ resultSet, error, pivotConfig, onDrilldownRequested }) => {
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return <Spin />;
  }

  return <TableRenderer resultSet={resultSet} pivotConfig={pivotConfig} />;

};

const Tables = () => {
  return (
    <QueryRenderer
      query={{
        "limit":500,
  "dimensions": [
    "table_view.amount",
    "table_view.operation_result",
    "table_view.card",
    "table_view.client",
    "table_view.client",
    "table_view.passport",
    "table_view.phone",
    "table_view.operation_type",
    "table_view.terminal_type",
    "table_view.city",
    "table_view.terminal",
    "table_view.passport_valid_to",
    "table_view.date_of_birth",
    "table_view.date"
  ],
  "order": {
    "table_view.amount": "asc"
  }
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'table',
        pivotConfig: {
  "x": [
    "amount",
    "operation_result",
    "card",
    "client",
    "client",
    "passport",
    "phone",
    "operation_type",
    "terminal_type",
    "city",
    "terminal",
    "passport_valid_to",
    "date_of_birth",
    "date"
  ],
  "y": [],
  "fillMissingDates": true,
  "joinDateRange": false
}
      })}
    />
  );
};

export default Tables;