# 🐼 판다마켓 프로젝트

# 판다마켓

코드잇 스프린트 미션으로 제작한 **판다마켓 로그인 & 회원가입 페이지**입니다.

## 프로젝트 소개

HTML과 CSS를 사용하여 판다마켓 로그인 화면을 구현했습니다.

피그마 디자인 시안을 참고하여 입력창, 로그인 버튼, 간편 로그인 영역 등을 배치하고 스타일을 적용했습니다.

## 사용 기술

- HTML
- CSS

## 구현한 내용

- 로그인 페이지 레이아웃 구현
- 이메일 입력창 구현
- 비밀번호 입력창 구현
- 로그인 버튼 구현
- 간편 로그인 영역 구현
- 회원가입 안내 문구 구현
- `Flexbox`를 사용한 요소 정렬
- `gap`을 사용한 요소 간격 설정
- 부모 요소와 자식 요소의 너비 설정
- `input` 포커스 스타일 적용
- Pretendard 웹 폰트 적용
- CSS 색상 값을 변수로 등록하여 사용

## CSS 변수

프로젝트에서 반복해서 사용하는 색상은 CSS 변수로 관리했습니다.

```css
:root {
  --primary-100-3692ff: #3692ff;
}
```

사용할 때는 다음과 같이 작성했습니다.

```css
color: var(--primary-100-3692ff);
```

## 폰트

Pretendard 웹 폰트를 사용했습니다.

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

body {
  font-family: "Pretendard", sans-serif;
}
```

## 공부하면서 배운 점

이번 프로젝트를 진행하면서 다음 내용을 연습했습니다.

- 모든 요소에 직접 `px` 너비를 주기보다 부모의 너비를 기준으로 자식의 크기를 설정하는 방법
- `width: 100%`의 기준이 부모 요소라는 점
- `display: flex`를 사용해야 하는 위치
- `justify-content`와 `align-items`를 이용한 정렬
- `gap`과 `space-between`의 차이
- `focus` 상태에 따른 입력창 스타일 변경
- 공통 색상과 폰트를 CSS에서 관리하는 방법
