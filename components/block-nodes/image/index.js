import React from 'react';
import FloatingToolbar from '../../floating-toolbar';
import './style.css';

export default (props) => {
    const { url, alignment, hasFocus, onCommand, node, width, height } = props;
    const alignmentClass = alignment === 'Left' ? 'align--left' : 'align--center';
    const toolbar = (
        <FloatingToolbar>
            <span onClick={() => onCommand(node, 'MOVE_UP')}>Move up</span>
            <span onClick={() => onCommand(node, 'MOVE_DOWN')}>Move down</span>
        </FloatingToolbar>
    );
    return (
        <figure onClick={() => onCommand(node, 'FOCUS')}>
            {hasFocus && toolbar}
            <img
                src={url}
                className={alignmentClass}
                width={width || null}
                height={height || null}
            />
        </figure>
    );
}