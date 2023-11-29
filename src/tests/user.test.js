const request = require('supertest');
const app = require('../app');

let id;
let token;


test('POST /users', async () => {
    const user = {
        firstName: "Oliver",
        lastName:"Senosain",
        email:"oliver@qwe.com",
        password: "aaron123",
        phone:"900021231"
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
})

test('post /users/login', async () => {
    const body = {
        email: 'mendezoliver2108@gmail.com',
        password: 'oliver123'
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
})

test('GET /users trae todos los usuarios',async () => {
    const res =await  request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('PUT /users/:id', async () => {
    const user = {
        firstName:"Legolas"
    }
    const res = await request(app).put(`/users/${id}`).send(user).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
})

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto123'
    }
    const res = await request(app).post('/users/login').send(body).set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(401);
})

test('delete /users/:id', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})