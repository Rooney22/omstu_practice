cube(`terminal_types`, {
  sql_table: `omstu_practice.terminal_types`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    terminal_type_id: {
      sql: `terminal_type_id`,
      type: `number`,
      primaryKey: true
    },
    terminal_type_name: {
      sql: `terminal_type_name`,
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
