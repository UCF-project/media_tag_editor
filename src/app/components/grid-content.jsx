'use strict';

import React from 'react';
import {alignment as GridAlignment} from 'app/helpers/grid'; // eslint-disable-line import/no-extraneous-dependencies
import GridBox from './grid-box';

const GridContent = props => {
	const xAlignments = {};

	xAlignments[GridAlignment.ALIGNMENT_GRID11] = section1 => {
		return <GridBox sections={[section1]} rows/>;
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID21] = (section1, section2) => {
		return <GridBox sections={[section1, section2]} columns/>;
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID22] = (section1, section2) => {
		return <GridBox sections={[section1, section2]} rows/>;
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID31] = (section1, section2, section3) => {
		return <GridBox sections={[section1, section2, section3]} columns/>;
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID32] = (section1, section2, section3) => {
		return <GridBox sections={[section1, section2, section3]} rows/>;
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID33] = (section1, section2, section3) => {
		return xAlignments[GridAlignment.ALIGNMENT_GRID22](
			section1,
			xAlignments[GridAlignment.ALIGNMENT_GRID21](section2, section3)
		);
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID34] = (section1, section2, section3) => {
		return xAlignments[GridAlignment.ALIGNMENT_GRID21](
			xAlignments[GridAlignment.ALIGNMENT_GRID22](section1, section2),
			section3
		);
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID35] = (section1, section2, section3) => {
		return xAlignments[GridAlignment.ALIGNMENT_GRID21](
			section1,
			xAlignments[GridAlignment.ALIGNMENT_GRID22](section2, section3),
		);
	};

	xAlignments[GridAlignment.ALIGNMENT_GRID36] = (section1, section2, section3) => {
		return xAlignments[GridAlignment.ALIGNMENT_GRID22](
			xAlignments[GridAlignment.ALIGNMENT_GRID21](section1, section2),
			section3
		);
	};

	const {
		alignment,
		sections,
		...others
	} = props;
	return (
		<div {...others}>
			{xAlignments[alignment](...sections)}
		</div>
	);
};

GridContent.contextTypes = {
	muiTheme: React.PropTypes.object
};

GridContent.propTypes = {
	alignment: React.PropTypes.string,
	sections: React.PropTypes.array
};

module.exports = GridContent;
