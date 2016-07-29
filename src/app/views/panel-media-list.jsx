'use strict';

import React from 'react';
import MediaList from 'app/components/editor/media-list'; // eslint-disable-line import/no-extraneous-dependencies
import ErrorBox from 'app/components/editor/error-box'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import MediaActions from 'app/actions/media'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Views:PanelMediaList');

class PanelMediaList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleDeleteMedia = mediaIndex => {
		ManifestActions.deleteMedia(mediaIndex);
	}

	handleEditMedia = mediaIndex => {
		ManifestActions.editMedia(mediaIndex);
	}

	handleShowMedia = mediaIndex => {
		ManifestActions.showMedia(mediaIndex);
	}

	handleOpenNewMedia() {
		MediaActions.openNew();
	}

	render() {
		debug('render', this.state);

		let panelLeft = <div/>;

		if (this.state.manifest && this.state.manifest.status === ManifestStore.ERROR) {
			panelLeft = <ErrorBox error={this.state.manifest.statusError}/>;
		}
		if (this.state.manifest && this.state.manifest.status === ManifestStore.PARSED) {
			panelLeft = (<MediaList
				onDeleteMedia={this.handleDeleteMedia}
				onEditMedia={this.handleEditMedia}
				onShowMedia={this.handleShowMedia}
				onOpenNewMedia={this.handleOpenNewMedia}
				manifestParsed={this.state.manifest.parsed}
				/>);
		}

		return panelLeft;
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		this.unsubscribe = ManifestStore.listen(this.handleStateChange);
		ManifestActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
}

PanelMediaList.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = PanelMediaList;
