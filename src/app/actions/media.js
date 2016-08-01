'use strict';

import Reflux from 'reflux';

const MediaActions = Reflux.createActions({
	stateCast: {},
	insertRule: {},
	deleteRule: {},
	saveRule: {},
	editRule: {},
	gotoStep: {},
	save: {},
	nextStep: {},
	close: {},
	openNew: {},
	openUpdate: {},
	setUrl: {},
	setContentTabIndex: {},
	setUploadError: {},
	updateContentURL: {},
	updateContentObject: {}
});

module.exports = MediaActions;
