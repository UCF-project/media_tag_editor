'use strict';

import React from 'react';
import MediaTag from 'media-tag';
import {RuleActions} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import {flags/* , flagTypes*/} from 'app/helpers/flag-types'; // eslint-disable-line import/no-extraneous-dependencies
// import ruleText from 'app/helpers/rule-text'; // eslint-disable-line import/no-extraneous-dependencies
import SelectTextField from './select-text-field';

const debug = require('debug')('MTME:Components:RuleInput');

const mediaTagInfos = {};

const fillMenus = () => {
	debug('listRuleAction', MediaTag.extensionApi.listRuleAction());
	mediaTagInfos.monitors = MediaTag.extensionApi.listMonitor().map(m => {
		return {
			name: m.name,
			states: m.states
		};
	});
	mediaTagInfos.monitorsArr = mediaTagInfos.monitors.map(i => i.name);

	mediaTagInfos.actions = MediaTag.extensionApi.listRuleAction().map(r => {
		return {
			name: r.name,
			flagType: r.flagType
		};
	});
	mediaTagInfos.actionsArr = mediaTagInfos.actions.map(i => i.name);

	debug('mediaTagInfos', mediaTagInfos);
};

fillMenus();

// const errorValidateField = (value, type) => {
// 	debug('errorValidateField', value, type);
// 	if (flags[type].validate(value)) {
// 		return false;
// 	}
// 	return `This field is invalid`;
// };

const updateEditField = (index, item, rule, value) => {
	RuleActions.editRuleField(index, item, value);
};

const getItems = (item, rule) => {
	if (item === 'monitor' || item === 'action') {
		return mediaTagInfos[`${item}sArr`];
	} else if (item === 'state') {
		const currentMonitorIndex = mediaTagInfos.monitorsArr.indexOf(rule.monitor);
		if (currentMonitorIndex !== -1) {
			// If there is a select valid monitor, proposes its states
			return mediaTagInfos.monitors[currentMonitorIndex].states;
		}
		// Otherwise state is a free input
		return [];
	} else if (item === 'flag') {
		let currentFlagType = rule.flagType;
		const currentActionIndex = mediaTagInfos.actionsArr.indexOf(rule.action);
		if (currentActionIndex !== -1) {
			// If there is a select valid monitor, proposes its states
			currentFlagType = mediaTagInfos.actions[currentActionIndex].flagType;
			return flags[currentFlagType].flags;
		}
		// Otherwise state is a free input
		return [];
	} else if (item === 'flagType') {
		// Otherwise state is a free input
		return [];
	}
	throw new Error(`Unkown item type ${item}`);
};

const RuleInput = props => {
	const {
		rule,
		item,
		index,
		...other
	} = props;
	const handleUpdateEditField = updateEditField.bind(null, index, item, rule);
	const items = getItems(item, rule);
	// const defaultValue = ruleText({rule, item});
	const defaultValue = rule[item];
	const errorText = false;
	// if (item === 'monitor' || item === 'action') {
	// 	items = mediaTagInfos[`${item}sArr`];
	// } else if (item === 'state') {
	// 	const currentMonitorIndex = mediaTagInfos.monitorsArr.indexOf(rule.monitor);
	// 	if (currentMonitorIndex !== -1) {
	// 		// If there is a select valid monitor, proposes its states
	// 		items = mediaTagInfos.monitors[currentMonitorIndex].states;
	// 	}
	// 	// Otherwise state is a free input
	// } else if (item === 'flag') {
	// 	let currentFlagType = rule.flagType;
	// 	const currentActionIndex = mediaTagInfos.actionsArr.indexOf(rule.action);
	// 	if (currentActionIndex !== -1) {
	// 		// If there is a select valid monitor, proposes its states
	// 		currentFlagType = mediaTagInfos.actions[currentActionIndex].flagType;
	// 		items = flags[currentFlagType].flags;
	// 	}
	// 	defaultValue = flags[currentFlagType].convert2Str(defaultValue);
	// 	errorText = errorValidateField(defaultValue, currentFlagType);
	// 	// Otherwise state is a free input
	// } else if (item === 'flagType') {
	// 	defaultValue = flags[rule.flagType].name;
	// 	// Otherwise state is a free input
	// } else {
	// 	throw new Error(`Unkown item type ${item}`);
	// }
	return (
		<SelectTextField
			name={`${item}_${index}`}
			items={items}
			defaultValue={defaultValue}
			style={{width: '100%'}}
			onChange={handleUpdateEditField}
			errorText={errorText}
			{...other}
			/>
	);
};

RuleInput.propTypes = {
	rule: React.PropTypes.shape({
		monitor: React.PropTypes.string,
		state: React.PropTypes.string,
		action: React.PropTypes.string,
		flagType: React.PropTypes.string,
		flag: React.PropTypes.any
	}),
	item: React.PropTypes.string,
	index: React.PropTypes.number
};

module.exports = RuleInput;
