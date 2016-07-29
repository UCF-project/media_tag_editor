'use strict';

import Reflux from 'reflux';
// Need to be full path, import {MediaActions} from 'app'; makes a circular dependency
import MediaActions from 'app/actions/media';  // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest';  // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Media');

const initialState = {
	media: {
		dialog: {
			open: false,
			stepIndex: 0,
			type: null,
			mediaIndex: null,
			contentTabIndex: 0
		},
		content: '',
		rules: []
	}
};

const MediaStore = Reflux.createStore({
	// Base Store //

	listenables: MediaActions,

	init() {
		debug('init');
		this.state = {};
	},

	// Actions //

	onUpdateContent(newContent) {
		debug('onUpdateContent', newContent);
		this.state.media.content = newContent;
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
		this.state = MediaStore.getInitialState();
		debug('1');
		const dialogState = Object.assign({}, this.state.media.dialog);
		debug('2');
		this.state.media = MediaStore.convertToMediaState(mediaObject);
		debug('3');
		this.state.media.dialog = dialogState;
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
		MediaActions.updateContent(newUrl);
		MediaActions.setContentTabIndex(0);
	},

	onSetContentTabIndex(newIndex) {
		debug('onSetContentTabIndex');
		this.state.media.dialog.contentTabIndex = newIndex;
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
	const mediaObject = {};
	mediaObject.content = mediaState.content;
	if (mediaState.rules.length) {
		mediaObject.rules = {};
		mediaState.rules.forEach(r => {
			mediaObject.rules[r.monitor] = mediaObject.rules[r.monitor] || {};
			mediaObject.rules[r.monitor][r.state] = mediaObject.rules[r.monitor][r.state] || {};
			mediaObject.rules[r.monitor][r.state][r.action] = mediaObject.rules[r.monitor][r.state][r.action] || {};
			mediaObject.rules[r.monitor][r.state][r.action] = r.flag;
		});
	}
	return mediaObject;
};

MediaStore.convertToMediaState = mediaObject => {
	const mediaState = {};
	mediaState.content = mediaObject.content;
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

module.exports = MediaStore;
