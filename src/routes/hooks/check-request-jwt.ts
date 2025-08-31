import type {FastifyRequest, FastifyReply} from 'fastify'
import jwt from 'jsonwebtoken'

type JWTPayload = {
    sub: string
    role: 'teacher' | 'student' | 'admin'
}

export async function checkRequestJWT(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers.authorization
    
    
    if (!token) {
        return reply.status(401).send({ message: 'Unauthorized' })
    }
    if(!process.env.JWT_SECRET){
        throw new Error('JWT_SECRET must be set.')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, /* { maxAge: '1h' } */)  as JWTPayload

        req.user = payload

    } catch (err) {
        return reply.status(401).send({ message: 'Unauthorized' })
    }

}
