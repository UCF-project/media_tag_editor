import MediaTag from 'media-tag';

const debug = require('debug')('MTME:Components:RuleInput');

const flags = {};
flags[MediaTag.constants.ACTION_FLAG_TYPE.BOOLEAN] = {
	name: 'boolean',
	restrict: true,
	flags: ['true', 'false'],
	convert2Json: value => {
		if (value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		}
		debug('value', value);
		throw new Error(`Could not convert value ${value}`);
	},
	convert2Str: value => String(value),
	validate: value => (value === 'true' || value === 'false')
};

flags[MediaTag.constants.ACTION_FLAG_TYPE.NUMBER] = {
	name: 'number',
	restrict: false,
	flags: [],
	convert2Json: value => parseInt(value, 10),
	convert2Str: value => String(value),
	validate: value => {
		try {
			const convertedValue = parseInt(value, 10);
			return value === String(convertedValue);
		} catch (err) {
			return false;
		}
	}
};

flags[MediaTag.constants.ACTION_FLAG_TYPE.STRING] = {
	name: 'string',
	restrict: false,
	flags: [],
	convert2Json: value => value,
	convert2Str: value => value,
	validate: value => value === String(value)
};

flags[MediaTag.constants.ACTION_FLAG_TYPE.OBJECT] = {
	name: 'object',
	restrict: false,
	flags: [],
	convert2Json: value => JSON.parse(value),
	convert2Str: value => JSON.stringify(value),
	validate: value => {
		try {
			const convertedValue = JSON.parse(value);
			return typeof convertedValue === 'object';
		} catch (err) {
			return false;
		}
	}
};

const flagTypes = {
	boolean: MediaTag.constants.ACTION_FLAG_TYPE.BOOLEAN,
	number: MediaTag.constants.ACTION_FLAG_TYPE.NUMBER,
	string: MediaTag.constants.ACTION_FLAG_TYPE.STRING,
	object: MediaTag.constants.ACTION_FLAG_TYPE.OBJECT
};

module.exports = {
	flags,
	flagTypes
};
