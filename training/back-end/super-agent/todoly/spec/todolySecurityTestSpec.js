/**
 * Created by Heimy on 7/31/2015.
 */
var request = require('superagent');
//var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206Q29udHJvbDEh';
var TokenAuthorization = 'Token 798f0da59c2b4ab8a109e21cf9de6371'
describe('projects', function(){
    xit('should be listed',function(done){
        request
            .get('https://todo.ly/api/projects.json')
            .set('Authorization', TokenAuthorization)
            .end(function(error, response){
                console.log('Response lenght: ' + response.body.length );
                expect(response.statusCode).toBe(200);
                done();

            })
    });
});


