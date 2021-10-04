import Slider from 'react-slick';
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
        text-align: center;
    }
    .slick-initialized { overflow: hidden; }
    
    .slick-slide div{
      outline: none;
    }

    .slick-dots {
        display: flex !important;
        justify-content: center;
        margin: 0;
        padding: 1rem 0;
	
	    list-style-type: none;
	
        li {
            margin: 0 0.25rem;
        }

        button {
            display: block;
            width: 1rem;
            height: 1rem;
            padding: 0;
            
            border: none;
            border-radius: 100%;
            background-color: orange;
            
            text-indent: -9999px;
        }

        li.slick-active button {
            background-color: red;
        }
        
    }
`

const SlickWrapper = styled.div`
    height: calc(100% - 44px); 
`

const SlickSlide = styled.img`
    margin: 0 auto;
    max-width: 100%;
    max-height: 750px;
`

const NextArrow = styled.button`
    position: relative;
    /* top: -320px; */
    float: right;

    background: transparent;
    width: 0;
    height: 0;
    border-right: 0 solid transparent;
    border-left: 15px solid #113463;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    cursor: pointer;
`

function PostSlick({ images, handleImageMove }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // const handleClick = (text) => (e) => {
    //     handleImageMove(text)(e)
    // }

    return (
        <>
            <Global />

            <SlickWrapper className="container">
                <Slider {...settings}>
                    {
                        images && images.map((image) => {
                            return (
                                <div>
                                    <SlickSlide
                                        id={image.id}
                                        src={image.src}
                                    />

                                </div>
                            )
                        })
                    }
                </Slider>
                {/* <NextArrow onClick={handleClick('next')} /> */}
            </SlickWrapper>

        </>
    );
}

export default PostSlick;