'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
import CodeEditor from 'app/components/code-editor'; // eslint-disable-line import/no-extraneous-dependencies
import CodeEditorSettings from 'app/components/code-editor-settings'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import * as Templates from 'app/manifests'; // eslint-disable-line import/no-extraneous-dependencies
import {json2str} from 'app/helpers/utils'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Views:Editor');

const Editor = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.handleStateChange = newState => {
			this.setState(newState);
		};

		this.handleAddMedia = media => {
			ManifestActions.insertMedia(media);
		};

		this.handleDeleteMedia = mediaIndex => {
			ManifestActions.deleteMedia(mediaIndex);
		};
	}

	handleChange(newValue) {
		debug('handleChange', newValue);
		ManifestActions.change(newValue);
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
				boxSizing: 'border-box',
				overflow: 'auto'
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
				<div style={{display: 'flex', height: 'calc(100vh - 64px)'}}>
					<div style={styles.panelLeft}>
						{this.props.children}
					</div>
					<div style={styles.panelRight}>
						<CodeEditorSettings/>
						{this.state.manifest && <CodeEditor name="manifest" onChange={this.handleChange} value={this.state.manifest.source}/>}
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

Editor.propTypes = {
	children: React.PropTypes.node
};

module.exports = Editor;
