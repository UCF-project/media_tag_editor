'use strict';

import Reflux from 'reflux';
import StorageActions from 'app/actions/storage';  // eslint-disable-line import/no-extraneous-dependencies
import MediaActions from 'app/actions/media';  // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Storage');

const StorageStore = Reflux.createStore({
	// Base Store //

	listenables: StorageActions,

	init() {
		debug('init');
		this.state = {};
	},

	// Actions //

	onStateCast() {
		debug('onStateCast', this.state);
		this.trigger(this.state);
	},

	onDrop() {
		debug('onDrop', arguments);
	},

	onDropAccept(files) {
		debug('onDropAccept', arguments);
	},

	onDropAcceptCompleted(result) {
		debug('onDropAcceptCompleted', arguments);
		MediaActions.setUrl(result.file.url);
	},

	onDropReject() {
		debug('onDropReject', arguments);
	},

	onDragEnter() {
		debug('onDragEnter', arguments);
	},

	onDragLeave() {
		debug('onDragLeave', arguments);
	}
});

module.exports = StorageStore;
