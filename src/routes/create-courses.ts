import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'


export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses',{
        schema: {
            tags: ['Courses'],
            summary: 'Create a new course',
            body: z.object({
                title: z.string().min(5, 'Título precisar ter 5 caracteres'),
                description: z.string().optional()
            }),
            response: {
                201: z.object({courseId: z.uuid()}).describe('Course created success')
            }
        }
    }, async (req, reply) => {

        const courseTitle = req.body.title
        const courseDescription = req.body.description


        const result = await db
            .insert(courses).values({
                title: courseTitle,
                description: courseDescription
            }).returning()

        return reply.status(201).send({courseId: result[0].id})
    })
}