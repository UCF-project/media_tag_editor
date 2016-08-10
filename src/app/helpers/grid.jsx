'use strict';

import React from 'react';
import SvgGrid1Box from 'app/components/svg-grid1-box'; // eslint-disable-line import/no-extraneous-dependencies
import SvgGrid2Parallel from 'app/components/svg-grid2-parallel'; // eslint-disable-line import/no-extraneous-dependencies
import SvgGrid3Box from 'app/components/svg-grid3-box'; // eslint-disable-line import/no-extraneous-dependencies
import SvgGrid3Parallel from 'app/components/svg-grid3-parallel'; // eslint-disable-line import/no-extraneous-dependencies

const applyFormat2Sections = (format, sections) => {
	if (format.type === 'cell') {
		return sections[0];
	}
	return applyFormat2Sections(format, sections);
};

const alignment = {
	ALIGNMENT_GRID11: 'grid11',
	ALIGNMENT_GRID21: 'grid21',
	ALIGNMENT_GRID22: 'grid22',
	ALIGNMENT_GRID31: 'grid31',
	ALIGNMENT_GRID32: 'grid32',
	ALIGNMENT_GRID33: 'grid33',
	ALIGNMENT_GRID34: 'grid34',
	ALIGNMENT_GRID35: 'grid35',
	ALIGNMENT_GRID36: 'grid36'
};

const alignmentFormats = {};

alignmentFormats[alignment.ALIGNMENT_GRID11] = {
	totalItems: 1,
	grid: {
		type: 'rows',
		items: [{type: 'cell', index: 0}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID21] = {
	totalItems: 2,
	grid: {
		type: 'columns',
		items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID22] = {
	totalItems: 2,
	grid: {
		type: 'rows',
		items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID31] = {
	totalItems: 3,
	grid: {
		type: 'columns',
		items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}, {type: 'cell', index: 2}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID32] = {
	totalItems: 3,
	grid: {
		type: 'rows',
		items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}, {type: 'cell', index: 2}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID33] = {
	totalItems: 3,
	grid: {
		type: 'rows',
		items: [{type: 'cell', index: 0}, {
			type: 'columns',
			items: [{type: 'cell', index: 1}, {type: 'cell', index: 2}]
		}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID34] = {
	totalItems: 3,
	grid: {
		type: 'columns',
		items: [{
			type: 'rows',
			items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}]
		}, {type: 'cell', index: 2}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID35] = {
	totalItems: 3,
	grid: {
		type: 'columns',
		items: [{type: 'cell', index: 0}, {
			type: 'rows',
			items: [{type: 'cell', index: 1}, {type: 'cell', index: 2}]
		}]
	}
};

alignmentFormats[alignment.ALIGNMENT_GRID33] = {
	totalItems: 3,
	grid: {
		type: 'rows',
		items: [{
			type: 'columns',
			items: [{type: 'cell', index: 0}, {type: 'cell', index: 1}]
		}, {type: 'cell', index: 2}]
	}
};

const buttons = {};
buttons[alignment.ALIGNMENT_GRID11] = <SvgGrid1Box/>;
buttons[alignment.ALIGNMENT_GRID21] = <SvgGrid2Parallel/>;
buttons[alignment.ALIGNMENT_GRID22] = <SvgGrid2Parallel rotate={90}/>;
buttons[alignment.ALIGNMENT_GRID31] = <SvgGrid3Box/>;
buttons[alignment.ALIGNMENT_GRID32] = <SvgGrid3Box rotate={90}/>;
buttons[alignment.ALIGNMENT_GRID33] = <SvgGrid3Parallel/>;
buttons[alignment.ALIGNMENT_GRID34] = <SvgGrid3Parallel rotate={90}/>;
buttons[alignment.ALIGNMENT_GRID35] = <SvgGrid3Parallel rotate={-90}/>;
buttons[alignment.ALIGNMENT_GRID36] = <SvgGrid3Parallel rotate={180}/>;

const Grid = {
	alignment,
	alignmentFormats,
	applyFormat2Sections,
	buttons
};

module.exports = Grid;
