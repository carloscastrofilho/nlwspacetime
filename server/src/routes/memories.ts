import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createAt: 'asc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        except: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsShema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (request) => {
    const bodyShema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, isPublic, coverUrl } = bodyShema.parse(request.body)
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    })
    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsShema.parse(request.params)

    const bodyShema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, isPublic, coverUrl } = bodyShema.parse(request.body)

    const memoryi = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memoryi.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsShema.parse(request.params)
    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
