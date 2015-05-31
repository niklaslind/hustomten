var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var app = express();
var issues = require('./routes/issues');

var mongoConnectString=process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017'
console.log('MONGODB CONNECT:'+ mongoConnectString)

MongoClient.connect(mongoConnectString+'/test', function(err, db) {
    if (err || !db) {
        console.error('Failed to connect to db', err);
        process.exit(1);
    } else {
        app.set('port', (process.env.PORT || 3000));
        app.use(bodyParser()); 
        app.use(cookieParser());
        app.use(session({
            secret: 'segretoooo',
            store: new MongoStore({ db: db }),
            cookie: {httpOnly:false}
        }));
        app.use(express.static(__dirname + '/public'));


        app.delete('/api/:collection', function(req, res) {
            issues.deleteCollection(req,res,db);
        });

        app.post('/api/:collection/_create', function(req, res) {
            issues.createCollection(req,res,db);
        });

        app.post('/api/:collection', function(req, res) {
            issues.createIssue(req,res,db);
        });

        app.get('/api/:collection/:id', function(req, res) {
            issues.readIssue(req,res,db);
        });

        app.delete('/api/:collection/:id', function(req, res) {
            issues.deleteIssue(req,res,db);
        });

        app.get('/api/:collection', function(req, res) {
            issues.readIssues(req,res,db);
        });

        app.put('/api/:collection/:id', function(req, res) {
            issues.updateIssue(req,res,db);
        });

        app.listen(app.get('port'), function() {
            console.log('Node app is running on port', app.get('port'));
        });


    }});
