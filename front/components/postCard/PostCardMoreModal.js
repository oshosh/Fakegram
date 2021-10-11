import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import styled, { css } from 'styled-components';
import CancleButton from '../common/CancleButton';
import { useSelector } from 'react-redux';

const MenuWrapper = styled(Menu)`
    border-radius: 5px;
    width: 100%;
    border-right-color:#fff;

    text-align: center;

    display: block;

    ${props => props.singoState &&
        css`
        display: none;
    `}
`;

const ModalMenuSlider = styled.div`
    position: relative;
    /* overflow: hidden; */

    width: 200px;
    height: 110px;

    ${props => props.me &&
        css`
        width: 200px;
        height: 190px;
    `}
    
    & input[type="radio"] {
    display: none;
    }

    ul, li {
        padding: 0;
        margin: 0;
    }

    & li {
        list-style: none;
        transition-delay: 0.1s;
        position: absolute;
        left: 125px;
    }

    & input[type="radio"]:nth-child(1):checked ~ ul.items > li:nth-child(1) {
        left: 0;
        transition: 0.5s;
        z-index: 1;
    }
    & input[type="radio"]:nth-child(2):checked ~ ul.items > li:nth-child(2) {
        left: 0;
        transition: 0.5s;
        z-index: 1;
    }
`

const SingoMenuContainer = styled.div`
    display: none;

    ${props => props.singoState &&
        css`
        display: block;
    `}
`



function PostCardMoreModal({ post, isFollowing, singoState, onClose, setSingoState }) {

    // 내가 로그인하면 삭제/수정 그게 아니라면 신고
    const me = useSelector((state) => state.user.me)
    const menuItem = (
        <>
            {
                me ?
                    <>
                        <Menu.Item
                            key="deletePostMenu"
                            danger
                        >
                            <CancleButton
                                onClose={onClose('삭제')}
                                textContent={"삭제"}
                            />
                        </Menu.Item>

                        <Menu.Divider />
                        <Menu.Item
                            key="updatePostMenu"
                        >
                            <CancleButton
                                onClose={onClose('수정')}
                                textContent={"수정"}
                            />
                        </Menu.Item>
                        <Menu.Divider />

                        {isFollowing ?
                            <Menu.Item
                                id="unfollowingMenu"
                                danger
                            >
                                <CancleButton
                                    onClose={onClose('언팔로우')}
                                    textContent={"언팔로우"}
                                />
                            </Menu.Item>
                            : <Menu.Item
                                id="followingMenu"
                            >
                                <CancleButton
                                    onClose={onClose('팔로우')}
                                    textContent={"팔로우"}
                                />
                            </Menu.Item>
                        }

                    </>
                    :
                    (
                        <Menu.Item
                            id="singoMenu"
                            danger
                        >
                            <CancleButton
                                onClose={onClose('신고')}
                                textContent={"신고"}
                            />
                        </Menu.Item>

                    )
            }
        </>
    )

    const handleSingoCancleBtn = useCallback((e) => {
        setSingoState(false)
    }, [])

    const handleSingoOKBtn = useCallback((e) => {
        console.log('신고 접수 완료 ㅋ')
        onClose()
    }, [])

    return (
        <>
            <ModalMenuSlider me={me}>
                <input type="radio" name="slide" id="slide1" checked={!singoState} />
                <input type="radio" name="slide" id="slide2" checked={singoState} />

                <ul className="items">
                    <li>
                        <MenuWrapper singoState={singoState}>
                            {menuItem}
                            <Menu.Divider />
                            <Menu.Item
                                key="cancelMenu"
                            >
                                <CancleButton
                                    onClose={onClose('취소')}
                                    textContent={"취소"}
                                />
                            </Menu.Item>
                        </MenuWrapper>
                    </li>
                    <li>
                        <SingoMenuContainer singoState={singoState}>
                            <div>
                                <textarea style={{ width: '300px' }}></textarea>
                            </div>
                            <div>
                                <button onClick={handleSingoCancleBtn}>취소</button>
                                <button onClick={handleSingoOKBtn}>제출</button>
                            </div>
                        </SingoMenuContainer>
                    </li>
                </ul>
            </ModalMenuSlider>
        </>
    );
}

export default PostCardMoreModal;