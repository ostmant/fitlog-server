const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
 
app.use(cors())
app.use(bodyParser.json())
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

  app.get('/exercises', (req,res) => {
    MongoClient.connect(url, function(err, db){
    if (err) throw err;
    let dbo = db.db("exercises");
    dbo.collection("exercises").find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close;
    });
    });
  })

  app.get('/exercises/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("exercises");
    var query = { _id:id };
    dbo.collection("exercises").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.json(result);
    db.close();
  });
}); 
  })     
  app.delete('/exercises/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("exercises");
    var query = { _id:new mongodb.ObjectID(id) };
    dbo.collection("exercises").deleteOne(query),(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.status(204).end();
    db.close();
  });
}); 

  });

  const generateId = () => {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("exercises");
    let maxId=0;
    dbo.collection("exercises").countDocuments().then(res => {
        console.log(res);
        maxID = res;
        console.log(maxId);
        db.close();
    
        
    })
    return maxId+1;
    });
  };

  app.post('/exercises', (request, response) => {
    const body = request.body
    console.log(body);
    
    if (body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    
    }

    const exercise = {
        _id: generateId(),
        description: body['description'],
        date: new Date(),
        category: " ",   
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("exercises");
        console.log(exercise);
        console.log(exercise._id);
        dbo.collection("exercises").insertOne(exercise);
        db.close();
    })
   
  })

  const PORT = 3001

  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

