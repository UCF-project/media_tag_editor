'use strict';

import {CodeEditor, Dropzone, ErrorBox, MediaStore, MediaActions, StorageActions, Tabs, Tab} from 'app';
import React from 'react';
import {FontIcon, RaisedButton, TextField} from 'material-ui';
// import debounce from 'lodash.debounce';

const debug = require('debug')('MTME:Containers:MediaContentContainer');

// const globObj = {};

// function debounceContentUpdate() {
// 	debug('debounceContentUpdate', globObj);
// 	MediaActions.updateContent(globObj.value);
// }

class MediaContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
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

	setRefURL = c => {
		this.urlInput = c;
	}

	setRefObj = c => {
		this.objInput = c;
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = MediaStore.listen(this.handleStateChange);
		MediaActions.stateCast();
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe();
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
			</Tabs>
		);
	}
}

module.exports = MediaContentContainer;
