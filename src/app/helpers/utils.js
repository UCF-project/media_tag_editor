'use strict';

module.exports = {
	json2str: json => {
		return JSON.stringify(json, null, '\t');
	}
};
