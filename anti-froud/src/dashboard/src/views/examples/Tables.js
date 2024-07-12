import React, {useState} from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Table, Spin } from 'antd';
import { useDeepCompareMemo } from 'use-deep-compare';
import Header from "components/Headers/Header.js";
import { Container } from 'reactstrap';
import { Input, Row, Col } from 'reactstrap';

import './Tables.css';

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
    if (value === undefined) {
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
  const [filteredData, setFilteredData] = useState([]);
  const [amountFilter, setAmountFilter] = useState('');
  const [operationResultFilter, setOperationResultFilter] = useState('');
  const [cardFilter, setCardFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [passportFilter, setPassportFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [operationTypeFilter, setOperationTypeFilter] = useState('');
  const [terminalTypeFilter, setTerminalTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const [tableColumns, dataSource] = useDeepCompareMemo(() => {
    const columns = resultSet.tableColumns(pivotConfig);
    return [
      columns,
      formatTableData(columns, resultSet.tablePivot(pivotConfig)),
    ];
  }, [resultSet, pivotConfig]);

  const handleOperationResultFilterChange = (e) => {
    const filterValue = e.target.value;
    setOperationResultFilter(filterValue);
    applyFilters();
  };

  const handlecardFilterFilterChange = (e) => {
    const filterValue = e.target.value;
    setCardFilter(filterValue);
    applyFilters();
  };

  const handleclientFilterFilterChange = (e) => {
    const filterValue = e.target.value;
    setClientFilter(filterValue);
    applyFilters();
  };

  const handlepassportFilterChange = (e) => {
    const filterValue = e.target.value;
    setPassportFilter(filterValue);
    applyFilters();
  };

  const handlephoneFilterChange = (e) => {
    const filterValue = e.target.value;
    setPhoneFilter(filterValue);
    applyFilters();
  };

  const handleoperationTypeFilterChange = (e) => {
    const filterValue = e.target.value;
    setOperationTypeFilter(filterValue);
    applyFilters();
  };
  const handleterminalTypeFilterChange = (e) => {
    const filterValue = e.target.value;
    setTerminalTypeFilter(filterValue);
    applyFilters();
  };
  const handlecityFilterChange = (e) => {
    const filterValue = e.target.value;
    setCityFilter(filterValue);
    applyFilters();
  };

  const rowClassName = (record, index) => {
    return record['table_view.amount'] > 100 ? 'red-row' : '';
  };

  const handleAmountFilterChange = (e) => {
    const filterValue = e.target.value;
    setAmountFilter(filterValue);
    applyFilters();
  };

  const applyFilters = () => {
    const newFilteredData = dataSource.filter((record) => {
      return (
        (amountFilter === '' || record['table_view.amount'] >= parseFloat(amountFilter)) &&
        (operationResultFilter === '' || record['table_view.operation_result'] === operationResultFilter) &&
        (cardFilter === '' || record['table_view.card'] === cardFilter) &&
        (clientFilter === '' || record['table_view.client'] === clientFilter) &&
        (passportFilter === '' || record['table_view.passport'] === passportFilter) &&
        (phoneFilter === '' || record['table_view.phone'] === phoneFilter) &&
        (operationTypeFilter === '' || record['table_view.operation_type'] === operationTypeFilter) &&
        (terminalTypeFilter === '' || record['table_view.terminal_type'] === terminalTypeFilter) &&
        (cityFilter === '' || record['table_view.city'] === cityFilter)
      );
    });
    setFilteredData(newFilteredData);
  };

  return (
    <>
           <Row>
        <Col md="6">
          <Input
            type="number"
            placeholder="Filter by amount"
            onChange={handleAmountFilterChange}
          />
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by operation result"
            onChange={handleOperationResultFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by card"
            onChange={handlecardFilterFilterChange}
          />
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by client"
            onChange={handleclientFilterFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by passport"
            onChange={handlepassportFilterChange}
          />
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by phone"
            onChange={handlephoneFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by operation type"
            onChange={handleoperationTypeFilterChange}
          />
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by terminal type"
            onChange={handleterminalTypeFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Input
            type="text"
            placeholder="Filter by city"
            onChange={handlecityFilterChange}
          />
        </Col>
        {/* Add other input fields here */}
      </Row>

    <Table
      pagination={true}
      columns={tableColumns}
      dataSource={filteredData}
      scroll={{ x: 1500 }}
      rowClassName={rowClassName} 
    />
    </>
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
    <>
    <Header />
    <QueryRenderer
      query={{
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

    </>
  );

};

export default Tables;