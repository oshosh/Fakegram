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
    const [singoState, setSingoState] = useState(false)

    const openModal = useCallback((e) => setModalVisible(true), [])
    const closeModal = useCallback((text) => (e) => {
        switch (text) {
            case '신고':
                let s1 = document.getElementById('slide1')
                s1.checked ? setSingoState(true) : setSingoState(false)
                break;
            case '취소':
                setModalVisible(false)
                console.log(text)
                break;
            case '팔로우':
                console.log(text)
                break;
            case '수정':
                console.log(text)
                break;
            case '삭제':
                console.log(text)
                break;
            default:
                setModalVisible(false)
                break
        }
        // setModalVisible(false)
    }, [])

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
                                singoState={singoState}
                                setSingoState={setSingoState}
                            />
                        </Modoal>
                    </Portal>
                )
            }
        </>
    );
}

export default PostCardHeader;