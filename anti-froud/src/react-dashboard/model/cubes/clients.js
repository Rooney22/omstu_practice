cube(`clients`, {
  sql_table: `omstu_practice.clients`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    client_id: {
      sql: `client_id`,
      type: `string`,
      primary_key: true
    },
    
    passport_hashed: {
      sql: `passport_hashed`,
      type: `string`
    },
    
    passport_valid_to: {
      sql: `passport_valid_to`,
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
