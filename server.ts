import fastify from 'fastify'
import crypto from 'node:crypto'

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
})

const courses =[
    { id: '1', title: "Node.js Basics", instructor: "John Doe" },
    { id: '2', title: "Advanced JavaScript", instructor: "Jane Smith" },
    { id: '3', title: "REST API Development", instructor: "Alice Johnson" }
]

server.get('/courses', () => {
    return { courses }
})

server.get('/courses/:id', (req, reply) => {
    type Params = {
        id: string
    }

    const params = req.params as Params

    const courseId = params.id

    const course = courses.find(course => course.id == courseId)

    if (course) {
        return {course}
    }

    return reply.status(404).send({ message: "Course not found" })
})

server.post('/courses', (req, reply) => {
    type Body = {
        title: string
        instructor: string
    }

    const body = req.body as Body

    const courseId = crypto.randomUUID()
    const courseTitle = body.title
    const courseInstructor = body.instructor

    if(!courseTitle || !courseInstructor) {
        return reply.status(400).send({ message: "Title and Instructor are required" })
    }

    courses.push({ id: courseId, title: courseTitle, instructor: courseInstructor })
 
    return reply.status(201).send({courseId})
})

server.listen({port: 3333}).then(() => {
    console.log("Server is running on port 3333")
})