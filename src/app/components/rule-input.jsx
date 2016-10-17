'use strict';

import React from 'react';
import MediaTag from 'media-tag';
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies
import {RuleActions} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
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

mediaTagInfos.flags = {};
mediaTagInfos.flags[MediaTag.constants.ACTION_FLAG_TYPE.BOOLEAN] = {
	restrict: true,
	flags: ['true', 'false'],
	convert: value => {
		if (value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		}
		throw new Error(`Could not convert value ${value}`);
	},
	validate: value => (value === 'true' || value === 'false')
};

mediaTagInfos.flags[MediaTag.constants.ACTION_FLAG_TYPE.NUMBER] = {
	restrict: false,
	flags: [],
	convert: value => parseInt(value, 10),
	validate: value => {
		try {
			const convertedValue = parseInt(value, 10);
			return value === String(convertedValue);
		} catch (err) {
			return false;
		}
	}
};

mediaTagInfos.flags[MediaTag.constants.ACTION_FLAG_TYPE.STRING] = {
	restrict: false,
	flags: [],
	convert: value => value,
	validate: value => value === String(value)
};

mediaTagInfos.flags[MediaTag.constants.ACTION_FLAG_TYPE.OBJECT] = {
	restrict: false,
	flags: [],
	convert: value => json2str(value),
	validate: value => {
		try {
			const convertedValue = JSON.parse(value);
			return typeof convertedValue === 'object';
		} catch (err) {
			return false;
		}
	}
};

fillMenus();

const RuleInput = props => {
	const {
		rule,
		item,
		index,
		...other
	} = props;
	const updateEditField = () => {
		const value = document.querySelector(`input[name=${item}_${index}Input]`).value;
		RuleActions.editRuleField(index, item, value);
	};
	let items = [];
	if (item === 'monitor' || item === 'action') {
		items = mediaTagInfos[`${item}sArr`];
	} else if (item === 'state') {
		const currentMonitorIndex = mediaTagInfos.monitorsArr.indexOf(rule.monitor);
		if (currentMonitorIndex !== -1) {
			// If there is a select valid monitor, proposes its states
			items = mediaTagInfos.monitors[currentMonitorIndex].states;
		}
		// Otherwise state is a free input
	} else if (item === 'flag') {
		const currentActionIndex = mediaTagInfos.actionsArr.indexOf(rule.action);
		if (currentActionIndex !== -1) {
			// If there is a select valid monitor, proposes its states
			const currentFlagType = mediaTagInfos.actions[currentActionIndex].flagType;
			items = mediaTagInfos.flags[currentFlagType].flags;
		}
		// Otherwise state is a free input
	} else {
		throw new Error(`Unkown item type ${item}`);
	}
	return (
		<SelectTextField
			name={`${item}_${index}`}
			items={items}
			defaultValue={rule[item]}
			style={{width: '100%'}}
			onBlur={updateEditField}
			{...other}
			/>
	);
	// <SelectInput inputStyle={{fontSize: 13}} value={String(r[rp])} name={`${rp}_${i}`} menu={menus[rp]}/>
};

RuleInput.propTypes = {
	rule: React.PropTypes.shape({
		monitor: React.PropTypes.string,
		state: React.PropTypes.string,
		action: React.PropTypes.string,
		flag: React.PropTypes.string
	}),
	item: React.PropTypes.string,
	index: React.PropTypes.number
};

module.exports = RuleInput;
