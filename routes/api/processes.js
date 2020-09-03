const express = require('express');
const  router =  express.Router();
const {validationResult} = require('express-validator');
const Process = require('../../models/Processes');

// @route POST api/processes
// @desc  Создать процесс
// @access Public
router.post('/', async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return  res.status(400).json({errors: errors.array()});
    }

    try {
        const newProcess = new Process({
            title: req.body.title,
            quantity: req.body.quantity
        });

        const process = await newProcess.save();

        res.json(process);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/processes
// @desc   Получить все процессы
// @access Public
router.get('/', async (req, res) => {
    try {
        const allProcesses = await Process.find().sort({date: -1});
        res.json(allProcesses);
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/processes/:id
// @desc   Получить целевой процесс по id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const singularProcess =  await Process.findById(req.params.id);

        if (!singularProcess) {
            return res.status(404).json({msg: "Нет такого процесса"});
        }

        res.json(singularProcess);

    } catch(err) {
        console.error(err.message);
        if (e.kind === "ObjectId") {
            return res.status(404).json({msg: "Нет такого процесса"});
        }

        res.status(500).send('Server error');
    }
});

// @route  DELETE api/processes/:id
// @desc   Удалить процесс по id
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const process = await Process.findById(req.params.id);

        if (!process) {
            return res.status(404).json({msg: "Процесс не найден"});
        }

        await process.remove();
        res.json({msg: "Процесс удалён"});
    } catch(err) {
        console.error(err.message);

        if (e.kind === "ObjectId") {
            return res.status(404).json({msg: "Нет такого процесса"});
        }

        res.status(500).send("Server error");
    }
});

// @route   POST api/processes/subprocess/:id
// @desc    Добавить подпроцесс для процесса
// @access  Public
router.post('/subprocess/:id',  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const process = await Process.findById(req.params.id);

        const newSubprocess = {
            title: req.body.title,
            // completed: req.body.completed
        };

        process.subprocesses.unshift(newSubprocess);

        await process.save();

        res.json(process.subprocesses);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/processes/subprocess/:id/:subprocess_id
// @desc    Удалить подпроцесс из процесса
// @access  Public
router.delete('/subprocess/:id/:subprocess_id', async (req, res) => {
    try {
        const process = await Process.findByIdAndUpdate(
            req.params.id, 
            {
                $pull: {"subprocesses": {_id: req.params.subprocess_id}}
            }, 
            {safe:  true, upset: true},
        );

        await process.save();
        res.json(process.subprocesses);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;