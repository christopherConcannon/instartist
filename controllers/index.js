const router = require('express').Router();

// brings in api/index.js
const apiRoutes = require('./apiRoutes');
const viewRoutes = require('./viewRoutes');


// prefixes routes in api/index.js with /api
router.use('/api', apiRoutes);
router.use('/', viewRoutes);


router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
