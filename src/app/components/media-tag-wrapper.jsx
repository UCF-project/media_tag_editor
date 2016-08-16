'use strict';

import React from 'react';

const debug = require('debug')('MTME:Components:MediaTagWrapper');

// Inspiration https://github.com/esportsguy/react-videojs/blob/master/src/index.js

class MediaTagWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		debug('here');
	}

	render() {
		return <div><media-tag key={this.props.src} src={this.props.src}/></div>;
	}
}

MediaTagWrapper.propTypes = {
	src: React.PropTypes.string
};

module.exports = MediaTagWrapper;
