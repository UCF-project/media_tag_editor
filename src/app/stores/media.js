'use strict';

import Reflux from 'reflux';
// Need to be full path, import {MediaActions} from 'app'; makes a circular dependency
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies
import MediaActions from 'app/actions/media';  // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest';  // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Media');

let initialState = {};

const MediaStore = Reflux.createStore({
	// Base Store //

	listenables: MediaActions,

	init() {
		debug('init');
		this.state = {};
	},

	// Actions //

	onUpdateContentURL(newContent) {
		debug('onUpdateContent', newContent);
		this.state.media.contentURL = newContent;
		this.state.media.contentValueType = MediaStore.TYPE_URL;
		this.onStateCast();
	},

	onUpdateContentObject(newContent) {
		debug('onUpdateContent', newContent);
		this.state.media.contentObject = newContent;
		this.state.media.contentValueType = MediaStore.TYPE_OBJECT;
		this.onStateCast();
	},

	onStateCast() {
		debug('onStateCast', this.state);
		this.trigger(this.state);
	},

	onInsertRule() {
		debug('onAddNewRule');
		this.state.media.rules.push(MediaStore.createRule('', '', '', '', true));
		this.onStateCast();
	},

	onDeleteRule(ruleIndex) {
		debug('onDeleteRule');
		this.state.media.rules.splice(ruleIndex, 1);
		this.onStateCast();
	},

	onSaveRule(ruleIndex, ruleContent) {
		debug('onSaveRule');
		this.state.media.rules[ruleIndex] = ruleContent;
		this.onStateCast();
	},

	onEditRule(ruleIndex) {
		debug('onEditRule');
		this.state.media.rules[ruleIndex].editting = true;
		this.onStateCast();
	},

	onCancelEditRule(ruleIndex) {
		debug('onCancelEditRule');
		this.state.media.rules[ruleIndex].editting = false;
		this.onStateCast();
	},

	onGotoStep(stepIndex) {
		if (stepIndex > MediaStore.maxSteps) {
			throw new Error('Tried to go higher than max steps.');
		} else if (stepIndex < 0) {
			throw new Error('Invalid negative step.');
		}
		this.state.media.dialog.stepIndex = stepIndex;
		this.onStateCast();
	},

	onNextStep() {
		this.state.media.dialog.stepIndex++;
		if (this.state.media.dialog.stepIndex > MediaStore.maxSteps) {
			throw new Error('Tried to go next step but it is already at last step.');
		}
		this.onStateCast();
	},

	onClose() {
		this.state.media.dialog.open = false;
		this.onStateCast();
	},

	onOpenUpdate(mediaIndex, mediaObject) {
		debug('onOpenUpdate', mediaIndex, mediaObject);
		this.state = {};
		this.state.media = MediaStore.convertToMediaState(mediaObject);
		this.state.media.dialog.type = MediaStore.UPDATE;
		this.state.media.dialog.open = true;
		this.state.media.dialog.mediaIndex = mediaIndex;
		debug('state', this.state);
		this.onStateCast();
	},

	onOpenNew() {
		debug('onOpenNew');
		this.state = MediaStore.getInitialState();
		this.state.media.dialog.type = MediaStore.NEW;
		this.state.media.dialog.open = true;
		this.onStateCast();
	},

	onSave() {
		const newMedia = MediaStore.convertToMediaObject(this.state.media);
		// TODO: will depend on the open params
		if (this.state.media.dialog.type === MediaStore.NEW) {
			ManifestActions.insertMedia(newMedia);
		} else if (this.state.media.dialog.type === MediaStore.UPDATE) {
			ManifestActions.updateMedia(this.state.media.dialog.mediaIndex, newMedia);
		} else {
			throw new Error('Try to save with undefined type state.');
		}
		MediaActions.close();
	},

	onSetUrl(newUrl) {
		MediaActions.updateContentURL(newUrl);
		MediaActions.setContentTabIndex(0);
	},

	onSetContentTabIndex(newIndex) {
		debug('onSetContentTabIndex');
		this.state.media.dialog.contentTabIndex = newIndex;
		this.state.media.dialog.innerContentTabIndex = 'main';
		if (newIndex === 0) {
			this.state.media.contentValueType = MediaStore.TYPE_URL;
		} else if (newIndex === 2) {
			this.state.media.contentValueType = MediaStore.TYPE_OBJECT;
		}
		this.onStateCast();
	},

	onSetUploadError(error) {
		this.state.media.dialog.uploadError = error;
		this.onStateCast();
	},

	onSetInnerContentTabIndex(newInnerIndex, files) {
		this.state.media.dialog.innerContentTabIndex = newInnerIndex;
		this.state.media.dialog.innerContentFiles = files;
		this.state.media.dialog.innerContentStatus = '';
		this.onStateCast();
	},

	onSetInnerStatus(status, statusMessage) {
		this.state.media.dialog.innerContentStatus = status;
		this.state.media.dialog.innerContentStatusMessage = statusMessage;
		this.onStateCast();
	}
});

