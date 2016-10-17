'use strict';

import React from 'react';
import MediaList from 'app/components/media-list'; // eslint-disable-line import/no-extraneous-dependencies
import ErrorBox from 'app/components/error-box'; // eslint-disable-line import/no-extraneous-dependencies
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

	handleEditRules = mediaIndex => {
		ManifestActions.editRules(mediaIndex);
	}

	handleOpenNewMedia() {
		MediaActions.openNew();
	}

	render() {
		debug('render', this.state);

		const style = {
			padding: 10,
			boxSizing: 'border-box',
			overflow: 'auto',
			height: '100%'
		};

		let panelLeft = <div style={style}/>;

		if (this.state.manifest && this.state.manifest.status === ManifestStore.ERROR) {
			panelLeft = <div style={style}><ErrorBox error={this.state.manifest.statusError}/></div>;
		}
		if (this.state.manifest && this.state.manifest.status === ManifestStore.PARSED) {
			panelLeft = (
				<div style={style}>
					<MediaList
						onDeleteMedia={this.handleDeleteMedia}
						onEditMedia={this.handleEditMedia}
						onEditRules={this.handleEditRules}
						onShowMedia={this.handleShowMedia}
						onOpenNewMedia={this.handleOpenNewMedia}
						manifestParsed={this.state.manifest.parsed}
						/>
				</div>
			);
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
