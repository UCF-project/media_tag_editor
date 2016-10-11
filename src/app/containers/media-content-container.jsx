'use strict';

import {CodeEditor, Dropzone, ErrorBox, FileExplorer, MediaStore, MediaActions, StorageActions, StorageStore, Tabs, Tab} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {FontIcon, RaisedButton, FlatButton, TextField} from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';

const debug = require('debug')('MTME:Containers:MediaContentContainer');

// const globObj = {};

// function debounceContentUpdate() {
// 	debug('debounceContentUpdate', globObj);
// 	MediaActions.updateContent(globObj.value);
// }

class MediaContentContainer extends React.Component {
	constructor(props) {
		super(props);
		const newState = MediaStore.getInitialState();
		newState.local = {videoType: 'mp4'};
		this.state = newState;
	}

	handleDrop() {
		StorageActions.drop(...arguments);
	}

	handleDropAccepted(files) {
		debug('a', arguments);
		const body = new FormData();
		body.append('file', files[0]);
		StorageActions.dropAccept({body});
	}

	handleDropRejected() {
		debug('r', arguments);
		StorageActions.dropReject(...arguments);
	}

	handleDragEnter() {
		debug('er', arguments);
		StorageActions.dragEnter();
	}

	handleDragLeave() {
		debug('lr', arguments);
		StorageActions.dragLeave();
	}

	handleUploadRetry() {
		MediaActions.setUploadError(null);
	}

	handleChangeUrl = () => {
		debug('handleChangeUrl', arguments);
		debug('updateContent', this.urlInput.getValue());
		MediaActions.updateContentURL(this.urlInput.getValue());
	}

