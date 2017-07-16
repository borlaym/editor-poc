import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import ContentEditable from './';

const stories = storiesOf('Content Editable', module);

stories.addDecorator(withKnobs);
stories.addDecorator(centered);

stories.add('Image', () => 
    <ContentEditable
        node={{
            type: 'Paragraph',
            value: [{
                type: "Text",
                styles: [],
                value: "Some text. "
            }, {
                type: "Link",
                reference: "https://google.com",
                target: "_blank",
                value: [{
                    type: "Text",
                    styles: [],
                    value: "This is a link"
                }]
            }]
        }}
        onChange={action('Change')}
    />
)
