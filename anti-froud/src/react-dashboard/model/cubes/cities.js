cube(`cities`, {
  sql_table: `omstu_practice.cities`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    city_id:{
      sql: `city_id`,
      type: `number`,
      primary_key: true
    },
    city_name: {
      sql: `city_name`,
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
