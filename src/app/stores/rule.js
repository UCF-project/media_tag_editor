'use strict';

import Reflux from 'reflux';
// Need to be full path, import {RuleActions} from 'app'; makes a circular dependency
// import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies
import RuleActions from 'app/actions/rule';  // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest';  // eslint-disable-line import/no-extraneous-dependencies
import {hashHistory} from 'react-router';

const debug = require('debug')('MTME:Stores:Rule');

// let initialState = {};

const RuleStore = Reflux.createStore({
	// Base Store //

	listenables: RuleActions,

	init() {
		debug('init');
		this.state = {rule: {rules: [], editRules: []}};
	},

	// Actions //

	onOpenUpdate(mediaIndex, mediaJson) {
		debug('onOpenUpdate', mediaIndex, mediaJson);
		this.state.rule.mediaIndex = mediaIndex;
		this.state.rule.mediaJson = mediaJson;
		this.state.rule.rules = RuleStore.getRules(mediaJson);
		hashHistory.replace(`/${mediaIndex}/rules`);
	},

	onStateCast() {
		debug('onStateCast', this.state);
		this.trigger(this.state);
	},

	onInsertRule() {
		debug('onAddNewRule');
		const ruleIndex = this.state.rule.rules.length;
		this.state.rule.rules.push(RuleStore.createRule('', '', '', '', true, true));
		this.state.rule.editRules[ruleIndex] = JSON.parse(JSON.stringify(this.state.rule.rules[ruleIndex]));
		this.trigger(this.state);
	},

	onDeleteRule(ruleIndex) {
		debug('onDeleteRule');
		this.state.rule.rules.splice(ruleIndex, 1);
		RuleActions.stateCast();
		this.updateMediaSource();
	},

	onSaveRule(ruleIndex, ruleContent) {
		debug('onSaveRule');
		this.state.rule.rules[ruleIndex] = ruleContent;
		this.trigger(this.state);
		this.updateMediaSource();
	},

	onEditRule(ruleIndex) {
		debug('onEditRule');
		this.state.rule.rules[ruleIndex].editting = true;
		// Create a shallow copy
		this.state.rule.editRules[ruleIndex] = JSON.parse(JSON.stringify(this.state.rule.rules[ruleIndex]));
		this.trigger(this.state);
	},

	onEditRuleField(ruleIndex, field, value) {
		this.state.rule.editRules[ruleIndex][field] = value;
		this.trigger(this.state); // TODO: change to stateCast
	},

	onCancelEditRule(ruleIndex) {
		debug('onCancelEditRule');
		if (this.state.rule.rules[ruleIndex].newRule) {
			// If is a new rule and the user cancel it deletes the rule
			this.state.rule.rules.splice(ruleIndex, 1);
		} else {
			// Otherwise just pass to view mode
			this.state.rule.rules[ruleIndex].editting = false;
		}
		this.trigger(this.state);
	},

	// Methods //

	updateMediaSource() {
		const newMedia = RuleStore.convertToMediaObject(this.state.rule);
		ManifestActions.updateMedia(this.state.rule.mediaIndex, newMedia);
	}
});

RuleStore.getInitialState = () => {
	return {rule: {rules: []}};
};

RuleStore.createRule = (monitor, state, action, flag, editting, newRule) => {
	return {
		monitor,
		state,
		action,
		flag,
		editting,
		newRule
	};
};

RuleStore.convertToMediaObject = ruleState => {
	debug('convertToMediaObject', ruleState);
	const mediaObject = ruleState.mediaJson;
	try {
		if (ruleState.rules.length) {
			mediaObject.rules = {};
			ruleState.rules.forEach(r => {
				mediaObject.rules[r.monitor] = mediaObject.rules[r.monitor] || {};
				mediaObject.rules[r.monitor][r.state] = mediaObject.rules[r.monitor][r.state] || {};
				mediaObject.rules[r.monitor][r.state][r.action] = mediaObject.rules[r.monitor][r.state][r.action] || {};
				mediaObject.rules[r.monitor][r.state][r.action] = r.flag;
			});
		} else if ('rules' in mediaObject) {
			delete mediaObject.rules;
		}
	} catch (err) {
		debug('err', err);
	}
	debug('mediaObject', mediaObject);
	return mediaObject;
};

RuleStore.getRules = mediaObject => {
	debug('getRules', mediaObject);
	const rules = [];
	if ('rules' in mediaObject) {
		const rulesKeys = Object.keys(mediaObject.rules);
		rulesKeys.forEach(rk => {
			const stateKeys = Object.keys(mediaObject.rules[rk]);
			stateKeys.forEach(sk => {
				const actionKeys = Object.keys(mediaObject.rules[rk][sk]);
				actionKeys.forEach(ak => {
					rules.push(RuleStore.createRule(rk, sk, ak, mediaObject.rules[rk][sk][ak], false, false));
				});
			});
		});
	}
	return rules;
};

module.exports = RuleStore;
