'use strict';

import React from 'react';
import {FontIcon} from 'material-ui';

const types = {
	'video-dash': 'mdi mdi-video',
	'video': 'mdi mdi-video',
	'image': 'mdi mdi-image',
	'html': 'mdi mdi-code-tags',
	'videojs-audio': 'mdi mdi-video',
	'oembed': 'mdi mdi-share-variant',
	'videoObj': 'mdi mdi-video',
	'text': 'mdi mdi-format-text'
};

const MediaIcon = props => {
	const {
		type,
		...others
	} = props;
	return <FontIcon {...others} className={type && types[type] ? types[type] : 'mdi mdi-help'}/>;
};

MediaIcon.propTypes = {
	type: React.PropTypes.string
};

module.exports = MediaIcon;
