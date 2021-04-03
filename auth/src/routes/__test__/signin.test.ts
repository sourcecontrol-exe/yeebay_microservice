import request  from 'supertest';

import {app} from '../../app';

it("fails when a email that does not exixt is supplied", async()=>{
    await request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "swetabhs"
    })
    .expect(400)
})

it("invalid password", async()=>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "swetabhs"
    })
    .expect(201)
     
    await request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "dasdasd"
    })
    .expect(400)
})