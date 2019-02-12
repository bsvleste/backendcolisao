const  jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req,res,next)=>{
	const authHeader = req.headers.authorization;

	if(! authHeader)
		return res.status(400).send({error:'No token provided'});

	const parts = authHeader.split(' ');

	if(!parts.length === 2)
		return res.status(401).send({erro:'Token error'});

	const [scheme, token ] =parts;

	if(!/^Bearer$/i.test(scheme))
		return res.status(402).send({error:'Token badformat'});

	jwt.verify(token, config.JWT_KEY, (err,decoded)=>{
		if(err)
			res.status(403).send({erro:'Token invalid'});
		req.userId = decoded.id;
		return next();
	});
}