// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'bixo_2018',
    database : 'usuarios'
  },
  pool: {
    min: 2, 
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
