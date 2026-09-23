// ======================================================
// src/hooks/useProducts.js
// 상품 데이터를 서버에서 가져오는 커스텀 Hook
// 상품 API 요청을 담당하는 커스텀 Hook
//
// 훅 쓴 이유는?? 베스트 상품 컴포넌트에서도 쓰고,
// 판매 중인 상품 컴포넌트에서도 쓰기 때문에
// 똑같이 재사용하려고 만든것임
//
// 훅을 쓰는 이유??
// 여러 컴포넌트에서 반복되는 “기능/로직”을 따로 빼서 재사용하려고 씀
// 상품 데이터를 관리하는 훅, 화면 만드는 일에 집중하는 훅 등등을 나누려고 씀
// ======================================================
import { useEffect, useState } from "react";
import api from "../services/api";

// ======================================================
// ⭐ useProducts = 내가 만든 커스텀 Hook 함수
//
// 사용하는 쪽 => 이 전체 객체가 "인수(argument)"
//
// useProducts({
//   page: 1,
//   pageSize: 10,
//   orderBy: "recent",
//   keyword: "의자",
// });
//
// 받는 쪽 => 매개변수(parameter)
// 아래 page, pageSize, orderBy, keyword가 그 값을 받음

// function add(a, b) { return a + b; }  // (a, b) = 매개변수
// add(10, 20);           // 10, 20 = 인수
// ======================================================
const useProducts = ({
  // 서버에 요청할 때 사용할 조건들
  // 객체 구조분해할당 + 기본값 설정

  page = 1, // 몇 페이지 주세요?
  pageSize = 10, // 몇 개 주세요?
  orderBy = "recent", // 어떤 순서로 주세요? 최신순 / 좋아요순
  keyword = "", // 어떤 검색어로 찾아주세요?
}) => {
  // ====================================================
  //useState?? state값이 바뀌었을 때 화면도 같이 바뀌게 하려고 씀.
  // const [state, setState] = useState(0);
  // ====================================================
  // 1. 서버에서 받은 상품 목록을 저장하고,
  // 그 값이 바뀌었을 때 화면도 다시 바뀌게 하려고 useState를 씀
  // 서버 데이터 받음 → products 변경 → 화면 다시 렌더링
  // ====================================================
  // 처음엔: []
  // 서버에서 상품 목록 받음 :  products = [ { id: 1, name: "의자" },{...}]
  const [products, setProducts] = useState([]);

  // ====================================================
  // 2. 전체 상품 개수를 기억 - 페이지네이션 만들 때 사용
  // ====================================================
  // totalCount = 전체 상품 개수
  // setTotalCount = 전체 상품 개수를 바꾸는 함수
  // 처음엔 0: 서버에서 전체 상품 개수를 받아와 값이 바뀌면
  // 화면도 다시 렌더링되어야 함 그래서 useState로 관리
  const [totalCount, setTotalCount] = useState(0);

  // ====================================================
  // 3. 지금 데이터를 불러오는 중인지 기억
  // 로딩 상태가 바뀌면 화면도 바뀌어야 해서 useState를 쓴다.
  // ====================================================
  // true(불러오는 중) → 서버 요청 → false(불러오기 끝) → 상품 화면 보여줌(화면 바뀜)
  const [isLoading, setIsLoading] = useState(true);

  // ====================================================
  // 4. 에러가 있는지 기억
  // 에러가 생겼을 때 화면에 에러 메시지를 보여줘야 하니까 useState로 관리
  // ====================================================
  // error = 에러 내용을 저장하는 값
  // setError = 에러 값을 바꾸는 함수
  // 처음에는 에러가 없으므로 null
  const [error, setError] = useState(null);

  // ====================================================
  // 5. 서버에 상품을 요청하는 부분
  // ====================================================
  useEffect(() => {
    // --------------------------------------------
    // ⭐ 이전 서버 요청을 취소할 수 있는 "리모컨"
    // --------------------------------------------
    // 검색창 예: "의" → "의자"
    // 이전 요청(의) 취소, 최신 요청(의자)만 사용
    const controller = new AbortController();
    //
    //
    // ==================================================
    // 6. 실제 상품을 가져오는 API 요청 함수
    // ==================================================
    const getProducts = async () => {
      try {
        // 로딩 true → 서버 요청 → 응답 받음 → 로딩 false → 화면
        // setIsLoading(true)를 또 쓰는 이유는 두 번째, 세 번째 요청 때도 다시 로딩 상태로 바꿔야 해서
        // 초기값:  true = 첫 요청용,
        // 이후: setIsLoading(true) = 이후 두번 세번째 요청이 시작될 때 다시 로딩 켜기
        setIsLoading(true);
        //
        // 처음 초기값은 null → 처음에 요청 실패해서 에러 저장댐
        // → 다음 요청 전에 다시 null로 에러 저장된거 초기화
        setError(null); // 이전 에러 메시지 지우기

        //
        // ==============================================
        // 진짜 API 요청하는 부분
        // ==============================================
        /*구조 =  1번째 인수: 요청 주소, 2번째 인수: config(요청 옵션)
                 api.get("주소", {
                   params: "주소에 붙일 값",
                   signal: "요청 취소 설정",
                 }); */
        //
        // axios의 params가 아래 주소를 자동으로 만들어 줌
        // params = URL 뒤의 ?page=...&keyword=... 부분을 대신 만들어주는 것
        // 이렇게 만들어짐: /products?page=1&pageSize=10&orderBy=recent&keyword=의자
        const data = await api.get("/products", {
          params: {
            page,
            pageSize,
            orderBy,
            keyword,
          },
          // --------------------------------------------
          // ⭐ fetch나 axios 요청할 때 signal을 같이 넘김
          // --------------------------------------------

          // GET 요청 인수 2개: api.get(url어디로 요청할지, config API 요청할 때 추가 설정을 넣는 객체);
          signal: controller.signal, // = API 요청에 취소 기능 연결
        });
        //
        //
        // ==============================================
        // 7. 서버에서 받은 상품을 state에 저장
        // 서버 응답을 받은 직후 시점이다.
        // 여기까지 왔다는 건 서버에서 상품 데이터를 받아왔다는 뜻
        // ==============================================
        // useProducts 훅 → 서버에 상품 데이터 요청
        // → 서버에서 상품 데이터를 받아옴
        // → setProducts(data.list) 실행
        // → 서버 응답의 list를 products 스테이트에 저장
        // → products 값이 바뀜
        // → React가 다시 렌더링
        // → 화면에 상품 목록이 보임
        // ?? []는 data.list가 없으면 빈 배열을 넣어라는 뜻이야.
        setProducts(data.list ?? []);
        //
        //
        // useProducts 훅 → 서버에 상품 전체 개수 요청
        // → 서버에서 totalCount를 받아옴
        // → setTotalCount(data.totalCount) 실행
        // → 서버 응답의 totalCount를 totalCount state에 저장
        // → totalCount 값이 바뀜
        // → React가 다시 렌더링
        // → 화면의 전체 상품 개수나 페이지네이션이 바뀜
        // ?? 0은 data.totalCount가 없으면 0을 넣어라는 뜻
        setTotalCount(data.totalCount ?? 0);
      } catch (error) {
        // error란??
        // 서버 요청 실패 -> catch 실행 -> error에 "왜 요청이 실패했는지"  에러 정보 들어옴
        // ==============================================
        // 8. 서버 요청 실패
        // ==============================================
        // --------------------------------------------
        // ⭐ abort()로 일부러 취소한 요청을 진짜 에러처럼 보여주지 않으려고 같이 쓰는 것
        // --------------------------------------------
        // fetch가 정해둔 값 → error.name === "AbortError",
        // Axios가 정해둔 값 → error.code === "ERR_CANCELED"
        // ERR_CANCELED는 Axios에서 요청 취소를 나타내는 에러 코드
        // 우리가 일부러 요청을 취소한 경우
        // 이건 진짜 에러가 아니므로
        // 에러 메시지를 보여주지 않음
        if (error.code !== "ERR_CANCELED") {
          // 진짜 오류일 경우만 아래에 에러 메시지 저장
          setError("상품을 불러오지 못했습니다.");
        }
      } finally {
        // ==============================================
        // 9. 성공하든 실패하든 마지막에 실행
        // ==============================================
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    // ==================================================
    // 10. 위에서 만든 getProducts 함수 실행
    // ==================================================
    //
    // 위에서는
    // const getProducts = async () => { ... }
    // 함수만 만들어 놓은 상태
    // 아래에서 실행해야 실제 API 요청이 시작됨
    getProducts();
    //
    //
    // ✅ useEffect의 정리 함수(cleanup)
    // 정리 함수는 useEffect가 다시 실행되기 전에, 이전에 하던 일을 끝내는 함수
    // keyword 바뀜 → 이전 작업 끝내기 → 새 작업 시작
    /* 
     useEffect(() => { // 새 작업 - keyword 값이 바뀔 때마다 여기 실행됨
       return () => { // 이전 작업 끝내기
       };
    }, [keyword]);
    */
    //✅ 쓴 이유는??
    //signal을 get 요청에 연결해두고,
    // 사용자가 1페이지를 불러오는 중에 2페이지를 누르면
    // 이전 1페이지 요청을 controller.abort()로 취소함
    //
    // --------------------------------------------
    // ⭐ 이전 서버 요청을 취소할 수 있는 "리모컨"
    // --------------------------------------------
    // page, pageSize, orderBy, keyword가 바뀌어서
    // useEffect가 다시 실행되기 전에 기존 요청을 취소함
    // 기존 요청은 지금 서버에 보내놓고 아직 응답을 기다리고 있는 API 요청
    // 1페이지 요청 중 → 2페이지 클릭 → 1페이지 요청 필요 없어짐
    // 이전 상품 API 요청이 필요 없어졌을 때 취소하려고 쓰는 것
    return () => {
      controller.abort();
    };
    // ====================================================
    // 12. 아래 값이 바뀌면 API 다시 요청
    // ====================================================
    // page가 바뀜 → 다른 페이지 상품 다시 요청
    //
    // pageSize가 바뀜 → 가져올 상품 개수가 달라지므로 다시 요청
    //
    // orderBy가 바뀜 → 최신순 / 좋아요순 다시 요청
    //
    // keyword가 바뀜 → 검색 결과 다시 요청
  }, [page, pageSize, orderBy, keyword]);

  // ====================================================
  // 13. useProducts를 사용한 컴포넌트에게 결과 전달
  // useProducts가 가지고 있는 값들을 다른 컴포넌트가 쓸 수 있게 밖으로 보내주는 것
  // ====================================================
  return {
    // 마지막에 밖으로 내보내기
    products, // 상품 목록 줄게
    totalCount, // 전체 상품 개수 줄게
    isLoading, // 로딩 중인지 줄게
    error, // 에러가 있는지도 줄게
  };
};

export default useProducts;

// ✅정리함수란???? 실행
/*
useEffect(() => {
  // 1. keyword가 바뀌면 useEffect 실행

  const controller = new AbortController();
  // 2. 이번 요청을 취소할 controller 만듦

  api.get("/products", {
    signal: controller.signal,
  });
  // 3. 상품 API 요청 시작
  // 예: keyword = "의"

  return () => {
    controller.abort();
    // 4. keyword가 또 바뀌면
    // 이전 "의" 요청 취소
  };
}, [keyword]);

// 5. 새 keyword로 useEffect 다시 실행
// 예: "의자" 요청 시작
*/

// ⭐정리함수를 useProducts 커스텀 Hook 함수 안에 쓴 이유는??
// 1페이지 요청 중 → 2페이지 클릭 → 1페이지 요청 필요 없어짐
// 이전 상품 API 요청이 필요 없어졌을 때 취소하려고 쓰는 것
/*
const useProducts = ({ page, pageSize, orderBy, keyword }) => {

  useEffect(() => {
    // page, pageSize, orderBy, keyword가 바뀌면
    // 서버에서 상품 목록을 다시 가져옴

    const controller = new AbortController();

    api.get("/products", {
      signal: controller.signal,
    });

    return () => {
      // ⭐ 새 요청 전에 이전 요청 취소
      controller.abort();
    };

  }, [page, pageSize, orderBy, keyword]);
};
*/
//
/*
// 1. page = 1
api.get("/products?page=1", {
  signal: controller.signal,
});

// → 1페이지 상품 요청 중


// 2. 사용자가 2페이지 클릭
// page = 2로 바뀜


// 3. 이전 useEffect 정리 함수 실행
controller.abort();

// → 진행 중이던 1페이지 요청 취소


// 4. useEffect 다시 실행
api.get("/products?page=2", {
  signal: controller.signal,
});

// → 이제 2페이지 요청 시작

*/

// 💡useProducts 훅을 사용하는 컴포넌트에서 이렇게 꺼내 쓰는 법
// 예시 ProductList에서 꺼내 쓰고 싶다.
//
/* const ProductList = () => {
  // useProducts가 return한 값들을 받아옴
  // const {
  //   products,
  //   totalCount,
  //   isLoading,
  //   error
  // } = useProducts({
  //
  //   page: 1,
  //   pageSize: 10,
  //   orderBy: "recent",
  //   keyword: "",
  //
  // });

  // 이제 여기서 사용할 수 있음
  console.log(products);
  console.log(totalCount);

  return (
    <div>
      {products.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}; */
