const request = require('supertest');
const app = require('../src/app');

describe('Create', () => {
  it('should create user session', async (done) => {
    const response = await request(app)
      .post('/users')
      .send({
        nome: 'Juan Patrick',
        email: `juan${Math.floor(Math.random() * 9999) + 1}@gmail.com`,
        senha: '123123123',
        telefones: [
          {
            numero: '951415258',
            ddd: '11',
          },
        ],
      });

    expect(response.status).toBe(201);
    done();
  });
});

describe('Authentication', () => {
  it('should create session authentication', async (done) => {
    const response = await request(app).post('/sign-in').send({
      email: 'juan@gmail.com',
      senha: '1234',
    });

    expect(response.status).toBe(200);
    done();
  });
});

describe('User', () => {
  it('should list user by id', async (done) => {    
    const response = await request(app)
      .get('/users/5f877dc25d9f7b5c08f77c16')
      .send();

    expect(response.status).toBe(401);
    done();
  });
});
