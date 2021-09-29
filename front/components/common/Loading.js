import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import ReactLoading from 'react-loading';

function Loader({ type, color, message }) {
    return (
        <>
            <LoaderOverlay />
            <LoadingWrapper>
                <ReactLoading
                    type={type}
                    color={color}
                    height={'100%'}
                    width={'100%'}
                />
                <h2 className="msg-text1">{message}</h2>
                <h2 className="msg-text2">잠시만 기다려주세요.</h2>
            </LoadingWrapper>
        </>
    );
}

Loader.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default Loader;

const LoaderOverlay = styled.div`
  display: block;
  ${({ theme }) => theme.common.Overlay};
  background-color: #fff;
  z-index: -3;
`

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & .msg-text1 {
        margin-top: 30px;
        font-size: 1.1rem;
        line-height: 1.3;
        font-weight: 700;
        color: blue;
    }

    & .msg-text2{
        font-size: 1.1rem;
        line-height: 1.3;
        font-weight: 700;
        color: blue;
    }
`