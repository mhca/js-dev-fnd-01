// crudTestSpec.js

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
 *
 * TEST 1. Verify that a new product is created successfully
 */
var newProductName = 'frisby01Product';
var newProduct = [{
        type: 'product',
        name: newProductName
    }];

frisby.create('Agilefant should create a new product successfully inside a backlog')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newProduct, {json: true})
    .expectStatus(201)
    .inspectJSON()
    .afterJSON(function(response){

        var productId = response[0].id;
        console.log('New product created', productId);

        frisby.create('get the new created product using the configuration provided')
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ productId +'?templates=Name')
            .expectStatus(200)
            .inspectJSON()
            .afterJSON(function(response){
                expect(response[0].name).toBe(newProductName);
            })
            .toss();

    })
    .toss();


/**
 *
 * TEST 2. Verify that a product can be deleted
 */
var productId = 145623;
frisby.create('Agilefant should delete a existent backlog')
    .delete('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + productId)
    .expectStatus(200)
    .toss();


/**
 *
 * TEST 3. Check that a new project can be created
 */
var newProject = [
    {
        "name": "myNewProjectName",
        "type": "project",
        "parent": {
            "type": "product",
            "id": 145615
        },
        "startDate": "2015-07-26T12:00:00.000Z",
        "endDate": "2015-08-09T22:00:00.000Z"
    }
];

frisby.create('Agilefant should create a new project successfully inside a backlog')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newProject, {json: true})
    .expectStatus(201)
    .afterJSON(function(response){
        var projectId = response[0].id;
        frisby.create('get the new created project using the configuration provided')
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ projectId +'?templates=Name')
            .expectStatus(200)
            .inspectJSON()
            .afterJSON(function(response){
                expect(response[0].name).toBe(newProject[0].name);
            })
            .toss();
    })
    .toss();


/**
 *
 * TEST 4. Check that a new team can be created successfully.
 */
var newTeam = [
    {
        "name": "Access team01",
        "users": [],
        "productAccess": [],
        "standaloneIterationAccess": [],
        "type": "team"
    }
];

frisby.create('Agilefant should create a new team with restricted access and no users')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/teams', newTeam, {json: true})
    .expectStatus(201)
    .afterJSON(function(response){
        var teamId = response[0].id;
        frisby.create('get the new team created according to id provided from previous response')
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Name')
            .expectStatus(200)
            .afterJSON(function(itemResponse){
                expect(itemResponse[0].name).toBe(newTeam[0].name);
            })
            .toss();
    })
    .toss();

/**
 *
 * TEST 5. Check that a new user can be created
 */
newUser = [
    {
        "type": "user",
        "fullName": "user002",
        "loginName": "qe.testing.qe@gmail.com",
        "name": "qe.testing.qe@gmail.com",
        "email": "qe.testing.qe@gmail.com",
        "initials": "myDisplayName",
        "admin": true,
        "teams": [],
        "defaultBacklog": null
    }
];

frisby.create('Agilefant should create a new user')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/users', newUser, {json: true})
    .expectStatus(201)
    .afterJSON(function(response){
        var userId = response[0].id;
        frisby.create('get the new user created according to id provided from previous response')
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/users/' + userId + '?templates=Summary')
            .expectStatus(200)
            .afterJSON(function(itemResponse){
                expect(itemResponse[0].fullName).toBe(newUser[0].fullName);
            })
            .toss();
    })
    .toss();


/**
 *
 * TEST 6. Verify that a team can be deleted
 */
var teamIdToDelete = 26417;
frisby.create('Agilefant should delete an existent team')
    .delete('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamIdToDelete)
    .expectStatus(200)
    .toss();


/**
 *
 * TEST 7. Check that a new standalone iteration is created successfully
 */
var newIteration = [
    {
        "name": "standalone - iteration - 00",
        "parent": null,
        "startDate": "2015-07-01T12:00:00.000Z",
        "endDate": "2015-08-08T22:00:00.000Z",
        "assignments": [],
        "description":null,
        "teams": [],
        "type": "iteration"
    }
];

frisby.create('Agilefant should create a new standalone successfully')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newIteration, {json: true})
    .expectStatus(201)
    .afterJSON(function(response){
        var projectId = response[0].id;
        frisby.create('get the new created standalone using the configuration provided')
            .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/'+ projectId +'?templates=Name')
            .expectStatus(200)
            .inspectJSON()
            .afterJSON(function(response){
                expect(response[0].name).toBe(newIteration[0].name);
            })
            .toss();
    })
    .toss();
