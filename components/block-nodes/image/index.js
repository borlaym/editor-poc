import React from 'react';

export default (props) => {
    const { url, alignment } = props;
    const alignmentClass = alignment === 'Left' ? 'align--left' : 'align--center';
    return (
        <figure>
            <img src={url} className={alignmentClass} />
        </figure>
    );
}