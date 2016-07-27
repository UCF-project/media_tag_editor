'use strict';

import Reflux from 'reflux';
// Need to be full path, import {MediaActions} from 'app'; makes a circular dependency
import MediaActions from 'app/actions/media';  // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest';  // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Media');

const MediaStore = Reflux.createStore({
	// Base Store //

	listenables: MediaActions,

	init() {
		debug('init');
		this.state = {};
		this.state.media = {
			content: '',
			dialog: {
				open: false,
				stepIndex: 0
			},
			rules: [
				{
					monitor: 'netxwork',
					state: 'up',
					action: 'visibility',
					flag: true
				},
				{
					monitor: 'network',
					state: 'down',
					action: 'visibility',
					flag: false,
					editting: false
				},
				{
					monitor: 'network',
					state: 'down',
					action: 'style',
					flag: 'color: red',
					editting: true
				},
				{
					monitor: 'network',
					state: 'up',
					action: 'style',
					flag: 'color: green',
					editting: true
				}
			]
		};
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

	onOpen() {
		this.state.media.dialog.open = true;
		this.onStateCast();
	},

	onSave() {
		const newMedia = MediaStore.convertToMediaObject(this.state.media);
		// TODO: will depend on the open params
		ManifestActions.insertMedia(newMedia);
		MediaActions.close();
	}
});

const initialState = {
	media: {
		dialog: {
			open: false,
			stepIndex: 0
		},
		content: '',
		rules: []
	}
};

MediaStore.getInitialState = () => {
	return Object.assign({}, initialState);
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
	mediaObject.rules = {};
	mediaState.rules.forEach(r => {
		mediaObject.rules[r.monitor] = mediaObject.rules[r.monitor] || {};
		mediaObject.rules[r.monitor][r.state] = mediaObject.rules[r.monitor][r.state] || {};
		mediaObject.rules[r.monitor][r.state][r.action] = mediaObject.rules[r.monitor][r.state][r.action] || {};
		mediaObject.rules[r.monitor][r.state][r.action] = r.flag;
	});
	return mediaObject;
};

module.exports = MediaStore;
