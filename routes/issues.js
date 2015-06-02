var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var util=require('util');


exports.deleteCollection = function(req, res, db) {
    console.log('DELETE collection '+req.params.collection)
    db.dropCollection(req.params.collection,
                      function(err, data){
                          if (err){
                              console.log(err)
                              res.send(500, err);
                          } else {
                              res.send(data);
                          }
                      });
}


exports.createIssue = function(req, res, db) {
    var input=req.body;
    var collection=req.params.collection
    db.collection(collection)
        .insert(input,{},
                function(err, data){
                    if (err){
                        res.send(500, err);
                    } else {
                        res.send(data);
                    }
                });
}

exports.readIssue = function(req,res,db) {
    console.log('param.id : '+req.params.id)
    db.collection(req.params.collection)
        .findOne( { _id:  ObjectID(req.params.id) }, 
                  function(err, data) {
                      if (err) {
                          res.send(500, 'Internal Server Error');
                      } else if (!data) {
                          res.send(404, 'Not Found');
                      } else {
                          res.jsonp(data);
                      }
                  });
}


exports.deleteIssue = function(req,res,db) {
    db.collection(req.params.collection)
        .remove( {"_id": ObjectID(req.params.id)},
                 function(err) {
                     res.jsonp({ result: err });
                 });
}

exports.readIssues = function(req,res,db) {
    db.collection(req.params.collection)
        .find().toArray(
            function(err, data) {
                if (err) {
                    console.log(err)
                    res.send(500, err);
                } else {
                    res.jsonp(data || []);
                }
            });    
}

exports.updateIssue = function(req,res,db) {
    db.collection(req.params.collection)
        .update({ _id:  ObjectID(req.params.id)}, req.body, {}, 
                function(err) {
                    res.jsonp({ result: err });
                });
}






