// module imports
const express = require('express');

// file imports
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const adminRoutes = require('../routes/adminRoutes/adminRoutes');

// variable initializations
const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(adminRoutes);

module.exports = router;
