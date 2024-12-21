const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(user);
		}
	});
});

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else if (!user) {
			res.status(401).send({ message: 'Usuario no encontrado' });
		} else {
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					res.status(400).send(err);
				} else if (!isMatch) {
					res.status(401).send({ message: 'Contraseña incorrecta' });
				} else {
					res.send(user);
				}
			});
		}
	});
});

module.exports = router;