// @flow

import React, { Component } from 'react';
import renderInlineNodes from './renderInlineNodes';
import typeToElement from './typeToElement';
import getParentInlineElement from './helpers/getParentInlineElement';
import getTextNode from './helpers/getTextNode';

import type {
	EditorBlockNodeProps,
	Paragraph,
	InlineTextNode
} from '../block-nodes/types';

type Selection = {
	anchorNode: HTMLElement,
	anchorOffset: number,
	index: number
};

type State = {
	selection: ?Selection
}
class ContentEditable extends Component<void, EditorBlockNodeProps<Paragraph>, State> {
	state: State = {
		selection: null
	};
	handleChange: Event => void;
	element: HTMLElement;

    constructor(props: EditorBlockNodeProps<Paragraph>) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event: Event) {
		const parentElement = getParentInlineElement(window.getSelection().anchorNode);
		if (!parentElement) {
			return;
		}
		const index = Number(parentElement.dataset.route);
		const selection = window.getSelection();
		this.setState({
			selection: {
				// Funny things here, the reference changes if I just store that
				// And if I spread / Object.assign it, it returns an empty object
				anchorNode: selection.anchorNode,
				anchorOffset: selection.anchorOffset,
				index
			}
		});
		const inlineNode = this.props.node.value[index];
		if (inlineNode.type !== 'Text') {
			return;
		}
		const newInlineNode: InlineTextNode = {
			...inlineNode,
			value: parentElement.textContent
		};
        this.props.onChange(this.props.node, {
            ...this.props.node,
            value: [
                ...this.props.node.value.slice(0, index),
				newInlineNode,
				...this.props.node.value.slice(index + 1)
            ]
        });
	}

	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			// event.preventDefault();
		}
	}

	componentDidUpdate() {
		if (!this.state.selection) {
			return;
		}
		const { index, anchorOffset } = this.state.selection;
		const range = document.createRange();
		const selection = window.getSelection();
		const inlineNode = this.element.childNodes[index];
		if (!inlineNode) {
			return;
		}
		const textNode = getTextNode(inlineNode);
		if (!textNode) {
			return;
		}
		range.setStart(textNode, anchorOffset);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	render() {
        const { node } = this.props;
        return React.createElement(typeToElement(node), {
            ref: (e) => { this.element = e; },
            contentEditable: true,
            onInput: this.handleChange,
            onKeyDown: this.handleKeyDown
        }, renderInlineNodes(node.value));
	}
}

export default ContentEditable;
