const request = require('supertest');
const app = require('../src/app');
const should = require('should');
const mongoose = require('mongoose');
const Sale = require('../src/models/Sale');
require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

describe('POST /', ()=>{
    it('Should create an sale', (done)=>{
        request(app)
            .post('/')
            .send({
                customer:{
                    "fullname": "Mafouz DIALLO"
                },
                products:{
                    "1": {
                        "name": "p1" 
                    },
                    "2":{
                        "name": "p1" 
                    }
                },
                montantHorsTaxe: 1000,
                montantToutTaxeConfondu: 1000
            })
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).have.properties(['_id']);
                done();
            });
    });

    it('Should return 401 if a property of property is empty', (done)=>{
        request(app)
            .post('/')
            .send({
                products:{
                    "1": {
                        "name": "p1" 
                    },
                    "2":{
                        "name": "p1" 
                    }
                },
                montantHorsTaxe: 1000,
                montantToutTaxeConfondu: 1000
            })
            .end((err, res)=>{
                should(res.status).be.exactly(401).and.be.a.Number();
                should(res.body[0]).not.have.properties(['_id']);
                done();
            });
    });
});

describe('GET /', ()=>{
    it('Should return list of sales', (done)=>{
        request(app)
            .get('/')
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).be.an.Array();
                done();
            });
    });
});

describe('GET /:saleID', ()=>{
    it('Should return one sale', (done)=>{
        Sale.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const sale = response[0];
                request(app)
                    .get(`/${sale._id}`)
                    .end((err, res)=>{
                        
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.length).be.exactly(1);
                        should(res.body[0]).have.properties(['_id']);
                        done();
                    });
            });
        
    });
});


describe('DELETE /:saleID', ()=>{
    it('Should remove an sale', (done)=>{
        Sale.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const sale = response[0];
                request(app)
                    .delete(`/${sale._id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body._id).be.exactly(sale.id);
                        done();
                    });
            });
    });

    it('Should return 401 if category not exist', (done)=>{
        Sale.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const sale = response[0];
                request(app)
                    .delete(`/${null}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        done();
                    });
            });
    });
    
});