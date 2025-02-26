// module imports
const express = require('express');

// file imports
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const adminRoutes = require('../routes/adminRoutes/adminRoutes');
const vendorRoutes = require('../routes/vendorRoutes/vendorRoutes');

// variable initializations
const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(adminRoutes);
router.use(vendorRoutes);

module.exports = router;
