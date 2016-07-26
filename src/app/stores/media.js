'use strict';

import Reflux from 'reflux';
// Need to be full path, import {MediaActions} from 'app'; makes a circular dependency
import MediaActions from 'app/actions/media';

const debug = require('debug')('MTME:Stores:Media');

const MediaStore = Reflux.createStore({
	// Base Store //

	listenables: MediaActions,

	init() {
		debug('init');
		this.state = {};
		this.state.media = {
			content: '',
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
	}

	// Methods //
});

const initialState = {
	media: {
		content: '',
		rules: []
	}
};

MediaStore.getInitialState = () => {
	return Object.assign({}, initialState);
};

MediaStore.createRule = (monitor, state, action, flag, editting) => {
	return {
		monitor,
		state,
		action,
		flag,
		editting
	};
};

module.exports = MediaStore;
