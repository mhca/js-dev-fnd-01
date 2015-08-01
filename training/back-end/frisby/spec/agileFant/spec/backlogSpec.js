/**
 * Created by Heimy on 7/26/2015.
 */
var frisby = require('frisby');

frisby.globalSetup({

    request: {
        headers:{
            'Authorization': 'Authorization: Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ='
        },
        json:true
    }
});

frisby.create('Agilefant should get all backlogs')
    .get('https://cloud.agilefant.com/mhca/api/v1/backlogs/all?templates=Name')
    .expectStatus(200)
    .toss();
