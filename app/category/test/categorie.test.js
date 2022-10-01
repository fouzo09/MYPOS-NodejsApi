const request = require('supertest');
const app = require('../src/app');
const should = require('should');
const mongoose = require('mongoose');
const Categorie = require('../src/models/Categorie');
require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

describe('POST /', ()=>{
    it('Should create an categorie', (done)=>{
        request(app)
            .post('/')
            .send({
                name: 'teste1',
            })
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body[0]).not.have.properties(['_id', 'name', 'date']);
                done();
            });
    });

    it('Should return error if name is already exist', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .post('/')
                    .send({
                        name: categorie.name,
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        should(res.body[0]).not.have.properties(['_id', 'name', 'date']);
                        done();
                    });
            });
    });
});

describe('GET /', ()=>{
    it('Should return list of categories', (done)=>{
        request(app)
            .get('/')
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).be.an.Array();
                done();
            });
    });
});

describe('GET /:categorieID', ()=>{
    it('Should return one category', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .get(`/${categorie.id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.length).be.exactly(1);
                        should(res.body[0]).have.properties(['_id', 'name', 'date']);
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
                should(res.body[0]).not.have.properties(['_id', 'name', 'date']);
                done();
            });
        
    });
});

describe('PUT /:categorieID', ()=>{
    it('Should update an category', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .put(`/${categorie._id}`)
                    .send({
                        name: 'update-teste1'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.modifiedCount).be.exactly(1);
                        done();
                    });
            });
    });

    it('Should return 401 if category not exist', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .put(`/${null}`)
                    .send({
                        name: 'update-teste2'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        done();
                    });
            });
    });
    
});

describe('DELETE /:categorieID', ()=>{
    it('Should remove an category', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .delete(`/${categorie._id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body._id).be.exactly(categorie.id);
                        done();
                    });
            });
    });

    it('Should return 401 if category not exist', (done)=>{
        Categorie.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const categorie = response[0];
                request(app)
                    .delete(`/${null}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        done();
                    });
            });
    });
    
});