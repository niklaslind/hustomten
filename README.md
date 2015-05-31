# Hustomten

## Tests

see test/README.md

## API

see test/README.md for details




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
