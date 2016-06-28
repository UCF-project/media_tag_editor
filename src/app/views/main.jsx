'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from 'app/configs/theme'; // eslint-disable-line import/no-extraneous-dependencies

// const debug = require('debug')('MTME:Views:Main');

const Main = class extends React.Component {
	getChildContext() {
		return {
			muiTheme: Theme
		};
	}

	render() {
		const styles = {
			footer: {
				background: 'rgba(0, 0, 0, 0.81)',
				textAlign: 'center',
				color: 'white',
				padding: 20
			}
		};
		return (
			<MuiThemeProvider muiTheme={Theme}>
				<div>
					{this.props.children}
					<div style={styles.footer}>
						<p>COPYRIGHT © MTME</p>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
};

Main.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

Main.childContextTypes = {
	muiTheme: React.PropTypes.object
};

Main.propTypes = {
	location: React.PropTypes.object,
	children: React.PropTypes.node
};

module.exports = Main;
