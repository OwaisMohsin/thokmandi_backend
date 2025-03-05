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
const vendorRequests = require('../routes/adminRoutes/vendorRoutes');
const orderRoutes = require('../routes/buyerRoutes/orderRoutes');
const vendorSideOrders = require('../routes/vendorRoutes/orderRoutes');
const buyerProductRoutes = require('./buyerRoutes/productRoutes');
const homeRoutes = require('./homeRoutes');

// variable initializations
const router = express.Router();

router.use(homeRoutes);

//BUYER ROUTES
router.use(cartRoutes);
router.use(orderRoutes);
router.use(buyerProductRoutes);

//ADMIN ROUTES
router.use(categoryRoutes);
router.use(vendorRequests);
router.use(adminRoutes);
router.use(productRoutes);


//VENDOR ROUTES
router.use(vendorSideOrders);
router.use(vendorRoutes);

//GENERIC ROUTES
router.use(authRoutes);
router.use(profileRoutes);


module.exports = router;
