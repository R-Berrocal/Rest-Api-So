const serverless = require("serverless-http")
const express = require("express")
const cors = require("cors")
const user = require('./routes/user')
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/algo', (req,res)=> res.send('hola mundo'))

app.use('/user',user);

// app.listen(3000,() => console.log('escuchando en el puerto 3000'))
module.exports.generic = serverless(app);