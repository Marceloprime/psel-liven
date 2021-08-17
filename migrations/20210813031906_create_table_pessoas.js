
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pessoas',table =>{
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('email').unique()
      table.integer('idade').notNull()
      table.string('senha').notNull()
  }).createTable('enderecos',table =>{
    table.increments('id').primary()
    table.string('rua').notNull()
    table.string('numero').notNull()
    table.string('complemento')
    table.string('bairro').notNull()
    table.string('cidade').notNull()
    table.string('estado').notNull()
    table.integer('morador').unsigned().references('id').inTable('pessoas').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('pessoas')
  .dropTableIfExists('enderecos')
};
