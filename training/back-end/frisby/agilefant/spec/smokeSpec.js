var frisby = require('frisby');
var username = 'mhca';

frisby.globalSetup({

    request: {
        headers:{
            'Authorization': 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ='
        }
    }
});

/**
 * TEST 1.
 */
frisby.create('Agilefant should get all backlogs')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/all?templates=Name')
    .expectStatus(200)
    .toss();

/**
 *
 * TEST 2.
 */
var backlogId = 143747;
frisby.create('Agilefant should get a backlog item according to provided item')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ backlogId +'?templates=Name')
    .expectStatus(200)
    .inspectJSON()
    .afterJSON(function(response){
        console.log('arguments.length', arguments.length);
        frisby.create('Agilefant should display a item with the same id provided')
        expect(response[0].id).toBe(backlogId);
    })
    .toss();

/**
 * TEST 3.
 */
 frisby.create('Agilefant should list all Teams')
 .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/all?templates=Summary')
 .expectStatus(200)
 .inspectJSON()
 .toss();

/**
 *
 * TEST 4.
 */
var teamId = 25941;
frisby.create('Agilefant should get a team item according to id provided')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Summary')
    .expectStatus(200)
    .inspectJSON()
    .afterJSON(function(response){
        console.log('response id', response[0].id);
        frisby.create('Agilefant should display the crresponding team according to id provided')
        expect(response[0].id).toBe(teamId);

    })
    .toss();

/**
 * TEST 5.
 */
frisby.create('Agilefant should get all users')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/users/all?templates=Summary')
    .inspectJSON()
    .toss();

