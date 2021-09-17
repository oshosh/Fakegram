import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    background-color: #fff;
    cursor: pointer;
    width: 100%;
    font-weight: 700;
    text-align: center;
`

function CancleButton({ onClose, textContent }) {

    const handleCloseClick = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    return (
        <>
            <Button onClick={handleCloseClick}>
                {textContent}
            </Button>
        </>
    );
}

export default CancleButton;