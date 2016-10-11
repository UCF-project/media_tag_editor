import React from 'react';

const TabTemplate = props => {
	const styles = {
		width: '100%',
		position: 'relative',
		textAlign: 'initial'
	};

	if (!props.selected) {
		styles.height = 0;
		styles.overflow = 'hidden';
	}

	return (
		<div style={styles}>
			{props.children}
		</div>
	);
};

TabTemplate.propTypes = {
	children: React.PropTypes.node,
	selected: React.PropTypes.bool
};

export default TabTemplate;
