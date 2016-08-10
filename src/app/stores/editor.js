/* global Blob, FileReader */
'use strict';

import Reflux from 'reflux';
import {alignment as GridAlignment} from 'app/helpers/grid'; // eslint-disable-line import/no-extraneous-dependencies
import EditorActions from 'app/actions/editor'; // eslint-disable-line import/no-extraneous-dependencies

const debug = require('debug')('MTME:Stores:Editor');

const defaultAlignment = [
	null,
	GridAlignment.ALIGNMENT_GRID11,
	GridAlignment.ALIGNMENT_GRID21,
	GridAlignment.ALIGNMENT_GRID36
];

const EditorStore = Reflux.createStore({
	// Base Store //

	listenables: EditorActions,

	init() {
		this.state = {};
		this.state.editor = {
			alignment: GridAlignment.ALIGNMENT_GRID36,
			sections: [
				{id: 'Media', visible: true},
				{id: 'Source', visible: true},
				{id: 'View', visible: true}
			]
		};
	},

	// Actions //

	onStateCast() {
		debug('onStateCast', this.state);
		this.updateState();
	},

	onToggleVisibility(sectionId) {
		debug('onToggleVisibility', sectionId);

		let visibleSections = this.state.editor.sections.filter(o => o.visible).length;
		const position = this.state.editor.sections.reduce((p, c, i) => {
			return p === -1 && c.id === sectionId ? i : p;
		}, -1);
		if (position === -1) {
			throw new Error(`${sectionId} not found.`);
		}

		// Do not allow less than 1 selected section
		if (visibleSections === 1 && this.state.editor.sections[position].visible) {
			return;
		}

		this.state.editor.sections[position].visible = !this.state.editor.sections[position].visible;
		visibleSections = this.state.editor.sections.filter(o => o.visible).length;
		this.state.editor.alignment = defaultAlignment[visibleSections];
		this.onStateCast();
	},

	onChangeAlignment(newAlignment) {
		debug('onChangeAlignment', newAlignment);
		this.state.editor.alignment = newAlignment;
		this.onStateCast();
	},

	onChangeOrder(newOrder) {
		debug('onChangeOrder', newOrder);
		const newSections = newOrder.map(sectionId => {
			return {
				id: sectionId,
				visible: this.state.editor.sections.reduce((p, c) => {
					return p === null && c.id === sectionId ? c.visible : p;
				}, null)
			};
		});
		this.state.editor.sections = newSections;
		this.onStateCast();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = EditorStore;
