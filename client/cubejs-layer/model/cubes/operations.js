cube(`operations`, {
  sql_table: `omstu_practice.operations`,
  
  data_source: `default`,
  
  joins: {
    operation_types: {
      sql: `${CUBE}.operation_type_id = ${operation_types}.operation_type_id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    operation_id: {
      sql: `operation_id`,
      type: `number`,
      primaryKey: true
    },
    operation_result: {
      sql: `operation_result`,
      type: `string`
    },
    
    operation_amount: {
      sql: `operation_amount`,
      type: `string`
    }
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
