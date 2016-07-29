'use strict';

import React from 'react';
import AceEditor from 'react-ace';

// Comes from react-ace, needed for properly initiate react-ace
import 'brace'; // eslint-disable-line import/no-extraneous-dependencies
import 'brace/mode/json'; // eslint-disable-line import/no-extraneous-dependencies
import 'brace/theme/github'; // eslint-disable-line import/no-extraneous-dependencies

import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Components:Editor:CodeEditor');

function onChange(newValue) {
	debug('change', newValue);
	ManifestActions.change(newValue);
}

const CodeEditor = props => {
	return (
		<AceEditor
			mode="json"
			theme="github"
			onChange={onChange}
			name="UNIQUE_ID_OF_DIV"
			editorProps={{$blockScrolling: true}}
			value={props.manifestSource}
			width="100%"
			height="100%"
			/>
	);
};

CodeEditor.propTypes = {
	manifestSource: React.PropTypes.string
};

module.exports = CodeEditor;
