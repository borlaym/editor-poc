import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Image from './';

const stories = storiesOf('Block Nodes', module);

stories.addDecorator(withKnobs);

stories.add('Image', () => 
    <Image
        url={text('Url', 'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg')}
        alignment={select('Alignment', {
            'Left': 'Left',
            'Center': 'Center'
        }, 'Center')}
    />
)
