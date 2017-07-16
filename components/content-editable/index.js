import React, { Component } from 'react';
import renderInlineNodes from './renderInlineNodes';
import typeToElement from './typeToElement';

class ContentEditable extends Component {
	state = {
		selection: null
	};

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
		this.setState({
			selection: window.getSelection().anchorOffset
		});
        this.props.onChange({
            ...this.props.node,
            value: [
                ...this.props.node.value
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
		range.setStart(this.element.childNodes[0], this.state.selection);
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
