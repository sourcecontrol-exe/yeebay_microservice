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

it("email invalid",async ()=>{
     await request(app)
      .post('/api/users/signup')
    .send({
        email: "test",
        password: "swetabhs"
    })
    .expect(400)
})

it("invlaid password",async () => {
     await request(app)
      .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "swetabhsjibefoadfnadsadasdasdasdasdassodsfiefasdf"
    })
    .expect(400)
})

it("invlaid password",async () => {
    const response =  await request(app)
      .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "dsdasfasdasd"
    })
    .expect(201)

    expect(response.get("Set-Cookie")).toBeDefined();
})
