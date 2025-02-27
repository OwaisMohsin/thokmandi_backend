// module imports
const express = require('express');

// file imports
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const adminRoutes = require('../routes/adminRoutes/adminRoutes');
const vendorRoutes = require('../routes/vendorRoutes/vendorRoutes');
const categoryRoutes = require('../routes/adminRoutes/categoryRoutes');

// variable initializations
const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(adminRoutes);
router.use(vendorRoutes);
router.use(categoryRoutes);

module.exports = router;
