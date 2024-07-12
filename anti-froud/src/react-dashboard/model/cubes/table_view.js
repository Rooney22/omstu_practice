cube(`table_view`, {
  sql_table: `omstu_practice.table_view`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    amount: {
      sql: `amount`,
      type: `string`
    },
    
    operation_result: {
      sql: `operation_result`,
      type: `string`
    },
    
    card: {
      sql: `card`,
      type: `string`
    },
    
    client: {
      sql: `client`,
      type: `string`
    },
    
    passport: {
      sql: `passport`,
      type: `string`
    },
    
    phone: {
      sql: `phone`,
      type: `string`
    },
    
    operation_type: {
      sql: `operation_type`,
      type: `string`
    },
    
    terminal_type: {
      sql: `terminal_type`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    terminal: {
      sql: `terminal`,
      type: `string`
    },
    
    passport_valid_to: {
      sql: `passport_valid_to`,
      type: `time`
    },
    
    date_of_birth: {
      sql: `date_of_birth`,
      type: `time`
    },
    
    date: {
      sql: `date`,
      type: `time`
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
