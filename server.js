const express = require('express'); //npm install express
const bodyParser = require('body-parser'); //npm install body-parser
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'p@ssw0rd',
    database : 'smart-brain'
  }
});

console.log(db.select('*').from('smart-brain.users')
	.then(data => {
		//console.log(data);
	}));


const app = express();
app.use(bodyParser.json(bodyParser.json()));
app.use(cors());
/*
const database = {
	users: [
		{
			id: '123',
			name: 'IU',
			email: 'dlwrma@gmail.com',
			passwprd: 'unlucky',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Taeyeon',
			email: 'taengoo@gmail.com',
			password: 'gravity',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id:'929',
			hash: '',
			email: 'dlwrma@gmail.com'
		}
	]
}
*/

app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})


app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
/*
bcrypt.hash("bacon",null,null,function(err,hash){
	//
});


bcrypt.compare("bacon",null,null,function(err,res){
	//
});

bcrypt.compare("veggies",null,null,function(err,res){
	//
});
*/
app.listen(3001, () => {
	console.log('Server is running on port 3001');
})

