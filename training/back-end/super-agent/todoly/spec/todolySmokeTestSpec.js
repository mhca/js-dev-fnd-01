/**
 * Created by Heimy on 7/31/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206Q29udHJvbDEh';

describe('projects', function(){
    xit('should be listed',function(done){
        request
            .get('https://todo.ly/api/projects.json')
            .set('Authorization', authorization)
            .end(function(error, response){
                console.log('Response lenght: ' + response.body.length );
                expect(response.statusCode).toBe(200);
                done();

            })
    });
});

