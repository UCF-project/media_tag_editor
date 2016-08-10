'use strict';

import {MediaRules, MediaActions, MediaStore} from 'app';
import React from 'react';

const debug = require('debug')('MTME:Containers:MediaRulesContainer');

const MediaRulesContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleInsertRule = () => {
		MediaActions.insertRule();
	}

	handleDeleteRule = e => {
		debug('handleDeleteRule', arguments);
		debug('handleDeleteRule e', e.currentTarget.dataset.itemIndex);
		MediaActions.deleteRule(e.currentTarget.dataset.itemIndex);
	}

	handleSaveRule = e => {
		const itemIndex = e.currentTarget.dataset.itemIndex;
		const newRule = MediaStore.createRule(
			document.querySelector(`input[name=monitor_${itemIndex}]`).value,
			document.querySelector(`input[name=state_${itemIndex}]`).value,
			document.querySelector(`input[name=action_${itemIndex}]`).value,
			document.querySelector(`input[name=flag_${itemIndex}]`).value,
			false);
		MediaActions.saveRule(itemIndex, newRule);
	}

	handleEditRule = e => {
		MediaActions.editRule(e.currentTarget.dataset.itemIndex);
	}

	render() {
		return (
			<MediaRules
				height="30vh"
				rules={this.state.media.rules}
				editable={this.props.editable}
				onInsertRule={this.handleInsertRule}
				onDeleteRule={this.handleDeleteRule}
				onSaveRule={this.handleSaveRule}
				onEditRule={this.handleEditRule}
				/>
		);
	}

	componentDidMount() {
		this.unsubscribe = MediaStore.listen(this.handleStateChange);
		MediaActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

MediaRulesContainer.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaRulesContainer.propTypes = {
	rules: React.PropTypes.array,
	editable: React.PropTypes.bool
};

module.exports = MediaRulesContainer;
