'use strict';

module.exports = {
	json2str: json => {
		return JSON.stringify(json, null, '\t');
	},
	bytes2str: bytes => {
		// https://github.com/visionmedia/bytes.js/blob/master/index.js
		const unitSizes = {
			b: 1,
			kb: 1 << 10,
			mb: 1 << 20,
			gb: 1 << 30,
			tb: ((1 << 30) * 1024)
		};
		let unit = 'B';

		if (bytes >= unitSizes.tb) {
			unit = 'TB';
		} else if (bytes >= unitSizes.gb) {
			unit = 'GB';
		} else if (bytes >= unitSizes.mb) {
			unit = 'MB';
		} else if (bytes >= unitSizes.kb) {
			unit = 'kB';
		}

		return `${Math.round(bytes / unitSizes[unit.toLowerCase()])}${unit}`;
	}
};
