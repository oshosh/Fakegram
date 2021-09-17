import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Portal from '../common/Portal'
import Modoal from '../common/Modoal'
import PostCardMoreModal from './PostCardMoreModal'

import CustomAvatar from '../common/CustomAvatar'

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .header-container {
        display: flex;
        align-items: center;
        
        & .my-avatar {
            margin-right: 10px;
        }
    }
`

const MoreButton = styled(Button)`
   border: none ;
`

function PostCardHeader({ post }) {
    const [modalVisible, setModalVisible] = useState(false)

    const openModal = useCallback((e) => setModalVisible(true), [])
    const closeModal = useCallback((e) => setModalVisible(false), [])

    const onMoreButtonClick = useCallback((e) => {
        setModalVisible(true)
    }, [openModal])

    return (
        <>
            <Header>
                <div className="header-container">
                    <CustomAvatar
                        className="my-avatar"
                        size={"medium"}
                        textContent={post.User.nickname}
                    />
                    <span>{post.User.nickname}</span>
                </div>
                <div className="more-btn">
                    <MoreButton
                        key="more"
                        onClick={onMoreButtonClick}
                    >
                        <EllipsisOutlined />
                    </MoreButton>
                </div>
            </Header>

            {
                modalVisible && (
                    <Portal>
                        <Modoal
                            visible={modalVisible}
                            closable={true}
                            maskClosable={true}
                            onClose={closeModal}>
                            <PostCardMoreModal
                                post={post}
                                onClose={closeModal}
                            />
                        </Modoal>
                    </Portal>
                )
            }
        </>
    );
}

export default PostCardHeader;