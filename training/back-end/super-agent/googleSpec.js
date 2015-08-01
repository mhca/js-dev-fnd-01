/**
 * Created by Heimy on 7/29/2015.
 */
var request = require('superagent');

request
    .get('http://google.com')
    .end(function(error, response){
        console.log('status code', arguments.length);
        console.log('error', error);
        console.log('response', response.statusCode);
    });