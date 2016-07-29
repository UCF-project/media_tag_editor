'use strict';

import Reflux from 'reflux';

const MediaActions = Reflux.createActions({
	updateContent: {},
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
	setContentTabIndex: {}
});

module.exports = MediaActions;
