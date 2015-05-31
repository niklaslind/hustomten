var frisby = require('frisby');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


//---------------- DROP and CREATE collection ------------------------

frisby.create('POST http://127.0.0.1:3000/api/testissue')
    .post('http://127.0.0.1:3000/api/testissue')
    .expectStatus(200)
    .toss();

frisby.create('POST http://127.0.0.1:3000/api/testissue')
    .delete('http://127.0.0.1:3000/api/testissue')
    .expectStatus(200)
    .toss();


//----------------------------------------


//---------------- POST - GET - PUT - DELETE issue-json ---------------

var testId="556b4cf89967f5b655ca2331"


frisby.create('POST /api/issue')
    .post('http://127.0.0.1:3000/api/testissue',
          {"_id":ObjectID(testId),"text":"aText"}
         )
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();


frisby.create('GET Issue after POST')
    .get('http://127.0.0.1:3000/api/testissue/'+testId)
    .expectStatus(200)
    .expectJSON({"_id":testId,"text":"aText"})
    .toss();


frisby.create('PUT /api/issue')
    .put('http://127.0.0.1:3000/api/testissue/'+testId,
          {"text":"anotherText"}
         )
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();


frisby.create('GET Issue after PUT')
    .get('http://127.0.0.1:3000/api/testissue/'+testId)
    .expectStatus(200)
    .expectJSON({"_id":testId,"text":"anotherText"})
    .toss();


frisby.create('DELETE')
    .delete('http://127.0.0.1:3000/api/testissue/'+testId)
    .expectStatus(200)
    .toss();

frisby.create('GET Issue after DELETE')
    .get('http://127.0.0.1:3000/api/testissue/'+testId)
    .expectStatus(404)
    .toss();


//----------------------------------------

//--------------- Multiple POST -------------------------

var POST = function() {
frisby.create('POST /api/issue')
    .post('http://127.0.0.1:3000/api/testissue',
          {"text":"aText"}
         )
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();
}

var GET = function(count) {
frisby.create('GET Issue after POST: '+count)
    .get('http://127.0.0.1:3000/api/testissue')
    .expectStatus(200)
        .expectJSONLength(count)
    .toss();

}


POST()
GET(1)

POST()
GET(2)

POST()
GET(3)


//----------------------------------------





/*
//-----------  CLEANUP TEST DATA -----
frisby.create('Cleanup, not a test')
.put('http://127.0.0.1:3000/api/issue')
.toss();


frisby.create('Cleanup, not a test')
.delete('http://127.0.0.1:3000/api/issue/4711')
.inspectJSON()
.toss();


frisby.create('Check that article is deleted before tests')
.get('http://127.0.0.1:3000/api/issue/4711')
.expectStatus(404)
.toss();

//-----------------------------------



frisby.create('POST http://127.0.0.1:3000/api/issue')
.post('http://127.0.0.1:3000/api/issue',
{"_id":"4711","text":"aText"}
)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.toss();


frisby.create('GET Issues after POST')
.get('http://127.0.0.1:3000/api/issue/4711')
.expectStatus(200)
.expectJSON({"_id":"4711","text":"aText"})
.toss();


frisby.create('PUT Article')
.put('http://127.0.0.1:3000/api/issue/4711',
{"text":"newText"}
)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('GET Issues after PUT-update')
.get('http://127.0.0.1:3000/api/issue/4711')
.expectStatus(200)
.expectJSON({"_id":"4711","text":"newText"})
.toss();


frisby.create('DELETE Issues')
.delete('http://127.0.0.1:3000/api/issue/4711')
.expectStatus(200)
.toss();

frisby.create('GET Issues after DELETE')
.get('http://127.0.0.1:3000/api/issue/4711')
.expectStatus(404)
.toss();

*/
