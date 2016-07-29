/* global Blob, FileReader */
'use strict';

import Reflux from 'reflux';
import {hashHistory} from 'react-router';
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import MediaActions from 'app/actions/media'; // eslint-disable-line import/no-extraneous-dependencies
import MediaObject from 'media-tag/src/lib/modules/media-object';
import * as Templates from 'app/extras/manifests'; // eslint-disable-line import/no-extraneous-dependencies
import {json2str} from 'app/extras/utils'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Manifest');

let textFile = null;
function makeTextFile(text) {
	const data = new Blob([text], {type: 'application/json'});

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
}

const ManifestStore = Reflux.createStore({

	ERROR: 'ERROR',
	PARSED: 'PARSED',

	// Base Store //

	listenables: ManifestActions,

	init() {
		this.state = {};
		this.state.manifest = {};
		this.state.manifest.mediaNode = document.createElement('div');
		this.state.manifest.mediaNode.mediaTag = {
			options: {
				dependencyLoader: {
					catchLoaderErrors: true
				}
			}
		};
		this.setSource(json2str({medias: []}));
	},

	// Actions //

	onChange(newManifestSource) {
		this.setSource(newManifestSource);
		this.updateState();
	},

	onDownload() {
		const link = document.createElement('a');
		link.href = makeTextFile(this.state.manifest.source);
		link.download = 'manifest.json';
		link.click();
	},

	onChangeToTemplateIndex(index) {
		ManifestActions.change(json2str(Templates.manifests[index].json));
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
			ManifestActions.change(e.target.result);
			ManifestActions.listMedia();
		});
		reader.readAsText(file);
	},

	onInsertMedia(newMedia) {
		const manifestParsed = JSON.parse(this.state.manifest.source);
		manifestParsed.medias.push(newMedia);
		ManifestActions.change(json2str(manifestParsed));
	},

	onDeleteMedia(mediaIndex) {
		const manifestParsed = JSON.parse(this.state.manifest.source);
		manifestParsed.medias.splice(mediaIndex, 1);
		ManifestActions.change(json2str(manifestParsed));
	},

	onUpdateMedia(mediaIndex, newMedia) {
		const manifestParsed = JSON.parse(this.state.manifest.source);
		manifestParsed.medias[mediaIndex] = newMedia;
		ManifestActions.change(json2str(manifestParsed));
	},

	onEditMedia(mediaIndex) {
		const manifestParsed = JSON.parse(this.state.manifest.source);
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

	// Methods //

	setSource(newManifestSource) {
		try {
			this.state.manifest.source = newManifestSource;
			const manifestParsed = JSON.parse(this.state.manifest.source);
			this.state.manifest.parsed = {};
			this.state.manifest.parsed.medias = manifestParsed.medias.map(m => {
				const newMedia = {};
				newMedia.mediaObj = new MediaObject(m, this.state.manifest.mediaNode);
				newMedia.preview = newMedia.mediaObj.DOMElements;
				newMedia.type = newMedia.mediaObj.contentType;
				newMedia.rules = newMedia.mediaObj.rulesArray;
				newMedia.rulesCount = newMedia.rules.length;
				return newMedia;
			});
			this.state.manifest.status = this.PARSED;
		} catch (err) {
			debug('err', err);
			this.state.manifest.statusError = err;
			this.state.manifest.status = this.ERROR;
			this.updateState();
		}
	},

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = ManifestStore;
