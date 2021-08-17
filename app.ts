import Koa, { Context } from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Knex from 'knex'
import knexConfig from './knexfile'
import registerApi from './api'
import { Model, ForeignKeyViolationError, ValidationError } from 'objection'

const knex = Knex(knexConfig)

Model.knex(knex)

const router = new KoaRouter()
const app = new Koa()

registerApi(router)

app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const port = 8641
app.listen(port, () => {
  console.log('Server rodando na porta %s', port)
})

async function errorHandler(ctx: Context, next: () => Promise<any>) {
  try {
    await next()
  } catch (err) {
    if (err instanceof ValidationError) {
      ctx.status = 400
      ctx.body = {
        error: 'Dados incorretos',
        errors: err.data,
      }
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.status = 409
      ctx.body = {
        error: 'Ação proibida',
      }
    } else {
      ctx.status = 500
      console.log(err)
      ctx.body = {
        error: 'Aguarde enquanto solucionamos',
        message: "err.message" || {},
      }
    }
  }
}