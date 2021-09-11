import React, { useCallback } from 'react';
import Link from 'next/link';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../hooks/yup'
import { LockOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';

const LoginWrapper = styled.div`
    margin: .6rem;
`
const ButtonWrapper = styled.div`
    margin: .6rem;
    display: flex;
    justify-content: flex-end;
`
const RequiredText = styled.p`
    font-size: 0.6rem;
    margin-top: 1px;
    color: #bf1650;

     &::before {
        content: "⚠ ";
        display: inline;
     }
`;

//https://kimyang-sun.tistory.com/entry/React-Hook-Form-Antd-Yup-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0

function LoginForm({ setIsLoggedIn }) {

    const { register, handleSubmit, watch, formState: { errors }, setValue, control } = useForm({
        resolver: yupResolver(signInValidation),
        mode: 'onBlur',
    });
    const onSubmitSend = useCallback((e) => {
        console.log(watch())
        setIsLoggedIn(true)
    }, [])

    return (
        <Form onFinish={handleSubmit(onSubmitSend)}>
            <LoginWrapper>
                <Controller
                    as={<Input />}
                    type="text"
                    name="id"
                    control={control}
                    placeholder={"User ID"}
                    defaultValue=""
                    prefix={<UserOutlined />}
                    required
                />
                <ErrorMessage
                    errors={errors}
                    name="id"
                    render={({ message }) => {
                        return (
                            <RequiredText>{message}</RequiredText>
                        )
                    }}
                />
            </LoginWrapper>
            <LoginWrapper>
                <Controller
                    as={<Input />}
                    type="password"
                    name="password"
                    control={control}
                    placeholder={"Password"}
                    defaultValue=""
                    prefix={<LockOutlined />}
                    required
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => {
                        return (
                            <RequiredText>{message}</RequiredText>
                        )
                    }}
                />
            </LoginWrapper>
            <ButtonWrapper>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={false}
                    icon={<PoweroffOutlined />}
                >로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>
                            회원가입
                        </Button>
                    </a>
                </Link>
            </ButtonWrapper>
        </Form >
    );
}

export default LoginForm;