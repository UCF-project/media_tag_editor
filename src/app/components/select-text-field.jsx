/* global document */
'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DropUpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Chip from 'material-ui/Chip';
import MenuItemApp from './menu-item-app';

const debug = require('debug')('AiC:Component:Form:SelectTextField');

// Inspired by http://jedwatson.github.io/react-select/ but in material design

const SelectTextField = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItems: props.multiple ? [] : null,
			itemsOpen: false,
			filterValue: props.defaultValue,
			focusMenuItem: -1
		};
		this.clickOnItems = [];
		this.clickAll = [];
		this.availableRenderedCount = -1;
		this.mappedItems = [];
		this.calcItems(props);
	}

	getFocusedItem = () => {
		return this.state.focusMenuItem === -1 && this.lastRenderedItems.length ? 0 : this.state.focusMenuItem;
	}

	selectionChange(newSelection) {
		this.setState({selectedItems: newSelection});
		if (this.props.onChange) {
			this.props.onChange(newSelection);
		}
	}

	selectionAdd = item => {
		let newSelection = item;
		if (this.props.multiple) {
			newSelection = this.state.selectedItems.slice();
			newSelection.push(item);
		}
		this.selectionChange(newSelection);
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	selectionRemove = item => {
		let newSelection = null;
		if (this.props.multiple) {
			newSelection = this.state.selectedItems.slice();
			newSelection.splice(newSelection.indexOf(item), 1);
		}
		this.selectionChange(newSelection);
	}

	selectionRemoveAll = () => {
		let newSelection = null;
		if (this.props.multiple) {
			newSelection = [];
		}
		this.selectionChange(newSelection);
	}

	handleClickItem = e => {
		this.clickOnItems = e.timeStamp;
		debug('handleClickItem', e, e.timeStamp, e.currentTarget);
		this.selectionAdd(e.currentTarget.dataset.itemValue);
	}

	handleRemoveItem = e => {
		debug('handleRemoveItem', e, e.timeStamp, e.currentTarget, e.target);
		this.clickOnItems = e.timeStamp;
		this.selectionRemove(e.currentTarget.dataset.itemValue);
	}

	handleResetItems = e => {
		this.clickOnItems = e.timeStamp;
		this.selectionRemoveAll();
		this.setState({filterValue: ''});
	}

	handleCheckClicks = () => {
		setTimeout(() => {
			if (this.clickOnItems === this.clickAll) {
				debug('click in', this.clickOnItems, this.clickAll);
			} else if (this.state.itemsOpen) {
				debug('click out', this.clickOnItems, this.clickAll);
				this.setState({itemsOpen: false});
			}
		}, 100);
	}

	handleClickAway = e => {
		debug('handleClickAway', e, e.timeStamp, e.currentTarget);
		this.clickAll = e.timeStamp;
		this.handleCheckClicks();
	}

	handleToogleItems = e => {
		this.clickOnItems = e.timeStamp;
		this.setState({itemsOpen: !this.state.itemsOpen});
	}

	handleTextClick = e => {
		debug('handleTextClick', e);
		this.clickOnItems = e.timeStamp;
		// this.setState({itemsOpen: true});
	}

	handleTextChange = e => {
		debug('handleTextChange', e);
		let filterValue = e.target.value;
		if (!this.props.multiple && this.state.selectedItems !== null) {
			const inputValue = this.getItemByValue(this.state.selectedItems).label;
			filterValue = filterValue.substr(inputValue.length);
			this.selectionRemoveAll();
		}
		this.setState({filterValue, focusMenuItem: -1});
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleWrapperClick = e => {
		debug('handleWrapperClick', e.timeStamp, e);
		this.clickOnItems = e.timeStamp;
		this.handleTextFocus(e);
	}

	handleTextFocus = e => {
		debug('handleTextFocus', e.timeStamp, e);
		if (!this.state.itemsOpen) {
			this.setState({itemsOpen: true, focusMenuItem: -1});
		}
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	}

	handleTextBlur = e => {
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	}

	handleTextKeyDown = e => {
		debug('handleTextKeyDown', e.keyCode);
		const focusedItem = this.getFocusedItem();

		if (e.keyCode === 13) {
			// ENTER
			debug('enter in');
			if (this.props.multiple) {
				let nextFocusIndex;
				if (focusedItem === -1) {
					return;
				} else if (this.availableRenderedCount > (focusedItem + 1)) {
					nextFocusIndex = focusedItem;
				} else if (this.availableRenderedCount > 1) {
					nextFocusIndex = focusedItem - 1;
				} else {
					nextFocusIndex = -1;
				}
				this.setState({focusMenuItem: nextFocusIndex});
			}
			this.selectionAdd(this.lastRenderedItems[focusedItem].value);
			debug('enter out');
		} else if (e.keyCode === 38) {
			// UP
			if (focusedItem > 0) {
				this.setState({focusMenuItem: focusedItem - 1});
			} else if (focusedItem === -1) {
				this.setState({focusMenuItem: this.availableRenderedCount});
			}
		} else if (e.keyCode === 40) {
			// DOWN
			if ((focusedItem + 1) < this.availableRenderedCount) {
				this.setState({focusMenuItem: focusedItem + 1});
			}
		} else if (e.keyCode === 8) {
			// BACKSPACE
			if (this.props.multiple && this.state.filterValue === '' && this.state.selectedItems.length) {
				const itemToRemove = this.state.selectedItems[this.state.selectedItems.length - 1];
				this.selectionRemove(itemToRemove);
			} else if (!this.props.multiple && this.state.selectedItems !== null) {
				this.selectionRemoveAll();
			}
		}
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleMenuOver = e => {
		debug('handleMenuOver', e.currentTarget.dataset.itemIndex, e.currentTarget.dataset.itemValue);
		this.setState({focusMenuItem: parseInt(e.currentTarget.dataset.itemIndex, 10)});
	}

	setRefInput = c => {
		this.refInput = c;
	}

	render() {
		debug('render');
		const {
			style,
			iconStyle,
			menuStyle,
			items, // eslint-disable-line no-unused-vars
			hintText,
			onBlur, // eslint-disable-line no-unused-vars
			onFocus, // eslint-disable-line no-unused-vars
			multiple,
			maxHeight,
			defaultValue,
			...others
		} = this.props;
		// const palette = context.muiTheme.baseTheme.palette;
		const accentColor = this.context.muiTheme.dropDownMenu.accentColor;
		const styleIconClose = {
			fill: accentColor,
			position: 'absolute',
			right: 3,
			top: 3,
			width: 14,
			height: 14
		};

		const styleIconDown = {
			fill: accentColor,
			position: 'absolute',
			right: -2,
			top: -2
		};
		const styleRoot = {
			position: 'relative',
			width: 300
		};

		const styleIconBt = {
			width: 20,
			height: 20,
			border: 0,
			padding: 0
		};

		const styleMenuBase = {
			position: 'absolute',
			marginTop: -8,
			width: '100%',
			zIndex: 5000,
			maxHeight,
			overflowY: 'auto'
		};

		let selectedRendered;
		const filterValue = this.state.filterValue ? this.state.filterValue : false;
		let inputValue = filterValue ? filterValue : '';
		if (multiple) {
			selectedRendered = this.state.selectedItems
				.map(a => this.getItemByValue(a))
				.map(this.renderSelected);
		} else if (this.state.selectedItems) {
			inputValue = this.getItemByValue(this.state.selectedItems).label;
		}

		this.lastRenderedItems = this.mappedItems
			.filter(a => !multiple || this.state.selectedItems.indexOf(a.value) === -1)
			.filter(a => !filterValue || (filterValue && a.label.toLowerCase().startsWith(filterValue.toLowerCase())));

		const availableRendered = this.lastRenderedItems.map(this.renderList);

		this.availableRenderedCount = availableRendered.length;

		let notFoundRendered = null;
		if (this.availableRenderedCount === 0 && filterValue) {
			notFoundRendered = (
				<MenuItemApp
					desktop
					key="notfound"
					primaryText="No results found"
					disabled
					/>
				);
		}

		const showResetButton = (multiple && this.state.selectedItems.length > 0) || (!multiple && this.state.selectedItems !== null);
		const showItems = (this.availableRenderedCount > 0 || notFoundRendered !== null);

		const iconDrop = this.state.itemsOpen ? <DropUpArrow/> : <DropDownArrow/>;

		const styleWrapperButtons = {
			display: 'table-cell',
			verticalAlign: 'middle',
			width: 20
		};

		const styleWrapperSelectedNText = {
			cursor: 'text',
			width: '100%',
			display: 'inline-block'
		};

		const styleWrapperControls = {
			display: 'table',
			width: '100%',
			tableLayout: 'fixed'
		};

		let inputSize = false;
		if (inputValue && inputValue.length) {
			inputSize = inputValue.length;
		} else if (hintText && hintText.length) {
			inputSize = hintText.length;
		}

		return (
			<div style={Object.assign({}, styleRoot, style)} {...others}>
				<div style={styleWrapperControls}>
					<div style={styleWrapperSelectedNText} onClick={this.handleWrapperClick}>
						{multiple && selectedRendered}
						<TextField
							name={`${this.props.name}Input`}
							ref={this.setRefInput}
							onClick={this.handleTextClick}
							onChange={this.handleTextChange}
							onFocus={this.handleTextFocus}
							onBlur={this.handleTextBlur}
							onKeyDown={this.handleTextKeyDown}
							underlineShow={false}
							hintText={hintText}
							style={{maxWidth: '100%', float: 'left', width: 'initial', overflow: 'hidden'}}
							inputStyle={{width: 'initial'}}
							value={inputValue}
							size={inputSize}
							/>
					</div>
					{showResetButton && <div style={styleWrapperButtons}><IconButton onClick={this.handleResetItems} style={styleIconBt} iconStyle={Object.assign({}, styleIconClose, iconStyle)}>
						<NavigationClose/>
					</IconButton></div>}
					{showItems && <div style={styleWrapperButtons}><IconButton onClick={this.handleToogleItems} style={styleIconBt} iconStyle={Object.assign({}, styleIconDown, iconStyle)}>
						{iconDrop}
					</IconButton></div>}
				</div>
				<div style={{position: 'relative', marginTop: -4}}><TextFieldUnderline focus={this.state.itemsOpen} muiTheme={this.context.muiTheme}/></div>
				{showItems && this.state.itemsOpen && <Paper style={Object.assign(styleMenuBase, menuStyle)} ref={this.setRefMenu}>
					{availableRendered}
					{notFoundRendered}
				</Paper>}
			</div>
		);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickAway);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickAway);
	}

	componentWillReceiveProps(nextProps) {
		this.calcItems(nextProps);
	}

	getItemByValue(value) {
		return this.mappedItems[this.indexItems[value]];
	}

	calcItems(props) {
		this.indexItems = {};
		this.mappedItems = props.items.map((a, i) => {
			const transformedItem = typeof a === 'object' && 'value' in a ? a : {value: a, label: a};
			this.indexItems[transformedItem.value] = i;
			return transformedItem;
		});
	}

	renderSelected = s => {
		const fn = () => {};
		const styleChip = {
			margin: '0 5px 5px 0',
			float: 'left',
			maxWidth: '100%'
		};

		const styleChipLabel = {
			maxWidth: 'calc(100% - 44px)',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		return (
			<Chip
				key={s.value}
				onRequestDelete={fn}
				style={styleChip}
				labelStyle={styleChipLabel}
				data-item-value={s.value}
				onClick={this.handleRemoveItem}
				>
				{s.label}
			</Chip>
		);
	}

	renderList = (a, i) => {
		const styleMenuLabel = {
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		const styleMenuFocused = {
			background: 'rgba(0, 0, 0, 0.098)'
		};
		const styleMenuSelected = {
			color: this.context.muiTheme.palette.accent1Color
		};
		const focusedItem = this.getFocusedItem();
		const isSelectedItem = this.state.selectedItems !== null && !this.props.multiple ? a.value === this.state.selectedItems : false;

		debug('rendering', a, isSelectedItem, this.state.selectedItems, a.value === this.state.selectedItems);

		const styleMenuMerged = styleMenuLabel;
		if (i === focusedItem) {
			Object.assign(styleMenuMerged, styleMenuFocused);
		}
		if (isSelectedItem) {
			Object.assign(styleMenuMerged, styleMenuSelected);
		}
		return (
			<MenuItemApp
				desktop
				style={styleMenuMerged}
				onClick={this.handleClickItem}
				onMouseOver={this.handleMenuOver}
				onMouseOut={this.handleMenuOut}
				data-item-value={a.value}
				data-item-index={i}
				key={a.value}
				primaryText={a.label}
				/>
		);
	}
};

SelectTextField.contextTypes = {
	muiTheme: React.PropTypes.object
};

SelectTextField.defaultProps = {
	items: [],
	multiple: false,
	maxHeight: 256,
	defaultValue: ''
};

SelectTextField.propTypes = {
	style: React.PropTypes.object,
	iconStyle: React.PropTypes.object,
	menuStyle: React.PropTypes.object,
	items: React.PropTypes.array,
	onFocus: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	onChange: React.PropTypes.func,
	hintText: React.PropTypes.string,
	name: React.PropTypes.string,
	multiple: React.PropTypes.bool,
	maxHeight: React.PropTypes.number,
	defaultValue: React.PropTypes.string
};

module.exports = SelectTextField;
