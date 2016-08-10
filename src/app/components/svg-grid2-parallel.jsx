'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import SvgRotate from './svg-rotate';

const SvgGrid2Parallel = props => (
	<SvgRotate {...props}>
		<SvgIcon>
			<path d="m3,21c2.666667,0 5.333333,0 8,0l0,-18c-1.666667,0 -6.333333,0 -8,0m10,18l8,0l0,-18l-8,0m0,8"/>
		</SvgIcon>
	</SvgRotate>
);

module.exports = SvgGrid2Parallel;
