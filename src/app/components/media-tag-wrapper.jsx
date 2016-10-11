'use strict';

import React from 'react';

const debug = require('debug')('MTME:Components:MediaTagWrapper');

// Inspiration https://github.com/esportsguy/react-videojs/blob/master/src/index.js

const MediaTagWrapper = props => {
	debug('render');
	return <div><media-tag key={props.src} src={props.src}/></div>;
};

MediaTagWrapper.propTypes = {
	src: React.PropTypes.string
};

module.exports = MediaTagWrapper;
