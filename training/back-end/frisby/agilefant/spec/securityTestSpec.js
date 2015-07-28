/**
 * Created by Heimy on 7/27/2015.
 */
// securityTestSpec.js

var frisby = require('frisby');
var username = 'mhca';
invalidUsername = 'abcd';

/**
 * TEST 1.
 */
frisby.create('Agilefant should return error when getting backlog items without auth...')
 .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
 .expectStatus(401)
 .expectJSON({
		errorMessage: "Unauthenticated user cannot access this resource!"
	})
 .inspectJSON()
 .toss();

/**
 * TEST 2.
 */
frisby.create('Agilefant should return the information according to request with valid auth...')
 .addHeader('Authorization', 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=')
 .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
 .expectStatus(200)
 .inspectJSON()
 .toss();

/**
 * TEST 3.
 */
frisby.create('Agilefant should return error when getting backlog items with invalid auth...')
 .addHeader('Authorization', 'Basic xxaGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=')
 .get('https://cloud.agilefant.com/' + username + '/api/v1/backlogs/all?templates=Name')
 .expectStatus(401)
 .expectJSON({
		errorMessage: "Unauthenticated user cannot access this resource!"
	})
 .inspectJSON()
 .toss();

/**
 * TEST 4.
 */
frisby.create('Agilefant should return an error message when a invalid user request data using valid auth...')
 .addHeader('Authorization', 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=')
 .get('https://cloud.agilefant.com/' + invalidUsername + '/api/v1/backlogs/all?templates=Name')
 .expectStatus(403)
 .inspectJSON()
 .expectJSON({
		errorMessage: "User does not have access to this organization"
	})
 .toss();

/**
 * TEST 5.
 */
frisby.create('Agilefant should return an error message when a invalid user request data without valid auth...')
    .get('https://cloud.agilefant.com/' + invalidUsername + '/api/v1/backlogs/all?templates=Name')
    .expectStatus(401)
    .inspectJSON()
    .expectJSON({
        errorMessage: "Unauthenticated user cannot access this resource!"
    })
    .toss();
