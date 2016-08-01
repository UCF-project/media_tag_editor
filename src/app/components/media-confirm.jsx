'use strict';

import {LabeledSpan, MediaRules} from 'app';
import React from 'react';

const MediaConfirm = props => {
	return (
		<div>
			<LabeledSpan label="media" value={props.media}/>
			<MediaRules height="30vh" rules={props.rules} editable={false}/>
		</div>
	);
};

MediaConfirm.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaConfirm.propTypes = {
	rules: React.PropTypes.array,
	media: React.PropTypes.string
};

module.exports = MediaConfirm;
