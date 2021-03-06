# Hustomten

## Tests

see test/README.md

## API

see test/README.md for details

### General

	https://guarded-coast-8897.herokuapp.com/api/<collection>

collection : Can be any named collection. "testissue" is used and cleared by test cases.

### All the CRUD examples you need :)

	curl -X POST -d'{text:"hejsan"}' "https://guarded-coast-8897.herokuapp.com/api/testissue"         
	curl -X GET "https://guarded-coast-8897.herokuapp.com/api/testissue/"
	curl -X GET "https://guarded-coast-8897.herokuapp.com/api/testissue/<documentId>"
    curl -X PUT -d'{text:"A new text"}' "https://guarded-coast-8897.herokuapp.com/api/testissue/<documentId>"
	curl -X DELETE "https://guarded-coast-8897.herokuapp.com/api/testissue/<documentId>"
	curl -X DELETE "https://guarded-coast-8897.herokuapp.com/api/testissue"

"testissue" can be replaced with any collection name

### document ID

	curl -X POST -d'{text:"hejsan"}' "https://guarded-coast-8897.herokuapp.com/api/testissue"

Will generate "_id" automatically (since it is missing in the document)

You can specify "_id" in the document before POST but then it must match mongoDB id pattern



## MongoDB

### Heroku MongoLab

#### Create MongoLab instance

  heroku addons:create mongolab

#### Connect string

  heroku config | grep MONGOLAB_URI

#### MongoLab admin page

  heroku addons:open mongolab


### Local MongoDB

#### Install mongoDb locally

  brew install mongodb
  
#### Start monogDB locally

  mongod --config /usr/local/etc/mongod.conf
