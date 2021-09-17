import { HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined, SaveOutlined } from '@ant-design/icons';
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

    const handleClick = useCallback((e) => {
        switch (e.currentTarget.ariaLabel) {
            case 'heart':
                console.log('heart')
                setLiked((prevData) => !prevData)
                break;
            case 'message':
                console.log('message')
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
                                ? <HeartTwoTone twoToneColor="#eb2f96" onClick={handleClick} key="heart" />
                                : <HeartOutlined onClick={handleClick} key="heart" />
                        }
                    </div>
                    <div className="card-item">
                        <MessageOutlined onClick={handleClick} key="comment" />
                    </div>
                    <div className="card-item">
                        <RetweetOutlined onClick={handleClick} key="retweet" />
                    </div>
                </div>
                <div className="right">
                    <div className="card-item save">
                        <SaveOutlined onClick={handleClick} key="save" />
                    </div>
                </div>

            </CardBody>
        </>
    );
}

export default PostCardBody;