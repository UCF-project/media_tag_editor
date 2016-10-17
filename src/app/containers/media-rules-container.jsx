'use strict';

import {MediaRules, RuleActions, RuleStore} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

const debug = require('debug')('MTME:Containers:MediaRulesContainer');

const MediaRulesContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = RuleStore.getInitialState();
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleInsertRule = () => {
		RuleActions.insertRule();
	}

	handleDeleteRule = e => {
		debug('handleDeleteRule', arguments);
		debug('handleDeleteRule e', e.currentTarget.dataset.itemIndex);
		RuleActions.deleteRule(e.currentTarget.dataset.itemIndex);
	}

	handleSaveRule = e => {
		const itemIndex = e.currentTarget.dataset.itemIndex;
		debug('handleSaveRule', `input[name=monitor_${itemIndex}Input]`);
		const newRule = RuleStore.createRule(
			document.querySelector(`input[name=monitor_${itemIndex}Input]`).value,
			document.querySelector(`input[name=state_${itemIndex}Input]`).value,
			document.querySelector(`input[name=action_${itemIndex}Input]`).value,
			document.querySelector(`input[name=flag_${itemIndex}Input]`).value,
			false,
			false);
		RuleActions.saveRule(itemIndex, newRule);
	}

	handleEditRule = e => {
		RuleActions.editRule(e.currentTarget.dataset.itemIndex);
	}

	handleCancelEditRule = e => {
		RuleActions.cancelEditRule(e.currentTarget.dataset.itemIndex);
	}

	render() {
		return (
			<MediaRules
				rules={this.state.rule.rules}
				editable={this.props.editable}
				onInsertRule={this.handleInsertRule}
				onDeleteRule={this.handleDeleteRule}
				onSaveRule={this.handleSaveRule}
				onEditRule={this.handleEditRule}
				onCancelEditRule={this.handleCancelEditRule}
				/>
		);
	}

	componentDidMount() {
		this.unsubscribe = RuleStore.listen(this.handleStateChange);
		RuleActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

MediaRulesContainer.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaRulesContainer.propTypes = {
	editable: React.PropTypes.bool
};

module.exports = MediaRulesContainer;
