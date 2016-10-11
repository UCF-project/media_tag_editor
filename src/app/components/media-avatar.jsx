'use strict';

import {MediaIcon} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Avatar} from 'material-ui';

const MediaAvatar = (props, context) => {
	const {
		type,
		...others
	} = props;
	return (<Avatar
		{...others}
		backgroundColor={context.muiTheme.palette.primary1Color}
		icon={<MediaIcon color="#fff" type={type}/>}
		/>);
};

MediaAvatar.propTypes = {
	type: React.PropTypes.string
};

MediaAvatar.contextTypes = {
	muiTheme: React.PropTypes.object
};

module.exports = MediaAvatar;
