import { HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, SaveFilled, SaveOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SAVE_POST_REQUEST, UNSAVE_POST_REQUEST } from '../../reducers/user';

const CardBody = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    
    & .card-item {
        display: flex;
        margin: 10px;
        font-size: 24px;
        font-weight: 400;
        display: flex;
        cursor: pointer;
    }

    & .left {
        display: flex;
    }

    & .right{
        display: flex;
    }
`
function PostCardBody({ setCommentFormOpened, post }) {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const { mainPosts } = useSelector((state) => state.post)

    const [savePostToggle, setSavePostToggle] = useState(false)
    const [liked, setLiked] = useState(false)
    const [commentTooltipText, setCommentTooltipText] = useState({
        text: '댓글 보기',
        done: false,
    })

    useEffect(() => {
        setSavePostToggle(false)

        const savePost = me?.SavePosts.find((v) => {
            return v.id === post.id
        })

        if (savePost) {
            setSavePostToggle(true)
        }

    }, [me, post, savePostToggle])

    const handleClick = useCallback((e) => {
        switch (e.currentTarget.ariaLabel) {
            case 'heart':
                console.log('heart')
                setLiked((prevData) => !prevData)
                break;
            case 'message':
                console.log('message')
                setCommentTooltipText((prevData) =>
                    !prevData.done
                        ? { text: '댓글 보기 닫기', done: true, }
                        : { text: '댓글 보기', done: false, }
                )
                setCommentFormOpened((prevData) => !prevData)
                break;
            case 'retweet':
                console.log('retweet')
                break;
            case 'save':
                if (me) {
                    const isMyPost = me.Posts.find((v) => {
                        return v.id === post.id
                    })

                    if (isMyPost) {
                        alert('내 게시물은 저장 할 수 없습니다.')
                    } else {
                        // 내 게시물이 아닌 남의 게시물만 들어온다..
                        if (savePostToggle) {
                            // 저장된거라면........
                            // setSavePostToggle(false)
                            console.log('unsave') // dispatch로 저장된 데이터 찾아서 삭제
                            dispatch({
                                type: UNSAVE_POST_REQUEST,
                                id: post.id
                            })
                        } else {
                            // 저장이 안된거라면...
                            // setSavePostToggle(true)
                            console.log('save') // dispatch로 저장
                            dispatch({
                                type: SAVE_POST_REQUEST,
                                id: post.id
                            })
                        }
                    }
                } else {
                    return false;
                }
                break;
        }
    }, [me, post, savePostToggle])

    return (
        <>
            <CardBody>
                <div className="left">
                    <div className="card-item">
                        {
                            liked
                                ?
                                <>
                                    <Tooltip placement="topLeft" title={'좋아요 !'}>
                                        <HeartTwoTone twoToneColor="#eb2f96" onClick={handleClick} key="heart" />
                                    </Tooltip>
                                </>
                                :
                                <>
                                    <Tooltip placement="topLeft" title={'좋아요 누르기'}>
                                        <HeartOutlined onClick={handleClick} key="heart" />
                                    </Tooltip>
                                </>

                        }
                    </div>
                    <div className="card-item">
                        <Tooltip placement="topLeft" title={commentTooltipText.text}>
                            <MessageOutlined onClick={handleClick} key="comment" />
                        </Tooltip>
                    </div>
                    <div className="card-item">
                        <Tooltip placement="topLeft" title={'리트윗'}>
                            <RetweetOutlined onClick={handleClick} key="retweet" />
                        </Tooltip>
                    </div>
                </div>
                {
                    me
                        ? savePostToggle
                            ?
                            (
                                <div className="right">
                                    <div className="card-item save">
                                        <Tooltip placement="topLeft" title={'게시물 저장하기'}>
                                            <SaveFilled onClick={handleClick} key="save" />
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="right">
                                    <div className="card-item save">
                                        <Tooltip placement="topLeft" title={'게시물 저장하기'}>
                                            <SaveOutlined onClick={handleClick} key="save" />
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        : null
                }


            </CardBody>
        </>
    );
}

export default PostCardBody;