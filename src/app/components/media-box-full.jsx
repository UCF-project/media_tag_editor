'use strict';

import {LabeledSpan, MediaAvatar, ScaleToFit} from 'app';
import React from 'react';
import {Card, CardText} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import reactifyDOMNode from 'reactify-dom-node';

const debug = require('debug')('MTME:Components:MediaBoxFull');

const MediaBoxFull = props => {
	const rules = props.media.rules && props.media.rules.length ? props.media.rules.map((r, i) => {
		return (
			<TableRow key={i} selectable={false}>
				{r.map((ri, rii) => {
					// console.warn('ri', ri, rii);
					return <TableRowColumn key={rii}>{String(ri)}</TableRowColumn>;
				})}
			</TableRow>
		);
	}) : <TableRow selectable={false}><TableRowColumn>No rules</TableRowColumn></TableRow>;

	props.media.preview.forEach((n, i) => {
		if (!n.hasAttribute('key')) {
			n.setAttribute('key', i);
		}
	});

	const mediaPreview = props.media.preview.map(n => {
		debug('Converting to react node n', n);
		return reactifyDOMNode(n);
	});

	const rulesTable = (
		<CardText>
			<LabeledSpan style={{paddingLeft: 3}} label="rules" value=""/>
			<Table selectable={false}>
				<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					<TableRow selectable={false}>
						<TableHeaderColumn>Monitor</TableHeaderColumn>
						<TableHeaderColumn>State</TableHeaderColumn>
						<TableHeaderColumn>Action</TableHeaderColumn>
						<TableHeaderColumn>Flag</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{rules}
				</TableBody>
			</Table>
		</CardText>
	);
	return (
		<Card style={{width: '98%', display: 'inline-block', margin: '2% 2% 0 0'}}>
			<CardText>
				<MediaAvatar type={props.media.type} style={{marginRight: 6}}/>
				<LabeledSpan label="type" value={props.media.type}/>
				<LabeledSpan label="rules" value={props.media.rulesCount}/>
			</CardText>
			<CardText>
				<LabeledSpan style={{paddingLeft: 3}} label="preview" value=""/>
				<ScaleToFit>
					{mediaPreview}
				</ScaleToFit>
			</CardText>
			{props.media.rulesCount !== 0 && rulesTable}
		</Card>
	);
};

MediaBoxFull.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaBoxFull.propTypes = {
	media: React.PropTypes.object
};

module.exports = MediaBoxFull;
