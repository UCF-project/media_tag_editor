/* global window, document */
'use strict';

// require('babel-polyfill');
// import 'babel-core/polyfill';
// import 'babel-polyfill';

// Vendor
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import refluxPromise from 'reflux-promise';

// APP

// Uses the user agent's Promise implementation
Reflux.use(refluxPromise(window.Promise));

// refluxPromise needs to be before the routes import
// and if AppRoutes is done on the begging of the file
// browserify will solve it before anything else is executed
// even when the refluxPromise is before the import
const AppRoutes = require('app/configs/routes'); // eslint-disable-line import/no-extraneous-dependencies

// Router
ReactDOM.render(AppRoutes, document.getElementById('app'));
