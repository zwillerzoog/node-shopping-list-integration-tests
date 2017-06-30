const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

//get should list items
//should create items on post
//should update items on put
//should delete items on delete
describe('Recipes', function(){
    before(function(){
        return runServer();
    });
    after(function(){
        return closeServer();
    });
    it('should list items on GET', function(){
        return chai.request(app)
            .get('/recipes')
            .then(function(res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                const expectedKeys = ['id', 'name', 'ingredients'];
                res.body.forEach(function(item){
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });
});
