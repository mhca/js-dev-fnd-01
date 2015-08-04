// googleSpec.js

var frisby = require('frisby');


frisby.create('Verify google main page returns 200 satus code')
	.get('http://www.google.com')
	.expectStatus(200)
	.inspectBody()
.toss();