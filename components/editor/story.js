import React from 'react';

import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import Editor from './';

const story = storiesOf('Editor', module);
story.addDecorator(centered);

story.add('', () => 
  <Editor
    value={{
      body: [
        {
          type: 'Image',
          url: 'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg',
          alignment: 'Center',
          width: 300
        },
        {
          type: 'Image',
          url: 'http://www.petmd.com/sites/default/files/hypoallergenic-cat-breeds.jpg',
          alignment: 'Center',
          width: 300
        }
      ]
    }}
  />
  )
