import React, {Component, PropTypes} from 'react';
import warning from 'warning';
import TabTemplate from './tab-template';
import InkBar from './ink-bar';

function getStyles(props, context) {
	const {tabs} = context.muiTheme;

	return {
		tabItemContainer: {
			width: '30%',
			backgroundColor: tabs.backgroundColor,
			alignItems: 'flex-start'
		},
		tabContentContainer: {
			width: '70%',
			alignItems: 'flex-start'
		}
	};
}

class Tabs extends Component {
	static propTypes = {
		/**
		 * Should be used to pass `Tab` components.
		 */
		children: PropTypes.node,
		/**
		 * The css class name of the root element.
		 */
		className: PropTypes.string,
		/**
		 * The css class name of the content's container.
		 */
		contentContainerClassName: PropTypes.string,
		/**
		 * Override the inline-styles of the content's container.
		 */
		contentContainerStyle: PropTypes.object,
		/**
		 * Specify initial visible tab index.
		 * If `initialSelectedIndex` is set but larger than the total amount of specified tabs,
		 * `initialSelectedIndex` will revert back to default.
		 * If `initialSlectedIndex` is set to any negative value, no tab will be selected intially.
		 */
		initialSelectedIndex: PropTypes.number,
		/**
		 * Override the inline-styles of the InkBar.
		 */
		inkBarStyle: PropTypes.object,
		/**
		 * Called when the selected value change.
		 */
		onChange: PropTypes.func,
		/**
		 * Override the inline-styles of the root element.
		 */
		style: PropTypes.object,
		/**
		 * Override the inline-styles of the tab-labels container.
		 */
		tabItemContainerStyle: PropTypes.object,
		/**
		 * Override the default tab template used to wrap the content of each tab element.
		 */
		tabTemplate: PropTypes.func,
		/**
		 * Makes Tabs controllable and selects the tab whose value prop matches this prop.
		 */
		value: PropTypes.any
	};

	static defaultProps = {
		initialSelectedIndex: 0,
		onChange: () => {}
	};

	static contextTypes = {
		muiTheme: PropTypes.object.isRequired
	};

	state = {selectedIndex: 0};

	componentWillMount() {
		const valueLink = this.getValueLink(this.props);
		const initialIndex = this.props.initialSelectedIndex;

		let selectedIndex = 0;
		if (valueLink.value !== undefined) {
			selectedIndex = this.getSelectedIndex(this.props);
		} else if (initialIndex < this.getTabCount()) {
			selectedIndex = initialIndex;
		}

		this.setState({
			selectedIndex
		});
	}

	componentWillReceiveProps(newProps, nextContext) {
		const valueLink = this.getValueLink(newProps);
		const newState = {
			muiTheme: nextContext.muiTheme || this.context.muiTheme
		};

		if (valueLink.value !== undefined) {
			newState.selectedIndex = this.getSelectedIndex(newProps);
		}

		this.setState(newState);
	}

	getEvenWidth = () => {
		return (
			parseInt(window
				.getComputedStyle(this.tabs)
				.getPropertyValue('width'), 10)
		);
	}

	getTabs = () => {
		const tabs = [];
		React.Children.forEach(this.props.children, tab => {
			if (React.isValidElement(tab)) {
				tabs.push(tab);
			}
		});
		return tabs;
	}

	getTabCount = () => {
		return this.getTabs().length;
	}

	// Do not use outside of this component, it will be removed once valueLink is deprecated
	getValueLink(props) {
		return props.valueLink || {
			value: props.value,
			requestChange: props.onChange
		};
	}

	getSelectedIndex = props => {
		const valueLink = this.getValueLink(props);
		let selectedIndex = -1;

		this.getTabs().forEach((tab, index) => {
			if (valueLink.value === tab.props.value) {
				selectedIndex = index;
			}
		});

		return selectedIndex;
	}

	handleTabTouchTap = (value, event, tab) => {
		const valueLink = this.getValueLink(this.props);
		const index = tab.props.index;

		if ((valueLink.value && valueLink.value !== value) ||
			this.state.selectedIndex !== index) {
			valueLink.requestChange(value, event, tab);
		}

		this.setState({selectedIndex: index});

		if (tab.props.onActive) {
			tab.props.onActive(tab);
		}
	};

	getSelected = (tab, index) => {
		const valueLink = this.getValueLink(this.props);
		return valueLink.value ? valueLink.value === tab.props.value :
			this.state.selectedIndex === index;
	}

	setRef = tabs => {
		this.tabs = tabs;
	}

	render() {
		const {
			contentContainerClassName,
			contentContainerStyle,
			initialSelectedIndex, // eslint-disable-line no-unused-vars
			inkBarStyle,
			style,
			tabItemContainerStyle,
			tabTemplate,
			...other
		} = this.props;

		const {prepareStyles} = this.context.muiTheme;
		const styles = getStyles(this.props, this.context);
		const valueLink = this.getValueLink(this.props);
		const tabValue = valueLink.value;
		const tabContent = [];
		// const width = 100 / this.getTabCount();
		const height = 48;

		const tabs = this.getTabs().map((tab, index) => {
			warning(tab.type && tab.type.muiName === 'Tab',
				`Tabs only accepts Tab Components as children.
				Found ${tab.type.muiName || tab.type} as child number ${index + 1} of Tabs`);

			warning(!tabValue || tab.props.value !== undefined,
				`Tabs value prop has been passed, but Tab ${index}
				does not have a value prop. Needs value if Tabs is going
				to be a controlled component.`);

			tabContent.push(tab.props.children ?
				React.createElement(tabTemplate || TabTemplate, {
					key: index,
					selected: this.getSelected(tab, index)
				}, tab.props.children) : undefined);

			return React.cloneElement(tab, {
				key: index,
				index,
				selected: this.getSelected(tab, index),
				width: '100%',
				onTouchTap: this.handleTabTouchTap
			});
		});

		const inkBar = this.state.selectedIndex === -1 ? null : (
			<InkBar
				top={height * this.state.selectedIndex}
				style={inkBarStyle}
				/>
		);

		return (
			<div
				{...other}
				style={prepareStyles(Object.assign({display: 'flex'}, style))}
				ref={this.setRef}
				>
				<div style={{position: 'relative'}}>
					{inkBar}
				</div>
				<div style={prepareStyles(Object.assign(styles.tabItemContainer, tabItemContainerStyle))}>
					{tabs}
				</div>
				<div
					style={prepareStyles(Object.assign(styles.tabContentContainer, contentContainerStyle))}
					className={contentContainerClassName}
					>
					{tabContent}
				</div>
			</div>
		);
	}
}

export default Tabs;
