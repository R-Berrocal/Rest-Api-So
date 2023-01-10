const serverless = require("serverless-http")
const express = require("express")
const cors = require("cors")
const auth = require('./routes/auth')
const schedule = require('./routes/schedule')
const modifiedSchedule = require('./routes/modifiedSchedule')
const user = require('./routes/user')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/algo', (req,res)=> res.send('hola mundo'))

app.use('/auth', auth)
app.use('/schedule',schedule);
app.use('/modifiedSchedule',modifiedSchedule);
app.use('/user',user);

// app.listen(3000,() => console.log('escuchando en el puerto 3000'))
module.exports.generic = serverless(app);