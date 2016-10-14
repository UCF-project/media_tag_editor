'use strict';

import React from 'react';
import CodeEditor from 'app/components/code-editor'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import FlatButton from 'material-ui/FlatButton';
import {debounce} from 'lodash';

const debug = require('debug')('MTME:Containers:GridContentContainer');

const debouncedSourceChange = debounce((type, newValue) => {
	ManifestActions.changeSource(type, newValue);
}, 1000);

class SourceSectionContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleChangeHtml = newValue => {
		debug('handleChange', newValue);
		debouncedSourceChange('html', newValue);
	}

	handleChangeManifest = newValue => {
		debug('handleChange', newValue);
		debouncedSourceChange('manifest', newValue);
	}

	handleClickFile = e => {
		debug('handleChange', e, e.currentTarget, e.currentTarget.dataset);
		const newFileType = e.currentTarget.dataset.fileType;
		ManifestActions.changeFile(newFileType);
	}

	componentDidMount() {
		this.unsubscribe = [];
		this.unsubscribe.push(ManifestStore.listen(this.handleStateChange));
		ManifestActions.changeToTemplateIndex(0);
	}

	componentWillUnmount() {
		this.unsubscribe.forEach(fn => fn());
	}

	render() {
		if (this.state.manifest) {
			const fileBts = this.state.manifest.files.map(f => <FlatButton data-file-type={f.type} key={f.type} label={f.filename} primary disabled={f.type === this.state.manifest.type} onClick={this.handleClickFile}/>);
			// If we use the same editor for both html and manifest
			// the ctrl z bugs (shows the last state independently from type)
			const editors = {
				html: (
					<CodeEditor
						name="html"
						mode="html"
						onChange={this.handleChangeHtml}
						value={this.state.manifest.htmlSource}
						/>
				),
				manifest: (
					<CodeEditor
						name="manifest"
						mode="json"
						onChange={this.handleChangeManifest}
						value={this.state.manifest.source}
						/>
				)
			};
			return (
				<div key="Source" style={{height: '100%', width: '100%'}}>
					<div style={{position: 'relative', height: '100%', width: '100%'}}>
						{editors[this.state.manifest.type]}
						<div style={{position: 'absolute', bottom: 15, right: 15, background: '#fff', zIndex: 500}}>
							{fileBts}
						</div>
					</div>
				</div>
			);
		}
		return <div key="Source" style={{height: '100%', width: '100%'}}/>;
	}
}

module.exports = SourceSectionContainer;
