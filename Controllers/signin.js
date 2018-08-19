signinModule = (req,res,db,bcrypt) => {
	db.select('email','hash').from('login')
		.where('email', '=', req.body.email)
		.then(user => {
			const isValid = bcrypt.compareSync(req.body.password, user[0].hash)
			console.log(user)
			
			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
			}
			else {
				res.status(400).json('Wrong password')
			}
		})
		.catch(err => res.status(400).json('This email is not registered.'))
}

module.exports = {
	signinModule: signinModule
}