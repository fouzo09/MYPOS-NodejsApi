const request = require('supertest');
const app = require('../src/app');
const should = require('should');
const mongoose = require('mongoose');
const Client = require('../src/models/Client');
require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

describe('POST /', ()=>{
    it('Should create an client', (done)=>{
        request(app)
            .post('/')
            .send({
                fullName: 'client1',
                telephone: '666000001',
                adresse: 'Kountya'
            })
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body[0]).not.have.properties(['_id']);
                done();
            });
    });

    it('Should return error if telephone is already exist', (done)=>{
        Client.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .post('/')
                    .send({
                        fullName: 'client2',
                        telephone: client.telephone,
                        adresse: 'Kountya'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        should(res.body[0]).not.have.properties(['_id']);
                        done();
                    });
            });
    });
});

describe('GET /', ()=>{
    it('Should return list of client', (done)=>{
        request(app)
            .get('/')
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).be.an.Array();
                done();
            });
    });
});

describe('GET /:clientID', ()=>{
    it('Should return one client', (done)=>{
        Client.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .get(`/${client.id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.length).be.exactly(1);
                        should(res.body[0]).have.properties(['_id']);
                        done();
                    });
            });
        
    });

    it('Should return an 401 if category not exist', (done)=>{
        request(app)
            .get(`/${null}`)
            .end((err, res)=>{           
                should(res.status).be.exactly(401).and.be.a.Number();
                should(res.body.length).be.exactly(undefined)
                should(res.body[0]).not.have.properties(['_id']);
                done();
            });
        
    });
});

describe('PUT /:clientID', ()=>{
    it('Should update an client', (done)=>{
        Client.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .put(`/${client._id}`)
                    .send({
                        fullName: 'client1',
                        telephone: '666000002',
                        adresse: 'Kountya'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.modifiedCount).be.exactly(1);
                        done();
                    });
            });
    });

    it('Should return 401 if client not exist', (done)=>{
        Client.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .put(`/${null}`)
                    .send({
                        fullName: 'client1',
                        telephone: '666000001',
                        adresse: 'Kountya'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        done();
                    });
            });
    });
    
});

describe('DELETE /:clientID', ()=>{
    it('Should remove an client', (done)=>{
        Client.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .delete(`/${client._id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body._id).be.exactly(client.id);
                        done();
                    });
            });
    });

    it('Should return 401 if client not exist', (done)=>{
        request(app)
            .delete(`/${null}`)
            .end((err, res)=>{
                should(res.status).be.exactly(401).and.be.a.Number();
                done();
            });
});
    
});