import request  from 'supertest';

import {app} from '../../app';

it('return a 201 on successfull signup', async ()=>{
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "swetabhs"
    })
    .expect(201)
})

it('return a 400 with an invalid email', async()=>{
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "estcom",
        password: "swetabhs"
    })
    .expect(400)
})

it('return a 400 with an invalid email', async()=>{
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test1.com",
        password: "test@test"
    })
    .expect(201)
})
it('return a 400 with an invalid email', async()=>{
    
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test1.com",
        password: "test@test"
    })
    .expect(400)
})