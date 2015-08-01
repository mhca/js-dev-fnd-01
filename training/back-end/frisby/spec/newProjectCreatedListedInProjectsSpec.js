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
    .afterJSON(function(){

        var secondProject = {
            "Content": "myProject02"
        };


        frisby.create('Todo.ly should create a new project: ')
            .post('https://todo.ly/api/projects.json', secondProject)
            .expectStatus(200)
            .expectJSON(secondProject)
            .afterJSON(function(jsonResponse){

                frisby.create('Todo.ly should list all projects: ')
                    .get('https://todo.ly/api/projects.json')
                    .expectStatus(200)
                    .expectJSON('?', {
                        "Content": jsonResponse.Content,
                        "Id": jsonResponse.Id
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
