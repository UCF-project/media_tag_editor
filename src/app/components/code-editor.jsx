'use strict';

import React from 'react';
import AceEditor from 'react-ace';

// Comes from react-ace, needed for properly initiate react-ace
import 'brace'; // eslint-disable-line import/no-extraneous-dependencies
import 'brace/mode/json'; // eslint-disable-line import/no-extraneous-dependencies
import 'brace/theme/github'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Components:CodeEditor');

const CodeEditor = props => {
	debug('render');
	return (
		<AceEditor
			mode="json"
			theme="github"
			onChange={props.onChange}
			name={props.name}
			editorProps={{$blockScrolling: true}}
			value={props.value}
			width="100%"
			height="100%"
			/>
	);
};

CodeEditor.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string,
	onChange: React.PropTypes.func
};

module.exports = CodeEditor;
