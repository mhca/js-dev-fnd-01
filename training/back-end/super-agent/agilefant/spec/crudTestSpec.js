/**
 * Created by Heimy on 8/2/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
var username = 'mhca';



describe('Backlog', function(){
    xit('should be created successfully', function(done){
        var newProduct = [{
            type: 'product',
            name: 'newProduct-superagent'
        }];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newProduct)
            .end(function(error, response){
                expect(response.statusCode).toBe(201);
                expect(response.body[0].name).toBe(newProduct.name);
                done();
            })
    });

    xit('should be deleted successfully', function(done){
        var productId = 146545;
        request
            .del('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + productId)
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(200);
                done();
            })

    });
});

describe('Project', function(){
    xit('should be created successfully', function(done){
        var newProject = [
            {
                "name": "myNewProjectNameeee",
                "type": "project",
                "parent": {
                    "type": "product",
                    "id": 146544
                },
                "startDate": "2015-07-26T12:00:00.000Z",
                "endDate": "2015-08-09T22:00:00.000Z"
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs')
            .set('Authorization', authorization)
            .send(newProject)
            .end(function(error, response){
                expect(response.statusCode).toBe(201);
                var projectId = response.body[0].id;

                request
                    .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ projectId +'?templates=Name')
                    .set('Authorization', authorization)
                    .end(function(error, response){
                        expect(response.statusCode).toBe(200);
                        expect(response.body[0].name).toBe(newProduct[0].name);
                        done();
                    });
            })
    })
});

describe('Team', function(){
    xit('should be created successfully', function(done){
        var newTeam = [
            {
                "name": "team01",
                "users": [],
                "productAccess": [],
                "standaloneIterationAccess": [],
                "type": "team"
            }
        ];

        request
            .post('https://cloud.agilefant.com/'+ username +'/api/v1/teams')
            .set('Authorization', authorization)
            .send(newTeam)
            .end(function(error, response){
                console.log('responseee', response.body[0]);

                expect(response.statusCode).toBe(201);
                var teamId = response.body[0].id;

                request
                    .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Name')
                    .set('Authorization', authorization)
                    .end(function(error, response){
                        expect(response.statusCode).toBe(200);
                        expect(response.body[0].name).toBe(newTeam[0].name);
                        done();
                    });
            })


    });

    it('should be deleted successfully', function(done){
        var teamIdToDelete = 26643;
        request
            .del('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamIdToDelete)
            .set('Authorization', authorization)
            .end(function(error, response){
                expect(response.statusCode).toBe(200);
                done();
            })

    });
});