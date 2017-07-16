// @flow
import React, { Component } from 'react';
import Image from '../block-nodes/image';

const mapTypeToComponent = (type) => {
    switch(type) {
        case 'Image':
            return Image;
        default:
            return null;
    }
}

export default class Editor extends Component {
    state = {
        value: {
            body: []
        }
    };

    constructor(props) {
        super(props);
        if (props.value) {
            this.state.value = props.value;
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
    }

    handleChange(value) {
        this.setState({
            value
        });
    }

    handleCommand(node, command) {
        switch(command) {
            case 'FOCUS':
                this.setState({
                    focusedNode: node
                });
                break;
        }
    }

    render() {
        const { focusedNode } = this.state;
        const { body } = this.state.value;
        return (
            <div>
                {body.map((node, index) => React.createElement(mapTypeToComponent(node.type), Object.assign(node, {
                    onCommand: this.handleCommand,
                    hasFocus: node === focusedNode,
                    key: index,
                    node
                })))}
            </div>
        )
    }
}
