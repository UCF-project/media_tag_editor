'use strict';

import {ManifestActions, ManifestStore, ErrorBox, MediaBoxFull} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {IconButton} from 'material-ui';

const debug = require('debug')('MTME:Views:PanelMedia');

const PanelMedia = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.handleStateChange = newState => {
			this.setState(newState);
		};

		this.handleDeleteMedia = mediaIndex => {
			ManifestActions.deleteMedia(mediaIndex);
		};

		this.handleListMedia = () => {
			ManifestActions.listMedia();
		};
	}

	componentDidMount() {
		this.unsubscribe = ManifestStore.listen(this.handleStateChange);
		ManifestActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		debug('render', this.state);

		let mediaPanel = <p>Loading</p>;
		const mediaIndex = this.props.routeParams.id ? parseInt(this.props.routeParams.id, 10) : false;

		if (mediaIndex !== false && this.state.manifest && this.state.manifest.parsed.medias) {
			if (mediaIndex >= this.state.manifest.parsed.medias.length) {
				const error = new Error('Media index does not exist.');
				mediaPanel = <ErrorBox error={error}/>;
			} else {
				mediaPanel = <MediaBoxFull media={this.state.manifest.parsed.medias[mediaIndex]}/>;
			}
		}

		return (
			<div style={{overflow: 'auto', height: '100%', width: '100%'}}>
				<IconButton onClick={this.handleListMedia} tooltipPosition="bottom-right" tooltip="Back to media list" iconStyle={{color: this.context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-arrow-left-bold"/>
				{mediaPanel}
			</div>
		);
	}
};

PanelMedia.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

PanelMedia.propTypes = {
	routeParams: React.PropTypes.object
};

module.exports = PanelMedia;
