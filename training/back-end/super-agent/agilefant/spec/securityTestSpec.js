/**
 * Created by Heimy on 8/3/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var invalidAuthorization = 'Basic invalidAuthorizationbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';
invalidUsername = 'abcd';


describe('Agilefant', function(){
    xit('should return error when getting backlog items without auth...', function(done){

        request
            .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
            .end(function(error, response){
                console.log('Response status code: ' + response.statusCode );
                expect(response.statusCode).toBe(401);
                expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
                done();
            })

    });


    xit('should return the information according to request with valid auth...', function(done){

        request
            .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(200);
                done();
            })
   });


    xit('should return error when getting backlog items with invalid auth...', function(done){

        request
            .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
            .set('Authorization', invalidAuthorization)
            .end(function(error, response){
                console.log('Response status code: ' + response.statusCode );
                expect(response.statusCode).toBe(401);
                expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
                done();
            })
   });

    xit('should return an error message when a invalid user request data using valid auth...', function(done){

        request
            .get('https://cloud.agilefant.com/' + invalidUsername + '/api/v1/backlogs/all?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('User does not have access to this organization');
                done();
            })

    });


    it('should return an error message when a invalid user request data without valid auth...', function(done){

        request
            .get('https://cloud.agilefant.com/' + invalidUsername + '/api/v1/backlogs/all?templates=Name')
            .end(function(error, response){
                expect(response.statusCode).toBe(401);
                expect(response.body.errorMessage).toBe('Unauthenticated user cannot access this resource!');
                done();
            })

    });


});
