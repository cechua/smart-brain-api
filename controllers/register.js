
const handleRegister = 
(req,res,db,bcrypt) => {
	const { email, name, password } = req.body;

	//validate values if not empty.
	//return res.status to skip below code
	if(!email || !name || !password)
	{
		return res.status(400).json('Missing values');
	}

	/*
	bcrypt.hash(password,null,null,function(err,hash){
		console.log(hash);
	});
	*/
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email: email
		})
		.into('smart-brain.login')
		.returning('email')
		.then(retloginemail => {
			return trx('smart-brain.users')
			.returning('*')
				.insert({
				email: retloginemail[0],
				name: name,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);	
			})	
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err => res.status(400).json('Unable to register.'))
}

module.exports = {
	handleRegister: handleRegister
}