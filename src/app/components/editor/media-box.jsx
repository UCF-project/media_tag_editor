'use strict';

import {LabeledSpan, MediaAvatar} from 'app';
import React from 'react';
import {Card, CardText, IconButton} from 'material-ui';

// const debug = require('debug')('MTME:Components:Editor:MediaBox');

const MediaBox = (props, context) => {
	const handleDelete = () => {
		props.onDelete(props.itemIndex);
	};

	const handleEdit = () => {
		props.onEdit(props.itemIndex);
	};

	const handleShow = () => {
		props.onShow(props.itemIndex);
	};
	const stylesIcon = {
		float: 'right'
	};
	return (
		<Card style={{width: '98%', display: 'inline-block', margin: '0 2% 2% 0'}}>
			<CardText>
				<MediaAvatar type={props.media.type} style={{marginRight: 6}}/>
				<LabeledSpan label="type" value={props.media.type}/>
				<LabeledSpan label="rules" value={props.media.rulesCount}/>

				<IconButton onClick={handleDelete} tooltip="Delete" style={stylesIcon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-delete"/>
				<IconButton onClick={handleEdit} tooltip="Edit" style={stylesIcon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-pencil"/>
				<IconButton onClick={handleShow} tooltip="Details" style={stylesIcon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-magnify-plus"/>
			</CardText>
		</Card>
	);
};

MediaBox.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaBox.propTypes = {
	media: React.PropTypes.object,
	itemIndex: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	onDelete: React.PropTypes.func,
	onEdit: React.PropTypes.func,
	onShow: React.PropTypes.func
};

module.exports = MediaBox;
