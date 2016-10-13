import {mediaObject as MediaObject} from 'media-tag';
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies
import JSZip from 'jszip';
import {saveAs} from 'file-saver';

const debug = require('debug')('MTME:Helpers:Manifest');

const manifestIndex = 0;
const htmlIndex = 1;

class Manifest {

	static ERROR = 'ERROR';
	static PARSED = 'PARSED';

	constructor() {
		this.mediaNode = document.createElement('div');
		this.mediaNode.mediaTag = {
			options: {
				dependencyLoader: {
					catchLoaderErrors: true
				}
			}
		};
		this.files = [];
		this.files[manifestIndex] = {type: 'manifest', filename: 'manifest.json', source: '', url: null, mode: 'json'};
		this.files[htmlIndex] = {type: 'html', filename: 'index.html', source: '', url: null, mode: 'html'};
		this.editingFileIndex = manifestIndex;
		this.setManifestSource(json2str({medias: []}));
	}

	getManifestSource() {
		return this.files[manifestIndex].source;
	}

	getManifestFilename() {
		return this.files[manifestIndex].filename;
	}

	getManifestUrl() {
		return this.files[manifestIndex].url;
	}

	getHtmlSource() {
		return this.files[htmlIndex].source;
	}

	getHtmlSourceDoc() {
		const source = this.getHtmlSource();
		const sourceDoc = source.replace('manifest.json', this.getManifestUrl());
		return sourceDoc;
	}

	getHtmlFilename() {
		return this.files[htmlIndex].filename;
	}

	getType() {
		return this.files[this.editingFileIndex].type;
	}

	getPackageFilename() {
		return 'media-tag-package.zip';
	}

	getState() {
		return {
			source: this.files[this.editingFileIndex].source,
			url: this.getManifestUrl(),
			mode: this.files[this.editingFileIndex].mode,
			type: this.getType(),
			status: this.status,
			statusError: this.statusError,
			parsed: this.parsed,
			files: this.files,
			htmlUrl: this.files[htmlIndex].url,
			htmlSourceDoc: this.getHtmlSourceDoc()
		};
	}

	setManifestSource(newManifestSource) {
		try {
			this.files[manifestIndex].source = newManifestSource;
			const manifestParsed = JSON.parse(this.getManifestSource());
			this.parsed = {};
			this.parsed.medias = manifestParsed.medias.map(m => {
				const newMedia = {};
				newMedia.mediaObj = new MediaObject(m, this.mediaNode);
				newMedia.preview = newMedia.mediaObj.DOMElements;
				newMedia.type = newMedia.mediaObj.contentType;
				newMedia.rules = newMedia.mediaObj.rulesArray;
				newMedia.rulesCount = newMedia.rules.length;
				return newMedia;
			});
			this.status = Manifest.PARSED;
			// TODO: refactor download file to add use this url
			this.updateManifestUrl();
		} catch (err) {
			debug('err', err);
			this.statusError = err;
			this.status = Manifest.ERROR;
		}
	}

	setHtmlSource(newHtmlSource) {
		this.files[htmlIndex].source = newHtmlSource;
		this.updateHtmlUrl();
	}

	updateManifestUrl() {
		const data = new Blob([this.getManifestSource()], {type: 'application/json'});

		// If we are replacing a previously generated file we need to
		// manually revoke the object URL to avoid memory leaks.
		if (this.files[manifestIndex].url !== null) {
			window.URL.revokeObjectURL(this.files[manifestIndex].url);
		}

		this.files[manifestIndex].url = window.URL.createObjectURL(data);
	}

	updateHtmlUrl() {
		const data = new Blob([this.getHtmlSource()], {type: 'text/html'});

		// If we are replacing a previously generated file we need to
		// manually revoke the object URL to avoid memory leaks.
		if (this.files[htmlIndex].url !== null) {
			window.URL.revokeObjectURL(this.files[htmlIndex].url);
		}

		this.files[htmlIndex].url = window.URL.createObjectURL(data);
	}

	downloadPackage() {
		const filename = this.getPackageFilename();
		const mediaTagUrl = 'media-tag.webcomponent.js';
		debug('downloadPackage', filename);
		fetch(mediaTagUrl)
		.then(response => response.text())
		.then(mediaTagSource => {
			const zip = new JSZip();
			zip.file(this.getManifestFilename(), this.getManifestSource());
			zip.file(this.getHtmlFilename(), this.getHtmlSource());
			zip.file(mediaTagUrl, mediaTagSource);
			zip.generateAsync({type: 'blob'})
			.then(content => {
				debug('finished generating zip');
				saveAs(content, filename);
			})
			.catch(err => {
				throw err;
			});
		});
	}

	changeFileType(newFileType) {
		const newIndex = this.files.reduce((p, c, i) => {
			return p === -1 && c.type === newFileType ? i : p;
		}, -1);
		if (newIndex === -1) {
			throw new Error(`File type ${newFileType} not found`);
		}
		this.editingFileIndex = newIndex;
	}
}

module.exports = Manifest;
