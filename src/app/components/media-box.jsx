'use strict';

import {LabeledSpan, MediaAvatar} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Card, CardText, IconButton} from 'material-ui';

// const debug = require('debug')('MTME:Components:MediaBox');

const MediaBox = (props, context) => {
	const handleDelete = () => {
		props.onDelete(props.itemIndex);
	};

	const handleEditRules = () => {
		props.onEditRules(props.itemIndex);
	};

	const handleEditMedia = () => {
		props.onEditMedia(props.itemIndex);
	};

	// const handleShow = () => {
	// 	props.onShow(props.itemIndex);
	// };
	const stylesIcon = {
		float: 'right'
	};
	const styleEditButtons = {
		marginLeft: -12
	};
	const styleSpan = {
		minWidth: 20
	};
	// 				<IconButton onClick={handleShow} tooltip="Details" style={stylesIcon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-magnify-plus"/>
	return (
		<Card style={{width: '100%', display: 'inline-block', margin: '0 10px 10px 0'}}>
			<CardText>
				<MediaAvatar type={props.media.type} style={{marginRight: 6}}/>
				<LabeledSpan style={styleSpan} label="type" value={props.media.type}/>
				<IconButton onClick={handleEditMedia} tooltip="Edit Media" style={styleEditButtons} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-pencil"/>
				<LabeledSpan style={styleSpan} label="rules" value={props.media.rulesCount}/>
				<IconButton onClick={handleEditRules} tooltip="Edit Rules" style={styleEditButtons} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-pencil"/>

				<IconButton onClick={handleDelete} tooltip="Delete" style={stylesIcon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-delete"/>
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
	onEditMedia: React.PropTypes.func,
	onEditRules: React.PropTypes.func,
	onShow: React.PropTypes.func
};

module.exports = MediaBox;
