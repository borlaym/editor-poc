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

    handleChange(oldValue, newValue) {
        this.setState({
            value: newValue
        });
        this.props.onChange(newValue);
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

const value = {
    type: 'Paragraph',
    value: [{
        type: 'Link',
        reference: 'http://apple.com',
        target: '_blank',
        value: [{
            type: 'Text',
            styles: [],
            value: 'Link to  '
        }, {
            type: 'Text',
            styles: ['Bold'],
            value: 'Apple.'
        }]
    },
    {
        type: 'Text',
        styles: [],
        value: ' Lorem ipsum  '
    }, {
        type: 'Text',
        styles: ['Bold'],
        value: 'dolor sit'
    }, {
        type: 'Text',
        styles: ['Italic', 'Bold'],
        value: ' amet.'
    }]
};

stories.add('', () => 
    <ControlledComponent
        value={value}
        onChange={action('Change')}
    >
        <ContentEditable/>
    </ControlledComponent>
)
