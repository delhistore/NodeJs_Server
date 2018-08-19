const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b51b6788df9042d38b3fa352c4da9bf9'
});

const handleApiCall = (req,res) => {
	app.models
    	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    	.then(data => {
    		res.json(data);
    	})
    	.catch(err => res.status(400).json('Unable to work with Api'))
};


imageModule = (req,res,db) => {
	const {id} = req.body;
	
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		})
		.catch(err => res.status(400).json('unable to update entries'))
}

module.exports = {
	imageModule: imageModule,
	handleApiCall: handleApiCall
}