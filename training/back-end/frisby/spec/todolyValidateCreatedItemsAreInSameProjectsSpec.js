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
    "Content": "myProject01"
};


frisby.create('Todo.ly should create a new project: ')
    .post('https://todo.ly/api/projects.json', newProject)
    .expectStatus(200)
    .expectJSON(newProject)
    .inspectJSON()
    .afterJSON(function(jsonResponse){

        var newProjectItem = {
            "Content": "my Item",
            "ProjectId": jsonResponse.Id
        };

        frisby.create('Todo.ly should create a new project item')
            .post('https://todo.ly/api/items.json',newProjectItem)
            .expectStatus(200)
            .expectJSON(newProjectItem)
            .toss();
    })
    .toss();
