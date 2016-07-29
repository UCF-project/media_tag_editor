'use strict';

import React from 'react';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const debug = require('debug')('MTME:Components:Form:SelectInput');

const convert2MenuItem = (v, i) => <MenuItem key={i} value={v} primaryText={v}/>;

class SelectInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleTouchTap = event => {
		event.preventDefault();

		this.setState({
			open: true
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	setRef = c => {
		debug('setRef', c);
		if (c) {
			this.setState({
				anchorEl: c.getInputNode()
			});
		}
	};

	render() {
		const {
			menu,
			value,
			inputStyle,
			...others
		} = this.props;
		const styles = {
			icon: {color: this.context.muiTheme.palette.accent1Color},
			input: {
				width: '100%',
				paddingRight: 20,
				boxSizing: 'border-box'
			},
			iconBtInput: {
				position: 'absolute',
				right: 6
			},
			iconIcInput: {color: 'rgb(224, 224, 224)'}
		};
		return (
			<div>
				<TextField {...others} style={Object.assign(styles.input, inputStyle)} ref={this.setRef} defaultValue={value}/>
				<IconButton
					iconClassName="mdi mdi-menu-down"
					iconStyle={styles.iconIcInput}
					style={styles.iconBtInput}
					onTouchTap={this.handleTouchTap}
					/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					>
					<Menu>
					{menu.map(convert2MenuItem)}
					</Menu>
				</Popover>
			</div>
		);
	}
}

SelectInput.contextTypes = {
	muiTheme: React.PropTypes.object
};

SelectInput.propTypes = {
	menu: React.PropTypes.array.required,
	value: React.PropTypes.string,
	inputStyle: React.PropTypes.object
};

export default SelectInput;
