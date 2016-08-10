/* global URL */
'use strict';

import React from 'react';
import accept from 'attr-accept';

const Dropzone = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isDragActive: false
		};
		this.setRefFileInput = c => {
			this.fileInput = c;
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
	}

	allFilesAccepted(files) {
		return files.every(file => accept(file, this.props.accept));
	}

	handleDragEnter(e) {
		e.preventDefault();

		// This is tricky. During the drag even the dataTransfer.files is null
		// But Chrome implements some drag store, which is accesible via dataTransfer.items
		const dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

		// Now we need to convert the DataTransferList to Array
		const itemsArray = Reflect.apply(Array.prototype.slice, Array.prototype, dataTransferItems);
		const allFilesAccepted = this.allFilesAccepted(itemsArray);

		this.setState({
			isDragActive: allFilesAccepted,
			isDragReject: !allFilesAccepted
		});

		if (this.props.onDragEnter) {
			this.props.onDragEnter(e);
		}
	}

	handleDragOver(e) {
		e.preventDefault();
	}

	handleDragLeave(e) {
		e.preventDefault();

		this.setState({
			isDragActive: false,
			isDragReject: false
		});

		if (this.props.onDragLeave) {
			this.props.onDragLeave(e);
		}
	}

	handleDrop(e) {
		e.preventDefault();

		this.setState({
			isDragActive: false,
			isDragReject: false
		});

		const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		const max = this.props.multiple ? droppedFiles.length : 1;
		const files = [];

		for (let i = 0; i < max; i++) {
			const file = droppedFiles[i];
			if (typeof URL !== 'undefined') {
				file.preview = URL.createObjectURL(file);
			}
			files.push(file);
		}

		if (this.props.onDrop) {
			this.props.onDrop(files, e);
		}

		if (this.allFilesAccepted(files)) {
			if (this.props.onDropAccepted) {
				this.props.onDropAccepted(files, e);
			}
		} else if (this.props.onDropRejected) {
			this.props.onDropRejected(files, e);
		}
	}

	handleClick() {
		if (!this.props.disableClick) {
			this.open();
		}
	}

	open() {
		this.fileInput.value = null;
		this.fileInput.click();
	}

	render() {
		let className;
		if (this.props.className) {
			className = this.props.className;
			if (this.state.isDragActive) {
				className += ` ${this.props.activeClassName}`;
			}
			if (this.state.isDragReject) {
				className += ` ${this.props.rejectClassName}`;
			}
		}

		let style;
		let activeStyle;
		if (this.props.style || this.props.activeStyle) {
			if (this.props.style) {
				style = this.props.style;
			}
			if (this.props.activeStyle) {
				activeStyle = this.props.activeStyle;
			}
		} else if (!className) {
			style = {
				width: 200,
				height: 200,
				borderWidth: 2,
				borderColor: '#666',
				borderStyle: 'dashed',
				borderRadius: 5
			};
			activeStyle = {
				borderStyle: 'solid',
				backgroundColor: '#eee'
			};
		}

		let appliedStyle;
		if (activeStyle && this.state.isDragActive) {
			appliedStyle = {
				...style,
				...activeStyle
			};
		} else {
			appliedStyle = {
				...style
			};
		}

		return (
			<div
				className={className}
				style={appliedStyle}
				onClick={this.handleClick}
				onDragEnter={this.handleDragEnter}
				onDragOver={this.handleDragOver}
				onDragLeave={this.handleDragLeave}
				onDrop={this.handleDrop}
				>
				{this.props.children}
				<input
					id={this.props.id}
					title={this.props.title}
					name={this.props.name}
					style={{position: 'absolute', overflow: 'hidden', clip: 'rect(0 0 0 0)', height: 1, width: 1, margin: -1, padding: 0, border: 0}}
					type="file"
					ref={this.setRefFileInput}
					multiple={this.props.multiple}
					accept={this.props.accept}
					onChange={this.handleDrop}
					/>
			</div>
		);
	}

};

Dropzone.propTypes = {
	onDrop: React.PropTypes.func,
	onDropAccepted: React.PropTypes.func,
	onDropRejected: React.PropTypes.func,
	onDragEnter: React.PropTypes.func,
	onDragLeave: React.PropTypes.func,

	style: React.PropTypes.object,
	activeStyle: React.PropTypes.object,
	className: React.PropTypes.string,
	activeClassName: React.PropTypes.string,
	rejectClassName: React.PropTypes.string,

	disableClick: React.PropTypes.bool,
	multiple: React.PropTypes.bool,
	accept: React.PropTypes.string,

	children: React.PropTypes.node,
	id: React.PropTypes.string,
	title: React.PropTypes.string,
	name: React.PropTypes.string
};

Dropzone.defaultProps = {
	disableClick: false,
	multiple: false
};

module.exports = Dropzone;
