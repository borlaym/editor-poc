import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import ContentEditable from './';

const stories = storiesOf('Content Editable', module);

stories.addDecorator(withKnobs);
stories.addDecorator(centered);

class ControlledComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value
        });
        this.props.onChange(value);
    }

    render() {
        return (
            <div>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        node: this.state.value,
                        onChange: this.handleChange
                    })
                })}
            </div>
        )
    }
}

stories.add('', () => 
    <ControlledComponent
        value={{
            type: 'Paragraph',
            value: [{
                type: "Text",
                styles: [],
                value: "Lorem ipsum  "
            }, {
                type: "Text",
                styles: ['Bold'],
                value: "dolor sit"
            }, {
                type: "Text",
                styles: ['Italic', 'Bold'],
                value: " amet."
            }]
        }}
        onChange={action('Change')}
    >
        <ContentEditable/>
    </ControlledComponent>
)
