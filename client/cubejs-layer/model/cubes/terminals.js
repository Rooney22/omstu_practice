cube(`terminals`, {
  sql_table: `omstu_practice.terminals`,
  
  data_source: `default`,
  
  joins: {
    terminal_types: {
      sql: `${CUBE}.terminal_type_id = ${terminal_types}.terminal_type_id`,
      relationship: `many_to_one`
    },
    
    cities: {
      sql: `${CUBE}.city_id = ${cities}.city_id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    terminal_id: {
      sql: `terminal_id`,
      type: `number`,
      primaryKey: true
    },
    terminal_address: {
      sql: `terminal_address`,
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
