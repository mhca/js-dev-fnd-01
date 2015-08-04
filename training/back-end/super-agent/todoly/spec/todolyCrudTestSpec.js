/**
 * Created by Heimy on 7/31/2015.
 */
var request = require('superagent');
var authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206Q29udHJvbDEh';

describe('projects', function(){
    xit('should create a new project', function(done){

        newProject = {
            "Content": "project-superagent001"
        };

        request
            .post('https://todo.ly/api/projects.json')
            .set('Authorization', authorization)
            .send(newProject)
            .end(function(error, response){
                console.log('Response status code: ' + response.statusCode );
                expect(response.statusCode).toBe(200);
                expect(response.body.Content).toBe(newProject.Content);
                done();

            })

    });

    xit('should update a project', function(done){
        updatedProject = {
            "Content": "project-superagent001Updateddd"
        };
        request
            .post('https://todo.ly/api/projects/3462450.json')
            .set('Authorization', authorization)
            .send(updatedProject)
            .end(function(error, response){
                console.log('new content', response.body.Content);
                expect(response.body.Content).toBe(updatedProject.Content);
                done();
            })

    });
});

describe('items', function(){
    it('should be created for a specific project', function(done){
        var itemsAmount = 5;
        var prefix = "myNewItem11";
        for( var j = 0; j <= itemsAmount; j++ ){
            newItem =  {
                "ProjectId": 3458821,
                "Content": prefix + j
            };


            request
                .post('https://todo.ly/api/items.json')
                .set('Authorization', authorization)
                .send(newItem)
                .end(function(error, response){
                    console.log('Item No.' + j + ': ...', response.body);
                    //expect(response.body.Content).toBe(newItem.Content);

                    var itemId = response.body.Id;

                    console.log('itemId:....  ' , itemId);
                    updatedItem = {
                            "Checked": true
                        };

                        request
                            .post('https://todo.ly/api/items/'+ itemId +'.json')
                            .set('Authorization', authorization)
                            .send(updatedItem)
                            .end(function(error, response){
                                console.log('nested verification:   ', response.body);
                                expect(response.body.Checked).toBe(updatedItem.Checked);
                                request
                                    .get('https://todo.ly/api/projects/'+ newItem.ProjectId +'/doneitems.json')
                                    .set('Authorization', authorization)
                                    .end(function(error, response){
                                        expect(response.body.length).toBeGreaterThan(0);
                                        console.log('response lenght', response.body.length);

                                        var items = response.body;
                                        var isTheNewItemDone = false;
                                        for(var i = 0 ; i < items.length; i ++){
                                            if(items[i].Content == prefix + i){
                                                isTheNewItemDone = true;
                                                break;
                                            }
                                        }
                                        console.log('isTheNewItemDone.....', prefix + i, isTheNewItemDone);
                                        expect(isTheNewItemDone).toBeTruthy();
                                        done();
                                    });
                                //done();
                            });
                    //done();

                })
        } // end - for

    });
});

