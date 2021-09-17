import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, Form, Input } from 'antd'
import styled from 'styled-components';
import { PictureOutlined, SmileOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../../reducers/post'

const ContentWrapper = styled.div`
    margin-top: 20px;
    border: 1px solid  #d2d2d2;
    border-radius: 5px;
    
    & .avatar {
        display: flex;
        align-items: center;
        margin: 1rem;

        & .my-avatar {
            margin-right: 10px;
        }

        & span {
            font-weight: 700;
        }
    }
    & .text-form{
        & .text-area{
        
     }
    }
`

const ContentAddWrapper = styled.div`
    padding: 16px 0;

    & .content-item{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        border-radius: 5px;
        margin: 0 16px ;
        
        & span {
            font-weight: 700;
        }
    }

    & .content-confirm-btn {
        margin: 1rem;
    }
`
const ContentItem = styled.div`
    display: flex;

    & .picture-content{
        margin-right: 10px;
    }
`

const PickerContainer = styled.div`
    position: absolute;
    z-index: 3;
    top: 200px;
    right: 100px;
`


function PostForm() {
    const Picker = dynamic(() => import("emoji-picker-react")) // no ssr

    const { register, handleSubmit, watch, setValue, control } = useForm();
    const dispatch = useDispatch()

    const textareaRef = useRef()
    const imageInput = useRef()

    const [emoji, setEmoji] = useState('')
    const [open, setOpen] = useState(false)
    const [textAreaData, setTextAreaData] = useState('')

    const onPickOpenUp = useCallback(() => {
        setOpen(!open)
    }, [open])

    const onFormSubmit = useCallback((e) => {
        if (Object.values(watch()).join().trim() === '' && textareaRef.current.resizableTextArea.props.value === '') {
            return;
        }
        setValue("text", textareaRef.current.resizableTextArea.props.value) // 이모지로 ref 통해서 이전 props 값 가져와서 다시 register의 값을 갱신해줘야함..
        console.log(watch())
        dispatch(addPost())

        setTextAreaData('')
        setValue("text", '')

    }, [setValue, watch, setTextAreaData])

    const onEmojiClickEvent = useCallback((e, emojiObject) => {
        setEmoji(emojiObject.emoji)
        setOpen(!open)
        setTextAreaData((prevData) => prevData + emojiObject.emoji)
    }, [emoji, open, textAreaData])

    const onClickImageUpload = useCallback((e) => {
        imageInput.current.click()
    }, [imageInput.current])

    return (
        <>
            <ContentWrapper>
                <div className="avatar">
                    <Avatar
                        className="my-avatar"
                        size="medium"
                    // icon={<UserOutlined />}
                    >
                        OSH
                    </Avatar>
                    <span>OSH</span>
                </div>
                <div className="text-form">
                    <Form
                        style={{ margin: '10px 0 20px' }}
                        encType="multipart/form-data"
                        onFinish={handleSubmit(onFormSubmit)}
                    >
                        <Controller
                            type="text"
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ onChange, onBlur, value }) => (
                                <Input.TextArea
                                    ref={textareaRef}
                                    type="text"
                                    name="text"
                                    maxLength={140}
                                    className="text-area"
                                    placeholder={"osh님, 무슨 생각을 하고 계신가요 ?"}
                                    onChange={e => {
                                        setTextAreaData(e.target.value)
                                        setValue("text", e.target.value)
                                    }}
                                    value={textAreaData}
                                >
                                </Input.TextArea>
                            )}
                            {...register("text")}
                        />
                        <ContentAddWrapper className="test">
                            <div className="content-item">
                                <ContentItem>
                                    <div className="picture-content">
                                        <input type="file" multiple hidden ref={imageInput} />
                                        <Button
                                            icon={<PictureOutlined />}
                                            onClick={onClickImageUpload}
                                        >
                                            사진
                                        </Button>
                                    </div>
                                    <div>
                                        <Button onClick={onPickOpenUp} icon={<SmileOutlined />}>
                                            이모지
                                        </Button>
                                    </div>
                                    {
                                        open && (
                                            <PickerContainer>
                                                <Picker onEmojiClick={onEmojiClickEvent} />
                                            </PickerContainer>
                                        )
                                    }
                                </ContentItem>
                            </div>
                            <div className="content-confirm-btn">
                                <Button
                                    type="primary"
                                    style={{ float: 'right' }}
                                    htmlType="submit"
                                    block
                                >
                                    게시
                                </Button>
                            </div>
                        </ContentAddWrapper>
                    </Form>
                </div>
            </ContentWrapper>
        </>

    );
}

export default PostForm;

