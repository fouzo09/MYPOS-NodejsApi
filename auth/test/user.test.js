const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const should = require('should');

require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

const newUser = {
        email: 'mafouzdiallo@gmail.com',
        firstName: 'Mafouz',
        lastName: 'DIALLO',
        phone: '654181401',
        password: '123456'
    };

const credentials = {
        email: 'mafouzdiallo@gmail.com',
        password: '123456'
    };

describe('POST /register', ()=>{
    
    it('Should return 200 when user signup', (done)=>{
         request(app)
            .post('/register')
            .send(newUser)
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                done();
            });
    });

    it('Should return an ID property when user signup', (done)=>{
        request(app)
            .post('/register')
            .send(newUser)
            .end((err, res)=>{
                should(res.body).have.properties(['_id']);
                done();
            });
   });

    it('Password must be different when user signup', (done)=>{
        request(app)
            .post('/register')
            .send(newUser)
            .end((err, res)=>{
                should(res.body.password).not.be.exactly(newUser.password);
                done();
            });
   });
});

describe('POST /login', ()=>{
    
    it('Should 200 OK when user login is succefull', (done)=>{
        request(app)
            .post('/auth')
            .send(credentials)
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                done();
            });
    });
});


