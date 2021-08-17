import {Model,Modifiers} from 'objection';
import Enderecos from './enderecos';

export default class Pessoa extends Model{
    id!: number
    nome!: string
    email!: string
    senha!: string
    idade!: number

    enderecos?: Enderecos[]

    static tableName = 'pessoas'

    static jsonSchema = {
        type: 'object',
        required: ['email', 'senha'],
    
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string', minLength: 1, maxLength: 255 },
          email: { type: 'string', minLength: 1, maxLength: 255 },
          senha: { type: 'string', minLength: 1, maxLength: 500 },
          idade: { type: 'number' },

        },
      }

  static modifiers: Modifiers = {
    maiorDe18(query) {
        query
        .select('idade', 'nome', 'email')
        .where('idade', '>', 18)
    },
  }

  static relationMappings = () => ({
    enderecos: {
      relation: Model.HasManyRelation,
      modelClass: Enderecos,
      join: {
        from: 'pessoas.id',
        to: 'enderecos.morador',
      },
    },
  })
}