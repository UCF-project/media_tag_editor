'use strict';

import React from 'react';
import GridContent from 'app/components/grid-content'; // eslint-disable-line import/no-extraneous-dependencies
import SourceSectionContainer from 'app/containers/source-section-container'; // eslint-disable-line import/no-extraneous-dependencies
import ViewSectionContainer from 'app/containers/view-section-container'; // eslint-disable-line import/no-extraneous-dependencies
import EditorStore from 'app/stores/editor'; // eslint-disable-line import/no-extraneous-dependencies
import EditorActions from 'app/actions/editor'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Containers:GridContentContainer');

class GridContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
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
		const {
			children,
			...others
		} = this.props;
		debug('render');

		const sections = {
			Media: children,
			Source: <SourceSectionContainer/>,
			View: <ViewSectionContainer/>
		};

		if (this.state.editor) {
			const orderedSections = this.state.editor.sections.reduce((p, c) => {
				if (c.visible) {
					debug('id', c.id, 'section', sections[c.id]);
					p.push(sections[c.id]);
				}
				return p;
			}, []);

			return (
				<GridContent
					{...others}
					alignment={this.state.editor.alignment}
					sections={orderedSections}
					/>
			);
		}
		return null;

	// 	order: [
	// 	{section: 'Media', visible: true, onClick: () => {}},
	// 	{section: 'Source', visible: true, onClick: () => {}},
	// 	{section: 'View', visible: true, onClick: () => {}}
	// ],
	// onOrder: () => {},
	// alignment: GridSettings.ALIGNMENT_GRID11,
	// onAlignment: () => {}

		// return (
		// 	<div style={this.props.style}>
		// 		<div style={{width: '100%', height: '60%', display: 'flex'}}>
		// 			<div style={stylePanelLeft}>
		// 				{sections[0]}
		// 			</div>
		// 			<div style={stylePanelRight}>
		// 				{sections[1]}
		// 			</div>
		// 		</div>
		// 		<div style={{width: '100%', height: '40%'}}>
		// 			{sections[2]}
		// 		</div>
		// 	</div>
		// );
	}
}

GridContentContainer.propTypes = {
	children: React.PropTypes.node
};

module.exports = GridContentContainer;
