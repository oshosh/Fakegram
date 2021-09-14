import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

const MenuWrapper = styled(Menu)`
    border-radius: 5px;
    width: 100%;
    border-right-color:#fff;
`;

const CancleButton = styled.button`
    border: none;
    background-color: #fff;
    cursor: pointer;
    width: 100%;
    font-weight: 700;
    text-align: center;
`

function PostCardMoreModal({ onClose }) {

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    return (
        <>
            <MenuWrapper>
                <Menu.Item danger>
                    <CancleButton onClick={close} >
                        신고
                    </CancleButton>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <CancleButton onClick={close} >
                        팔로우
                    </CancleButton>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <CancleButton onClick={close} >
                        취소
                    </CancleButton>
                </Menu.Item>
            </MenuWrapper>
        </>
    );
}

export default PostCardMoreModal;