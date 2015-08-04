/**
 * Created by Heimy on 8/3/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';

describe('A backlog with invalid ID', function(){
    xit('should display a proper error message when trying to delete it', function(done){
        var invalidProductId = 1234;
        request
            .del('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + invalidProductId)
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('User has no access to object of type Backlog with id ' + invalidProductId);
                done();
            })
    });

    xit('should display a proper error message when trying to retrieve information from it', function(done){
        var invalidBacklogId = 1234;
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + invalidBacklogId+'?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('User has no access to object of type Backlog with id ' + invalidBacklogId);
                done();
            })
    });

});

describe('Teams', function(){
    xit('should not retrieve any information when using an invalid template value', function(done){
        var invalidTemplateValue = 'invalidTemplateValue';
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/all?templates=' + invalidTemplateValue)
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(400);
                expect(response.body.errorMessage).toBe('Type mismatch: Cannot convert "' + invalidTemplateValue + '" to TeamTemplate');
                done();
            })
    });

    xit('should not retrieve any information when using an invalid user', function(done){
        var invalidUserId = 1111;
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/users/' + invalidUserId +'/teams?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('User has no access to object of type User with id ' + invalidUserId);
                done();
            })
    });

});


describe('Story information', function(){
    it('should not retrieve any information when using an invalid id', function(done){
        var invalidStoryId = 2222;
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/stories/' + invalidStoryId +'?templates=Name')
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('User has no access to object of type Story with id '+ invalidStoryId);
                done();
            })
    });
});


