// @flow

import React from 'react';
import type { InlineNode, InlineNodeStyle, InlineTextNode } from '../block-nodes/types';

const styleToElement: (InlineNodeStyle => string) = style => {
    switch(style) {
        case 'Bold':
            return 'strong';
        case 'Italic':
            return 'em';
        default:
            return '';
    }
};

const renderInlineNodes = (nodes: Array<InlineNode>) => {
    return nodes.map((node, index) => {
        if (node.type === 'LineBreak') {
            return <br />;
        }
        if (node.type === 'Link') {
            const { reference, target } = node;
            return <a
                href={reference}
                target={target}
                data-route={index}
                >
                    {node.value.map(renderInlineTextNode)}
                </a>
        }
        if (node.type === 'Text') {
            return renderInlineTextNode(node, index);
        }
    });
};

const renderInlineTextNode = (node: InlineTextNode, index: number) => {
    let element = node.value;
    const { styles } = node;
    styles.forEach((style, styleIndex) => {
        const wrapperElement = styleToElement(style);
        element = React.createElement(wrapperElement, {
            key: `${index}-${styleIndex}`,
            'data-route': `${index}-${styleIndex}`
        }, element);
    });
    return React.createElement('span', {
        key: index,
        'data-route': index
    }, element);
};

export default renderInlineNodes;