import  request  from 'supertest';
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose  from 'mongoose';
import {app} from '../app';
import jwt from 'jsonwebtoken';



let mongo:any 

declare global {
    namespace NodeJS {
        interface Global{
            signin():string[];
        }
    }
}

jest.mock('../nats-wrapper');

beforeAll(async ()=>{
    process.env.JWT_KEY = "asdf";
    mongo  = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
})

beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
})

afterAll(async () =>{
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = () =>{
  //build jwt paylaod {id,email}
  const payload = {
      id: "sd23e4q3wkjd",
      email : "test@test.com"
  };

  const token = jwt.sign(payload,  process.env.JWT_KEY!);

  const session = {jwt:token};

  const sessionJSON = JSON.stringify(session);

  const base64  = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`]
  
}