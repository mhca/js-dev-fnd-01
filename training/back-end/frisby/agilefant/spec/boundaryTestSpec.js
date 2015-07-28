// boundaryTestSpec.js

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
 * TEST 1. Check that a new standalone iteration is not created with a invalid startDate
 */

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

frisby.create('Agilefant should not create a new standalone')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newIteration01, {json: true})
    .expectStatus(403)
    .expectJSON({
        errorMessage: 'Iteration start date can not be before 1900-01-01T01:01:00.000Z'
    })
    .toss();

/**
 *
 * TEST 2. Check that a new standalone iteration is not created with a invalid endDate
 */
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

frisby.create('Agilefant should not create a new standalone with invalid end date')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newIteration02, {json: true})
    .expectStatus(403)
    .expectJSON({
        errorMessage: 'Iteration start date can not be after end date!'
    })
    .toss();


/***
 *
 * TEST 3. Check a new user with a invalid email should not be created
 */
newUser = [
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

frisby.create('Agilefant should not create a new user with a invalid email')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/users', newUser, {json: true})
    .expectStatus(500)
    .expectJSON({
        errorMessage: 'There was an error processing the request, please try again later. Exception: javax.validation.ConstraintViolationException: Validation failed for classes [fi.hut.soberit.agilefant.model.User] during persist time for groups [javax.validation.groups.Default, ]\nList of constraint violations:[\n\tConstraintViolationImpl{interpolatedMessage=\'is not a proper email address\', propertyPath=email, rootBeanClass=class fi.hut.soberit.agilefant.model.User, messageTemplate=\'is not a proper email address\'}\n]'
    })
    .toss();

/**
 *
 * TEST 4. Check a new user with a invalid loginName should not be created
 */
newUser = [
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

frisby.create('Agilefant should not create a new user with a invalid loginName')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/users', newUser, {json: true})
    .expectStatus(500)
    .expectJSON({
        errorMessage: 'There was an error processing the request, please try again later. Exception: org.hibernate.exception.ConstraintViolationException: could not execute statement'
    })
    .toss();

/**
 *
 * TEST 5. Check that a new project is not created with a invalid startDate
 */

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

frisby.create('Agilefant should not create a new standalone')
    .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newProject, {json: true})
    .expectStatus(403)
    .expectJSON({
        errorMessage: 'Project start date can not be before 1900-01-01T01:01:00.000Z'
    })
    .toss();
