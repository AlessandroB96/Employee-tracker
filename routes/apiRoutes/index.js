//this index file is the central hub that pulls all modular routes together from the apiRoutes folder

const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;