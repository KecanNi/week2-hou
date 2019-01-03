var mongo=require('mongodb');

var objectId=mongo.ObjectID;

function createObjectId(id){
    if(id &&typeof id==='string'){
        return objectId(id)
    }
}

function connect(fn){
    mongo.MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},function(err,db){
        if(err){
            return fn(err)
        }

        var dob=db.db('1610');
        var collection=dob.collection('week2');
        fn&&fn(null,collection,db)
    })
}

module.exports={
    connect:connect,
    createObjectId:createObjectId
}