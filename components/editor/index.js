// @flow
import React, { Component } from 'react';
import Image from '../block-nodes/image';
import { moveUp, moveDown } from './commands';

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
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
    }

    handleBodyChange(oldNode, newNode) {
        const { body } = this.state.value;
        this.setState({
            value: {
                ...this.state.value,
                body: [
                    ...body.slice(0, body.indexOf(oldNode)),
                    newNode,
                    ...body.slice(body.indexOf(oldNode) + 1)
                ]
            },
            focusedNode: newNode
        }, () => this.props.onChange(this.state.value));
    }

    handleCommand(node, command) {
        const { onChange } = this.props;
        switch(command) {
            case 'FOCUS':
                this.setState({
                    focusedNode: node
                });
                break;
            case 'MOVE_UP':
                this.setState({
                    value: {
                        ...this.state.value,
                        body: moveUp(this.state.value.body, node)
                    }
                }, () => onChange(this.state.value));
                break;
            case 'MOVE_DOWN':
                this.setState({
                    value: {
                        ...this.state.value,
                        body: moveDown(this.state.value.body, node)
                    }
                }, () => onChange(this.state.value));
                break;
        }
    }

    render() {
        const { focusedNode } = this.state;
        const { body } = this.state.value;
        return (
            <div>
                {body.map((node, index) => React.createElement(mapTypeToComponent(node.type), {
                    onCommand: this.handleCommand,
                    onChange: this.handleBodyChange,
                    hasFocus: node === focusedNode,
                    key: index,
                    node
                }))}
            </div>
        )
    }
}
