'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import SvgRotate from './svg-rotate';

const SvgGrid1Box = props => (
	<SvgRotate {...props}>
		<SvgIcon>
			<path d="m3,21c2.666667,0 15.333333,0 18,0l0,-18c-1.666667,0 -16.333333,0 -18,0m10,8"/>
		</SvgIcon>
	</SvgRotate>
);

module.exports = SvgGrid1Box;
