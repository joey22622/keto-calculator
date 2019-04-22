import React from 'react';

const Match = props => {
    return (
        <div 
            key={props.keyId} 
            data-name={props.name} 
            className="match-item" 
            onClick={() => props.clicked(props.name)}
        >
        {props.name}
        </div>)
    }

export default Match; 