# Fakegram (instargram 모방 개인 연습 프로젝트)
 
  ```
    react-hooks, es6
    
    비동기 api, 쓰로틀링 제어, 전역 state 관리 
    redux-saga
    
    프레임워크
    next.js
    
    퍼블리싱
    antd, ant-design/icon
    styled component
    
    비제어/제어컴포넌트
    react-hook-form
    @hookform/error-message
    
    액션함수 생성/호출 단축
    redux-actions
    
    리덕스 상태 관리 및 확인용
    dev-tools
    
    검증 라이브러리
    @hookform/resolvers
    yup
    
    이미지 슬라이더
    react-slick
    
    이모지 추가
    emoji-picker-react
    
    카카오 로그인
    kakao login API (추후 back 리다이렉션 필요)
    
    댓글 더보기 id 관련 중복 문제로 인한 - 더미 데이터 생성용 npm 추가 (server에서 db 모델 생성후 삭제 예정)
    shortId
  ```
 
 # 작업 할 내역들 및 구조
 ```
  -AppLayout
  ㄴheader
    ㄴ SearchInput (해시 태그 검색)
    ㄴ 게시물 활동 - 타 유저가 내 게시판에 좋아요 혹은 댓글 달 경우 리스트 보여주기 (HeartContentList)
    ㄴ 아바타
       ㄴ 프로필
          ㄴ 서브 탭 관리 (3개)
          ㄴ 팔로잉      ㄴ 팔로워    ㄴ저장 게시물 관리
          
          닉네임 변경
          ㄴ 프로필 사진
          
       ㄴ 로그아웃
  ㄴ 메인 포스트
     ㄴ 포스트 카드 (PostCard)
        ㄴ더보기 (PostCardHeader, PostCardMoreModal) - react-portal
          ㄴ 신고
             ㄴ 신고 양식 슬라이더 (취소/제출)
          ㄴ 취소 (공용)
          ㄴ 수정 (나 일경우)
          ㄴ 삭제 (나 일경우)
        ㄴ이미지 게시물 (PostImages, PostSlick)
          ㄴ 이미지 슬라이드 구현
        ㄴ게시물 내용 (PostCardContent)
          ㄴ 게시물 내용 더보기 구현
          ㄴ 해시태그 regex / link 구성
        ㄴ포스트 카드 아이템 (PostCardBody - 툴팁 추가)
          ㄴ 좋아요
          ㄴ 댓글 보기 
             ㄴ 더보기 구현 (수정, 삭제, 게시물 등록시에만 댓글 수정 삭제에 따른 댓글 상태 변화 -facebook도 같은 형식 확인)
             ㄴ 댓글 갯수
          ㄴ 리트윗
          ㄴ 게시물 저장
        ㄴ댓글 달기 (CommentForm)
          ㄴ 이모지 기능 추가
     ㄴ 포스트 작성 (PostForm)
        ㄴ 이모지
        ㄴ 사진
           ㄴ 슬라이더, slick-dots
        ㄴ 게시물
           ㄴ 더보기 (PostCardContent)
              ㄴ br 파싱 (regex)
              ㄴ 더 보기 버튼 생성 (br태그가 하나 이상일 경우)
     ㄴ 포스트 목록 (무한 스크롤링 구현 예정)
  
  - SignUpLayout
  ㄴ 회원 가입
  ㄴ 카카오 로그인
```
