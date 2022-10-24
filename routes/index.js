const express = require('express');

const router = express.Router();
const removeController = require('../controllers/remove_controller');

console.log('router loaded');

router.post('/remove-task/', removeController.remove)

module.exports = router;

