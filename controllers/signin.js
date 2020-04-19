
const handleSignIn =
(req,res,db,bcrypt) => {
	/*
	let hashedPassword = "";
	bcrypt.hash(req.body.password,null,null,function(err,hash){
		hashedPassword = hash;
	});


	bcrypt.compare(req.body.password,hashedPassword,function(err,res){
		console.log(res)
	});

	if(req.body.email === database.users[1].email && req.body.password === database.users[1].password)
	{
		res.json(database.users[1]);
	}
	else
	{
		res.status(400).json('not valid user');
	}
	res.json('signed in');
	*/
	const {email,password} = req.body;
	if(!email || !password)
	{
		return res.status(400).json('Missing values');
	}


	db.select('email','hash').from('smart-brain.login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if(isValid)
		{
			return db.select('*').from('smart-brain.users')
			.where('email', '=', email)
			.then(user => {
				console.log(user);
				res.json(user[0])
			})
			.catch(err => res.status(400).json("Unable to login"))
		}
		else{
			res.status(400).json("Invalid Credentials")
		}
	})
	.catch(err => res.status(400).json("Invalid Credentials"))
}

module.exports = {
	handleSignIn: handleSignIn
}