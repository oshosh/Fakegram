import { Card, List, Comment } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import PropType from 'prop-types'

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PostCardHeader from './PostCardHeader';
import PostImages from './PostImages'
import PostCardBody from './PostCardBody';
import CommentForm from './CommentForm'
import { division } from '../../util/dataUtil';

const PostCardWrapper = styled.div`
    margin-top: 20px;
    border: 1px solid  #d2d2d2;
    border-radius: 5px;
`

function PostCard({ post }) {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const [commentFormOpened, setCommentFormOpened] = useState(false)

    const [isAddBtn, setIsAddBtn] = useState(false)
    const [prevData, setPrevData] = useState([])
    let add = 0

    useEffect(() => {
        const copyPostdata = [...post.Comments] // 원본 복사
        const divisonPostsData = copyPostdata.length !== 0 ? division(3, copyPostdata) : [] // 3개 씩 나눈 2차원 배열 구성

        if (divisonPostsData.length > 0) {
            setPrevData(divisonPostsData[0])

            if (post.Comments.length > 3) {
                setIsAddBtn(true)
            }
        }
    }, [])

    const handleMoreComment = useCallback((e) => {
        const copyPostdata = [...post.Comments] // 원본 복사
        let divisonPostData = division(3, copyPostdata) // 3개 씩 나눈 2차원 배열 구성
        ++add
        setPrevData((prevData) => {
            return prevData.concat(divisonPostData[add])
        })

        if (add + 1 === divisonPostData.length) {
            setIsAddBtn(false)
            console.log("더보기 삭제")
        }
    }, [])

    return (
        <PostCardWrapper>
            <Card
                title={<PostCardHeader post={post} />}
                cover={post.Images[0] && <PostImages images={post.Images} />}
            >
                <Card.Meta
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            <PostCardBody setCommentFormOpened={setCommentFormOpened} />
            {
                commentFormOpened &&
                (
                    <>
                        <CommentForm />
                        <List
                            header={
                                <>
                                    총 {post.Comments.length}개의 댓글
                                    {isAddBtn ? <button onClick={handleMoreComment}>더보기</button> : null}
                                </>
                            }
                            itemLayout='horizontal'
                        >
                            {
                                <li>

                                    {
                                        prevData && prevData.length > 0 &&

                                        prevData.map((item, idx) => {
                                            return (
                                                <>
                                                    <Comment
                                                        key={idx + 1}
                                                        author={item.User.nickname}
                                                        content={item.content}
                                                    />
                                                </>
                                            )

                                        })
                                    }
                                </li>
                            }
                        </List>
                    </>
                )
            }
        </PostCardWrapper>
    );
}
PostCard.prototype = {
    post: PropType.shape({
        id: PropType.number,
        User: PropType.shape({
            id: PropType.number,
            nickname: PropType.string,
        }).isRequired,
        content: PropType.string,
        createAt: PropType.object,
        Comment: PropType.arrayOf(PropType.object),
        Images: PropType.arrayOf(PropType.object),
    }).isRequired
}
export default PostCard;