import React from 'react';
import "./style.scss"

const MyButton = (props) => {
    return (
        <button onClick={props.callBack} style={{fontSize: props.fontSize + 'px'}} className={"my-button " + props.classes}>
            {props.text}
        </button>
    );
};

export default MyButton;
