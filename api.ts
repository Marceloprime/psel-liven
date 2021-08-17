import Pessoa from './models/pessoas'
import Enderecos from './models/Enderecos'
import KoaRouter from 'koa-router'
import bcrypt from 'bcrypt';

export default (router: KoaRouter) => {

  router.post('/users', async (ctx) => {
    const saltRounds: number = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    const insertedGraph = await Pessoa.transaction(async (trx) => {
      const insertedGraph = await Pessoa.query(trx)
        .insertGraph({  
            nome: ctx.request.body.nome,
            email: ctx.request.body.email,
            idade: ctx.request.body.idade,
            senha: bcrypt.hashSync(ctx.request.body.senha, salt)
        })

        return insertedGraph
    })

    ctx.body = {            
        nome: ctx.request.body.nome,
        email: ctx.request.body.email,
        idade: ctx.request.body.idade
    }
  })

  router.get('/users', async (ctx) => {
    const query = Pessoa.query().select('nome', 'email', 'idade','id')

    if (ctx.query.select) {
      query.select(ctx.query.select)
    }
    if (ctx.query.idade) {
      query.select('nome', 'email', 'idade','id').where('idade', '>', ctx.query.idade)
    }
    if (ctx.query.nome) {
      query.select('nome', 'email', 'idade','id').where('nome', '>', ctx.query.nome)
    }
    ctx.body = await query
  })


  router.patch('/users/:id', async (ctx) => {
    const numUpdated = await Pessoa.query().findById(ctx.params.id).patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1,
    }
  })

  /**
   * Delete a person.
   */
  router.delete('/users/:id', async (ctx) => {
    const numDeleted = await Pessoa.query().findById(ctx.params.id).delete()

    ctx.body = {
      success: numDeleted == 1,
    }
  })

  router.post('/users/adress', async (ctx) => {
    const insertedGraph = await Enderecos.transaction(async (trx) => {
      const insertedGraph = await Enderecos.query(trx)
        .insertGraph(ctx.request.body)

      return insertedGraph
    })

    ctx.body = insertedGraph
  })

  router.get('/users/adress', async (ctx) => {
    const query = Enderecos.query()

    if (ctx.query.select) {
      query.select(ctx.query.select)
    }
    if (ctx.query.morador) {
      console.log(typeof(ctx.query.morador))
      query.select('*').where('morador',ctx.query.morador)
    }

    ctx.body = await query
  })

  router.patch('/users/adress/:id', async (ctx) => {
    const numUpdated = await Enderecos.query().findById(ctx.params.id).patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1,
    }
  })

  router.delete('/users/adress/:id', async (ctx) => {
    const numDeleted = await Enderecos.query().findById(ctx.params.id).delete()

    ctx.body = {
      success: numDeleted == 1,
    }
  })

}