const handleProfileGet = (req,res,db) => {
	const { id } = req.params;
	
	db.select('*').from('smart-brain.users')
	.where({id: id})
	.then(user => {
		if(user.length) {
			res.json(user[0])	
		}
		else{
			res.status(400).json('User not found')
		}
	})
	
}

module.exports = {
	handleProfileGet: handleProfileGet
}