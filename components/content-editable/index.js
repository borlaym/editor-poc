import React, { Component } from 'react';
import renderInlineNodes from './renderInlineNodes';
import typeToElement from './typeToElement';
import getParentInlineElement from './helpers/getParentInlineElement';
import getTextNode from './helpers/getTextNode';
class ContentEditable extends Component {
	state = {
		selection: null
	};

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
		const parentElement = getParentInlineElement(window.getSelection().anchorNode);
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
        this.props.onChange({
            ...this.props.node,
            value: [
                ...this.props.node.value.slice(0, index),
				{
					...this.props.node.value[index],
					value: parentElement.textContent
				},
				...this.props.node.value.slice(index + 1)
            ]
        });
	}

	handleKeyDown(event) {
		if (event.key === 'Enter') {
			// event.preventDefault();
		}
	}

	componentDidUpdate() {
		if (!this.state.selection) {
			return;
		}
		const range = document.createRange();
		const selection = window.getSelection();
		range.setStart(getTextNode(this.element.childNodes[this.state.selection.index]), this.state.selection.anchorOffset);
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
