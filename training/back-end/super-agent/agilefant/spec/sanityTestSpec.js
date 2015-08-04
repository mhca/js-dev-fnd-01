/**
 * Created by Heimy on 8/3/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';

describe('Data types of new product', function(){
    xit('should be created with correct type', function(done){
        var newProduct = [{
            type: 'product',
            name: 'newProduct-superagent111'
        }];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newProduct)
            .end(function(error, response){
                console.log('responseeee', response.body);
                expect(response.statusCode).toBe(201);
                expect(typeof response.body[0].type).toBe(typeof newProduct[0].type);
                done();
            })

    });
});

describe('the data types of an specific team', function(){
    it('should be displayed according expected data type', function(done){
        var teamId = 26419;

        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(200);
                expect(typeof response.body[0].type).toBe('string');
                expect(typeof response.body[0].name).toBe('string');
                done();
            })


    });
});