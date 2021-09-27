import { HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, SaveOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

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
function PostCardBody({ setCommentFormOpened }) {

    const [liked, setLiked] = useState(false)

    const [commentTooltipText, setCommentTooltipText] = useState({
        text: '댓글 보기',
        done: false,
    })

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
                console.log('save')
                break;
        }
    }, [])

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
                <div className="right">
                    <div className="card-item save">
                        <Tooltip placement="topLeft" title={'게시물 저장하기'}>
                            <SaveOutlined onClick={handleClick} key="save" />
                        </Tooltip>
                    </div>
                </div>

            </CardBody>
        </>
    );
}

export default PostCardBody;