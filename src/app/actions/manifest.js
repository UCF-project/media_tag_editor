'use strict';

import Reflux from 'reflux';

const ManifestActions = Reflux.createActions({
	changeToTemplateIndex: {},
	download: {},
	downloadPackage: {},
	upload: {},
	insertMedia: {},
	deleteMedia: {},
	updateMedia: {},
	editMedia: {},
	showMedia: {},
	stateCast: {},
	listMedia: {},
	changeFile: {},
	changeSource: {}
});

module.exports = ManifestActions;
