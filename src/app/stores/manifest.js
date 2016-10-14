/* global Blob, FileReader */
'use strict';

import Reflux from 'reflux';
import {hashHistory} from 'react-router';
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import MediaActions from 'app/actions/media'; // eslint-disable-line import/no-extraneous-dependencies
import Templates from 'app/templates'; // eslint-disable-line import/no-extraneous-dependencies
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies
import Manifest from 'app/helpers/manifest'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Manifest');

const ManifestStore = Reflux.createStore({

	ERROR: Manifest.ERROR,
	PARSED: Manifest.PARSED,

	// Base Store //

	listenables: ManifestActions,

	init() {
		debug('init');
		this.manifestObj = new Manifest();
		// // Call to ManifestActions in init() does not work
		// ManifestActions.changeToTemplateIndex(0);
		// // But this works =>
		setTimeout(() => {
			ManifestActions.changeToTemplateIndex(0);
		}, 1);
	},

	// Actions //

	onDownload() {
		const link = document.createElement('a');
		link.href = this.manifestObj.getManifestUrl();
		link.download = this.manifestObj.getManifestFilename();
		link.click();
	},

	onDownloadPackage() {
		this.manifestObj.downloadPackage();
	},

	onChangeToTemplateIndex(index) {
		debug('onChangeToTemplateIndex', index);
		ManifestActions.changeSource('manifest', Templates.manifests[index].json);
		ManifestActions.changeSource('html', Templates.manifests[index].html);
		ManifestActions.listMedia();
	},

	onUpload(e) {
		debug('e', e);
		debug('file', e.target.files);
		if (e.target.files.length > 1) {
			// Too many files
			// TODO:
			// Notification.add('Please select only one file to upload.');
			debug('Please select only one file to upload.');
			return;
		} else if (e.target.files.length <= 0) {
			// No files selected
			// do nothing
			debug('No files selected');
			return;
		}

		// One file selected
		const jsonType = /\/json$/;
		const file = e.target.files[0];
		if (!jsonType.test(file.type)) {
			// TODO:
			// Notification.add('Please select a JSON file to upload.');
			debug(`File selected is not JSON: ${file.type}`);
			return;
		}

		const reader = new FileReader();
		reader.addEventListener('load', e => {
			ManifestActions.changeSource('manifest', e.target.result);
			ManifestActions.listMedia();
		});
		reader.readAsText(file);
	},

	onInsertMedia(newMedia) {
		const manifestParsed = JSON.parse(this.manifestObj.getManifestSource());
		manifestParsed.medias.push(newMedia);
		ManifestActions.changeSource('manifest', json2str(manifestParsed));
	},

	onDeleteMedia(mediaIndex) {
		const manifestParsed = JSON.parse(this.manifestObj.getManifestSource());
		manifestParsed.medias.splice(mediaIndex, 1);
		ManifestActions.changeSource('manifest', json2str(manifestParsed));
	},

	onUpdateMedia(mediaIndex, newMedia) {
		const manifestParsed = JSON.parse(this.manifestObj.getManifestSource());
		manifestParsed.medias[mediaIndex] = newMedia;
		ManifestActions.changeSource('manifest', json2str(manifestParsed));
	},

	onEditMedia(mediaIndex) {
		const manifestParsed = JSON.parse(this.manifestObj.getManifestSource());
		MediaActions.openUpdate(mediaIndex, manifestParsed.medias[mediaIndex]);
	},

	onShowMedia(mediaIndex) {
		debug('onShowMedia', mediaIndex);
		hashHistory.replace(`/${mediaIndex}`);
	},

	onListMedia() {
		debug('onShowMediaList');
		hashHistory.replace('/');
	},

	onStateCast() {
		this.updateState();
	},

	onChangeFile(newFileType) {
		this.manifestObj.changeFileType(newFileType);
		this.updateState();
	},

	onChangeSource(type, newSource) {
		if (type === 'manifest') {
			this.manifestObj.setManifestSource(newSource);
		} else if (type === 'html') {
			this.manifestObj.setHtmlSource(newSource);
		} else {
			throw new Error(`Type ${type} for change not found.`);
		}
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger({manifest: this.manifestObj.getState()});
	}

});

module.exports = ManifestStore;
