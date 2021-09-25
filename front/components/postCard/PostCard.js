import { Card, List, Comment } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import PropType from 'prop-types'

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PostCardHeader from './PostCardHeader';
import PostImages from './PostImages'
import PostCardBody from './PostCardBody';
import CommentForm from './CommentForm'
import { division, removeDuplicateFromArrayOfObjects, sortedData } from '../../util/dataUtil';
import CustomAvatar from '../common/CustomAvatar';

import PostCardContent from './PostCardContent';

const PostCardWrapper = styled.div`
    margin-top: 20px;
    border: 1px solid  #d2d2d2;
    border-radius: 5px;
    background: #fff;
    /* width: 614px;

    @media screen and (max-width: "994px") {
        width: auto;
    } */
`

const ListHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;

    & span {
        color: #262626;
        font-weight: 600;
        margin-right: 10px;
    }

    & button {
        border: none ;
        background-color: #fff;
        cursor: pointer;
    }
`
const CommentList = styled.div`
    display: flex;
    margin: 0 16px;
`

const CommentFormWrapper = styled.div`
    border-top: 1px solid #dbdbdb;
    padding: 0 16px ;
    display: inline-block;
    width: 100%;
    position: relative;
`
function PostCard({ post }) {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const [commentFormOpened, setCommentFormOpened] = useState(false)

    const [isAddBtn, setIsAddBtn] = useState(false)
    const [permissionAddBtn, setPermissionAddBtn] = useState(true)

    const [prevData, setPrevData] = useState([])

    useEffect(() => {
        const copyPostdata = [...post.Comments] // 원본 복사
        const divisonPostsData = copyPostdata.length !== 0 ? division(3, copyPostdata) : [] // 3개 씩 나눈 2차원 배열 구성

        if (divisonPostsData.length > 0) {
            setPrevData((prev) => {
                // 무조건 일단 3개 추가
                if ((prev && prev.length === 0) || prev.length === 3) {
                    return divisonPostsData[0]
                } else {
                    // 댓글이 추가 되면 이전 데이터와 결합
                    let data = prev.reverse().concat(post.Comments[post.Comments.length - 1])
                    return data.reverse()
                }
            })

            // 더보기 버튼을 절대 허가 하지 않도록 하기 위해서 분기처리 추가
            if (permissionAddBtn && post.Comments.length > 3) {
                setIsAddBtn(true)
            }

        }
        // else {
        //     setPermissionAddBtn(false)
        // }
    }, [post])


    // 더보기 버튼 이벤트
    const handleMoreComment = useCallback((e) => {
        const copyPostdata = [...post.Comments] // 원본 복사

        setPrevData((prevData) => {
            // 복사한 원본기준으로 어디까지 쓰였는지 comment id 값으로 조회 
            let lastIndex = copyPostdata.findIndex((v) => {
                // content에서 id로 바꾸면 됨 db, server 설정 후..
                return v.content === prevData[prevData.length - 1].content
            })
            // 마지막 comment id 기준으로 뒤에 값들은 전부 지움
            let sliceData = copyPostdata.slice(0, lastIndex)
            let divisonPostData = division(3, sliceData)

            // 마지막 더보기 배열이 3개가 아니면 더보기 삭제
            if (!divisonPostData[1]) {
                setIsAddBtn(false)
                setPermissionAddBtn(false)
            }
            return prevData.concat(divisonPostData[0])
        })
    }, [post])

    return (
        <PostCardWrapper>
            <Card
                title={<PostCardHeader post={post} />}
                cover={post.Images[0] && <PostImages images={post.Images} />}
            >
                <Card.Meta
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            <PostCardBody setCommentFormOpened={setCommentFormOpened} />
            {
                <>
                    {commentFormOpened && (
                        <>
                            <List
                                header={
                                    <>
                                        <ListHeaderWrapper>
                                            <span>
                                                총 {post.Comments.length}개의 댓글
                                            </span>
                                            {isAddBtn ? <button onClick={handleMoreComment}>더보기</button> : null}
                                        </ListHeaderWrapper>
                                    </>
                                }
                                itemLayout='horizontal'
                            >
                                <li>
                                    {
                                        prevData && prevData.length > 0 &&
                                        prevData.map((item, idx) => {
                                            return (
                                                <CommentList>
                                                    <Comment
                                                        key={idx + 1} // 추후 id 별 수정
                                                        avatar={<CustomAvatar
                                                            size={"medium"}
                                                            textContent={"OH"}
                                                        ></CustomAvatar>}
                                                        author={item.User.nickname}
                                                        content={item.content}
                                                    />
                                                </CommentList>
                                            )

                                        })
                                    }
                                </li>
                            </List>
                        </>
                    )}
                    <CommentFormWrapper>
                        <CommentForm
                            post={post}
                            setCommentFormOpened={setCommentFormOpened}
                        />
                    </CommentFormWrapper>
                </>

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