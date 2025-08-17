import {test, expect} from 'vitest'
import request from 'supertest'
import {server} from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'


test('Get course by ID successfully', async () => {
    await server.ready()

    const course = await makeCourse()

    const response = await request(server.server)
        .get(`/courses/${course.id}`)


    expect(response.status).equal(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        }
    })
})


test('Return 404 for non existing courses', async () => {
    await server.ready()


    const response = await request(server.server)
        .get('/courses/088d35e9-269a-4950-80e1-23a6dbced356')


    expect(response.status).equal(404)
    
})
    


