const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
});

const newUser = {
        email: 'mafouzdiallo@gmail.com',
        firstName: 'Mafouz',
        lastName: 'DIALLO',
        phone: '654181401',
        password: '123456'
    };

describe('Users register', ()=>{
    
    it('Return 200 OK when user signup', (done)=>{
         request(app).post('/api/1.0/register')
                .send(newUser).then((response)=>{
                    expect(response.status).toBe(200);
                    done();
                });
    });

    it('Return ID property when user signup', (done)=>{
        request(app).post('/api/1.0/register')
               .send(newUser).then((response)=>{
                   expect(response.body).toHaveProperty('_id');
                   done();
               });
   });

    it('Password must be different when user signup', (done)=>{
        request(app).post('/api/1.0/register')
               .send(newUser).then((response)=>{
                   expect(response.body.password).not.toBe(newUser.password);
                   done();
               });
   });
});