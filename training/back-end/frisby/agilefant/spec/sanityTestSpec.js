/**
 * Created by Heimy on 7/27/2015.
 */

var frisby = require('frisby');
var username = 'mhca';

frisby.globalSetup({

    request: {
        headers:{
            'Authorization': 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ='
            //'Content-Type': 'application/json'
        }
    }
});

/**
 *
 * TEST 1. Verify that the data types of new product are created with correct type.
 */
var newProductName = 'SanityProduct';
var newProduct = [{
    type: 'product',
    name: newProductName
}];

frisby.create('Agilefant should should return specific product item')
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
            .expectJSONTypes([
                {
                    type: String,
                    id: Number,
                    name: String
                }]
        )
            .toss();

    })
    .toss();

/**
 *
 * TEST 2. Check that the data types of an specific team are displayed according expected data type
 */
var teamId = 26419;
frisby.create('Agilefant should get a team item according to id provided')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/teams/' + teamId + '?templates=Name')
    .expectStatus(200)
    .inspectJSON()
    .expectJSONTypes([
        {
            type: String,
            id: Number,
            name: String
        }]
    )
    .toss();

/**
 *
 * TEST 3. Check an error message when trying to retrieve backlog information using an invalid id
 */
var invalidBacklogId = 1234;
frisby.create('Agilefant should display an error message when trying to retrieve backlog information using an invalid id')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/backlogs/' + invalidBacklogId+'?templates=Name')
    .expectStatus(403)
    .inspectJSON()
    .expectJSONTypes({
        errorMessage: String
    })
    .toss();

/**
 *
 * TEST 4. Verify that a new product cannot be created if name product is not provided
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
 .expectJSONTypes({
		"errorMessage": String
	})
 .inspectJSON()
 .toss();


/**
 * TEST 5. Check that an error message is displayed when trying to get teams using an invalid user
 */
var invalidUserId = 1111;
frisby.create('Agilefant should display an error message when trying to get teams using an invalid user')
    .get('https://cloud.agilefant.com/'+ username +'/api/v1/users/' + invalidUserId +'/teams?templates=Name')
    .expectStatus(403)
    .inspectJSON()
    .expectJSONTypes({
        errorMessage: String
    })
    .toss();
