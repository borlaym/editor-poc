import React from 'react';

import { storiesOf, withCentered } from '@storybook/react';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Image from './';

const stories = storiesOf('Block Nodes', module);

stories.addDecorator(withKnobs);
stories.addDecorator(centered);

stories.add('Image', () => 
    <Image
        url={text('Url', 'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg')}
        alignment={select('Alignment', {
            'Left': 'Left',
            'Center': 'Center'
        }, 'Center')}
        hasFocus={boolean('Has focus', false)}
        onCommand={action('Command')}
        width={number('Width')}
        height={number('Height')}
    />
)
