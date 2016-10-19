import {flagTypes, flags} from 'app/helpers/flag-types'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Components:RuleText');

const ruleText = props => {
	debug('render', props);
	const {
		rule,
		item
	} = props;
	let valueText;
	const itemValue = rule[item];
	if (item === 'flagType') {
		if (itemValue in flagTypes) {
			valueText = flags[flagTypes[itemValue]].name;
		} else {
			valueText = itemValue;
		}
	} else if (item === 'flag') {
		debug('flag');
		if (rule.flagType in flagTypes) {
			debug('flagTypes');
			valueText = flags[flagTypes[rule.flagType]].convert2Str(itemValue);
		} else {
			debug('no flagTypes');
			valueText = itemValue;
		}
	} else {
		debug('else');
		valueText = String(itemValue);
	}
	debug('valueText', valueText, typeof valueText);
	return valueText;
};

module.exports = ruleText;
