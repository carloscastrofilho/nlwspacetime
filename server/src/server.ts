import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', () => {
  const users = prisma.User.findMany()

  return users
})

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor Rodando porta: 3333 , em http://localhost:3333')
})
