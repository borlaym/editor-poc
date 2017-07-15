// @flow
import React, { Component } from 'react';

export default class Editor extends Component {
    state = {
        value: {}
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value
        });
    }

    render() {
        return (
            <div>Hello world</div>
        )
    }
}
