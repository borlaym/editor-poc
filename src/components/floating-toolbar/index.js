import React from 'react';
import './style.css';

export default (props) => {
    return (
        <ul className="floating-toolbar">
            {React.Children.map(props.children, child => (
                <li>{child}</li>
            ))}
        </ul>
    );
};