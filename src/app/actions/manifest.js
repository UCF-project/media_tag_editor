'use strict';

import Reflux from 'reflux';

const ManifestActions = Reflux.createActions({
	change: {},
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
	listMedia: {}
});

module.exports = ManifestActions;
