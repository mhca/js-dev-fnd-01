/**
 * Created by Heimy on 8/2/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';

describe('An standalone iteration', function(){
    xit('should not be created with a invalid startDate', function(done){
        var newIteration01 = [
            {
                "name": "standalone - iteration - 00",
                "parent": null,
                "startDate": "1111-07-01T12:00:00.000Z",
                "endDate": "2015-08-08T22:00:00.000Z",
                "assignments": [],
                "description":null,
                "teams": [],
                "type": "iteration"
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newIteration01)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('Iteration start date can not be before 1900-01-01T01:01:00.000Z');
                done();
            })
    });

    xit('should not be created with a invalid endDate', function(done){
        var newIteration02 = [
            {
                "name": "standalone - iteration - 00",
                "parent": null,
                "startDate": "2015-07-01T12:00:00.000Z",
                "endDate": "1111-08-08T22:00:00.000Z",
                "assignments": [],
                "description":null,
                "teams": [],
                "type": "iteration"
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newIteration02)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('Iteration start date can not be after end date!');
                done();
            })
    });

});

describe('An user', function(){
    xit('should not be created with an invalid email', function(done){
        var newUser = [
            {
                "type": "user",
                "fullName": "user002",
                "loginName": "qe.testing.qe@gmail.com",
                "name": "qe.testing.qe@gmail.com",
                "email": "qe.testing.qe",
                "initials": "myDisplayName",
                "admin": true,
                "teams": [],
                "defaultBacklog": null
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/users')
            .set('Authorization', authorization)
            .send(newUser)
            .end(function(error, response){
                expect(response.statusCode).toBe(500);
                expect(response.body.errorMessage).toBe('There was an error processing the request, please try again later. Exception: javax.validation.ConstraintViolationException: Validation failed for classes [fi.hut.soberit.agilefant.model.User] during persist time for groups [javax.validation.groups.Default, ]\nList of constraint violations:[\n\tConstraintViolationImpl{interpolatedMessage=\'is not a proper email address\', propertyPath=email, rootBeanClass=class fi.hut.soberit.agilefant.model.User, messageTemplate=\'is not a proper email address\'}\n]');
                done();
            })

    });

    xit('should not be created with an invalid loginName', function(done){
        var newUser = [
            {
                "type": "user",
                "fullName": "user002",
                "loginName": "qe.testing",
                "name": "qe.testing.qe@gmail.com",
                "email": "qe.testing.qe@gmail.com",
                "initials": "myDisplayName",
                "admin": true,
                "teams": [],
                "defaultBacklog": null
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/users')
            .set('Authorization', authorization)
            .send(newUser)
            .end(function(error, response){
                expect(response.statusCode).toBe(500);
                expect(response.body.errorMessage).toBe('There was an error processing the request, please try again later. Exception: org.hibernate.exception.ConstraintViolationException: could not execute statement');
                done();
            })

    });

});

describe('A Project', function(){

    it('should not be created with an invalid startDate', function(done){
        var newProject = [
            {
                "name": "project - wrong date",
                "parent": {
                    "type": "product",
                    "id": 143747
                },
                "startDate": "1111-07-27T12:00:00.000Z",
                "endDate": "2015-08-10T22:00:00.000Z",
                "assignments": [],
                "description": null,
                "type": "project"
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newProject)
            .end(function(error, response){
                expect(response.statusCode).toBe(403);
                expect(response.body.errorMessage).toBe('Project start date can not be before 1900-01-01T01:01:00.000Z');
                done();
            })



    });
});
