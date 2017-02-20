'use strict';

import React from 'react';
import {FontIcon} from 'material-ui';

const types = {
	'video-dash': 'mdi mdi-video',
	'video': 'mdi mdi-video',
	'image': 'mdi mdi-image',
	'imageObj': 'mdi mdi-image',
	'html': 'mdi mdi-code-tags',
	'videojs-audio': 'mdi mdi-video',
	'oembed': 'mdi mdi-share-variant',
	'videoObj': 'mdi mdi-video',
	'text': 'mdi mdi-format-text',
	'audio': 'mdi mdi-volume-high',
	'shakaPlayer': 'mdi mdi-file-video'
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
