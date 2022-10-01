const request = require('supertest');
const app = require('../src/app');
const should = require('should');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

describe('POST /', ()=>{
    it('Should create an product', (done)=>{
        request(app)
            .post('/')
            .send({
                name: 'Produit 1',
                description: 'Une description',
                image: 'https://via.placeholder.com/150'
            })
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body[0]).not.have.properties(['_id']);
                done();
            });
    });

    it('Should return error if name is already exist', (done)=>{
        Product.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const product = response[0];
                request(app)
                    .post('/')
                    .send({
                        name: product.name,
                        description: 'Une description',
                        image: 'https://via.placeholder.com/150'
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
    it('Should return list of products', (done)=>{
        request(app)
            .get('/')
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).be.an.Array();
                done();
            });
    });
});

describe('GET /:productID', ()=>{
    it('Should return one product', (done)=>{
        Product.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const product = response[0];
                request(app)
                    .get(`/${product.id}`)
                    .end((err, res)=>{                       
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body.length).be.exactly(1);
                        should(res.body[0]).have.properties(['_id']);
                        done();
                    });
            });
        
    });

    it('Should return an 401 if product not exist', (done)=>{
        request(app)
            .get(`/${null}`)
            .end((err, res)=>{          
                should(res.status).be.exactly(401).and.be.a.Number();
                should(res.body[0]).not.have.properties(['_id']);
                done();
            });
        
    });
});

describe('PUT /:productID', ()=>{
    it('Should update an product', (done)=>{
        Product.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const product = response[0];
                request(app)
                    .put(`/${product._id}`)
                    .send({
                        name: 'Product 2',
                        description: 'Une description',
                        image: 'https://via.placeholder.com/150'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        done();
                    });
            });
    });

    it('Should return 401 if product not exist', (done)=>{
        Product.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const client = response[0];
                request(app)
                    .put(`/${null}`)
                    .send({
                        name: 'Product 2',
                        description: 'Une description',
                        image: 'https://via.placeholder.com/150'
                    })
                    .end((err, res)=>{
                        should(res.status).be.exactly(401).and.be.a.Number();
                        done();
                    });
            });
    });
    
});

describe('DELETE /:productID', ()=>{
    it('Should remove an product', (done)=>{
        Product.find({}).sort({_id: -1}).limit(1)
            .then((response)=>{
                const product = response[0];
                request(app)
                    .delete(`/${product._id}`)
                    .end((err, res)=>{
                        should(res.status).be.exactly(200).and.be.a.Number();
                        should(res.body._id).be.exactly(product.id);
                        done();
                    });
            });
    });

    it('Should return 401 if product not exist', (done)=>{
        request(app)
            .delete(`/${null}`)
            .end((err, res)=>{
                should(res.status).be.exactly(401).and.be.a.Number();
                done();
            });
    });
    
});