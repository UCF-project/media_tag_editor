'use strict';

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import Templates from 'app/templates'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Containers:EditorSettingsContainer');

const EditorSettingsContainer = class extends React.Component {
	constructor(props) {
		super(props);

		this.handleLoadTemplate = index => {
			debug('handleLoadTemplate', arguments);
			ManifestActions.changeToTemplateIndex(index);
		};

		this.handleTempleClick = Templates.manifests.map((_, i) => {
			return this.handleLoadTemplate.bind(null, i);
		});

		this.handleDownload = () => {
			ManifestActions.download();
		};

		this.handleDownloadPackage = () => {
			ManifestActions.downloadPackage();
		};

		this.handleClickUpload = () => {
			this.fileUpload.click();
		};

		this.handleUpload = e => {
			ManifestActions.upload(e);
		};
	}

	setRef = fileUpload => {
		this.fileUpload = fileUpload;
	}

	render() {
		const templates = Templates.manifests.map((m, i) => <MenuItem key={i} value={i} onTouchTap={this.handleTempleClick[i]} primaryText={m.label}/>);
		return (
			<div {...this.props}>
				<IconMenu
					iconButtonElement={<IconButton iconStyle={{color: this.context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-settings"/>}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					>
					<MenuItem
						desktop
						primaryText="Load Template"
						leftIcon={<FontIcon style={{top: -10}} className="mdi mdi-menu-left"/>}
						menuItems={templates}
						/>
					<Divider/>
					<MenuItem onTouchTap={this.handleDownload} primaryText="Download manifest" leftIcon={<FontIcon style={{top: -10}} className="mdi mdi-download"/>}/>
					<MenuItem onTouchTap={this.handleDownloadPackage} primaryText="Download package" leftIcon={<FontIcon style={{top: -10}} className="mdi mdi-package-down"/>}/>
					<MenuItem onTouchTap={this.handleClickUpload} primaryText="Upload" leftIcon={<FontIcon style={{top: -10}} className="mdi mdi-upload"/>}/>
				</IconMenu>
				<input
					ref={this.setRef}
					type="file"
					style={{display: 'none'}}
					onChange={this.handleUpload}
					/>
			</div>
		);
	}
};

EditorSettingsContainer.contextTypes = {
	muiTheme: React.PropTypes.object
};

module.exports = EditorSettingsContainer;
