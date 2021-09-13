# Fakegram (instargram 모방 개인 연습 프로젝트)
 
  ```
    react-hooks, es6, redux-saga (예정)
    
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
    
    이모지 추가
    emoji-picker-react
    
    카카오 로그인
    kakao login API (추후 back 리다이렉션 필요)
  ```
 
 # 작업 할 내역들 및 구조
 ```
  -AppLayout
  ㄴheader
    ㄴ SearchInput (해시 태그 검색)
    ㄴ 게시물 활동 - 타 유저가 내 게시판에 좋아요 혹은 댓글 달 경우 리스트 보여주기 (미정)
    ㄴ 아바타
       ㄴ 프로필
          ㄴ 서브 탭 관리 (3개)
          ㄴ 팔로잉      ㄴ 팔로워    ㄴ저장 게시물 관리
          
          닉네임 변경
          ㄴ 프로필 사진
          
       ㄴ 로그아웃
  ㄴ 메인 포스트
     ㄴ 포스트 작성
        ㄴ 이모지
        ㄴ 사진
        ㄴ 게시물
     ㄴ 포스트 목록
  
  - SignUpLayout
  ㄴ 회원 가입
  ㄴ 카카오 로그인
```
