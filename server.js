const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./Controllers/handleRegister.js')
const signin = require('./Controllers/signin.js')
const profile = require('./Controllers/getProfile.js')
const image = require('./Controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'tathagat',
    password : 'tjrapper199',
    database : 'tathagatjha_me'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	res.send('it is working');
})

app.post('/signin', (req,res) => { signin.signinModule(req,res,db,bcrypt) })
app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) })
app.get('/profile/:id', (req,res) => {profile.getProfileModule(req,res,db)})
app.put('/image', (req,res) => {image.imageModule(req,res,db)} )
app.post('/imageUrl', (req,res) => {image.handleApiCall(req,res)} )


app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running at port ${process.env.PORT}`);
})
