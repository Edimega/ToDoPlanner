const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
	User.find((err, users) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(users);
		}
	});
});

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else if (!user) {
			res.status(404).send({ message: 'Usuario no encontrado' });
		} else {
			res.send(user);
		}
	});
});

router.put('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else if (!user) {
			res.status(404).send({ message: 'Usuario no encontrado' });
		} else {
			user.set(req.body);
			user.save((err, user) => {
				if (err) {
					res.status(400).send(err);
				} else {
					res.send(user);
				}
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else if (!user) {
			res.status(404).send({ message: 'Usuario no encontrado' });
		} else {
			res.send({ message: 'Usuario eliminado' });
		}
	});
});

module.exports = router;