	handleChangeObject = value => {
		debug('handleChangeObject', arguments);
		debug('updateContent', value);
		MediaActions.updateContentObject(value);
		// debug('updateContent', this.objInput.getValue());
		// const objectConverted = json2str(this.objInput.getValue());
		// MediaActions.updateContent(objectConverted);
		// globObj.value = this.objInput.getValue();
		// debounce(debounceContentUpdate, 200);
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleTabChange = value => {
		debug('value', value);
		debug('typeof value', typeof value);
		if (typeof value === 'number') {
			MediaActions.setContentTabIndex(value);
		}
	}

	handleClickUpload = () => {
		MediaActions.setContentTabIndex(1);
	}

	handleClickUrl = newUrl => {
		MediaActions.setUrl(newUrl);
	}

	handleClickVideo = fileIndex => {
		MediaActions.setInnerContentTabIndex('convert', this.state.storage.list[fileIndex]);
	}

	handleClickDelete = fileIndexes => {
		// TODO: Change to batch delete
		fileIndexes.forEach(i => {
			StorageActions.delete({}, {filename: this.state.storage.list[i].filename});
		});
	}

	handleClickDash = fileIndexes => {
		const files = this.state.storage.list.filter((c, i) => fileIndexes.indexOf(i) !== -1);
		MediaActions.setInnerContentTabIndex('dash', files);
	}

	handleClickCancel = () => {
		MediaActions.setInnerContentTabIndex('main', null);
	}

	handleClickConvert = () => {
		const payload = {
			outputFile: this.refVideoName.getValue(),
			type: 'mp4',
			inputFile: this.state.media.dialog.innerContentFiles.filename
		};
		if (this.refVideoScale && this.refVideoScale.getValue()) {
			payload.scale = this.refVideoScale.getValue();
		}
		const body = JSON.stringify(payload);
		StorageActions.convert({body});
	}

	handleClickCreate = () => {
		const body = JSON.stringify({
			outputFile: this.refMpd.getValue(),
			type: 'dash',
			inputFile: this.state.media.dialog.innerContentFiles.map(f => f.filename)
		});
		StorageActions.convert({body});
	}

	handleVideoChange = (event, index, value) => this.setState({local: {videoType: value}});

	setRefURL = c => {
		this.urlInput = c;
	}

	setRefObj = c => {
		this.objInput = c;
	}

	setRefMpd = c => {
		this.refMpd = c;
	}

	setRefVideoName = c => {
		this.refVideoName = c;
	}

	setRefVideoScale = c => {
		this.refVideoScale = c;
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = [];
		this.unsubscribe.push(MediaStore.listen(this.handleStateChange));
		this.unsubscribe.push(StorageStore.listen(this.handleStateChange));
		MediaActions.stateCast();
		StorageActions.list();
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe.forEach(fn => fn());
	}

	render() {
		const styleTab = {padding: '0 20px'};
		const styleTabCode = {padding: '0 20px', height: 144};
		// let contentObject = '';
		// let contentString = '';
		// if (typeof this.state.media.content === 'object') {
		// 	contentObject = json2str(this.state.media.content);
		// } else if (typeof this.state.media.content === 'string') {
		// 	contentString = this.state.media.content;
		// }
		const contentString = this.state.media.contentURL;
		const contentObject = this.state.media.contentObject;
		const styleDropzone = {
			width: '100%',
			height: 140,
			border: '2px dashed rgb(212, 212, 212)',
			borderRadius: 5,
			color: '#939393',
			fontWeight: 'lighter',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		};
		const dropzone = this.state.media.dialog.uploadError ? (
			<div>
				<ErrorBox error={this.state.media.dialog.uploadError}/>
				<br/>
				<RaisedButton style={{marginTop: 17}} onClick={this.handleUploadRetry} label="Retry" primary/>
			</div>
			) : (
			<Dropzone
				onDrop={this.handleDrop}
				onDropAccepted={this.handleDropAccepted}
				onDropRejected={this.handleDropRejected}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				style={styleDropzone}
				>
			Click here or drag your file
			</Dropzone>);
		const files = this.state.storage && this.state.storage.list ? this.state.storage.list : [];
		let innerTab = null;

		const videoTypes = [
			<MenuItem key="mp4" value="mp4" primaryText="mp4"/>,
			<MenuItem key="webm" value="webm" primaryText="webm"/>
		];

		const styleToolbarTitle = {
			lineHeight: '49px'
		};

		const loadingBar = (
			<LinearProgress style={{backgroundColor: 'rgb(153, 153, 153)', marginTop: -4}} mode="indeterminate"/>
		);

		if (this.state.media.dialog.innerContentTabIndex === 'main') {
			innerTab = (
				<FileExplorer
					files={files}
					onClickUpload={this.handleClickUpload}
					onClickUrl={this.handleClickUrl}
					onClickVideo={this.handleClickVideo}
					onClickDelete={this.handleClickDelete}
					onClickDash={this.handleClickDash}
					/>
			);
		} else if (this.state.media.dialog.innerContentTabIndex === 'convert') {
			const fields = (
				<div>
					<TextField
						style={{width: '30%'}}
						floatingLabelText="File name"
						floatingLabelFixed
						ref={this.setRefVideoName}
						/>
					<SelectField
						style={{width: '30%'}}
						value={this.state.local.videoType}
						floatingLabelText="Convert to"
						floatingLabelFixed
						onChange={this.handleVideoChange}
						>
						{videoTypes}
					</SelectField>
					{this.state.local.videoType === 'mp4' &&
						<TextField
							style={{width: '30%'}}
							floatingLabelText="Scale"
							floatingLabelFixed
							ref={this.setRefVideoScale}
							/>}
					<br/>
					<RaisedButton primary label="Convert" onClick={this.handleClickConvert}/>
					<FlatButton label="Cancel" onClick={this.handleClickCancel}/>
				</div>
			);
			const loadingTab = (
				<div>
					{loadingBar}
					<p>Converting video...</p>
				</div>
			);
			innerTab = (
				<div>
					<Toolbar style={{backgroundColor: 'rgb(240, 240, 240)', height: 50}}>
						<ToolbarGroup>
							<ToolbarTitle style={styleToolbarTitle} text="Convert video"/>
						</ToolbarGroup>
					</Toolbar>
					{this.state.media.dialog.innerContentStatus === 'loading' ? loadingTab : fields}
				</div>
			);
		} else if (this.state.media.dialog.innerContentTabIndex === 'dash') {
			const fields = (
				<div>
					<TextField
						floatingLabelText="MPD file name"
						floatingLabelFixed
						ref={this.setRefMpd}
						/>
					<br/>
					<RaisedButton primary label="Create" onClick={this.handleClickCreate}/>
					<FlatButton label="Cancel" onClick={this.handleClickCancel}/>
				</div>
			);
			const loadingTab = (
				<div>
					{loadingBar}
					<p>Creating DASH manifest file...</p>
				</div>
			);
			innerTab = (
				<div>
					<Toolbar style={{backgroundColor: 'rgb(240, 240, 240)', height: 50}}>
						<ToolbarGroup>
							<ToolbarTitle style={styleToolbarTitle} text="Create DASH"/>
						</ToolbarGroup>
					</Toolbar>
					{this.state.media.dialog.innerContentStatus === 'loading' ? loadingTab : fields}
				</div>
			);
		}
		return (
			<Tabs value={this.state.media.dialog.contentTabIndex} onChange={this.handleTabChange}>
				<Tab icon={<FontIcon className="mdi mdi-link"/>} label="URL" value={0}>
					<div style={styleTab}>
						<TextField
							ref={this.setRefURL}
							floatingLabelText="URL"
							floatingLabelFixed
							style={{width: '100%'}}
							onChange={this.handleChangeUrl}
							value={contentString}
							/>
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-upload"/>} label="Upload" value={1}>
					<div style={styleTab}>
						{dropzone}
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-code-braces"/>} label="Object" value={2}>
					<div style={styleTabCode}>
						<CodeEditor
							name="contentObject"
							ref={this.setRefObj}
							onChange={this.handleChangeObject}
							value={contentObject}
							/>
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-server"/>} label="Server" value={3}>
					<div style={styleTab}>
						{innerTab}
					</div>
				</Tab>
			</Tabs>
		);
	}
}

module.exports = MediaContentContainer;
