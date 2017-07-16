import React from 'react';

const renderInlineNodes = (nodes) => {
    return nodes.map((node) => {
        const { type, styles, value } = node;
        if (type === 'Link') {
            return <a href={node.reference} target={node.target}>{renderInlineNodes(node.value)}</a>
        }
        if (styles.length === 0) {
            return node.value;
        }
    });
};

export default renderInlineNodes;