'use strict';

import Reflux from 'reflux';

const ManifestActions = Reflux.createActions({
	change: {},
	changeToTemplateIndex: {},
	download: {},
	upload: {}
});

module.exports = ManifestActions;