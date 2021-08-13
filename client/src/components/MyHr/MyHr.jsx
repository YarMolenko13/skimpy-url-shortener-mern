import React from 'react';
// import 'myHr.scss'

const MyHr = (props) => {
    return (
        <div style={
            {backgroundColor: props.color ? props.color : '#e3e3e3',
            height: props.height ? props.height +'px' : '1px'
        }}>

        </div>
    );
};

export default MyHr;