// module imports
const express = require('express');

// file imports
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const adminRoutes = require('../routes/adminRoutes/adminRoutes');
const vendorRoutes = require('../routes/vendorRoutes/vendorRoutes');
const categoryRoutes = require('../routes/adminRoutes/categoryRoutes');
const productRoutes = require('../routes/vendorRoutes/productRoutes');
const cartRoutes = require('../routes/buyerRoutes/cartRoutes');

// variable initializations
const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(adminRoutes);
router.use(vendorRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(cartRoutes);

module.exports = router;
