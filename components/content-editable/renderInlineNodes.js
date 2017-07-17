import React from 'react';

const styleToElement = style => {
    switch(style) {
        case 'Bold':
            return 'strong';
        case 'Italic':
            return 'em';
    }
};

const renderInlineNodes = (nodes) => {
    return nodes.map((node, index) => {
        const { type, styles, value } = node;
        if (type === 'Link') {
            return <a href={node.reference} target={node.target}>{renderInlineNodes(node.value)}</a>
        }
        let element = value;
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
    });
};

export default renderInlineNodes;