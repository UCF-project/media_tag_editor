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
	open: {}
});

module.exports = MediaActions;
