'use strict';

import React from 'react';
import LabeledSpan from 'app/components/form/labeled-span'; // eslint-disable-line import/no-extraneous-dependencies
import {Card, CardActions, CardMedia, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Avatar, IconButton} from 'material-ui';
import MediaIcon from 'app/components/editor/media-icon';

// const debug = require('debug')('MTME:Components:Editor:MediaBox');

const MediaList = (props, context) => {
	const styles = {
		icon: {
			float: 'right'
		}
	};
	return (
		<Card style={{width: '98%', display: 'inline-block', margin: '0 2% 2% 0'}}>
			<CardText>
				<Avatar
					backgroundColor={context.muiTheme.palette.primary1Color}
					icon={<MediaIcon color="#fff" type={props.media.type}/>}
					style={{marginRight: 6}}
					/>
				<LabeledSpan label="type" value={props.media.type}/>
				<LabeledSpan label="rules" value={props.media.rulesCount}/>

				<IconButton tooltip="Delete" style={styles.icon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-delete"/>
				<IconButton tooltip="Edit" style={styles.icon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-pencil"/>
				<IconButton tooltip="Details" style={styles.icon} iconStyle={{color: context.muiTheme.palette.accent1Color}} iconClassName="mdi mdi-magnify-plus"/>
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
