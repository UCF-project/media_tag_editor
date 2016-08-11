'use strict';

import path from 'path';
import {bytes2str, IconButton} from 'app';
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

const debug = require('debug')('MTME:Components:FileExplorer');

const imageExtensions = ['.gif', '.jpg', '.png', '.jpeg'];
const iconExtensions = {
	'.doc': 'file-word',
	'.docx': 'file-word',
	'.docm': 'file-word',
	'.dotx': 'file-word',
	'.dotm': 'file-word',
	'.docb': 'file-word',
	'.dot': 'file-word',
	'.xls': 'file-excel',
	'.xlt': 'file-excel',
	'.xlm': 'file-excel',
	'.xlsx': 'file-excel',
	'.xlsm': 'file-excel',
	'.xltx': 'file-excel',
	'.xltm': 'file-excel',
	'.xlsb': 'file-excel',
	'.xla': 'file-excel',
	'.xlam': 'file-excel',
	'.xll': 'file-excel',
	'.xlw': 'file-excel',
	'.ppt': 'file-powerpoint',
	'.pot': 'file-powerpoint',
	'.pps': 'file-powerpoint',
	'.pptx': 'file-powerpoint',
	'.pptm': 'file-powerpoint',
	'.potx': 'file-powerpoint',
	'.potm': 'file-powerpoint',
	'.ppam': 'file-powerpoint',
	'.ppsx': 'file-powerpoint',
	'.ppsm': 'file-powerpoint',
	'.sldx': 'file-powerpoint',
	'.sldm': 'file-powerpoint',
	'.xml': 'file-xml',
	'.pdf': 'file-pdf',
	'.mp4': 'file-video',
	'.webm': 'file-video',
	'.mpd': 'file-video',
	'.mp3': 'file-music'
};

const nowYear = String((new Date()).getFullYear());

function dateFormat(dateStr) {
	const date = new Date(dateStr).toString().split(' ');
	return `${date[1]} ${date[2]}${date[3] === nowYear ? '' : `, ${date[3]}`}`;
}

// file-document

const FilePreview = props => {
	const iconStyle = {
		top: 21,
		left: 60,
		color: 'rgb(153, 153, 153)'
	};
	const imgStyle = {
		objectFit: 'contain',
		width: '100%',
		height: '100%'
	};
	const fileExtension = path.extname(props.file.filename);
	if (imageExtensions.indexOf(fileExtension) !== -1) {
		return <img style={imgStyle} src={props.file.url}/>;
	}
	const hasIcon = iconExtensions[fileExtension];
	if (hasIcon) {
		return <FontIcon style={iconStyle} className={`mdi mdi-${hasIcon}`}/>;
	}
	return <FontIcon style={iconStyle} className="mdi mdi-file"/>;
};

FilePreview.propTypes = {
	file: React.PropTypes.object
};

class FileExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemsSelected: {}
		};
	}

	handleClick = e => {
		console.log('handleClick', e.currentTarget.dataset);
		const toggledItem = {};
		toggledItem[e.currentTarget.dataset.fileIndex] = !(this.state.itemsSelected[e.currentTarget.dataset.fileIndex]);
		const newSelection = Object.assign({}, this.state.itemsSelected, toggledItem);
		// console.log('newSelection', newSelection);

		// this.props.onSelect(this.getSelectedIndexes());

		this.setState({
			itemsSelected: newSelection
		});
	}

	getSelectedIndexes = () => {
		const itemsKeys = Object.keys(this.state.itemsSelected);
		return itemsKeys.filter(c => this.state.itemsSelected[c]).map(c => parseInt(c, 10));
	}

	handleClickUrl = () => {
		const indexSelected = this.getSelectedIndexes()[0];
		this.props.onClickUrl(this.props.files[indexSelected].url);
	}

	handleClickVideo = () => {
		this.props.onClickVideo(this.getSelectedIndexes()[0]);
	}

	handleClickDash = () => {
		this.props.onClickDash(this.getSelectedIndexes());
	}

	handleClickDelete = () => {
		this.props.onClickDelete(this.getSelectedIndexes());
	}

	componentWillReceiveProps() {
		this.setState({itemsSelected: {}});
	}

	render() {
		debug('render');
		const {
			files,
			onClickUpload,
			onClickUrl, // eslint-disable-line no-unused-vars
			onClickVideo, // eslint-disable-line no-unused-vars
			onClickDelete, // eslint-disable-line no-unused-vars
			onClickDash, // eslint-disable-line no-unused-vars
			...others
		} = this.props;

		const styleSubFile = {
			display: 'flex',
			justifyContent: 'space-between'
		};

		const styleDivOverlay = {
			backgroundColor: 'rgba(0, 0, 0, 0.75)',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 500,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		};

		const smallIcon = {
			color: 'rgb(240, 240, 240)',
			position: 'absolute',
			fontSize: 13,
			/* text-shadow: rgb(240, 240, 240) -1px -1px, rgb(240, 240, 240) 1px -1px, rgb(255, 255, 255) -1px 1px, rgb(240, 240, 240) 1px 1px; */
			top: 20,
			left: 17
		};
		const normalIcon = {
			color: this.context.muiTheme.palette.accent1Color,
			fontSize: 27
		};

		const styleDivOverlayHide = Object.assign({}, styleDivOverlay, {display: 'none'});

		const itemsKeys = Object.keys(this.state.itemsSelected);
		const totalSelected = itemsKeys.reduce((p, c) => {
			return this.state.itemsSelected[c] ? p + 1 : p;
		}, 0);
		const actions = [];
		if (totalSelected === 0) {
			actions.push(<IconButton onClick={onClickUpload} key="upload" secondary tooltipPosition="top-center" tooltip="Upload" iconClassName="mdi mdi-upload"/>);
		}
		if (totalSelected === 1) {
			actions.push(<IconButton onClick={this.handleClickUrl} key="link" secondary tooltipPosition="top-center" tooltip="Use URL" iconClassName="mdi mdi-link"/>);
			// TODO: only show convert to videos
			actions.push((
				<IconButton onClick={this.handleClickVideo} key="video" secondary tooltipPosition="top-center" tooltip="Convert video">
					<FontIcon style={normalIcon} className="mdi mdi-video"/>
					<FontIcon style={smallIcon} className="mdi mdi-autorenew"/>
				</IconButton>
			));
		}
		if (totalSelected > 0) {
			// TODO: only show convert to videos
			actions.push((
				<IconButton onClick={this.handleClickDash} key="dash" secondary tooltipPosition="top-center" tooltip="Create DASH">
					<FontIcon style={normalIcon} className="mdi mdi-video"/>
					<FontIcon style={smallIcon} className="mdi mdi-sort-variant"/>
				</IconButton>
			));
			actions.push(<IconButton onClick={this.handleClickDelete} key="delete" secondary tooltipPosition="top-center" tooltip="Delete" iconClassName="mdi mdi-delete-forever"/>);
		}

		return (
			<div {...others}>
				<Toolbar style={{backgroundColor: 'rgb(240, 240, 240)', height: 50}}>
					<ToolbarGroup firstChild>{actions}</ToolbarGroup>
				</Toolbar>
				<GridList style={{overflowY: 'auto', height: 144}} cellHeight={141} cols={3}>
					{files.map((file, i) => (
						<GridTile
							style={{cursor: 'pointer'}}
							onClick={this.handleClick}
							key={file.filename}
							title={file.filename}
							subtitle={<div style={styleSubFile}><span>{dateFormat(file.ctime)}</span><span style={{paddingRight: this.context.muiTheme.spacing.desktopGutterLess}}>{bytes2str(file.size)}</span></div>}
							data-file-key={file.filename}
							data-file-index={i}
							data-file-selected={Boolean(this.state.itemsSelected[String(i)])}
							>
							<FilePreview file={file}/>
							<div style={this.state.itemsSelected[String(i)] ? styleDivOverlay : styleDivOverlayHide}>
								<FontIcon style={{color: 'rgba(255, 255, 255, 0.75)', fontSize: 48}} className="mdi mdi-check-circle-outline"/>
							</div>
						</GridTile>
					))}
				</GridList>
			</div>
		);
	}
}

FileExplorer.contextTypes = {
	muiTheme: React.PropTypes.object
};

FileExplorer.propTypes = {
	files: React.PropTypes.array,
	onClickUpload: React.PropTypes.func,
	onClickUrl: React.PropTypes.func,
	onClickVideo: React.PropTypes.func,
	onClickDelete: React.PropTypes.func,
	onClickDash: React.PropTypes.func
};

FileExplorer.defaultProps = {
	files: []
};

module.exports = FileExplorer;
