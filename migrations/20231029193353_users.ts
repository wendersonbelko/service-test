import { Knex } from "knex";

const item = {
  table: 'users',
  schema: 'common'
}

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createSchema(item.schema)
  await knex.schema.createTable(item.schema + '.' + item.table, (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.boolean('verified_email').defaultTo(false)
    table.string('doc').nullable()
    table.string('password').notNullable()
    table.string('cellphone').nullable()
    table.boolean('verified_cellphone').defaultTo(false)
    table.dateTime('created_at').defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(item.schema + '.' + item.table)
  await knex.schema.dropSchema(item.schema)
}

