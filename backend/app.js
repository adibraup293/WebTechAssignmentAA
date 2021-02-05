//import the Express package
const express = require('express');
const bodyParser = require('body-parser');
const TestKit = require('./models/testKit');
const TestCentre = require('./models/testCentre');
const mongoose = require("mongoose");
//const bcrypt = require ("bcrypt");
// const User = require("./models/user");
//const jwt = require('jsonwebtoken');
// const checkAuth = require('./middleware/check-auth');

//Add one route
//Use express function and save as an app constant
const app = express();
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://max:8bGPGq0OT0DOPaVo@cluster0.xihgz.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

 app.use(bodyParser.json());

 app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
 });

 //------------------------------------------------------Testkit-------------------------------------------------
app.post("/api/testkits", (req, res, next) => {
  const testKit = new TestKit({
    testkitname: req.body.testkitname,
    testkitstock: req.body.testkitstock
  })

  testKit.save().then(createdTestKit => {
    console.log(testKit)
    res.status(200).json({
      message: 'Test Kit added successfully',
      testKitId: createdTestKit._id
    });
  });

  console.log(testKit);
  res.status(201).json({
    message: 'Test Kit added successfully'
  });
});

app.put("/api/testkits/:id", (req,res,next) => {
  const testKit = new TestKit({
    _id: req.body.id,
    testkitname: req.body.testkitname,
    testkitstock: req.body.testkitstock
  });
  TestKit.updateOne({ _id: req.params.id}, testKit).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Testkit Successful!"});
  });
});

app.get('/api/testkits', (req,res,next) => {
  TestKit.find().then(documents => {
    res.status(200).json({
      message: 'Testkit fetched successfully',
      testkits: documents
    });
  });
});

app.delete('/api/testkits/:id', (req,res,next) => {
  TestKit.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Testkit deleted"});
  })
});

//-----------------------------------------Test Centre------------------------------------------------
app.post("/api/testcentres", (req, res, next) => {
  const testCentre = new TestCentre({
    testcentrename: req.body.testcentrename,
    testcentreaddress: req.body.testcentreaddress,
    testcentrecontact: req.body.testcentrecontact
  })

  testCentre.save().then(createdTestCentre => {
    console.log(testCentre)
    res.status(200).json({
      message: 'Test Centre added successfully',
      testCentreId: createdTestCentre._id
    });
  });

  console.log(testCentre);
  res.status(201).json({
    message: 'Test Centre added successfully'
  });
});

app.get('/api/testcentres',(req, res, next)=>{
  TestCentre.find().then(documents => {
    res.status(200).json({
      message: 'Test Centre fetched successfully',
      testcentres: documents
    });
    console.log(documents);
  })
});

//-----------------------------------------Test Centre Officer------------------------------------------------



module.exports = app;
