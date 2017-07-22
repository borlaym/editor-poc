// @flow
import React from 'react';
import type { Component } from 'react-flow-types';
import Image from '../block-nodes/image';
import { moveUp, moveDown } from './commands';
import type {
    BlockNode,
    ChangeHandler,
    CommandHandler,
    Command,
    EditorBlockNodeProps
} from '../block-nodes/types';
import type { Post } from '../types';


const mapTypeToComponent = (type: string): Component<EditorBlockNodeProps<BlockNode>>  => {
    switch(type) {
        case 'Image':
            return Image;
        default:
            return Image;
    }
}

type Props = {
    value: Post,
    onChange: Post => void
};

type State = {
    value: Post,
    focusedNode: ?BlockNode
};

export default class Editor extends React.Component<*, Props, State> {
    state: State = {
        value: {
            body: []
        },
        focusedNode: null
    };
    handleBodyChange: ChangeHandler;
    handleCommand: CommandHandler;

    constructor(props: Props) {
        super(props);
        if (props.value) {
            this.state.value = props.value;
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
    }

    handleBodyChange(oldNode: BlockNode, newNode: BlockNode): void {
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

    handleCommand(node: BlockNode, command: Command): void {
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
                {body.map((node: BlockNode, index) => React.createElement(mapTypeToComponent(node.type), {
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
