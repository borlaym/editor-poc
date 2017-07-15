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
    }

    handleChange(value) {
        this.setState({
            value
        });
    }

    render() {
        const { body } = this.state.value;
        return (
            <div>
                {body.map(node => React.createElement(mapTypeToComponent(node.type), node))}
            </div>
        )
    }
}
