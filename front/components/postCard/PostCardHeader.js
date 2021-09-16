import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Portal from '../common/Portal'
import Modoal from '../common/Modoal'
import PostCardMoreModal from './PostCardMoreModal'

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

function PostCardHeader() {
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
                    <Avatar
                        className="my-avatar"
                        size="medium"
                    >
                        OSH
                    </Avatar>
                    <span>OSH</span>
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