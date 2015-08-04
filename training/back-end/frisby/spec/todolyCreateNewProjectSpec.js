var frisby = require('frisby');
frisby.globalSetup({
    request:{
        headers:{
            'Authorization':'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206Q29udHJvbDEh'
        },
        //proxy: 'http://172.20.240.5:8080',
        json: true
    }
});

var newProject = {
    "Content": "myProjectHome01",
    "Icon": 4
};

frisby.create('Todo.ly should return error when getting projects ')
    .post('https://todo.ly/api/projects.json', newProject)
    .expectStatus(200)
    .expectHeaderContains( "Content-Type", "application/json" )
    .inspectJSON()
    .toss();