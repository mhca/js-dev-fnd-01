//negativeTestSpec.js

var frisby = require('frisby');
var username = 'mhca';
var invalidBacklogId = 1234;
var invalidTemplateValue = 'invalidTemplate';

frisby.globalSetup({

    request: {
        headers:{
            'Authorization': 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ='
        }
    }
});

/**
 * TEST 1. Verify that a new product cannot be created if type property is not provided
 */
 var newProductName = 'frisby01Product';
 var newProduct = [
    {
        "name":	newProductName
    }
 ];


 frisby.create('Agilefant should not create a new product if the json configuration doesnt contains type')
 .post('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs', newProduct, {json: true})
 .expectStatus(400)
 // This verification was omitted because for each execution , the error message has own values in ByteArrayInputStream@7512148; line: 4, column: 3
 //.expectJSON({
	//	"errorMessage": "Unable to deserialize JSON payload, details: Unexpected token (END_OBJECT), expected FIELD_NAME: missing property 'type' that is to contain type id  (for class Backlog)\n at [Source: java.io.ByteArrayInputStream@7512148; line: 4, column: 3]"
	//})
 .inspectJSON()
 .toss();

/**
 *
 * TEST 2. Verify that an error message is displayed when a product with an invalid id is deleted
 */
 var invalidProductId = 1234;

 frisby.create('Agilefant should not delete a product with an invalid id')
 .delete('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + invalidProductId)
 .expectStatus(403)
 .inspectJSON()
 .expectJSON({
		errorMessage: 'User has no access to object of type Backlog with id ' + invalidProductId
	})
 .toss();

/**
 * TEST 3. Check that an error message is displayed when trying to retrieve a product with an invalid id
 */
frisby.create('Agilefant should not display any information of a backlog with an invalid id')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + invalidBacklogId+'?templates=Name')
    .expectStatus(403)
    .inspectJSON()
    .expectJSON({
        errorMessage: 'User has no access to object of type Backlog with id ' + invalidBacklogId
    })
    .toss();

/**
 * TEST 4. Check that an error message should display when trying to retrieve all teams using a invalid template
 */
frisby.create('Agilefant should not display any team information when the template value is invalid')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/all?templates=' + invalidTemplateValue)
    .expectStatus(400)
    .inspectJSON()
    .expectJSON({
        errorMessage: 'Type mismatch: Cannot convert "' + invalidTemplateValue + '" to TeamTemplate'
    })
    .toss();

/**
 *
 * TEST 5. Check that an error message is displayed when trying to get teams using an invalid user
 */
var invalidUserId = 1111;
frisby.create('Agilefant should display an error message when trying to get teams using an invalid user')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/users/' + invalidUserId +'/teams?templates=Name')
    .expectStatus(403)
    .inspectJSON()
    .expectJSON({
        errorMessage: 'User has no access to object of type User with id ' + invalidUserId
    })
    .toss();


/**
 *
 * Check that an error message is displayed when trying to get an story information using an invalid id
 */
var invalidStoryId = 1111;
frisby.create('Agilefant should display an error message when trying to get an story information using an invalid id')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/stories/' + invalidStoryId +'?templates=Name')
    .expectStatus(404)
    .inspectJSON()
    .expectJSON({
        errorMessage: 'Story with id: '+ invalidStoryId +' was not found!'
    })
    .toss();
