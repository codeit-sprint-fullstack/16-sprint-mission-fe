# 🐼 Panda Market

코드잇 스프린트 프론트엔드 과정에서 진행한 **판다마켓 스프린트 미션** 프로젝트입니다.

HTML, CSS, JavaScript를 사용하여 화면을 구현하고,
API를 이용해 게시글과 상품 데이터를 조회·생성·수정·삭제하는 기능을 구현했습니다.

## 🛠 기술 스택

* HTML
* CSS
* JavaScript
* Fetch API
* Git / GitHub

## 📌 주요 기능

### 게시글 API

* 게시글 목록 조회
* 게시글 상세 조회
* 게시글 생성
* 게시글 수정
* 게시글 삭제
* 페이지네이션 및 검색어를 이용한 목록 조회

### 상품 API

* 상품 목록 조회
* 상품 상세 조회
* 상품 생성
* 상품 수정
* 상품 삭제
* 페이지네이션 및 검색어를 이용한 목록 조회

## ⚡ 비동기 처리

`fetch()`를 이용하여 서버와 데이터를 주고받았습니다.

게시글 API에서는 Promise의 `.then()`, `.catch()`를 사용하고,
상품 API에서는 `async/await`과 `try/catch`를 사용하여 비동기 처리를 구현했습니다.

또한 `response.ok`를 확인하여 404, 500 등의 HTTP 오류도 처리했습니다.

```js
if (!response.ok) {
  throw new Error(`실패: ${response.status}`);
}
```


## 🌱 브랜치

스프린트 미션별로 브랜치를 나누어 작업했습니다.

```text
basic-임현주-sprint3
```

## 👩‍💻 작성자

임현주
