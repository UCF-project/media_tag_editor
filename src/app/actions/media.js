'use strict';

import Reflux from 'reflux';

const MediaActions = Reflux.createActions({
	stateCast: {},
	insertRule: {},
	deleteRule: {},
	saveRule: {},
	editRule: {},
	cancelEditRule: {},
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
	updateContentObject: {},
	setInnerContentTabIndex: {},
	setInnerStatus: {}
});

module.exports = MediaActions;
