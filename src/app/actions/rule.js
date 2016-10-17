'use strict';

import Reflux from 'reflux';

const RuleActions = Reflux.createActions({
	openUpdate: {},
	stateCast: {},
	insertRule: {},
	deleteRule: {},
	saveRule: {},
	editRule: {},
	cancelEditRule: {},
	editRuleField: {}
});

module.exports = RuleActions;
