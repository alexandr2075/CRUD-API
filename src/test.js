const request = require('supertest');
const { server } = require('./server');

describe('server', () => {
  it('should return 200 and empty array', ()=> {
      request(server)
      .get('/api/users')
      .expect(200, [])
  })

  it(`should'n create user with incorrect input data`, async() => {
    await request(server)
    .post('/api/users')
    .send({age: 18, hobbies: ['movies', 'games']})
    .expect(400)
  })

  let createdUser = null;
  it('should create user with correct input data', async() => {
    const createResponse = await request(server)
    .post('/api/users')
    .send({username: 'Vasya', age: 18, hobbies: ['movies', 'games']})
    .expect(201)
    
    createdUser = JSON.parse(createResponse.text);

    expect(createdUser).toEqual({
      id: expect.any(String),
      username: 'Vasya',
      age: 18,
      hobbies: ['movies', 'games']
    })
  })

  it('should get user with correct userId', async() => {
    const getData = await request(server)
    .get(`/api/users/${createdUser.id}`)
    .expect(200, JSON.stringify(createdUser))
  })


})