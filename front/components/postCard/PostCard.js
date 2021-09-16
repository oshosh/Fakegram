import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, Card, Popover } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PostCardHeader from './PostCardHeader';
import PostImages from '../PostImages'


const PostCardWrapper = styled.div`
    margin-top: 20px;
    border: 1px solid  #d2d2d2;
    border-radius: 5px;
`

function PostCard({ post }) {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <PostCardWrapper>
            <Card
                title={isLoggedIn ? <PostCardHeader /> : ''}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    <HeartOutlined key="heart" />,
                    <MessageOutlined key="comment" />,
                    <Popover key="more">
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                {/* <Image ></Image>
                <Content></Content> */}
                <Button></Button>
            </Card>
            {/* <CommentForm></CommentForm>
            <Comments></Comments> */}


        </PostCardWrapper>
    );
}

export default PostCard;