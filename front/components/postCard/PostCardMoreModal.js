import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import CancleButton from '../common/CancleButton';
import { useSelector } from 'react-redux';

const MenuWrapper = styled(Menu)`
    border-radius: 5px;
    width: 100%;
    border-right-color:#fff;

    text-align: center;
`;

function PostCardMoreModal({ onClose, post }) {

    // 내가 로그인하면 삭제/수정 그게 아니라면 신고
    const id = useSelector((state) => state.user.me?.id)

    const menuItem = (
        <>
            {
                id && post.User.id === id ?
                    <>
                        <Menu.Item danger>
                            <CancleButton
                                onClose={onClose}
                                textContent={"삭제"}
                            />
                        </Menu.Item>

                        <Menu.Divider />
                        <Menu.Item>
                            <CancleButton
                                onClose={onClose}
                                textContent={"수정"}
                            />
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                            <CancleButton
                                onClose={onClose}
                                textContent={"팔로우"}
                            />
                        </Menu.Item>
                    </>
                    :
                    (
                        <Menu.Item danger>
                            <CancleButton
                                onClose={onClose}
                                textContent={"신고"}
                            />
                        </Menu.Item>

                    )
            }
        </>
    )

    return (
        <>
            <MenuWrapper>
                {menuItem}
                <Menu.Divider />
                <Menu.Item>
                    <CancleButton
                        onClose={onClose}
                        textContent={"취소"}
                    />
                </Menu.Item>
            </MenuWrapper>
        </>
    );
}

export default PostCardMoreModal;