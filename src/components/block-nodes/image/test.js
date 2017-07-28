// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ImageBlockNode from './';
import type { Image, CommandHandler, ChangeHandler } from '../types';

const SAMPLE_NODE_DATA = {
    url: 'url',
    alignment: 'Left',
    altText: 'alt',
    width: 900,
    height: 600,
    caption: 'This is a caption'
};

const noop = () => {};

const stubComponent = ({
    node = SAMPLE_NODE_DATA,
    hasFocus = false,
    onCommand = noop,
    onChange = noop
}: {
    node: Image,
    hasFocus: boolean,
    onCommand: CommandHandler,
    onChange: ChangeHandler
}) => (
    <ImageBlockNode
        node={node}
        hasFocus={hasFocus}
        onCommand={onCommand}
        onChange={onChange}
    />
);

describe('Image block node', () => {

    it('should render correctly', () => {
        const wrapper = shallow(stubComponent({}));
        expect(wrapper.find('img').length).to.equal(1);
        expect(wrapper.find('img').prop('src')).to.equal(SAMPLE_NODE_DATA.url);
        expect(wrapper.find('figcaption').text()).to.equal(SAMPLE_NODE_DATA.caption);
    });
});
