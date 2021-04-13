import request from "supertest";
import {app} from '../../app';

it('it has  a route handler listenign to post requests', async () =>{
 const response = await request(app)
 .post('/api/tickets')
 .send({});

 expect(response.status).not.toEqual(404);

});

it('can only be accessed if the user is signed in', async () =>{
    await request(app)
    .post('/api/tickets').send({}).expect(401);

});

it('returns a status other that 401 if user is signed in',async ()=>{
    const response  = await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({});

    expect(response.status).not.toEqual(401);
})


it('return an error if an invalid title is passed', async () =>{
    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title: "",
        price : 12
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        price : 12
    })
    .expect(400)
});


it('it returns an error if invalid price is provided', async () =>{
    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({

        title : "new title",
        price : -112
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set("Cookie",global.signin())
    .send({
        title: " new tirler"
    })
    .expect(400)
});


it('create a ticket witjh valid input', async () =>{
     await request(app)
     .post('/api/tickets')
     .send({
         title: "titile",
         price: 20
     })
     .expect(201)
});