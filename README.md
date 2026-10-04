# 판다마켓

React와 Express, MongoDB로 구현한 중고 상품 마켓 프로젝트입니다. React Router로 랜딩, 상품 목록, 상품 등록, 상품 상세 경로를 제공하며, 상품 목록 조회와 등록·수정·삭제는 직접 만든 Express API와 연결됩니다.

## 주요 기능

- `/`: 판다마켓 랜딩 페이지
- `/items`: 상품 목록, 검색, 최신순 정렬 표시, 페이지네이션
- `/registration`: 반응형 상품 등록 폼과 입력값 검증
- `/items/:id`: 상품 상세 경로 (현재 미션 범위에 따라 빈 페이지)
- Express API: 상품 등록·목록·상세 조회·수정·삭제
- MongoDB와 Mongoose를 이용한 상품 저장

## 기술 스택

- 프론트엔드: React, React Router, Vite, Axios
- 백엔드: Node.js, Express, Mongoose
- 데이터베이스: MongoDB Atlas
- 배포: Render

## 실행 방법

프론트엔드 루트에서 의존성을 설치한 뒤 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

프로덕션 빌드와 미리보기는 `npm run build`, `npm run preview`를 사용합니다. API 주소는 루트의 `.env` 파일에 `VITE_API_BASE_URL`로 설정합니다. 예시는 `.env.example`을 참고하세요.

백엔드는 `server` 디렉터리에서 의존성을 설치하고 실행합니다.

```bash
cd server
npm install
npm start
```

백엔드 `.env`에는 `MONGODB_URI`와 허용할 프론트엔드 주소인 `CORS_ORIGIN`을 설정합니다. 예시는 `server/.env.example`에 있습니다.

## 배포

- 프론트엔드: https://panda-market-sprint5.onrender.com/
- 백엔드: https://one6-sprint-mission-fe-oxiv.onrender.com/
- 상품 목록 API: https://one6-sprint-mission-fe-oxiv.onrender.com/products

Render에서 React Router 경로를 새로고침해도 열 수 있도록 SPA fallback을 설정해야 합니다.

## 별도 레거시 API 조회

페이지를 열 때 API 테스트 요청을 보내지 않습니다. 이전 Article/Product API의 읽기 요청을 수동으로 확인해야 할 때만 아래 명령을 실행합니다.

```bash
npm run test:legacy-apis
```

## 프로젝트 이력

이 저장소는 스프린트 미션을 이어서 진행한 결과물입니다. 초기 Sprint 2에서는 HTML과 CSS로 랜딩·로그인·회원가입 화면을 만들고 Netlify에 배포했습니다. 이후 React 마이그레이션, 상품 마켓, Express 상품 API와 등록 폼을 추가했습니다.
