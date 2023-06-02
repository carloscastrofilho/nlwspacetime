import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // todas a url de front end pode acessa o back
  // origin: ['http://locahost:3000','http://fatectq.edu.br'] - para uso em produção
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(memoriesRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor Rodando porta: 3333 , em http://localhost:3333')
})
