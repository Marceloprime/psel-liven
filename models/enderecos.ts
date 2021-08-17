import {Model} from 'objection';
import Pessoa from './pessoas';

export default class Enderecos extends Model{
    id!: number
    rua!: string
    numero!: string
    bairro!: string
    cidade!: string
    estado!: string

    morador!: Pessoa
    static tableName = 'enderecos'

    static jsonSchema = {
        type: 'object',
        required: ['rua'],
    
        properties: {
          id: { type: 'integer' },
          morador: { type: ['integer', 'null'] },
          rua: { type: 'string', minLength: 1, maxLength: 255 },
          numero: { type: 'string', minLength: 1, maxLength: 10},
          bairro: { type: 'string', minLength: 1, maxLength: 255 },
          cidade: { type: 'string', minLength: 1, maxLength: 255 },
          estado: { type: 'string', minLength: 1, maxLength: 255 },
        },
    }

    static relationMappings = () => ({
        owner: {
          relation: Model.BelongsToOneRelation,
          modelClass: Pessoa,
    
          join: {
            from: 'enderecos.morador',
            to: 'pessoas.id',
          },
        },
      })
}