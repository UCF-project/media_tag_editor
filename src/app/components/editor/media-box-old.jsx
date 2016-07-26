'use strict';

import React from 'react';
import LabeledSpan from 'app/components/form/labeled-span'; // eslint-disable-line import/no-extraneous-dependencies
// import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardMedia, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import createFragment from 'react-addons-create-fragment';
import reactifyDOMNode from '../../extras/reactify-dom-node';

const debug = require('debug')('MTME:Components:Editor:MediaBox');

const MediaList = props => {
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
	const styles = {
		actions: {
			padding: 0,
			minHeight: 40
		},
		item: {
			paddingTop: 14,
			marginTop: 10,
			position: 'relative'
		},
		buttonIcon: {
			root: {
				position: 'absolute',
				right: 0,
				bottom: 0
			},
			icon: {
				color: 'rgba(255, 255, 255, 0.8)'
			}
		}
	};
	// const test = reactifyDOMNode(document.createElement('div'));
	// {props.media.preview}
	props.media.preview.forEach((n, i) => {
		if (!n.hasAttribute('key')) {
			n.setAttribute('key', i);
		}
	});

	// const test = props.media.preview.map(reactifyDOMNode).map((c, i) => React.cloneElement(c, {key: i}));
	const mediaPreview = props.media.preview.map(n => {
		debug('Converting to react node n', n);
		return reactifyDOMNode(n);
	});

	const rulesTable = (
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
	);
	return (
		<Card style={{width: '98%', display: 'inline-block', margin: '2% 2% 0 0'}}>
			<CardMedia
				overlay={<CardActions style={styles.actions}><IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/></CardActions>}
				>
				{mediaPreview}
			</CardMedia>
			<CardText>
				<LabeledSpan label="type" value={props.media.type}/>
				<LabeledSpan label="rules" value={props.media.rulesCount}/>

				{props.media.rulesCount !== 0 && rulesTable}
			</CardText>
		</Card>
	);
};

MediaList.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaList.propTypes = {
	media: React.PropTypes.object
};

module.exports = MediaList;
