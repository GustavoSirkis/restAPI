import {fastifySwagger} from '@fastify/swagger'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import { createCoursesRoute } from './routes/create-courses.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import { getCourseByIdRoute } from './routes/get-courses-by-id.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'API Documentation',
                description: 'API documentation for the Fastify server',
                version: '1.0.0',
            },
        },
        transform: jsonSchemaTransform,
    })
}

server.register(scalarAPIReference, {
  routePrefix: '/docs',
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(createCoursesRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)


export {server}