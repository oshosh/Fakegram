import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import Portal from '../common/Portal';
import Modoal from '../common/Modoal';
import Loading from '../common/Loading';
import PostCardMoreModal from './PostCardMoreModal';

import CustomAvatar from '../common/CustomAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_POST_REQUEST } from '../../reducers/post';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';

function PostCardHeader({ post }) {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.me)
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id); // 내가 이사람을 팔로우 했는지 ? 찾아라

  const [modalVisible, setModalVisible] = useState(false);
  const [singoState, setSingoState] = useState(false);

  const openModal = useCallback((e) => setModalVisible(true), []);
  const closeModal = useCallback(
    (text) => (e) => {
      switch (text) {
        case '신고':
          let s1 = document.getElementById('slide1');
          s1.checked ? setSingoState(true) : setSingoState(false);
          break;
        case '취소':
          setModalVisible(false);
          console.log(text);
          break;
        case '팔로우':
          if (isFollowing) {
            dispatch({
              type: UNFOLLOW_REQUEST,
              id: post.User.id,
            });
          } else {
            dispatch({
              type: FOLLOW_REQUEST,
              id: post.User.id,
            });
          }
          break;
        case '수정':
          console.log(text);
          break;
        case '삭제':
          dispatch({
            type: REMOVE_POST_REQUEST,
            id: post.id,
          });
          break;
        default:
          setModalVisible(false);
          break;
      }
    },
    [isFollowing],
  );

  const onMoreButtonClick = useCallback(
    (e) => {
      setModalVisible(true);
    },
    [openModal],
  );

  return (
    <>
      <Header>
        <div className="header-container">
          <CustomAvatar
            className="my-avatar"
            size={'medium'}
            textContent={post.User.nickname}
          />
          <span>{post.User.nickname}</span>
        </div>
        <div className="more-btn">
          <MoreButton key="more" onClick={onMoreButtonClick}>
            <EllipsisOutlined />
          </MoreButton>
        </div>
      </Header>

      {modalVisible && (
        <Portal>
          <Modoal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
          >
            <PostCardMoreModal
              post={post}
              onClose={closeModal}
              singoState={singoState}
              setSingoState={setSingoState}
            />
          </Modoal>
        </Portal>
      )}
    </>
  );
}

export default PostCardHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .header-container {
    display: flex;
    align-items: center;

    & .my-avatar {
      margin-right: 10px;
    }
  }
`;

const MoreButton = styled(Button)`
  border: none;
`;
