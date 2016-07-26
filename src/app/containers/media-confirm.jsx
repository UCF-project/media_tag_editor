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
		return <MediaConfirm media={this.state.media.content} rules={this.state.media.rules}/>;
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
