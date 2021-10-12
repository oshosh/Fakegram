import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Form, Input, Menu } from 'antd';
import styled from 'styled-components';
import { SmileOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import { addComment, ADD_COMMENT_REQUEST } from '../../reducers/post';
import DropdownMenu from '../common/DropdownMenu';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 55px;

  & button {
    width: 70px;
    border: none;
    background-color: #fff;
    border-radius: 2px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    cursor: pointer;
    opacity: 1;


    &.btn-post {
      & span {
        font-weight: 600;
        color: #1890ff;
      }
    }
  }

`;

const TextArea = styled(Input.TextArea)`
  display: flex;
  vertical-align: middle;
  border: none;
  width: 90%;
`;

function CommentForm({ post, setCommentFormOpened }) {
    const dispatch = useDispatch();
    const { addCommentDone } = useSelector((state) => state.post);

    const { me, id } = useSelector((state) => state.user);

    const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
    const [emoji, setEmoji] = useState('');
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onEmojiClickEvent = useCallback(
        (e, emojiObject) => {
            setEmoji(emojiObject.emoji);
            setCommentText((prevData) => prevData + emojiObject.emoji);
        },
        [emoji, commentText],
    );

    const onsubmitComment = useCallback((e) => {
        if (me) {
            dispatch(
                addComment({
                    content: commentText, // 댓글 내용
                    postId: post.id, // 댓글달은 포스트 번호
                    useId: id, // 내가 댓글을 달았으니 내 아이디
                }),
            );
            setCommentFormOpened(true);
        } else {
            setCommentText('');
            console.log('로그인 하세요');
        }
    }, [commentText, me, id]);

    return (
        <>
            <Form onFinish={onsubmitComment}>
                <FormContainer>
                    <DropdownMenu>
                        <Picker onEmojiClick={onEmojiClickEvent} />
                    </ DropdownMenu>

                    <TextArea
                        style={{ verticalAlign: 'middle' }}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        placeholder="댓글 달기..."
                        value={commentText}
                        onChange={onChangeCommentText}
                    />
                    <button className="btn-post">
                        <span>게시</span>
                    </button>
                </FormContainer>
            </Form>
        </>
    );
}

export default CommentForm;
