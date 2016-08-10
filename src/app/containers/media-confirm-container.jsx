'use strict';

import {MediaConfirm, MediaActions, MediaStore} from 'app';
import React from 'react';

const MediaConfirmContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	render() {
		let mediaStr = '';
		if (this.state.media.contentValueType === MediaStore.TYPE_URL) {
			mediaStr = this.state.media.contentURL;
		} else if (this.state.media.contentValueType === MediaStore.TYPE_OBJECT) {
			mediaStr = this.state.media.contentObject;
		} else {
			throw new Error('Could not find media content.');
		}
		return <MediaConfirm media={mediaStr} rules={this.state.media.rules}/>;
	}

	componentDidMount() {
		this.unsubscribe = MediaStore.listen(this.handleStateChange);
		MediaActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

MediaConfirmContainer.contextTypes = {
	muiTheme: React.PropTypes.object
};

module.exports = MediaConfirmContainer;
