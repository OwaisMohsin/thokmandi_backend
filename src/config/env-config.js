// module imports
const dotenv = require('dotenv');

// file imports
const { ENVIRONMENTS } = require('./enums');

// destructuring assignments
const { PRODUCTION, STAGING } = ENVIRONMENTS;

dotenv.config();
dotenv.config({
    path: process.env.NODE_ENV === PRODUCTION ? '.env.production' : process.env.NODE_ENV === STAGING ? '.env.staging' : '.env.development',
});