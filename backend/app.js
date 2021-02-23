//import the Express package
const express = require('express');
const bodyParser = require('body-parser');

const TestKit = require('./models/testKit');
const TestCentre = require('./models/testCentre');
const TestCentreOfficer = require('./models/testCentreOfficer');
const Test = require('./models/test');
const Patient = require('./models/patient');
const User = require("./models/user");

const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
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
app.post("/api/testcentreofficers/signup", (req, res, next) => {
  bcrypt.hash(req.body.testCentreOfficerPassword, 10)
  .then(hash => {
    const testCentreOfficer = new TestCentreOfficer({
      testCentreOfficerName: req.body.testCentreOfficerName,
      testCentreOfficerUsername: req.body.testCentreOfficerUsername,
      testCentreOfficerPassword: hash,
      testCentreOfficerPosition: "Tester",
      testCentreId: req.body.testCentreId
  });
    testCentreOfficer.save()
    .then(createdTestCentreOfficer => {
      console.log(testCentreOfficer)
      res.status(201).json({
        message: 'Test Centre Officer added successfully',
        testCentreOfficerId: createdTestCentreOfficer._id,
        result: createdTestCentreOfficer
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
app.post('/api/testcentreofficers/login', (req,res,next) => {
  let fetchedTester;

  const username = req.body.username;
  const password = req.body.password;

  TestCentreOfficer.findOne({username})
  .then(testcentreofficer => {
    if (!testcentreofficer){
      // return res.status(401).json({
      // message: 'Auth failed'

      // });
      errors.username = "Tester not found";
      res.status(404).json({ errors });
      return;
    }
    fetchedTester = testcentreofficer
    return bcrypt.compare(password, testcentreofficer.testCentreOfficerPassword)
   })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token1 = jwt.sign(
      {testCentreOfficerUsername: fetchedTester.testCentreOfficerUsername, testCentreOfficerId: fetchedTester._id},
      'secret_this_should_be_longer',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token1
    })
  })
  .catch (err=> {
    return res.status(401).json({
      message: 'Auth failed'
    });
  })
})

//get tester
app.get('/api/testcentreofficers', (req,res,next) => {
  TestCentreOfficer.find().then(documents => {
    res.status(200).json({
      message: 'Tester fetched successfully',
      testkits: documents
    });
  });
});

//get tester by id
app.get('/api/testcentreofficers/:id', (req,res,next) => {
  TestCentreOfficer.findById(req.params._id)
  .then(testerFound => {
    if(!testerFound) {
      return res.status(404).end();
    }
    return res.status(200).json(testerFound);
  })
  .catch(err => next(err));
})

//-----------------------------------------User Login/Signup------------------------------------------------
//sign up user
app.post('/api/user/signup', (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      name: req.body.name,
      position: req.body.position,
      type: req.body.type,
      centreId: req.body.centreId
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

// app.post('/api/user/signup', (req,res,next) => {
//   bcrypt.hash(req.body.password, 10)
//   .then(hash =>{
//     const user = new User({
//       email: req.body.email,
//       password: hash
//     });
//     user.save()
//     .then(result => {
//       res.status(201).json({
//         message: 'User created',
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error:err
//       });
//     });
//   });
// });

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

// app.post('/api/user/login', (req,res,next) => {
//   let fetchedUser;
//   User.findOne({email: req.body.email})
//   .then(user => {
//     if (!user){
//       return res.status(401).json({
//         message: 'Auth failed'
//       });
//     }
//     fetchedUser = user
//     return bcrypt.compare(req.body.password, user.password)
//   })
//   .then(result => {
//     if (!result){
//       return res.status(401).json({
//         message: 'Auth failed'
//       });
//     }
//     const token = jwt.sign(
//       {email: fetchedUser.email, userId: fetchedUser._id},
//       'secret_this_should_be_longer',
//       {expiresIn: '1h'}
//     );
//     res.status(200).json({
//       token: token
//     })
//   })
//   .catch (err=> {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   })
//  })

//-----------------------------------------Test------------------------------------------------
//get test
app.get("/api/tests",(req, res, next)=>{
  Test.find().then(documents => {
    res.status(200).json({
      message: 'Test fetched successfully',
      tests: documents
    });
  })
});

//add test
app.post("/api/tests", (req, res, next) => {
  const test = new Test({
    testDate: req.body.testDate,
    patientUsername: req.body.patientUsername,
    patientType: req.body.patientType,
    symptoms: req.body.symptoms,
    testStatus: req.body.testStatus,
    testResults: req.body.testResults,
    testCentreOfficerUsername: req.body.testCentreOfficerUsername
  })

  test.save().then(createdTest => {
    console.log(test)
    res.status(200).json({
      message: 'Test added successfully',
      testId: createdTest._id
    });
  });
});

//update test
app.put("/api/tests/:id", (req,res,next) => {
  const test = new Test({
    _id: req.body.id,
    testDate: req.body.testDate,
    patientUsername: req.body.patientUsername,
    patientType: req.body.patientType,
    symptoms: req.body.symptoms,
    testStatus: req.body.testStatus,
    testResults: req.body.testResults,
    testCentreOfficerUsername: req.body.testCentreOfficerUsername
  });
  Test.updateOne({ _id: req.params.id}, test).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Test Successful!"});
  });
});

 //delete test
 app.delete('/api/tests/:id', (req,res,next) => {
  Test.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Test deleted"});
  })
});

 //-----------------------------------------Patient------------------------------------------------
 //get patient
 app.get("/api/patients",(req, res, next)=>{
  Patient.find().then(documents => {
    res.status(200).json({
      message: 'Patient fetched successfully',
      patients: documents
    });
  })
});

 //create patient
 app.post("/api/patients/signup", (req, res, next) => {
    const patient = new Patient({
      patientUsername: req.body.patientUsername,
      patientPassword: req.body.patientPassword,
      patientFullName: req.body.patientFullName,
      patientPosition: "Patient"
  });
    patient.save().then(createdPatient => {
      console.log(patient)
      res.status(201).json({
        message: 'Patient added successfully',
        patientId: createdPatient._id,
        result: createdPatient
      });
    })
  });

 //login patient
 app.post('/api/patients', (req,res,next) => {
  let fetchedUser;
  Patient.findOne({patientUsername: req.body.patientUsername})
  .then(patient => {
    if (!patient){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = patient
    return bcrypt.compare(req.body.password,patient.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      {patientUsername: fetchedUser.patientUsername, patientId: fetchedUser._id},
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

module.exports = app;
