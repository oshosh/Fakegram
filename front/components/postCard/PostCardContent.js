import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { regexpParse } from '../../util/dataUtil'

const PostContentWrapper = styled.div`
    display: flex;
`

const PostContentContainer = styled.div`
    width: ${props => props.cssSettings.width};
    /* white-space: ${props => props.cssSettings.whiteSpace}; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    
    -webkit-box-orient: vertical;

    ${props => props.cssSettings.webkitLineClamp &&
        css`
        -webkit-line-clamp: 1;
    `}
`

const ButtonWrapper = styled.div`
    ${props => props.cssSettings.visibility &&
        css`
        visibility: hidden; 
    `}
`
const MoreButton = styled.button`
    background: 0 0;
    border: 0;
    color: #8e8e8e;
    cursor: pointer;
    line-height: inherit;
    margin: 0;
    padding: 0;
    cursor: pointer;
`

//https://deeplify.dev/front-end/markup/text-ellipsis
function PostCardContent({ postData }) {
    const pRef = useRef()

    useEffect(() => {
        const tempData = []

        tempData.push(pRef.current.innerHTML) // 이전 데이터 넣음
        pRef.current.innerHTML = regexpParse(pRef.current.innerHTML).replaceBlank()
        tempData.push(pRef.current.innerHTML)

        // 비교
        if (tempData[0] !== tempData[1]) {
            setCreateMoreBtn(true)
        }

    }, [])

    const [createMoreBtn, setCreateMoreBtn] = useState(false)
    const [cssSettings, setCssSettings] = useState({
        width: '70%',
        whiteSpace: 'nowrap',
        visibility: false,
        webkitLineClamp: true,
    })

    const handleMoreClick = useCallback((e) => {
        setCssSettings({
            width: "100%",
            whiteSpace: "normal",
            visibility: true,
            webkitLineClamp: false,
        })
    }, [cssSettings])

    return (
        <>
            <PostContentWrapper>
                <PostContentContainer className="container" cssSettings={cssSettings}>
                    <p ref={pRef}>
                        {regexpParse(postData).hashTagSplit().map((contentItem, idx) => {
                            if (regexpParse(contentItem).hashTagMatch()) {
                                return (
                                    <Link href={`/hashtag/${contentItem.slice(1)}`}
                                        key={idx}
                                    >
                                        <a>{contentItem}</a>
                                    </Link>
                                )
                            }
                            return contentItem;
                        })}
                    </p>
                </PostContentContainer>

                <ButtonWrapper cssSettings={cssSettings}>
                    {createMoreBtn && <MoreButton onClick={handleMoreClick} >더보기...</MoreButton>}
                </ButtonWrapper>
            </PostContentWrapper>
        </>
    );
}

PostCardContent.prototype = {
    postData: PropTypes.string.isRequired
}

export default PostCardContent;