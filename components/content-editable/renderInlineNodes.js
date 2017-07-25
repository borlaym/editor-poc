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

/**
 * Render different inline nodes.
 */
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
                    {node.value.map((innerNode, innerIndex) => {
                        return renderInlineTextNode(innerNode, [index, 'value', innerIndex]);
                    })}
                </a>
        }
        if (node.type === 'Text') {
            return renderInlineTextNode(node, [index]);
        }
    });
};

/**
 * Render a single InlineTextNode with different stylings. It will result in a span containing style tags
 */
const renderInlineTextNode = (node: InlineTextNode, route: Array<string | number>) => {
    let element = node.value;
    const { styles } = node;
    styles.forEach((style, styleIndex) => {
        const wrapperElement = styleToElement(style);
        element = React.createElement(wrapperElement, {
            key: `${route.join('.')}-${styleIndex}`
        }, element);
    });
    return React.createElement('span', {
        key: route.join('.'),
        'data-route': route.join('.')
    }, element);
};

export default renderInlineNodes;