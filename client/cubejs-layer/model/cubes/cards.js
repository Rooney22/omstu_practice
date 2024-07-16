cube(`cards`, {
  sql_table: `omstu_practice.cards`,
  
  data_source: `default`,
  
  joins: {
    clients: {
      sql: `${CUBE}.client_id = ${clients}.client_id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    phone_hashed: {
      sql: `phone_hashed`,
      type: `string`
    },
    
    card_number: {
      sql: `card_number`,
      type: `string`,
      primary_key: true
    },
    
    client_id: {
      sql: `client_id`,
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
