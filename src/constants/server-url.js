/**
 * This module exports the ServerURL for the current environment based on "__[env]__" variables that becomes set with the webpack DefineTextPlugin.
 * @type {string}
 */

const DEV_URL = 'https://localhost:5001/';
const STAGING_URL = 'https://tappqa.tobit.com/training/2018/hn/reportsystemasp.net/';
const PROD_URL = 'https://tappqa.tobit.com/training/2018/hn/reportsystemasp.net/';

// eslint-disable-next-line no-nested-ternary
const SERVER_URL = __PROD__ ? PROD_URL : (__STAGING__ ? STAGING_URL : DEV_URL);

export default SERVER_URL;
