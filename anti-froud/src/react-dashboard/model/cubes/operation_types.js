cube(`operation_types`, {
  sql_table: `omstu_practice.operation_types`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    operation_type_id: {
      sql: `operation_type_id`,
      type: `number`,
      primaryKey: true
    },
    operation_type_name: {
      sql: `operation_type_name`,
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
