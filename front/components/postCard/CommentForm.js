import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Form, Input, Menu } from 'antd'
import styled from 'styled-components';
import { SmileOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput'
import dynamic from 'next/dynamic'

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

        & .smile-emoji {
            font-size: 25px;
        }
    
        &.btn-post{
            & span{
                font-weight: 600;
                color:#1890ff; 
            }
        }
   }
`

const TextArea = styled(Input.TextArea)`
    display: flex;
    vertical-align: middle;
    border: none;
    width: 90%;
`

function CommentForm({ post }) {
    const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false, })

    const [emoji, setEmoji] = useState('')
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    const onEmojiClickEvent = useCallback((e, emojiObject) => {
        setEmoji(emojiObject.emoji)
        setCommentText((prevData) => prevData + emojiObject.emoji)
    }, [emoji, commentText])

    const menu = (
        <Menu>
            <Menu.Item disabled={false}>
                <Picker onEmojiClick={onEmojiClickEvent} />
            </Menu.Item>
        </Menu>
    );

    const onsubmitComment = useCallback(() => {
        console.log(commentText)
    }, [commentText])

    return (
        <>
            <Form
                onFinish={onsubmitComment}
            >
                <FormContainer>
                    <button>
                        <span className="smile-emoji">
                            <Dropdown
                                overlay={menu}
                                trigger={["click"]}
                                placement="bottomLeft"
                                disabled={false}
                            >
                                <div onClick={e => e.preventDefault()}>
                                    <SmileOutlined />
                                </div>
                            </Dropdown>
                        </span>
                    </button>
                    <TextArea
                        style={{ verticalAlign: "middle" }}
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