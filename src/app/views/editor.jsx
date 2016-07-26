'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';

import CodeEditor from 'app/components/editor/code-editor'; // eslint-disable-line import/no-extraneous-dependencies
import MediaList from 'app/components/editor/media-list'; // eslint-disable-line import/no-extraneous-dependencies
import CodeEditorSettings from 'app/components/editor/code-editor-settings'; // eslint-disable-line import/no-extraneous-dependencies

import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies

import * as Templates from 'app/extras/manifests'; // eslint-disable-line import/no-extraneous-dependencies
import {json2str} from 'app/extras/utils'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Views:Editor');

const Editor = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.handleStateChange = newState => {
			this.setState(newState);
		};
	}

	componentDidMount() {
		this.unsubscribe = ManifestStore.listen(this.handleStateChange);
		ManifestActions.change(json2str(Templates.manifests[0].json));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		debug('render', this.state);
		const styles = {
			h1: {
				margin: '5px 0px',
				fontWeight: 400,
				color: 'rgba(0,0,0,.87)'
			},
			panelRight: {
				width: '50%',
				display: 'inline-block',
				verticalAlign: 'top'
			},
			panelLeft: {
				width: '50%',
				display: 'inline-block',
				verticalAlign: 'top',
				padding: 10,
				boxSizing: 'border-box'
			},
			item: {
				paddingTop: 14,
				marginTop: 10,
				position: 'relative'
			},
			button: {
				marginTop: 10
			},
			buttonIcon: {
				root: {
					position: 'absolute',
					right: 0,
					top: 5
				},
				icon: {
					color: this.context.muiTheme.palette.accent1Color
				}
			}
		};

		return (
			<div>
				<AppBar
					title="Media Tag Manifest Editor"
					showMenuIconButton={false}
					// iconElementLeft={<IconButton iconClassName="mdi mdi-close"/>}
					// iconElementRight={<IconButton iconClassName="mdi mdi-content-save"/>}
					/>
				<div style={{display: 'flex'}}>
					<div style={styles.panelLeft}>
						{this.state.manifest && this.state.manifest.status === ManifestStore.ERROR && <p>Error</p>}
						{this.state.manifest && this.state.manifest.status === ManifestStore.PARSED && <MediaList manifestParsed={this.state.manifest.parsed}/>}
					</div>
					<div style={styles.panelRight}>
						<CodeEditorSettings/>
						{this.state.manifest && <CodeEditor manifestSource={this.state.manifest.source}/>}
					</div>
				</div>

			</div>
		);
	}
};

Editor.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = Editor;
