/*arquivo para carregar variáveis de ambiente e valida-las*/

import 'dotenv/config' // importando variáveis de ambiente em estrutura de objeto
import { z } from 'zod' // métido "z" da biblioteca "zod" contendo todas as funções de validação


//esquema de validações
const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), 
    PORT: z.coerce.number().default(3000), 
})

const _env = envSchema.safeParse(process.env) // verifica se process.env possui as mesmas variáveis do esquema

//caso ocorra incompatibilidade com o esquema, a aplicação é derrubada
if (_env.success === false) {
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

//em caso de sucesso, exportar variáveis já tratadas pelo esquema
export const env = _env.data