//import the Express package
const express = require('express');
const bodyParser = require('body-parser');
const TestKit = require('./models/testKit');
const TestCentre = require('./models/testCentre');
const TestCentreOfficer = require('./models/testCentreOfficer');
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');

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
//add testkit
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

//edit testkit
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

//get testkit
app.get('/api/testkits', (req,res,next) => {
  TestKit.find().then(documents => {
    res.status(200).json({
      message: 'Testkit fetched successfully',
      testkits: documents
    });
  });
});

//delete testkit
app.delete('/api/testkits/:id', (req,res,next) => {
  TestKit.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Testkit deleted"});
  })
});

//-----------------------------------------Test Centre------------------------------------------------
//add testcentre
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

//get testcentre
app.get("/api/testcentres",(req, res, next)=>{
  TestCentre.find().then(documents => {
    res.status(200).json({
      message: 'Test Centre fetched successfully',
      testcentres: documents
    });
  })
});


//-----------------------------------------Test Centre Officer------------------------------------------------
//add tester
app.post("/api/testcentreofficers", (req, res, next) => {
  bcrypt.hash(req.body.testCentreOfficerPassword, 10)
  .then(hash => {
    const testCentreOfficer = new TestCentreOfficer({
      testCentreOfficerName: req.body.testCentreOfficerName,
      testCentreOfficerUsername: req.body.testCentreOfficerUsername,
      testCentreOfficerPassword: hash,
      testCentreOfficerPosition: "Tester",
      testCentreId: req.body.testCentreId
  });
    testCentreOfficer.save().then(createdTestCentreOfficer => {
      console.log(testCentreOfficer)
      res.status(200).json({
        message: 'Test Centre Officer added successfully',
        testCentreOfficerId: createdTestCentreOfficer._id
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  });
});

//login tester
app.post('/api/testcentreofficers', (req,res,next) => {
  let fetchedUser;
  TestCentreOfficer.findOne({username: req.body.username})
  .then(testcentreofficer => {
    if (!testcentreofficer){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = testcentreofficer
    return bcrypt.compare(req.body.password, testcentreofficer.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      {username: fetchedUser.username, testcentreId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token
    })
  })
  .catch (err=> {
    return res.status(401).json({
      message: 'Auth failed'
    });
  })
 })

//-----------------------------------------User Login/Signup------------------------------------------------
//sign up user
app.post('/api/user/signup', (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  });
});

 //login user
app.post('/api/user/login', (req,res,next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token
    })
  })
  .catch (err=> {
    return res.status(401).json({
      message: 'Auth failed'
    });
  })
 })

 //-----------------------------------------Tester------------------------------------------------



 //-----------------------------------------Patient------------------------------------------------


module.exports = app;
