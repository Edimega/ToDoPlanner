const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', (req, res) => {
	Task.find((err, tasks) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(tasks);
		}
	});
});

router.get('/:id', (req, res) => {
	Task.findById(req.params.id, (err, task) => {
		if (err) {
			res.status(400).send(err);
		} else if (!task) {
			res.status(404).send({ message: 'Tarea no encontrada' });
		} else {
			res.send(task);
		}
	});
});

router.post('/', (req, res) => {
	const task = new Task(req.body);
	task.save((err, task) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(task);
		}
	});
});

router.put('/:id', (req, res) => {
	Task.findById(req.params.id, (err, task) => {
		if (err) {
			res.status(400).send(err);
		} else if (!task) {
			res.status(404).send({ message: 'Tarea no encontrada' });
		} else {
			task.set(req.body);
			task.save((err, task) => {
				if (err) {
					res.status(400).send(err);
				} else {
					res.send(task);
				}
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	Task.findByIdAndRemove(req.params.id, (err, task) => {
		if (err) {
			res.status(400).send(err);
		} else if (!task) {
			res.status(404).send({ message: 'Tarea no encontrada' });
		} else {
			res.send({ message: 'Tarea eliminada' });
		}
	});
});

module.exports = router;