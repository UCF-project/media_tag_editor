'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import GridSettingsContainer from 'app/containers/grid-settings-container'; // eslint-disable-line import/no-extraneous-dependencies
import GridContentContainer from 'app/containers/grid-content-container'; // eslint-disable-line import/no-extraneous-dependencies
import EditorSettingsContainer from 'app/containers/editor-settings-container'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Views:Editor');

const Editor = class extends React.Component {
	render() {
		debug('render', this.state);
		return (
			<div>
				<AppBar
					title="Media Tag Manifest Editor"
					showMenuIconButton={false}
					>
					<GridSettingsContainer style={{marginTop: 8}}/>
					<EditorSettingsContainer style={{marginTop: 8}}/>
				</AppBar>
				<GridContentContainer style={{height: 'calc(100vh - 64px)'}}>
					{this.props.children}
				</GridContentContainer>
			</div>
		);
	}
};

Editor.propTypes = {
	children: React.PropTypes.node
};

module.exports = Editor;
