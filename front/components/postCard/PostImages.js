import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import PostSlick from './PostSlick';

const PrevArrow = styled.button`
    position: relative;
    /* top: 320px; */
    top: 150px;
    background: transparent;
    margin-right: 10px;
    width: 0;
    height: 0;
    border-left: 0 solid transparent;
    border-right: 15px solid #113463;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    cursor: pointer;
    z-index: 1;
`

function PostImages({ images }) {

    useEffect(() => {
        const slide = document.querySelectorAll('.slick-arrow');
        slide.forEach((item) => {
            item.style.cssText = "visibility: hidden"
        })
    }, [])

    const handleImageMove = (text) => (e) => {
        const slide = document.querySelectorAll('.slick-arrow');
        switch (text) {
            case 'next':
                slide[1].click()
                break;
            case 'prev':
                slide[0].click()
                break;
        }
    }

    return (
        <>
            <PostSlick className='center' src={images[0].src} handleImageMove={handleImageMove} />
        </>
    );
}
PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
}
export default PostImages;