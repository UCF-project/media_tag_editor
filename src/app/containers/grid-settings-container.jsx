'use strict';

import React from 'react';
import GridSettings from 'app/components/grid-settings'; // eslint-disable-line import/no-extraneous-dependencies
import EditorStore from 'app/stores/editor'; // eslint-disable-line import/no-extraneous-dependencies
import EditorActions from 'app/actions/editor'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Containers:GridSettingsContainer');

class GridSettingsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleSort = newOrder => {
		EditorActions.changeOrder(newOrder);
	}

	handleAlignment = newAlignment => {
		EditorActions.changeAlignment(newAlignment);
	}

	handleSectionClick = sectionId => {
		EditorActions.toggleVisibility(sectionId);
	}

	componentDidMount() {
		this.unsubscribe = [];
		this.unsubscribe.push(EditorStore.listen(this.handleStateChange));
		EditorActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe.forEach(fn => fn());
	}

	render() {
		debug('render');
		const {
			...others
		} = this.props;
		if (this.state.editor) {
			return (
				<GridSettings
					{...others}
					alignment={this.state.editor.alignment}
					sections={this.state.editor.sections}
					onSort={this.handleSort}
					onAlignment={this.handleAlignment}
					onSectionClick={this.handleSectionClick}
					/>
			);
		}
		return null;
	}
}

module.exports = GridSettingsContainer;
