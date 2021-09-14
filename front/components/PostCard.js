import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, Card, Popover } from 'antd';
import React from 'react';

import PostCardHeader from './PostCardHeader';
import PostImages from './PostImages'

function PostCard({ post }) {
    return (
        <div>
            <Card
                title={<PostCardHeader />}
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
        </div>
    );
}

export default PostCard;