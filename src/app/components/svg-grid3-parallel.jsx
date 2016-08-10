'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import SvgRotate from './svg-rotate';

const SvgGrid3Parallel = props => (
	<SvgRotate {...props}>
		<SvgIcon>
			<path d="m3,11l18,0l0,-8l-18,0m0,18l8,0l0,-8l-8,0m10,8l8,0l0,-8l-8,0m0,-2"/>
		</SvgIcon>
	</SvgRotate>
);

module.exports = SvgGrid3Parallel;
