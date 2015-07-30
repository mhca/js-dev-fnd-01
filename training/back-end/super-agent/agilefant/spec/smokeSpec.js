/**
 * Created by Heimy on 7/29/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';

describe('backlogs', function(){
    xit('should be listed', function(done){
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/all?templates=Name')
            .set('Authorization',authorization)
            .end(function(error, response){
                console.log('Response status code: ' + response.statusCode );
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    xit('should display a backlog item according to provided id', function(done){
        var backlogId = 143747;
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ backlogId +'?templates=Name')
            .set('Authorization',authorization)
            .end(function(error, response){
                console.log('Response status code: ' + response.body[0].id);
                expect(response.statusCode).toBe(200);
                expect(response.body[0].id).toBe(backlogId);
                done();
            })
    });

});

describe('Teams', function(){
    xit('should be listed', function(done){
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/all?templates=Summary')
            .set('Authorization',authorization)
            .end(function(error, response){
                console.log('Response status code: ' + response.statusCode );
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    it('should display a team item according to provided id', function(done){
        var teamId = 26419;
        request
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Summary')
            .set('Authorization',authorization)
            .end(function(error, response){
                console.log('Response status code: ' + response.body[0].id);
                expect(response.statusCode).toBe(200);
                expect(response.body[0].id).toBe(teamId);
                done();
            })
    });
});