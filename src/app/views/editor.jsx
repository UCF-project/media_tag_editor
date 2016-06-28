'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import AceEditor from 'react-ace';
import brace from 'brace';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import 'brace/mode/json';
import 'brace/theme/github';

import manifestJson from 'app/extras/manifest-sample'; // eslint-disable-line import/no-extraneous-dependencies
import LabeledSpan from 'app/components/form/labeled-span'; // eslint-disable-line import/no-extraneous-dependencies
import DialogAddMedia from 'app/components/dialog/dialog-add-media'; // eslint-disable-line import/no-extraneous-dependencies
import DialogAddRule from 'app/components/dialog/dialog-add-rule'; // eslint-disable-line import/no-extraneous-dependencies

const Editor = class extends React.Component {
	render() {
		const styles = {
			h1: {
				margin: '5px 0px',
				fontWeight: 400,
				color: 'rgba(0,0,0,.87)'
			},
			panelRight: {
				width: '50%',
				display: 'inline-block',
				verticalAlign: 'top'
			},
			panelLeft: {
				width: '50%',
				display: 'inline-block',
				verticalAlign: 'top',
				padding: 10,
				boxSizing: 'border-box'
			},
			item: {
				paddingTop: 14,
				marginTop: 10,
				position: 'relative'
			},
			button: {
				marginTop: 10
			},
			buttonIcon: {
				root: {
					position: 'absolute',
					right: 0,
					top: 5
				},
				icon: {
					color: this.context.muiTheme.palette.accent1Color
				}
			}
		};

		return (
			<div>
				<AppBar
					title="Media Tag Manifest Editor"
					// iconElementLeft={<IconButton iconClassName="mdi mdi-close"/>}
					iconElementRight={<IconButton iconClassName="mdi mdi-content-save"/>}
					/>
				<div>
					<div style={styles.panelLeft}>
						<h1 style={styles.h1}>Medias</h1>
						<Divider/>

						<Paper style={styles.item}>
							<LabeledSpan
								value="http://0.0.0.0:3000/tests/assets/media/image.png"
								label="url"
								/>

							<LabeledSpan
								value="image"
								label="type"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<Paper style={styles.item}>
							<LabeledSpan
								value="http://0.0.0.0:3000/tests/assets/media/image.png"
								label="url"
								/>

							<LabeledSpan
								value="image"
								label="type"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<Paper style={styles.item}>
							<LabeledSpan
								value="http://0.0.0.0:3000/tests/assets/media/image.png"
								label="url"
								/>

							<LabeledSpan
								value="image"
								label="type"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<Paper style={styles.item}>
							<LabeledSpan
								value="http://0.0.0.0:3000/tests/assets/media/image.png"
								label="url"
								/>

							<LabeledSpan
								value="image"
								label="type"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<DialogAddMedia/>

						<h1 style={styles.h1}>Rules</h1>
						<Divider/>

						<Paper style={styles.item}>
							<LabeledSpan
								value="image"
								label="type"
								/>

							<LabeledSpan
								value="monitor"
								label="network"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<Paper style={styles.item}>
							<LabeledSpan
								value="dash-audio"
								label="type"
								/>

							<LabeledSpan
								value="monitor"
								label="network"
								/>
							<IconButton style={styles.buttonIcon.root} iconStyle={styles.buttonIcon.icon} iconClassName="mdi mdi-delete"/>
						</Paper>

						<DialogAddRule/>

					</div>
					<div style={styles.panelRight}>
						<AceEditor
							mode="json"
							theme="github"
							// onChange={onChange}
							name="UNIQUE_ID_OF_DIV"
							editorProps={{$blockScrolling: true}}
							value={manifestJson}
							width="100%"
							/>
					</div>
				</div>

			</div>
		);
	}
};

Editor.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = Editor;
