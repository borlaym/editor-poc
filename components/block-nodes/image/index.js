import React from 'react';
import FloatingToolbar from '../../floating-toolbar';
import './style.css';

export default (props) => {
    const { node: {
        url,
        alignment,
        width,
        height,
        caption
     }, hasFocus, onCommand, onChange, node } = props;
    const alignmentClass = alignment === 'Left' ? 'align--left' : 'align--center';
    const toolbar = (
        <FloatingToolbar>
            <span onClick={() => onCommand(node, 'MOVE_UP')}>Move up</span>
            <span onClick={() => onCommand(node, 'MOVE_DOWN')}>Move down</span>
        </FloatingToolbar>
    );
    const captionDisplay = hasFocus ?
        <input
            type="text"
            onChange={(event) => onChange(node, {
                ...node,
                caption: event.target.value
            })}
            placeholder="Caption here"
            value={caption}
        /> :
        <figcaption>{caption}</figcaption>
    return (
        <figure onClick={() => onCommand(node, 'FOCUS')}>
            {hasFocus && toolbar}
            <img
                src={url}
                className={alignmentClass}
                width={width || null}
                height={height || null}
            />
            {captionDisplay}
        </figure>
    );
}