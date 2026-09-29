# 🐼 판다마켓

판다마켓 스프린트 미션을 진행하며 HTML과 CSS를 활용해 구현한 웹 프로젝트

## 📌 프로젝트 소개

Figma 디자인을 기반으로 판다마켓의 홈페이지, 로그인 페이지, 회원가입 페이지를 구현

## 🛠 기술 스택

- HTML
- CSS
- Git / GitHub
- Netlify
- Google Analytics

## ✨ 구현 내용

### 홈페이지
- 판다마켓 랜딩 페이지 구현
- 로그인 페이지 이동
- 상품 관련 섹션 및 Footer 구현

### 로그인 페이지
- 이메일 / 비밀번호 입력 UI
- 비밀번호 확인 아이콘
- input focus 스타일 적용
- Google / Kakao 간편 로그인 링크
- 회원가입 페이지 이동

### 회원가입 페이지
- 이메일 / 닉네임 / 비밀번호 / 비밀번호 확인 입력 UI
- 비밀번호 확인 아이콘
- input focus 스타일 적용
- Google / Kakao 간편 로그인 링크
- 로그인 페이지 이동

### 공통
- Pretendard 폰트 적용
- Figma Palette 색상을 CSS 변수로 관리
- Google Analytics 방문자 추적 적용
- Netlify 배포 및 GitHub 연동

## 🚀 배포

Netlify를 통해 배포했습니다.

https://hallland-pandamarket-sprint2.netlify.app/

## 🌿 브랜치

Sprint 2 작업 브랜치

`basic-송정현-sprint2`

---

Codeit Fullstack Sprint Mission 2

## Sprint 5 라우팅 준비

- `/`: 기존 랜딩 HTML을 React `LandingPage`로 이관
- `/items`: Sprint 4 `MarketPage` (검색, 정렬, 페이지네이션 유지)
- `/registration`: 상품 등록 빈 페이지
- `/items/:id`: 상품 상세 빈 페이지

`npm run dev`로 개발 서버를 실행하고, `npm run build` 및
`npm run preview`로 빌드 결과를 확인합니다. 현재 별도 테스트 스크립트는 없습니다.

React Router의 BrowserRouter를 사용하므로 배포 서버는 실제 파일이 없는
경로를 `/index.html`로 연결하는 SPA fallback 설정이 필요합니다.
기존 로그인/회원가입 등 정적 페이지와 이미지는 Vite 빌드 시 함께 복사됩니다.
등록/상세 API 연결과 Figma 세부 보정은 후속 작업입니다.
