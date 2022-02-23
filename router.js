const express = require('express')
const db = require('./mysql')
const router = express.Router()


router.get('/', async (req,res,next) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/coins', async (req,res,next) => {
    try {
        let results = await db.coins();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/exchanges', async (req,res,next) => {
    try {
        let results = await db.exchanges();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/:exchange', async (req,res,next) => {
    try {
        let results = await db.exchange(req.params.exchange);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/coin/:coin', async (req,res,next) => {
    try {
        let results = await db.coin(req.params.coin);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router