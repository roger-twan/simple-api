const request = require('supertest')
const app = require('../app')

describe('POST /notes', () => {
  test('should create a new note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({
        title: 'Test Note',
        content: 'This is a test note'
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.title).toBe('Test Note')
    expect(response.body.content).toBe('This is a test note')
    expect(response.body.createdAt).toBeDefined()
    expect(response.body.updatedAt).toBeDefined()
  })

  test('should return 400 if title is missing', async () => {
    const response = await request(app)
      .post('/notes')
      .send({
        content: 'This is a test note'
      })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Title is required and must be less than 50 characters')
  })

  test('should return 400 if title is longer than 50 characters', async () => {
    const testTitle = 'a'.repeat(51)
    const response = await request(app)
      .post('/notes')
      .send({ title: testTitle, content: 'This is a test note' }) 

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Title is required and must be less than 50 characters')
  })
})
