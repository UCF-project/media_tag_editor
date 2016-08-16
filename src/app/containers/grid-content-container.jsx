'use strict';

import React from 'react';
import GridContent from 'app/components/grid-content'; // eslint-disable-line import/no-extraneous-dependencies
import CodeEditor from 'app/components/code-editor'; // eslint-disable-line import/no-extraneous-dependencies
import MediaTagWrapper from 'app/components/media-tag-wrapper'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import EditorStore from 'app/stores/editor'; // eslint-disable-line import/no-extraneous-dependencies
import EditorActions from 'app/actions/editor'; // eslint-disable-line import/no-extraneous-dependencies
import Templates from 'app/manifests'; // eslint-disable-line import/no-extraneous-dependencies
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Containers:GridContentContainer');

class GridContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleCodeChange = newValue => {
		debug('handleChange', newValue);
		ManifestActions.change(newValue);
	}

	componentDidMount() {
		this.unsubscribe = [];
		this.unsubscribe.push(ManifestStore.listen(this.handleStateChange));
		this.unsubscribe.push(EditorStore.listen(this.handleStateChange));
		ManifestActions.change(json2str(Templates.manifests[0].json));
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
			Source: (<div key="Source" style={{height: '100%', width: '100%'}}>
				{this.state.manifest && (
					<CodeEditor
						name="manifest"
						onChange={this.handleCodeChange}
						value={this.state.manifest.source}
						/>
				)}
			</div>),
			View: <div key="View">{this.state.manifest && <MediaTagWrapper src={this.state.manifest.url}/>}</div>
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
