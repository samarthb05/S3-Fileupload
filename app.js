const express= require('express');
const connectDB = require('./db');
require("dotenv").config();
const bodyparser = require('body-parser');
const router= require('./routes');

const app= express();

app.use(bodyparser.json());

connectDB();

app.use('/',router);

app.listen(process.env.port,()=>{
    console.log(`server listen to ${process.env.port}`);
});