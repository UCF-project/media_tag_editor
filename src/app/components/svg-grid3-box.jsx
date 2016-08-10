'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import SvgRotate from './svg-rotate';

const SvgGrid3Box = props => (
	<SvgRotate {...props}>
		<SvgIcon>
			<path d="m9,21l5,0l0,-18c-6,0 1,0 -5,0m-6,18c2.666667,0 2.333333,0 5,0l0,-18c-1.666667,0 -3.333333,0 -5,0m12,18l5,0l0,-18l-5,0m-2,8"/>
		</SvgIcon>
	</SvgRotate>
);

module.exports = SvgGrid3Box;
