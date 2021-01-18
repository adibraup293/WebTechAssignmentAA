//import the Express package
const express = require('express');
// const bodyParser = require('body-parser');
// const TestKit = require('./models/testKit');
// const TestCentre = require('./models/testCentre');
const mongoose = require("mongoose");
// const bcrypt = require ("bcrypt");
// const User = require("./models/user");
// const jwt = require('jsonwebtoken');
// const checkAuth = require('./middleware/check-auth');

//Add one route
//Use express function and save as an app constant
const app = express()

mongoose.connect("mongodb+srv://max:8bGPGq0OT0DOPaVo@cluster0.xihgz.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   next();
// });


module.exports = app;
