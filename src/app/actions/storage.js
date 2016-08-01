'use strict';

import Reflux from 'reflux';
import Api from 'app/helpers/api'; // eslint-disable-line import/no-extraneous-dependencies

// const debug = require('debug')('MTME:Actions:Storage');

const StorageActions = Reflux.createActions({
	drop: {},
	dropAccept: {asyncResult: true},
	dropReject: {},
	dragEnter: {},
	dragLeave: {}
});

StorageActions.dropAccept.listenAndPromise(Api.storageUpload);

module.exports = StorageActions;
