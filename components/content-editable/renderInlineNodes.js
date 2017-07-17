import React from 'react';

const renderInlineNodes = (nodes) => {
    return nodes.map((node, index) => {
        const { type, styles, value } = node;
        if (type === 'Link') {
            return <a href={node.reference} target={node.target}>{renderInlineNodes(node.value)}</a>
        }
        let element = styles.length ? value : <span key={index} data-index={index}>{value}</span>;
        styles.forEach(style => {
            switch(style) {
                case 'Bold':
                    element = React.createElement('strong', {
                        key: index,
                        'data-index': index
                    }, element);
                    break;
                case 'Italic':
                    element = React.createElement('em', {
                        key: index,
                        'data-index': index
                    }, element);
                    break;
            }
        });
        return element;
    });
};

export default renderInlineNodes;