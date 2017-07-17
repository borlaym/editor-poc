import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import ContentEditable from './';

const stories = storiesOf('Content Editable', module);

stories.addDecorator(withKnobs);
stories.addDecorator(centered);

stories.add('', () => 
    <ContentEditable
        node={{
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
    />
)
