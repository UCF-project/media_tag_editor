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
		this.state = {
			storage: {}
		};
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
		debug('onDropAccept', files);
	},

	onDropAcceptCompleted(result) {
		debug('onDropAcceptCompleted', arguments);
		StorageActions.list();
		MediaActions.setUrl(result.file.url);
	},

	onDropAcceptFailed(error) {
		debug('onDropAcceptFailed', error);
		MediaActions.setUploadError(error);
	},

	onDropReject() {
		debug('onDropReject', arguments);
	},

	onDragEnter() {
		debug('onDragEnter', arguments);
	},

	onDragLeave() {
		debug('onDragLeave', arguments);
	},

	onListCompleted(result) {
		debug('onListCompleted', result);
		this.state.storage.list = result;
		this.onStateCast();
	},

	onDelete() {
		MediaActions.setInnerStatus('loading');
	},

	onDeleteCompleted() {
		MediaActions.setInnerStatus('');
		StorageActions.list();
	},

	onDeleteFailed() {
		MediaActions.setInnerStatus('');
		StorageActions.list();
	},

	onConvert() {
		MediaActions.setInnerStatus('loading');
	},

	onConvertCompleted() {
		StorageActions.list();
		MediaActions.setInnerContentTabIndex('main', null);
	},

	onConvertFailed(error) {
		MediaActions.setInnerStatus('error', error);
	}
});

module.exports = StorageStore;