MediaStore.getInitialState = () => {
	return JSON.parse(JSON.stringify(initialState));
};

MediaStore.maxSteps = 3;

MediaStore.createRule = (monitor, state, action, flag, editting) => {
	return {
		monitor,
		state,
		action,
		flag,
		editting
	};
};

MediaStore.convertToMediaObject = mediaState => {
	debug('convertToMediaObject', mediaState);
	const mediaObject = {};
	if (mediaState.contentValueType === MediaStore.TYPE_URL) {
		mediaObject.content = mediaState.contentURL;
	} else if (mediaState.contentValueType === MediaStore.TYPE_OBJECT) {
		mediaObject.content = JSON.parse(mediaState.contentObject);
	} else {
		// TODO: check why this error is been caught somewhere
		debug('error', mediaState.contentValueType);
		throw new Error('Could not convert state to media object');
	}
	if (mediaState.rules.length) {
		mediaObject.rules = {};
		mediaState.rules.forEach(r => {
			mediaObject.rules[r.monitor] = mediaObject.rules[r.monitor] || {};
			mediaObject.rules[r.monitor][r.state] = mediaObject.rules[r.monitor][r.state] || {};
			mediaObject.rules[r.monitor][r.state][r.action] = mediaObject.rules[r.monitor][r.state][r.action] || {};
			mediaObject.rules[r.monitor][r.state][r.action] = r.flag;
		});
	}
	debug('mediaObject', mediaObject);
	return mediaObject;
};

// TODO: refactor this code so to have only one place with changes
// to the state
MediaStore.convertToMediaState = mediaObject => {
	debug('convertToMediaState', mediaObject, typeof mediaObject.content);
	const mediaState = MediaStore.getInitialState().media;
	if (typeof mediaObject.content === 'string') {
		mediaState.contentURL = mediaObject.content;
		mediaState.contentValueType = MediaStore.TYPE_URL;
		mediaState.dialog.contentTabIndex = 0;
	} else if (typeof mediaObject.content === 'object') {
		mediaState.contentObject = json2str(mediaObject.content);
		mediaState.contentValueType = MediaStore.TYPE_OBJECT;
		mediaState.dialog.contentTabIndex = 2;
	} else {
		throw new Error('Could not convert media object to state');
	}
	mediaState.rules = [];
	if ('rules' in mediaObject) {
		const rulesKeys = Object.keys(mediaObject.rules);
		rulesKeys.forEach(rk => {
			const stateKeys = Object.keys(mediaObject.rules[rk]);
			stateKeys.forEach(sk => {
				const actionKeys = Object.keys(mediaObject.rules[rk][sk]);
				actionKeys.forEach(ak => {
					mediaState.rules.push(MediaStore.createRule(rk, sk, ak, mediaObject.rules[rk][sk][ak], false));
				});
			});
		});
	}
	return mediaState;
};

MediaStore.NEW = 'NEW';
MediaStore.UPDATE = 'UPDATE';

MediaStore.TYPE_URL = 'URL';
MediaStore.TYPE_OBJECT = 'OBJECT';

initialState = {
	media: {
		// TODO: separate window state from media state
		dialog: {
			open: false,
			stepIndex: 0,
			type: null,
			mediaIndex: null,
			contentTabIndex: 0,
			uploadError: null,
			innerContentTabIndex: 'main'
		},
		contentURL: '',
		contentObject: '',
		contentValueType: MediaStore.TYPE_URL,
		rules: []
	}
};

module.exports = MediaStore;
