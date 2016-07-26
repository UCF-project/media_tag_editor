'use strict';

// Inspired from https://github.com/mikenikles/html-to-react

import React from 'react';
import camelCase from 'camelcase';

const debug = require('debug')('ReactifyDOMNode');

// omittedCloseTags from https://github.com/facebook/react/blob/0.14-stable/src/renderers/dom/shared/ReactDOMComponent.js#L432
const omittedCloseTags = {
	area: true,
	base: true,
	br: true,
	col: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true
	// NOTE: menuitem's close tag should be omitted, but that causes problems.
};

const convertStyle = cssString => {
	debug(`Converting style string: ${cssString}`);
	const result = {};

	if (typeof cssString === 'string' && cssString.trim()) {
		const cssList = cssString.split(';');
		debug('cssList:', cssList);
		cssList.forEach(css => {
			if (css) {
				const cssArr = css.split(':');
				if (cssArr.length === 1 && cssArr[0] && cssArr[0].trim()) {
					const cssProperty = camelCase(cssArr[0].trim());
					result[cssProperty] = null;
				} else if (cssArr.length === 2 && cssArr[0] && cssArr[1]) {
					const cssProperty = camelCase(cssArr[0].trim());
					const cssValue = cssArr[1].trim();
					if (cssProperty && cssValue) {
						result[cssProperty] = cssValue;
					}
				} else {
					throw new Error(`Could not parse ${css}`);
				}
			}
		});
	}

	debug('Style converted:', cssString);
	return result;
};

const convertAttributes = nodeAttr => {
	debug('Converting attributes', nodeAttr);
	const attributes = {};
	Array.prototype.slice.call(nodeAttr).forEach(attr => {
		if (attr.name === 'style') {
			attributes.className = convertStyle(attr.value);
		} else {
			attributes[camelCase(attr.name)] = attr.value;
		}
	});
	return attributes;
};

const setKey = (node, i) => {
	if (!node.hasAttribute('key')) {
		node.setAttribute('key', i);
	}
	return node;
};

const ReactifyDOMNode = node => {
	if (node.type === 'text' || node.type === 'comment') {
		return node;
	}

	const elementAttr = convertAttributes(node.attributes);

	let children = [];
	if (node.children) {
		children = Array.prototype.slice.call(node.children)
			.map(setKey)
			.map(ReactifyDOMNode);
	}

	if (omittedCloseTags[node.tagName.toLowerCase()]) {
		return React.createElement(node.tagName, elementAttr);
	}

	return React.createElement(node.tagName, elementAttr, children);
};

module.exports = ReactifyDOMNode;
