'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import * as Templates from 'app/extras/manifests'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Components:Editor:CodeEditorSettings');

const CodeEditorSettings = class extends React.Component {
	constructor(props) {
		super(props);

		this.handleLoadTemplate = index => {
			debug('handleLoadTemplate', arguments);
			ManifestActions.changeToTemplateIndex(index);
		};

		this.handlers = Templates.manifests.map((_, i) => {
			return this.handleLoadTemplate.bind(null, i);
		});

		this.handleDownload = () => {
			ManifestActions.download();
		};

		this.handleClickUpload = () => {
			const fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
			fileUploadDom.click();
		};

		this.handleUpload = e => {
			ManifestActions.upload(e);
		};
	}

	render() {
		const templates = Templates.manifests.map((m, i) => <MenuItem key={i} value={i} onTouchTap={this.handlers[i]} primaryText={m.label}/>);
		return (
			<div style={{position: 'absolute', right: 0, zIndex: 100}}>
				<IconMenu
					iconButtonElement={<IconButton iconClassName="mdi mdi-settings"/>}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					>
					<MenuItem
						desktop
						primaryText="Load Template"
						leftIcon={<FontIcon className="mdi mdi-menu-left"/>}
						menuItems={templates}
						/>
					<Divider/>
					<MenuItem onTouchTap={this.handleDownload} primaryText="Download" leftIcon={<FontIcon className="mdi mdi-download"/>}/>
					<MenuItem onTouchTap={this.handleClickUpload} primaryText="Upload" leftIcon={<FontIcon className="mdi mdi-upload"/>}/>
				</IconMenu>
				<input
					ref="fileUpload"
					type="file"
					style={{display: 'none'}}
					onChange={this.handleUpload}
					/>
			</div>
		);
	}
};

module.exports = CodeEditorSettings;
