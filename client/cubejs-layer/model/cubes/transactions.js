cube(`transactions`, {
  sql_table: `omstu_practice.transactions`,
  
  data_source: `default`,
  
  joins: {
    operations: {
      sql: `${CUBE}.operation_id = ${operations}.operation_id`,
      relationship: `many_to_one`
    },
    
    terminals: {
      sql: `${CUBE}.terminal_id = ${terminals}.terminal_id`,
      relationship: `many_to_one`
    },

    cards: {
      sql: `${CUBE}.cards_number = ${cards}.cards_number`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    transaction_id:{
      sql: `transaction_id`,
      type: `number`,
      primaryKey: true
    },
    card_number: {
      sql: `card_number`,
      type: `string`
    },
    
    transaction_date: {
      sql: `transaction_date`,
      type: `time`
    },
    fraud_probability:{
      sql: `fraud_probability`,
      type: `number`,
      primaryKey: true
    },
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
