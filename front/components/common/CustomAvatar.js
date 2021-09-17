import React from 'react';
import { Avatar } from 'antd';

function CustomAvatar({ size, textContent = '', ...extraProps }) {

    return (
        <>
            <Avatar
                size={size}
                {...extraProps}
            >
                {textContent}
            </Avatar>
        </>
    );
}

export default CustomAvatar;