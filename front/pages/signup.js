import React, { useCallback } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';

import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../hooks/yup'
import styled from 'styled-components';
import SignUpLayout from '../components/SignUpLayout';

import titleLogo from '../images/logo_text.png'
import Link from 'next/link';

const RequiredText = styled.p`
    font-size: 0.6rem;
    margin-top: 1px;
    color: #bf1650;

     &::before {
        content: "⚠ ";
        display: inline;
     }
`;
const FromWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.2rem;
    
    padding: 34px;
    
    border: 1px solid #d2d2d2;
    border-radius: 2px;

    & .form-header {
        width: 173px;
        height: 50px;
        background: url(${titleLogo}) no-repeat;
        background-size: cover;
    }
`

const CustomAntdForm = styled(Form)`
    margin-top: 0.5rem;
    width: 258px;
    & div {
        margin-bottom: 0.5rem;
    }
`

const GotoHome = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 34px;
    border: 1px solid #d2d2d2;
    border-radius: 2px;
`

function signup() {

    const { register, handleSubmit, watch, formState: { errors }, setValue, control } = useForm({
        resolver: yupResolver(signUpValidation),
        mode: 'onBlur',
    });

    const onSubmitSend = useCallback((e) => {
        console.log(watch())
    }, [])
    return (
        <>
            <Head>
                <title>회원가입 페이지 | Fakegram</title>
            </Head>
            <SignUpLayout>
                <FromWrapper>
                    <div className="form-header">

                    </div>

                    <CustomAntdForm onFinish={handleSubmit(onSubmitSend)}>
                        <div>
                            <Controller
                                as={<Input />}
                                type="text"
                                name="id"
                                control={control}
                                placeholder="이메일 주소"
                                defaultValue=""
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
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="text"
                                name="nickname"
                                control={control}
                                placeholder="닉네임"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="nickname"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="password"
                                name="password"
                                control={control}
                                placeholder="패스워드"
                                defaultValue=""
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
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="password"
                                name="repassword"
                                control={control}
                                placeholder="패스워드 재입력"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="repassword"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                name="term"
                                control={control}
                                defaultValue={false}
                                render={({ onChange, value }) => {
                                    return (
                                        <Checkbox
                                            onChange={e => onChange(e.target.checked)}
                                            checked={value}
                                        >
                                            약관에 동의 하시겠습니까 ?
                                        </Checkbox>
                                    )
                                }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="term"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                가입하기
                            </Button>
                        </div>
                    </CustomAntdForm >
                </FromWrapper>

                <GotoHome>
                    계정이 있으신가요 ?
                    <Link href="/">
                        <a>
                            로그인 하러가기
                        </a>
                    </Link>
                </GotoHome>

            </SignUpLayout>
        </>
    );
}

export default signup;